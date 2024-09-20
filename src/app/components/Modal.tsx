"use client";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  modalAction: () => void;
  modalActionText: string;
  onClose: () => void;
  modalTitle: string;
}

const ModalDefault: React.FC<ModalProps> = ({ children, onClose, modalAction, modalActionText, modalTitle }) => {
  return (
    <div className="modal default" onClick={onClose}>
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3 className="modal-title">{modalTitle}</h3>
          {children}
          <div className="modal-footer">
            <button title="Cancelar" className="modal-cancel-button" onClick={onClose}>Cancelar</button>
            <button title={modalActionText} className="modal-button default" onClick={modalAction}>{modalActionText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalDanger: React.FC<ModalProps> = ({ children, onClose, modalAction, modalActionText, modalTitle }) => {
  return (
    <div className="modal danger" onClick={onClose}>
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3 className="modal-title">{modalTitle}</h3>
          {children}
          <div className="modal-footer">
            <button title="Cancelar" className="modal-cancel-button" onClick={onClose}>Cancelar</button>
            <button title={modalActionText} className="modal-button danger" onClick={modalAction}>{modalActionText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ModalDefault, ModalDanger };
