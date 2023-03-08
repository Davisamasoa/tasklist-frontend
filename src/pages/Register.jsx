import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { HeaderNoAuth } from "../components/HeaderNoAuth";
import { BounceLoader } from "react-spinners";
const api_url = import.meta.env.VITE_API_URL;

export function Register(props) {
	const [registerErrors, setRegisterErrors] = useState();
	const [loadingButton, setLoadingButton] = useState(false);

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setError,
	} = useForm();

	const a = true;

	const [PasswordEye, setPasswordEye] = useState({ passwordEye: AiFillEye, confirmPasswordEye: AiFillEye });

	useEffect(() => {
		document.title = `${props.title} | Lista de Tarefas`;
	}, []);
	async function handleRegister({ name, email, password }) {
		const body = { name, email, password };
		const response = await fetch(`${api_url}/api/register`, {
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
			setRegisterErrors({ error: data.error });
			setTimeout(() => {
				setRegisterErrors();
			}, 5000);
		}
	}

	function onSubmit(data, e) {
		setLoadingButton(true);
		handleRegister(data);
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

	function showConfirmPassword() {
		const confirmPassword = document.querySelector("#confirmPassword");

		if (confirmPassword.type == "password") {
			confirmPassword.type = "text";
			setPasswordEye({ ...PasswordEye, confirmPasswordEye: AiFillEyeInvisible });
		} else {
			confirmPassword.type = "password";
			setPasswordEye({ ...PasswordEye, confirmPasswordEye: AiFillEye });
		}
	}

	return (
		<>
			<HeaderNoAuth />
			<div className="min-h-[80vh] gap-10 flex-col flex justify-center items-center sm:w-fit w-11/12">
				<motion.header initial={{ y: 80 }} animate={{ y: 0 }} transition={{ duration: 0.3, type: "just" }}>
					<h1 className="text-5xl font-semibold">Cadastro</h1>
				</motion.header>
				<motion.main
					initial={{ y: -80 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.3, type: "just" }}
					className="bg-secondaryColor sm:p-10 p-7 rounded-md  h-full flex flex-col justify-center items-center w-full"
				>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex gap-3 relative justify-center items-center flex-col text-textColor sm:w-[300px] w-full"
					>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.3, type: "just" }}
							className="w-full"
						>
							<label className="w-full" htmlFor="name">
								Nome:
							</label>

							<div className="relative">
								<input
									className={`${
										errors.name ? "input-error" : ""
									} pl-8 w-full bg-transparent outline-none focus:border-primaryColor py-1 px-2 rounded-md border-2 border-textColor`}
									type={"text"}
									id={"name"}
									name={"name"}
									placeholder="Nome"
									{...register("name", { required: true })}
								/>
								<FaUser size={18} className={`absolute top-2/4 -translate-y-1/2   left-2`} />
							</div>
							<p className="min-h-[10px] text-sm h-[10px] text-end text-red-400">
								{errors.name ? "Esse campo é obrigatório" : ""}
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.4, type: "just" }}
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
									{...register("email", {
										required: true,
										pattern: {
											value: /\S+@\S+\.\S+/,
											message: "Email inválido",
										},
									})}
								/>
								<MdEmail size={19} className={`text-xl absolute top-2/4 -translate-y-1/2 left-2`} />
							</div>
							<p className="min-h-[10px] text-sm h-[10px] text-end text-red-400">
								{errors?.email?.type == "required" ? "Esse campo é obrigatório" : ""}
								{errors?.email?.type == "pattern" ? errors?.email.message : ""}
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.4, type: "just" }}
							className="w-full"
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
								<FaLock size={17} className={`text-xl absolute top-2/4 -translate-y-1/2 left-2`} />
								<PasswordEye.passwordEye
									onClick={showPassword}
									size={18}
									className={`text-xl absolute top-2/4 -translate-y-1/2 right-2`}
								/>
							</div>
							<p className="min-h-[10px] text-sm h-[10px] text-end text-red-400">
								{errors?.password?.type == "required" ? "Esse campo é obrigatório" : ""}
								{errors?.password?.type == "minLength" ? "É exigido no mínimo 8 caracteres" : ""}
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.4, type: "just" }}
							className="w-full"
						>
							<label className="w-full" htmlFor="confirmPassword">
								Confirme a senha:
							</label>
							<div className="relative">
								<input
									className={`${
										errors.confirmPassword ? "input-error" : ""
									} pl-8 w-full bg-transparent outline-none focus:border-primaryColor py-1 px-2 rounded-md border-2 border-textColor`}
									type="password"
									id="confirmPassword"
									name={"confirmPassword"}
									placeholder="Repita a senha"
									{...register("confirmPassword", {
										required: true,
										minLength: 8,

										validate: (val) => {
											if (watch("password") != val) {
												return "As senhas não coincidem";
											}
										},
									})}
								/>
								<FaLock size={17} className={`text-xl absolute top-2/4 -translate-y-1/2 left-2`} />
								<PasswordEye.confirmPasswordEye
									onClick={showConfirmPassword}
									size={18}
									className={`text-xl absolute top-2/4 -translate-y-1/2 right-2`}
								/>
							</div>

							<p className="min-h-[10px] h-[10px] text-sm text-end text-red-400">
								{errors?.confirmPassword?.type == "required" ? "Esse campo é obrigatório" : ""}
								{errors?.confirmPassword?.type == "minLength" ? "É exigido no mínimo 8 caracteres" : ""}
								{errors?.confirmPassword?.message ? errors?.confirmPassword?.message : ""}
							</p>
						</motion.div>
						<p className="text-red-400 text-sm top-[310px] absolute  w-full">
							{registerErrors ? registerErrors.error : ""}
						</p>

						<motion.button
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 0.3, delay: 0.6 }}
							type="submit"
							onClick={handleSubmit(onSubmit)}
							className="w-full flex justify-center items-center sm:hover:scale-105 transition duration-300 p-2 mt-2 rounded bg-primaryColor text-textColor"
						>
							{loadingButton ? <BounceLoader size={22} color={"white"} /> : "Cadastrar"}
						</motion.button>
					</form>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.7 }}
						className="flex flex-col items-center justify-center"
					>
						<span className="mt-7 font-light">Já tem uma conta?</span>
						<Link to={"/login"}>
							<span className="font-light underline transition duration-300 hover:text-primaryColor">
								Clique aqui para logar
							</span>
						</Link>
					</motion.div>
				</motion.main>
			</div>
		</>
	);
}
