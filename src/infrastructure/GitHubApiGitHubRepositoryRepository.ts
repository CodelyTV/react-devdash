import { CiStatus, GitHubApiResponses, PullRequest, RepositoryData } from "./GitHubApiResponse";

interface RepositoryId {
	organization: string;
	name: string;
}

export class GitHubApiGitHubRepositoryRepository {
	private readonly endpoints = [
		"https://api.github.com/repos/$organization/$name",
		"https://api.github.com/repos/$organization/$name/pulls",
		"https://api.github.com/repos/$organization/$name/actions/runs?page=1&per_page=1",
	];

	constructor(private readonly personalAccessToken: string) {}

	async search(repositoryUrls: string[]): Promise<GitHubApiResponses[]> {
		const responsePromises = repositoryUrls
			.map((url) => this.urlToId(url))
			.map((id) => this.searchBy(id));

		return Promise.all(responsePromises);
	}

	private async searchBy(repositoryId: RepositoryId): Promise<GitHubApiResponses> {
		const setOrganization = (endpoint: string) =>
			endpoint.replace("$organization", repositoryId.organization);
		const setName = (endpoint: string) => endpoint.replace("$name", repositoryId.name);
		const fetchFromGitHub = (url: string) =>
			fetch(url, {
				headers: { Authorization: `Bearer ${this.personalAccessToken}` },
			});

		const requests = this.endpoints.map(setOrganization).map(setName).map(fetchFromGitHub);

		const toJson = (responses: Response[]) =>
			Promise.all(responses.map((response) => response.json()));

		return Promise.all(requests)
			.then(toJson)
			.then(([repositoryData, pullRequests, ciStatus]) => {
				return {
					repositoryData: repositoryData as RepositoryData,
					pullRequests: pullRequests as PullRequest[],
					ciStatus: ciStatus as CiStatus,
				};
			});
	}

	private urlToId(url: string): RepositoryId {
		const splitUrl = url.split("/");

		return {
			name: splitUrl.pop() as string,
			organization: splitUrl.pop() as string,
		};
	}
}
