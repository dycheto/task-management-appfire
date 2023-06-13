import './Main.css';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { useAuth } from '../../hooks/useAuth';
import { CSVLink } from 'react-csv';
import OrganizeWithSmile from '../../components/OrganizeWithSmile';
import Task from '../../components/Task';
import Modal from '../../components/Modal';
import Button from '../../components/reusable/Button';
import * as taskServices from '../../services/taskServices';
import * as sortTasksService from '../../services/sortServices';
import * as formatServices from '../../services/formatDataForExportService';
import ConfirmDialog from '../../components/reusable/ConfirmDialog';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { isLoggedIn } from '../../hok/isLoggedIn';

const Main = ({props}) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [TaskIdToDelete, setTaskIdToDelete] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', category: 'Daily task', id: '' });
    const [tasks, setTasks] = useState([]);
    const [category, setCategory] = useState('');
    const [dataForExport, setDataForExport] = useState([]);
    const { userData } = useAuth() || {};


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userTasks", userData.uid), (doc) => {
            if (doc.data() === undefined) {
                return
            }
            const sortedTasks = sortTasksService.sortByTimeCreated(doc.data());

            if (!category || category === "Show all") {
                setTasks(sortedTasks);
                return;
            }

            const sortedByCategory = sortTasksService.sortByCategory(sortedTasks, category);
            setTasks(sortedByCategory);
        });

        return () => {
            unsub();
        }

    }, [category, userData.uid]);


    const handleEditClick = (task) => {
        setNewTask(task);
        setEditMode(true);
        setShowModal(true);
    };

    const handleAddTask = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewTask({ title: '', description: '', category: 'Daily task', id: '' });
        setEditMode(false);
    };

    const handleModalSubmit = () => {
        if (newTask.description === '' || newTask.title === '') {
            alert(`All fields are required!`);
            return;
        }

        if (editMode) {
            taskServices.updateTask(newTask, userData)

            setEditMode(false);
        } else {
            taskServices.addTask(newTask, userData).then(() => {
            })
        }
        handleModalClose();
    };


    function handleCategoryFilter(category) {
        setCategory(category)
    };


    const handleConfirm = () => {
        taskServices.deleteTask(userData, TaskIdToDelete)
        setShowConfirmDialog(false);
    };

    const handleCancel = () => {
        setShowConfirmDialog(false);
    };

    const handleExportTasks = () => {
        if (tasks.length === 0) {
            alert("There are no tasks to export!");
            return;
        }
        const data = formatServices.formatData(tasks);
        setDataForExport(data);
    }

    return (
        <div className="container" data-testid="main-container">
            <div className="side-bar" data-testid="side-container">

                <Button
                    className="add-task category-button"
                    title="Add new task"
                    handleClick={handleAddTask}
                />

                <Button
                    className="category-button"
                    title="Show all"
                    handleClick={() => handleCategoryFilter('Show all')}
                />
                <Button
                    className="category-button"
                    title="Daily tasks"
                    handleClick={() => handleCategoryFilter('Daily task')}
                />
                <Button
                    className="category-button"
                    title="Weekly tasks"
                    handleClick={() => handleCategoryFilter('Weekly task')}
                />
                {tasks.length > 0 &&
                    <div className="export-button">
                        <button className='category-button' onClick={handleExportTasks}>
                            <CSVLink data={dataForExport}>Download current tasks</CSVLink>
                        </button>
                    </div>}
            </div>
            <div className="content">
                {tasks.length > 0
                    ? tasks.map((task) => (
                        <Task
                            key={v4()}
                            task={task[1]}
                            onEditClick={handleEditClick}
                            setShowConfirmDialog={setShowConfirmDialog}
                            setTaskIdToDelete={setTaskIdToDelete}
                        />
                    ))
                    : <OrganizeWithSmile />}
                <Modal
                    showModal={showModal}
                    editMode={editMode}
                    setNewTask={setNewTask}
                    handleModalClose={handleModalClose}
                    handleModalSubmit={handleModalSubmit}
                    newTask={newTask}
                />
                {showConfirmDialog && (
                    <ConfirmDialog
                        message="Are you sure you want to delete this task?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

export default isLoggedIn(Main);
export { Main as PureMain }