'use client'

import React from 'react';
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMusic, faUserGroup, faUserCheck, faListCheck, faTrashCan, faUserPlus, faChartPie } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/sideMenu.module.css';


const SideMenu = ({ session }: { session: any }) => {


    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarContainer}>
                <br></br>
                <nav>Чөлөөт уран бүтээлч, бүтээлийн бүртгэлийн программ</nav>
                <br></br>
                <hr style={{ width: '70%', height: '1.5px', backgroundColor: 'black', margin: '0 auto' }} />
                <ul className='menu '>
                    <li>
                        <Link href="/pages/dashboard">
                            <FontAwesomeIcon icon={faChartPie} className={styles.icon} />
                            <span>Тайлан мэдээ</span>
                        </Link>
                    </li>
                    {session?.type !== 'buteelch' && (
                        <li>
                            <Link href="/pages/buteelchSan">
                                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                                <span>Уран бүтээлч</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link href="/pages/buteelSan">
                            <FontAwesomeIcon icon={faMusic} className={styles.icon} />
                            <span>Уран бүтээл</span>
                        </Link>
                    </li>
                    {session?.type === 'ajiltan' && (
                        <>
                            <li>
                                <Link href="/pages/holbooSan">
                                    <FontAwesomeIcon icon={faUserGroup} className={styles.icon} />
                                    <span>Уран бүтээлчдийн холбоо</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/huseltSan">
                                    <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
                                    <span>Бүртгэлийн хүсэлт</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/ustgahHuselt">
                                    <FontAwesomeIcon icon={faTrashCan} className={styles.icon} />
                                    <span>Бүртгэл устгуулах хүсэлт</span>
                                </Link>
                            </li>
                        </>
                    )}
                    {session?.type === 'admin' && (
                        <>
                            <li>
                                <Link href="/pages/holbooSan">
                                    <FontAwesomeIcon icon={faUserGroup} className={styles.icon} />
                                    <span>Уран бүтээлчдийн холбоо</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/huseltSan">
                                    <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
                                    <span>Бүртгэлийн хүсэлт</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/ustgahHuselt">
                                    <FontAwesomeIcon icon={faTrashCan} className={styles.icon} />
                                    <span>Бүртгэл устгуулах хүсэлт</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/ajiltanSan">
                                    <FontAwesomeIcon icon={faUserCheck} className={styles.icon} />
                                    <span>Бүртгэлийн ажилтан</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/angilalSan">
                                    <FontAwesomeIcon icon={faListCheck} className={styles.icon} />
                                    <span>Урлагийн салбар ба чиглэл</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SideMenu;