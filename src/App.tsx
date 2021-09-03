import React from "react";
import "./App.scss";
import Header from "./components/header/header.component";
import HomePage from "./pages/Home.page";

function App() {
	return (
		<div className="App">
			<Header />
			<HomePage />
		</div>
	);
}

export default App;
