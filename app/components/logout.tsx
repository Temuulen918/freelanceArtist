import { logout } from '@/src/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/topMenu.module.css'; // Import CSS module

const Logout = () => {
  return (
    <form action={logout}>
      <button><FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.icon}/></button>
    </form>
  )
}

export default Logout