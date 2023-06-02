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
import NotesPage, {loader as notesLoader} from "./pages/Notes";
import NotesLayout from "./pages/NotesLayout";
import NoteDetail, {loader as noteDetailLoader} from "./pages/NoteDetail";
 

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
				path: 'dashboard/:uid',
				element: <DashboardLayout />,
				children: [
					{
						index: true,
						element: <div>Hi</div>
					},
					{
						path: 'notes',
						element: <NotesLayout/>,
						children: [
							{
								index: true,
								element: <NotesPage />,
								loader: notesLoader
							},
							{
								path: ":noteId",
								children: [
									{
										index: true,
										element: <NoteDetail />,
										loader: noteDetailLoader
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
