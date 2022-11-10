import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DashboardFactory } from "./sections/dashboard/DashboardFactory";

const router = createBrowserRouter([
	{
		path: "/",
		element: DashboardFactory.create(),
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
