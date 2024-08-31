import {useEffect, useMemo, useRef, useState} from "react";
import {FaCheck, FaPlus, FaTrashCan,FaXmark} from "react-icons/fa6";

const getStorage = key => JSON.parse(localStorage.getItem(key));
const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const App = () => {
    const [tasks, setTasks] = useState(getStorage('tasks') ?? []);
    const [category, setCategory] = useState(getStorage('category') ?? 'All');
    useEffect(() => setStorage('tasks', tasks), [tasks]);
    useEffect(() => setStorage('category', category), [category]);

    const taskRef = useRef('');
    const tasksMemo = useMemo(() => tasks.filter(({complete}) => category === 'All' || complete === (category === 'Completed')),[tasks,category]);

    const addTask = () => {
        const task = taskRef.current.value;
        setTasks(prevTasks => [...prevTasks, {task, complete : false}]);
        taskRef.current.value = '';
    }
    const toggleTask = id => setTasks(prevTasks => prevTasks.map((task,i) => i === id ? {...task , complete : !task.complete} : task));
    const deleteTask = id => setTasks(prevTasks => prevTasks.filter((_,i) => id !== i));

    return (
        <div className="App h-screen">
            <div
                className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-white from-10% via-blue-500 to-gray-900"></div>
            <div className="relative px-52 pt-28 pb-14">
                <div className="text-6xl font-extrabold mb-10">Task List</div>
                <div className="flex gap-6 mb-5">
                    {['All', 'Incomplete', 'Completed'].map(text =>
                        <div
                            className={`cursor-pointer leading-tight ${category === text ? 'border-b-2 border-black' : 'text-gray-500'}`}
                            onClick={() => setCategory(text)}
                            key={text}>{text}</div>)}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {tasksMemo.map(({task , complete}, i) => <div
                        className="bg-white aspect-video rounded-xl py-7 px-8 shadow-lg flex flex-col justify-between"
                        key={i}>
                        <div>
                            <div className={`mb-2 ${complete ? 'text-blue-400' : 'text-gray-500 '}`}>{complete ? 'Completed' : 'Incomplete'}</div>
                            <div className={`font-medium text-4xl ${complete ? 'line-through' : ''}`}>
                                {task}
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end [&>*]:cursor-pointer">
                            <div
                                className={`size-12 text-lg border flex items-center justify-center rounded-full ${complete ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                                onClick={() => toggleTask(i)}
                            >
                                {complete ? <FaXmark/> : <FaCheck/>}
                            </div>
                            <div
                                className="size-12 text-lg border border-gray-300 flex items-center justify-center rounded-full hover:bg-gray-200"
                                onClick={() => deleteTask(i)}
                            >
                                <FaTrashCan/>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            <label
                className="fixed w-2/6 h-14 left-1/2 bottom-7 -translate-x-1/2 overflow-hidden flex items-center justify-end shadow-2xl shadow-blue-950 bg-white rounded-full">
                <input type="checkbox" hidden="hidden"/>
                <div className="px-8 w-full">
                    <input type="text"
                           className="focus-visible:outline-none w-full text-lg"
                           placeholder="Please enter task..." ref={taskRef}
                           onKeyDown={(e) => {if(e.key === 'Enter') addTask()}}/>
                </div>
                <div className="min-w-14 h-full p-1.5">
                    <div
                        className="h-full rounded-full flex justify-center bg-blue-500 items-center cursor-pointer text-white hover:bg-blue-600 transition">
                        <FaPlus className=" text-xl" onClick={addTask}></FaPlus>
                    </div>
                </div>
            </label>
        </div>);
}

export default App;
