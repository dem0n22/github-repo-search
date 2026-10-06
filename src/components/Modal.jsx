import React from 'react';

import  { FocusOn }  from  'react-focus-on';
import { ModalContext } from '../App';

import styles from "./modal.module.css"

export function Modal({
  children, 
  className,
  onCloseEnd,
}) {
  const {openModal, setOpenModal} = React.useContext(ModalContext);

  return (
    <div 
      className={`
        ${styles.modal_background}
        ${!openModal ? styles.close : ""}
      `}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        if (!openModal) onCloseEnd?.();
      }}
    > 
      <FocusOn
        className={`
          ${styles.modal_wrapper} ${!openModal ? styles.close : ""} ${className || ""}
        `.trim()
      }
        onClickOutside={() => setOpenModal(false)}
        onEscapeKey={() => setOpenModal(false)}
        enabled={openModal}
        returnFocus={true}
        scrollLock={true}
      >
        { children }
      </FocusOn>
    </div>
  )
}