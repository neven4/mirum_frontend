import React, {useState, useLayoutEffect, useContext} from 'react';
import Context from "../../Context/Context"

import styles from './styles.module.scss';

import Vk from "../../images/vk.svg"
import Fb from "../../images/fb.svg"
import Inst from "../../images/inst.svg"
import Link from "../../images/link.svg"

const ShareModal = () => {
    const context = useContext(Context)
    const isModalOpen = context.state.shareModalOpen
    const modalPage = context.state.shareModalPage
    const postId = context.state.shareModalId
    // const [isModalOpen, onModalClose] = useState(false)
    const [copy, setCopy] = useState(false)

    useLayoutEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [isModalOpen])

    const onModalClose = () => {
        context.update({
            shareModalOpen: false,
            shareModalPage: null,
            shareModalId: null
        })
    }

    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = `https://instagram.com`
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        setCopy(true)
        setTimeout(() => setCopy(false), 3000)
    }

    return (
        <>
            {isModalOpen &&
                <section className={styles.modalBackground}
                    onClick={onModalClose}
                >
                    <div className={styles.linksModal}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className={styles.closeBtn}
                            onClick={onModalClose}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 1L1 15M1 1L15 15" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        <h4>Поделиться местом</h4>

                        <ul className={styles.icons}>
                            <li>
                                <Vk />
                            </li>

                            <li>
                                <Fb />
                            </li>

                            <li>
                                <Inst />
                            </li>
                            
                            <li onClick={copyToClipboard}>
                                <Link />
                            </li>
                        </ul>
                    </div>

                    {copy &&
                        <div className={styles.copySuccess}>
                            Ссылка скопирована
                        </div>
                    }
                </section>
            }
        </>
    )
}

export default React.memo(ShareModal);
