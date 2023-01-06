import React, { useState } from 'react';
import classes from './App.module.css'

import { Routes, Route } from 'react-router-dom';

import Navbar from "./components/UI/Navbar";
// import Home from "./pages/Home.js";
import Search from "./pages/Search";
import About from "./pages/About";
import NoPage from "./pages/NoPage";



function App() {

	const pages = {
		"search": 'Search',
		'about': 'About'
	}


	return (
	<React.Fragment>
		<Navbar pages={pages}/>
		<div className={classes.container}>
			<Routes> {/*List of Routes*/}
				<Route path='/' element={<Search />} />
				<Route path="search" element={<Search />} />
				<Route path="about" element={<About />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</div>
	</React.Fragment>

	);
}

export default App;
