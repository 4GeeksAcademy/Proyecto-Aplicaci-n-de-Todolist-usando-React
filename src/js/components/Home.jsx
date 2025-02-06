import React, { useState } from "react";



//create your first component
const Home = () => {

	// let nuevoTodo = "";
	const [nuevoTodo, setNuevoTodo] = useState("Tarea Nueva");

	const handleClick = () => {

	}

	const handleChange = (event) => {
		setNuevoTodo(event.target.value);
	}


	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todos!</h1>


			<div>
				<input type="text" onChange={handleChange}/>
				<button onClick={handleClick}>
				handleClick
				</button>
			</div>
			<ul>
				<li>

				</li>
				<li>

				</li>
			</ul>
		</div>
	);
};

export default Home;