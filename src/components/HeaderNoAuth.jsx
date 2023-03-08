import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
export function HeaderNoAuth() {
	return (
		<motion.header
			initial={{ y: -150, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.2, type: "just" }}
			className="w-full"
		>
			<nav className="mx-auto flex max-w-[1100px] sm:px-14 px-9 w-full justify-between items-center font-lato text-textColor">
				<figure className="w-1/4 justify-start flex  items-center">
					<Link to={"/"} className="h-full p-2">
						<img className="sm:w-14 w-12" src={Logo} />
					</Link>
				</figure>

				<ul className="flex w-1/4 justify-end gap-3 items-center">
					<li>
						<Link
							to={"/login"}
							className="bg-transparent sm:hover:bg-primaryColor transition duration-300  border-2 border-primaryColor p-2 px-4 rounded-md"
						>
							Login
						</Link>
					</li>
					<li>
						<Link
							to={"/register"}
							className="bg-primaryColor sm:hover:bg-transparent transition duration-300 border-2 border-primaryColor p-2 px-4 rounded-md"
						>
							Cadastrar
						</Link>
					</li>
				</ul>
			</nav>
		</motion.header>
	);
}
