import { useAuth } from '../hooks/useAuth';
import * as taskServices from '../services/taskServices';

export default function Task({
    task,
    onEditClick
}) {

    const { userData } = useAuth();
    const { title, description, taskId, timestamp } = task;
    const date = new Date(timestamp.seconds * 1000);


    const onDeleteClick = () => {
        taskServices.deleteTask(userData, taskId).then(() => {
            window.location.reload(false);
        })
    }

    return (
        <>
            <div className="task">
                <h2 className="task-title">{title}</h2>
                <p className="task-description">{description}</p>
                <div className="task-footer">
                    <time className="task-time-created">{date.toLocaleString()} </time>
                    <div className="task-buttons">
                        <button className="edit-task" onClick={() => onEditClick(task)}>
                            Edit
                        </button>
                        <button className="delete-task" onClick={onDeleteClick}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};