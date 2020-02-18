import React, {useContext} from 'react';
import {ShareModalContext} from "../../Context/AppProvider"

import styles from './styles.module.scss';

const ShareBtn = ({className, id, page}) => {
    const context = useContext(ShareModalContext)
    const openModal = () => {
        context.update({
            shareModalOpen: true,
            shareModalPage: page,
            shareModalId: id
        })
    }

    return (
        <button
            className={`${styles.shareBtn} ${className}`}
            onClick={openModal}
        >
            <span>
                Поделиться
            </span>
        </button>
    )
}

export default React.memo(ShareBtn);
