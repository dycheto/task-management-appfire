export default function ConfirmDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <p>{message}</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
}
