export default function Modal({
    showModal,
    editMode,
    setNewTask,
    handleModalClose,
    handleModalSubmit,
    newTask
}) {


    return (
        <>
            {showModal && (
                <div className="modal" data-testid="modal-container">
                    <div className="modal-content">
                        <h2>{editMode ? 'Edit Task' : 'Add Task'}</h2>
                        <label>Title</label>
                        <input
                            type="text"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <label>Description</label>
                        <textarea
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            className="description-field"
                            maxLength={300}
                        ></textarea>
                        <label>Category</label>
                        <select
                            value={newTask.category}
                            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                        >
                            <option value="Daily task">Daily task</option>
                            <option value="Weekly task">Weekly task</option>
                        </select>
                        <div className="modal-buttons">
                            <button className="modal-button" onClick={handleModalClose} data-testid="modal-cancel-btn">
                                Cancel
                            </button>
                            <button className="modal-button" onClick={handleModalSubmit} data-testid="modal-save-btn">
                                {editMode ? 'Save' : 'Add Task'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};