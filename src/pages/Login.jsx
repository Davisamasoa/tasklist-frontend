import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { BounceLoader } from "react-spinners";
import { HeaderNoAuth } from "../components/HeaderNoAuth";

const api_url = import.meta.env.VITE_API_URL;

export function Login(props) {
	const [loginErrors, setLoginErrors] = useState();
	const [loadingButton, setLoadingButton] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const a = true;

	const [PasswordEye, setPasswordEye] = useState({ passwordEye: AiFillEye, confirmPasswordEye: AiFillEye });

	useEffect(() => {
		document.title = `${props.title} | Lista de Tarefas`;
	}, []);

	async function handleLogin({ email, password }) {
		const body = { email, password };
		const response = await fetch(`${api_url}/api/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		const data = await response.json();

		if (data.msg) {
			localStorage.setItem(
				"userData",
				JSON.stringify({
					id: data.id,
					token: data.token,
				})
			);
			navigate("/tasks");
		} else {
			setLoadingButton(false);
			setLoginErrors({ error: data.error });
			setTimeout(() => {
				setLoginErrors();
			}, 5000);
		}
	}

	function onSubmit(data, e) {
		setLoadingButton(true);
		handleLogin(data).catch(() => setLoadingButton(false));
	}

	function showPassword() {
		const password = document.querySelector("#password");
		if (password.type == "password") {
			password.type = "text";
			setPasswordEye({ ...PasswordEye, passwordEye: AiFillEyeInvisible });
		} else {
			password.type = "password";
			setPasswordEye({ ...PasswordEye, passwordEye: AiFillEye });
		}
	}

	return (
		<>
			<HeaderNoAuth />
			<div className="min-h-[80vh] gap-10 flex-col flex justify-center items-center sm:w-fit w-11/12 text-base">
				<motion.header initial={{ y: 80 }} animate={{ y: 0 }} transition={{ duration: 0.3, type: "tween" }}>
					<h1 className="text-5xl font-semibold">Login</h1>
				</motion.header>
				<motion.main
					initial={{ y: -80 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.3, type: "tween" }}
					className="bg-secondaryColor sm:p-10 p-7 rounded-md  flex flex-col justify-center items-center w-full"
				>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex relative gap-3 h-full justify-center items-center flex-col text-textColor sm:w-[300px] w-full"
					>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.3, type: "just" }}
							className="w-full"
						>
							<label className="w-full" htmlFor="email">
								Email:
							</label>
							<div className="relative">
								<input
									className={`${
										errors.email ? "input-error" : ""
									} pl-8 w-full bg-transparent outline-none focus:border-primaryColor py-1 px-2 rounded-md border-2 border-textColor`}
									type="email"
									id="email"
									name={"email"}
									placeholder="exemplo@gmail.com"
									{...register("email", { required: true })}
								/>
								<MdEmail size={19} className={`text-xl absolute -translate-y-1/2  top-2/4 left-2`} />
							</div>
							<p className="min-h-[10px] text-sm  h-[10px] text-end text-red-400">
								{errors.email ? "Esse campo é obrigatório" : ""}
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.3, type: "just" }}
							className="w-full min-h-[78px]"
						>
							<label className="w-full" htmlFor="password">
								Senha:
							</label>

							<div className="relative">
								<input
									className={`${
										errors.password ? "input-error" : ""
									} pl-8 w-full bg-transparent outline-none focus:border-primaryColor py-1 px-2 rounded-md border-2 border-textColor`}
									type="password"
									id="password"
									name={"password"}
									placeholder="Escreva sua senha"
									{...register("password", { required: true, minLength: 8 })}
								/>
								<FaLock size={17} className={`absolute top-2/4 -translate-y-1/2 left-2`} />
								<PasswordEye.passwordEye
									onClick={showPassword}
									size={18}
									className={`text-xl absolute -translate-y-1/2  top-2/4 right-2`}
								/>
							</div>
							<p className="min-h-[10px] text-sm  h-[10px] text-end text-red-400">
								{errors?.password?.type == "required" ? "Esse campo é obrigatório" : ""}
								{errors?.password?.type == "minLength" ? "É exigido no mínimo 8 caracteres" : ""}
							</p>
						</motion.div>

						<p className="text-red-400 text-sm  top-[143px] absolute  w-full">
							{loginErrors ? loginErrors.error : ""}
						</p>

						<motion.button
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 0.3, delay: 0.4 }}
							type="submit"
							onClick={handleSubmit(onSubmit)}
							className="min-h-[40px] flex justify-center items-center w-full sm:hover:scale-105 transition duration-300 p-2 rounded bg-primaryColor text-textColor"
						>
							{loadingButton ? <BounceLoader size={22} color={"white"} /> : "Entrar"}
						</motion.button>
					</form>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.5 }}
						className="flex flex-col items-center justify-center"
					>
						<span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3, delay: 0.6 }}
							className="mt-7 font-light"
						>
							Não tem uma conta?
						</span>

						<Link to={"/register"}>
							<span className="font-light underline transition duration-300 hover:text-primaryColor">
								Cadastre-se aqui
							</span>
						</Link>
					</motion.div>
				</motion.main>
			</div>
		</>
	);
}
