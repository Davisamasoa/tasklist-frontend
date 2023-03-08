import Woman from "../assets/woman.svg";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { HeaderNoAuth } from "../components/HeaderNoAuth";

export function Home(props) {
	useEffect(() => {
		document.title = `Lista de Tarefas`;
	}, []);

	return (
		<div className="w-full flex flex-col justify-center">
			<HeaderNoAuth />

			<div className="mb-28 md:gap-0 gap-5 flex justify-center md:flex-row flex-col items-center md:mt-20 mt-10">
				<motion.img
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.3, type: "just", delay: 0.3 }}
					className="max-w-[700px] w-full md:order-1 order-2  md:w-3/6 lg:w-2/4"
					src={Woman}
				/>

				<div className="max-w-[500px] w-full md:order-2 order-1  md:w-3/6 lg:w-2/4 justify-center items-center flex flex-col gap-7 p-10 sm:p-0 sm:pr-10">
					<motion.h2
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.3, type: "just", delay: 0.3 }}
						className=" md:text-3xl text-4xl lg:text-5xl font-extrabold"
					>
						Qual método de produtividade é o melhor para você?
					</motion.h2>
					<motion.p
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.3, type: "just", delay: 0.4 }}
						className="text-lg md:text-base"
					>
						Sabe quando termina o dia e você tem a sensação de que não fez tudo o que precisava? Esse é um
						sentimento bem comum e pode ser resultado tanto da falta de organização, como da organização
						equivocada. Portanto, uma lista de tarefas é perfeita para te ajudar no dia-a-dia! Mais
						organização e mais produtividade!
					</motion.p>

					<motion.div
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.3, type: "just", delay: 0.5 }}
						className="w-full"
					>
						<i className="text-start">Clique no botão abaixo para se cadastrar e se tornar mais produtivo!</i>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.7, duration: 0.2, type: "just" }}
						className="flex justify-start w-full"
					>
						<Link
							to={"/register"}
							className="bg-primaryColor sm:hover:bg-transparent transition duration-300 border-2 border-primaryColor p-2 px-4 rounded-md"
						>
							Cadastrar
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
