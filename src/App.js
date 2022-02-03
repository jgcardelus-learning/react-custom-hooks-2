import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
	const [tasks, setTasks] = useState([]);

	const { error, isLoading, sendRequest: fetchTasks } = useHttp();

	useEffect(() => {
		const transformTasks = (tasksObject) => {
			const loadedTasks = [];

			for (const taskKey in tasksObject) {
				loadedTasks.push({
					id: taskKey,
					text: tasksObject[taskKey].text,
				});
			}

			setTasks(loadedTasks);
		};

		fetchTasks(
			{
				url: "https://react-http-requests-7b79a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
			},
			transformTasks
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
