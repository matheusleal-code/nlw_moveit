import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LoginPage.module.css'

export function LoginPage() {

    const {username, handleChangeUserName, getIn} = useContext(ChallengesContext)
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.containerGrid}>
                    <div className={styles.backgroundLogin}>
                        <img src="background.svg" alt="" />
                    </div>
                    <div className={styles.loginPage}>
                        <img src="login-logo.svg" id={styles.logo} alt="" />
                        <p>Bem-vindo</p>
                        <div className={styles.info}>
                            <img src="icons/github.svg" alt="logo github"/>
                            <p>Faça login com seu Github para começar</p>
                        </div>
                        <div className={styles.inputLogin}>
                            <input type="text" placeholder="Digite seu username" name="username" value={username} onChange={e => handleChangeUserName(e.target.value)}/>
                            <button onClick={() => getIn()}><img src="icons/arrow.svg" alt="Prosseguir"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}