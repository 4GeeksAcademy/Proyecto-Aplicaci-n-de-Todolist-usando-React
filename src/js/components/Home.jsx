import React, { useEffect, useState } from "react";

export default function Home = () {
	const [todos, setTodos] = useState([]);
	const [nuevoTodo, setNuevoTodo] = useState("");

	const fetchTodos = () => {
		fetch("https://playground.4geeks.com/todo/users", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("obtener datos");
				}
				return response.json();
			})
			.then((response.Json) => {
		console.log(
			"completa la api:",
			JSON.stringify(Response.Json, null, 2)
		);

		if (responseJson.all) {
			setTodos(ResponseJson.all);
		} else {
			console.error("DEVOLVER LA PROPIEDAD");
		}
	})
		.catch ((error) => console.error("Error", error));
};

useEffect(() => {
	fetchTodos();
}, [])

useEffect(() => {
	console.log("acualizar all", todos);
}, [todos]);


const handleClick = (e) => {
	if (e.key === "click" && todos.trim() !== "") {
		setTodos([...todos, nuevoTodo])
		setNuevoTodo("");
	}
};


const deleteTodo = (indice) => {
	console.log("eliminar", indice);

	fetch(`https://playground.4geeks.com/todo/todos/${indice}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})

		.then((response) => {
			if (!response.ok) {
				throw new Error("eliminar la tarea");
			}
			return response.text();
		})
		.then(() => {
			console.log("delete success");
			setTodos(listaNueva.data.todos);
			setTodos(todos.filter((todo) => todo.id !== indice));
		})
		.catch((error) => console.error("eliminat las tareas", error));
};

const handleChange = (event) => {
	setNuevoTodo(event.target.value);
}

return (
	<div className="text-center">
		<h1 className="text-center mt-5">Todos!</h1>

		<div className="container">
			<div className="d-flex gap-2">

				<div></div>
				<input type="text" className="form-control" value={nuevoTodo} onChange={(e) => setNuevoTodo(e.target.value)} onAbort={handleClick} />
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
