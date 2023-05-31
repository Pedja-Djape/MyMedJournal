import React from "react";

import { 
	createBrowserRouter,
	RouterProvider
 } from "react-router-dom";

 import RootLayout from './pages/RootLayout'
 import Home from './pages/Home'
 import Search from './pages/Search';
 import AuthenticationPage from './pages/Authentication';

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
				element: <AuthenticationPage />
			}
		]
	},
]);

function App() {
	return <RouterProvider router={router}/>
}

export default App;
