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
import {action as manipulateNoteAction } from './components/NoteForm';
import EditNote from "./pages/EditNote";
import NewNotePage from './pages/NewNote'
import Protected from "./components/Protected";
import FavoritesLayout from "./pages/FavoritesLayout";
 

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
				element: <Protected><DashboardLayout /></Protected>,
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
								id: 'note-detail',
								loader: noteDetailLoader,
								children: [
									{
										index: true,
										element: <NoteDetail />,
										action: manipulateNoteAction
									},
									{
										path: 'edit',
										element: <EditNote />,
										action: manipulateNoteAction
									}
								]
							},
							{
								path: 'new',
								element: <NewNotePage />,
								action: manipulateNoteAction
							}
						]
					},
					{
						path: 'favorites',
						element: <FavoritesLayout />,
						children: [
							{
								index: true,
								
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
