import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";
export function Footer() {
	return (
		<motion.footer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, type: "tween" }}
			className="absolute bottom-5"
		>
			<figure className="flex justify-center gap-2 mb-2 mt-5">
				<a href="https://github.com/Davisamasoa" target="blank">
					<BsGithub size={30} className=" text-primaryColor" />
				</a>

				<a href="https://www.linkedin.com/in/davisamasoa/" target="blank">
					<BsLinkedin size={30} className="text-primaryColor" />
				</a>
			</figure>
		</motion.footer>
	);
}
