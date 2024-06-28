'use client'

import { useState, ReactNode } from 'react';
import style from '../styles/modal.module.css';

interface MyModalProps {
  children: ReactNode;
  buttonText: string;
}

export default function Modal({ children, buttonText }: MyModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
    
  };

  return (
    <div>
      <button className="btn text-white blue-button" onClick={openModal}>{buttonText}</button>
      {isOpen && (
        <div className={style.overlay}>
          <dialog open className={style.modal}>
            <div className="modal-box">
                <div className='x-button'>
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                </div>
                <div className='form-container'>
                  {children}
                </div>
                <button className="btn white-button" type="button" onClick={closeModal}>Цуцлах</button>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
}
