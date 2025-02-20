import React, { useEffect, useState } from "react";

const Home = () => {


	const [nuevoTodo, setNuevoTodo] = useState("");
	const [todos, setTodos] = useState([]);

	const getTask = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/alejandro")
			const data = await response.json()
			setTodos(data.todos) 

		} catch (error) {
		}
	}

	const handleClick = () => {
		setTodos([...todos, nuevoTodo])
	}


	const deleteTodo = (indice) => {
		const listaNueva = todos.filter((todo, i) => i !== indice)
		setTodos(listaNueva.data.todos);
	}

	const handleChange = (event) => {
		setNuevoTodo(event.target.value);
	}



	useEffect(() => {
		getTask()
	}, [])


	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todos!</h1>

			<div className="container">
				<div className="d-flex gap-2">

					<div></div>
					<input type="text" className="form-control" onChange={handleChange} />
					<button onClick={handleClick} className="btn btn-primary">
						Agregar
					</button>
				</div>



				{/* <p>Nueva tarea: {nuevoTodo} </p> */}

				<ul className="list-group">
					{todos.map((todo, indice) => {
						return (
							<li className={`list-group-item d-flex justify-content-between align-items-center ${indice % 2 === 0 ? "bg-light" : ""}`}>
								{todo.label} <button className="btn btn-danger" onClick={() => deleteTodo(indice)}>X</button>
							</li>
						)
					})}

				</ul>
			</div>
		</div>
	);
};

export default Home;