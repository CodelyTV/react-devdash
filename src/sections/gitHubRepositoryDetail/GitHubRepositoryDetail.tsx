import { useParams } from "react-router-dom";

import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { useGitHubRepository } from "./useGithubRepository";

export function GitHubRepositoryDetail({ repository }: { repository: GitHubRepositoryRepository }) {
	const { organization, name } = useParams() as { organization: string; name: string };

	const { repositoryData } = useGitHubRepository(repository, { name, organization });

	if (!repositoryData) {
		return <></>;
	}

	return (
		<section>
			<h2>
				{repositoryData.id.organization}/{repositoryData.id.name}
			</h2>

			<p>{repositoryData.description}</p>
		</section>
	);
}
