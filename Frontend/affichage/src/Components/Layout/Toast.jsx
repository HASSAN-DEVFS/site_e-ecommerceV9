// Toast.jsx
import { X } from "lucide-react";
import "../Style/Toast.css"; // ← Importe le fichier CSS que tu vas créer

const Toast = ({ message, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="toast-container">
      <div className="toast-content">
        <span>{message}</span>
        <button onClick={onClose} className="toast-close-btn">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
