import './AlertModal.css';

export default function AlertModal({ isOpen, title, onClose }) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="alert-modal-overlay">
            <div className="alert-modal">
                <h2 className="alert-modal-title">{title}</h2>
                <button className="alert-modal-close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};