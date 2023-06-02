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
import NotesLayout from "./pages/NotesLayout";
import NoteDetail from "./pages/NoteDetail";
 

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
						element: <NotesLayout/>,
						children: [
							{
								index: true,
								element: <NotesPage />
							},
							{
								path: ":noteId",
								children: [
									{
										index: true,
										element: <NoteDetail />
									}
								]
							}
						]
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
