import { Component, useEffect } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { TaskPage } from "./pages/TaskPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export function verifyTokenExist() {
	const token = JSON.parse(localStorage.getItem("userData"));
	return {
		exist: token ? true : false,
		id: token?.id ?? undefined,
		token: token?.token ?? undefined,
	};
}

const auth = true;

function PrivateRoute({ children }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (!verifyTokenExist().exist) {
			navigate("/login");
		}
	}, []);

	return children;
}

function AutoLogin({ children }) {
	const auth = false;
	const navigate = useNavigate();

	useEffect(() => {
		if (verifyTokenExist().exist) {
			navigate("/tasks");
		}
	}, []);

	return children;
}

function App() {
	return (
		<div className="flex mb-10 font-lato justify-center flex-col items-center text-textColor">
			<BrowserRouter basename="/">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/tasks"
						element={
							<PrivateRoute>
								<TaskPage title="Minhas tarefas" />
							</PrivateRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<AutoLogin>
								<Login title="Login" />
							</AutoLogin>
						}
					/>
					<Route
						path="/register"
						element={
							<AutoLogin autoLogin={true}>
								<Register title="Cadastro" />
							</AutoLogin>
						}
					/>
				</Routes>
			</BrowserRouter>

			<Footer />
		</div>
	);
}

export default App;
