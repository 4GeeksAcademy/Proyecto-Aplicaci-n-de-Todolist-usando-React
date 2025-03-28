import { useEffect, useState } from "react";

export default function Home() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fatchTasks();
	}, []);


	const fatchTasks = () => {
		fetch("https://playground.4geeks.com/todo/users/alejandrorcc7", {
			method: "GET",
			headers: { "Content-Type": "application/json", },
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Datos agregados:", data);
				if (Array.isArray(data.todos)) {
					setTasks(data.todos);
				} else {
					console.error("La APIno delvolvio una lista valida.");
				}
			})
			.catch((error) => console.error("Error al obtener tareas:", error));
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && task.trim() !== "") {
			const newTask = { label: task, done: false };

			fetch(`https://playground.4geeks.com/todo/todos/alejandrorcc7`, {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(newTask),
			})
				.then((response) => response.json())
				.then((creastedTask) => {
					console.log("Tarea creada:", creastedTask);
					setTasks([...tasks, creastedTask]);
					setTask("");
				})
				.catch((error) => console.error("Error al agregar tarea:", error));
		}
	};

	const handleDelete = (todoId) => {
		console.log("ID de la tarea a eliminar:", todoId);
		fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
			method: "DELETE",
		})

		.then((response) => {
			if (!response.ok) throw new Error("Error al eliminar la tarea");
			return response.text();
		})
			.then((message) => {
				console.log("Respuesta de la API:", message);
				setTasks(tasks.filter((task.id !== todoId)));
			})
			.catch((error) => console.error("Error al eliminar tarea:", error));
	};

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todos!</h1>

			<div className="container">
				<div className="d-flex gap-2">

					<div></div>
					<input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={handleKeyDown} />
					<button onClick={handleKeyDown} className="btn btn-primary">
						Agregar
					</button>
				</div>
				<ul className="list-group">
					{tasks && tasks.length > 0 && tasks.map((task, indice) => {
						return (
							<li key={indice} className={`list-group-item d-flex justify-content-between align-items-center ${indice % 2 === 0 ? "bg-light" : ""}`}>
								{task.label} <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
};
