import React, {useContext} from 'react';
import Context, {IContext} from "../../Context/Context"

import styles from './styles.module.scss';

interface Props {
    className?: string,
    id?: string,
    page: string
}

const ShareBtn: React.FC<Props> = ({className, id, page}) => {
    const context = useContext<IContext>(Context)
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
