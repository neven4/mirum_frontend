import React from "react"

import styles from './styles.module.scss';

const Spiner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.loader} />
        </div>
    )
}

export default Spiner