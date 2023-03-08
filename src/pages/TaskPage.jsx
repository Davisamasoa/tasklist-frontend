import { Task } from "../components/Task";
import { useState, useCallback, useEffect, useId, CSSProperties } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { verifyTokenExist } from "../App";
import { BsCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";
import Logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SyncLoader } from "react-spinners";

const api_url = import.meta.env.VITE_API_URL;

let i = 1;

export function TaskPage(props) {
	const [task, setTask] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [inputBorderColor, setInputBorderColor] = useState("border-primaryColor");
	const [fetchTask, setFetchTask] = useState();
	const [editTask, setEditTask] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const createId = useId();

	useEffect(() => {
		getTasks().then((res) => {
			setTask(res);
			setLoading(false);
		});
	}, [fetchTask]);

	useEffect(() => {
		document.title = `${props.title} | Lista de Tarefas`;
	}, []);
	async function getTasks() {
		const userData = verifyTokenExist();

		const data = await fetch(`${api_url}/api/tasks`, {
			headers: {
				Authorization: `Bearer ${userData.token}`,
			},
		}).then((res) => res.json());

		return data ? data.filter((task) => task.author.id == userData.id) : [];
	}

	function handleInput(e) {
		setInputValue(e.currentTarget.value);
	}

	async function postTask() {
		const userData = verifyTokenExist();

		if (inputValue != "") {
			setInputValue("");

			const body = {
				name: inputValue,
				author: {
					id: userData.id,
				},
			};

			const data = await fetch(`${api_url}/api/tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userData.token}`,
				},
				body: JSON.stringify(body),
			})
				.then((res) => {
					res.json();

					setInputValue("");
					setFetchTask(i++);
				})
				.catch(() => {
					alert("Falha em adicionar tarefa");
				});
		} else {
			setInputBorderColor("border-red-500");
			setTimeout(() => {
				setInputBorderColor("border-primaryColor");
			}, 300);
		}
	}

	async function updateTask() {
		const updateTask = task.map((task) => task._id).indexOf(editTask.id);
		const arrayTaskUpdated = [...task];
		arrayTaskUpdated[updateTask].name = inputValue;
		setTask(arrayTaskUpdated);
		setEditTask(false);
		setInputValue("");

		const userData = verifyTokenExist();
		const body = { name: inputValue };
		const data = await fetch(`${api_url}/api/tasks/${editTask.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userData.token}`,
			},
			body: JSON.stringify(body),
		}).then((res) => res.json());
	}

	function handleKeyDown(e) {
		if (e.key == "Enter") {
			editTask ? updateTask() : postTask();
		}
	}

	return (
		<>
			<motion.header
				initial={{ y: -150, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.2, type: "just" }}
				className=" w-full"
			>
				<nav className="mx-auto flex max-w-[1100px] sm:px-14 px-9 w-full justify-between items-center font-lato text-textColor">
					<figure className="w-1/4 justify-start flex  items-center">
						<Link to={"/"} className="h-full p-2">
							<img className="sm:w-14 w-12" src={Logo} />
						</Link>
					</figure>

					<ul className="flex w-3/4 justify-end gap-3 items-center">
						<li>
							<button
								onClick={() => {
									localStorage.removeItem("userData");
									navigate("/");
								}}
								className="bg-transparent sm:hover:bg-primaryColor transition duration-300  border-2 border-primaryColor p-2 px-4 rounded-md"
							>
								Encerrar sessão
							</button>
						</li>
					</ul>
				</nav>
			</motion.header>
			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, type: "tween" }}
				className="text-textColor font-semibold sm:text-5xl text-4xl text-center mt-10"
			>
				Lista de Tarefas
			</motion.h1>
			<div className="mb-14 sm:min-w-[400px] sm:max-w-[400px] min-w-full max-w-full  p-5 ">
				<div className="flex mt-32 relative justify-center items-center  gap-4 mb-20">
					{!editTask ? (
						<motion.button
							initial={{ x: 10, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.1, type: "just" }}
							onClick={postTask}
						>
							<BsPlusSquare className="text-primaryColor sm:text-2xl text-xl" />
						</motion.button>
					) : undefined}

					<motion.input
						initial={{ width: "20%" }}
						animate={{ width: "100%" }}
						transition={{ duration: 0.4, type: "just" }}
						type="text"
						className={`w-full ${
							editTask ? "pr-14" : ""
						} h-7 bg-transparent  border-0 border-b-2 ${inputBorderColor} text-textColor outline-none transition duration-300`}
						value={inputValue}
						onChange={handleInput}
						onKeyDown={handleKeyDown}
						placeholder="Adicione uma tarefa"
					/>

					{!editTask == false ? (
						<>
							<button
								onClick={() => {
									setEditTask(false);
									setInputValue("");
								}}
								className="absolute text-red-400 top-[0px] right-7"
							>
								<BsFillXSquareFill size={22} />
							</button>
							<button onClick={updateTask} className="absolute text-green-400 top-0 right-0">
								<BsCheckSquareFill size={22} />
							</button>
						</>
					) : undefined}
				</div>

				<main>
					{loading ? (
						<div className="flex justify-center items-center h-[200px]">
							<SyncLoader color="white" size={10} aria-label="Loading Spinner" data-testid="loader" />
						</div>
					) : (
						task.map((item) => {
							return (
								<Task
									key={item._id}
									id={item._id}
									taskName={item.name}
									refreshTaskArray={setFetchTask}
									i={i}
									done={item.done}
									setInputValue={setInputValue}
									editTask={setEditTask}
									taskArray={task}
									setTaskArray={setTask}
								/>
							);
						})
					)}
				</main>
			</div>
		</>
	);
}
