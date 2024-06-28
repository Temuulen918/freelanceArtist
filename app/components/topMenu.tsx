import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/topMenu.module.css'; // Import CSS module
import Link from "next/link" 
import Logout from './logout';
import { getSession } from '@/src/actions';

const TopMenu = async () => {

    const session = await getSession()

    return (
        <header className={styles.topMenu}>
            <div className={styles.iconsContainer}>
                <Link href="/pages/profile">
                    <FontAwesomeIcon icon={faUserCircle} className={styles.icon} />
                </Link>
                <Link href="/"></Link>
                {session.isLoggedIn && <Logout/>}
            </div>
        </header>
    );
};

export default TopMenu;
