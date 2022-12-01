import React from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { LocalStorageWidgetRepository } from "../../infrastructure/LocalStorageWidgetRepository";
import { Dashboard } from "./Dashboard";

const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	config.github_access_token
);
const widgetRepository = new LocalStorageWidgetRepository();

export class DashboardFactory {
	static create(): React.ReactElement {
		return (
			<Dashboard
				gitHubRepositoryRepository={gitHubRepositoryRepository}
				widgetRepository={widgetRepository}
			/>
		);
	}
}
