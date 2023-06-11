import './Main.css';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Task from '../../components/Task';
import Modal from '../../components/Modal';
import Header from '../../components/Header';
import Button from '../../components/reusable/Button';
import * as taskServices from '../../services/taskServices';
import * as sortTasksService from '../../services/sortServices';

export default function Main() {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', category: '', id: '' });
    const [tasks, setTasks] = useState([]);

    const { userData } = useAuth();

    useEffect(() => {
        taskServices.getAll(userData).then(tasks => {
            if (!tasks) {
                return;
            }
            const sortedTasks = sortTasksService.sortByTimeCreated(tasks);
            setTasks(sortedTasks);
        })
    }, [])

    const handleClick = () => {
        navigate('/logout');
    };

    const handleEditClick = (task) => {
        setNewTask(task);
        console.log(task.taskId);
        setEditMode(true);
        setShowModal(true);
    };


    const handleAddTask = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewTask({ title: '', description: '', category: '', id: '' });
        setEditMode(false);
    };

    const handleModalSubmit = () => {
        if (editMode) {
            taskServices.updateTask(newTask, userData).then(() => {
                window.location.reload(false);
            })

            setEditMode(false);
        } else {
            taskServices.addTask(newTask, userData).then(() => {
                window.location.reload(false);
            })
        }
        handleModalClose();
    };


    const handleCategoryFilter = (category) => {
        // Logic to filter tasks based on category
        // You can implement this based on your requirements
    };

    return (
        <>
            <Header handleClick={handleClick} />
            <div className="container">
                <div className="side-bar">

                    <Button
                        className="add-task"
                        title="Add new task"
                        handleClick={handleAddTask}
                    />
                    <div className="category-buttons">
                        <Button
                            className="category-button"
                            title="Daily tasks"
                            handleClick={() => handleCategoryFilter('Daily tasks')}
                        />
                        <Button
                            className="category-button"
                            title="Weekly tasks"
                            handleClick={() => handleCategoryFilter('Weekly tasks')}
                        />
                        <Button
                            className="category-button"
                            title="Show all"
                            handleClick={() => handleCategoryFilter('')}
                        />
                    </div>
                </div>
                <div className="content">
                    {tasks && tasks.map((task) => (
                        <Task
                            key={v4()}
                            task={task[1]}
                            onEditClick={handleEditClick}
                        />
                    ))}
                </div>
            </div>
            <Modal
                showModal={showModal}
                editMode={editMode}
                setNewTask={setNewTask}
                handleModalClose={handleModalClose}
                handleModalSubmit={handleModalSubmit}
                newTask={newTask}
            />
        </>
    );
}
