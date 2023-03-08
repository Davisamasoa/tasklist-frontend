import React, { useEffect, useState } from "react";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { verifyTokenExist } from "../App";

const api_url = import.meta.env.VITE_API_URL;

let i = 500;

export function Task({
	taskName,
	refreshTaskArray,
	id,
	done,
	setInputValue,
	editTask,
	taskArray,
	setTaskArray,
}) {
	const taskStatus = {
		textColor: done ? "text-gray-500" : "text-textColor",
		textDecoration: done ? "line-through" : "",
	};

	async function updateTask() {
		setInputValue(taskName);
		editTask({
			id,
		});
	}
	async function removeTask() {
		const deleteTask = [...taskArray].filter((item) => item._id != id);
		setTaskArray([...deleteTask]);

		const userData = verifyTokenExist();
		const data = await fetch(`${api_url}/api/tasks/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${userData.token}`,
			},
		});
	}
	async function togleDone() {
		const updateTask = taskArray.map((task) => task._id).indexOf(id);
		const array = [...taskArray];
		if (!done) {
			array[updateTask].done = true;
			setTaskArray([...array]);
		} else {
			array[updateTask].done = false;
			setTaskArray([...array]);
		}

		const userData = verifyTokenExist();
		const body = { done: !done };

		const data = await fetch(`${api_url}/api/tasks/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userData.token}`,
			},
			body: JSON.stringify(body),
		});
	}

	const CheckTag = done ? BsCheckSquare : BsSquare;

	return (
		<motion.div
			initial={{ y: -100, opacity: 0, scale: 0.8 }}
			animate={{ y: 0, opacity: 1, scale: 1 }}
			transition={{ duration: 0.3, type: "just" }}
			whileHover={{ scale: 1.05 }}
			className="bg-secondaryColor py-2 rounded-sm px-4 flex justify-center items-center gap-4 mb-3"
		>
			<button onClick={togleDone}>
				<CheckTag className={` text-primaryColor`} />
			</button>
			<span
				onClick={togleDone}
				className={`${taskStatus.textColor} w-full ${taskStatus.textDecoration} cursor-pointer`}
			>
				{taskName}
			</span>

			<button onClick={updateTask}>
				<RiEditBoxFill size={19} className="text-primaryColor" />
			</button>

			<button onClick={removeTask}>
				<FaTrash className="text-primaryColor" />
			</button>
		</motion.div>
	);
}
