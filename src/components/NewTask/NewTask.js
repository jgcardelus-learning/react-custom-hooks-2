import { useState } from "react";

import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
	const { error, isLoading, sendRequest: setTasks } = useHttp();

	const createTask = (text, data) => {
		const generatedId = data.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: text };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		setTasks(
			{
				url: "https://react-http-requests-7b79a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
				method: "POST",
				body: JSON.stringify({ text: taskText }),
				headers: {
					"Content-Type": "application/json",
				},
			},
			createTask.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
