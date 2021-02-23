import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/matheusleal-code.png" alt="Matheus Leal" />
            <div>
                <strong>Matheus Leal</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level 1
                    </p>
            </div>
        </div>
    )
}