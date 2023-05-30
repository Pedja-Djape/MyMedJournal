import React from "react";

import { 
	createBrowserRouter,
	RouterProvider
 } from "react-router-dom";

 import RootLayout from './pages/RootLayout'
 import Home from './pages/Home'
 import Search from './pages/Search';

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
			}
		]
	},
]);

function App() {
	return <RouterProvider router={router}/>
}

export default App;
