import { useAuth } from '../hooks/useAuth';
import { BsFillPinAngleFill } from 'react-icons/bs'

export default function Task({
    task,
    onEditClick,
    setShowConfirmDialog,
    setTaskIdToDelete
}) {
    const { userData } = useAuth() || {};
    const { title, description, taskId, timestamp, category } = task;
    const date = new Date(timestamp.seconds * 1000);

    let taskClass = ``;
    let pinClass = ``;

    if (category === 'Daily task') {
        pinClass = 'daily-pin';
        taskClass = `daily-task`;
    } else if (category === 'Weekly task') {
        pinClass = 'weekly-pin';
        taskClass = `weekly-task`;
    }

    const onDeleteClick = () => {
        setShowConfirmDialog(true);
        setTaskIdToDelete(taskId);
    }

    return (
        <div className={`task ${taskClass}`} data-testid="task-container">
            <div className="task-note">
                <BsFillPinAngleFill size={50} className={`pin ${pinClass}`}/>
                <div className="note-content">
                    <h2 className="task-title">{title}</h2>
                    <p className="task-description">{description}</p>

                </div>
                <div className="task-footer">
                    <time className="task-time-created">{date.toLocaleString()} </time>
                    <div className="task-buttons">
                        <button className="edit-task" onClick={() => onEditClick(task)}>
                            Edit
                        </button>
                        <button className="delete-task" onClick={onDeleteClick}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};