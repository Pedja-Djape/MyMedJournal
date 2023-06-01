import React from "react";

import { 
	createBrowserRouter,
	RouterProvider
 } from "react-router-dom";

 import RootLayout from './pages/RootLayout'
 import Home from './pages/Home'
 import Search from './pages/Search';
 import AuthenticationPage, {action as authAction} from './pages/Authentication';
import DashboardLayout from "./pages/DashboardLayout";
import NotesPage from "./pages/Notes";
 

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{	
				index: true,
				element: <Home />
			},
			{
				path: 'search',
				element: < Search />
			},
			{
				path: 'auth',
				element: <AuthenticationPage />,
				action: authAction
			},
			{
				path: 'dashboard',
				element: <DashboardLayout />,
				children: [
					{
						index: true,
						element: ''
					},
					{
						path: 'notes',
						element: <NotesPage />
					}
				]
			},
		]
	},
]);

function App() {
	return <RouterProvider router={router}/>
}

export default App;
