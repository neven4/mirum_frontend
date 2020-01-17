import React, {useContext} from 'react';
import Context from "../../Context/Context"

import styles from './styles.module.scss';

const ShareBtn = ({className, id, page}) => {
    const context = useContext(Context)
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
