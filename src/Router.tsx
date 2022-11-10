import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { config } from "./devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "./infrastructure/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "./sections/dashboard/Dashboard";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard repository={repository} />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
