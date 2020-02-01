import React, {useState, useLayoutEffect, useContext} from 'react';
import Context from "../../Context/Context"

import styles from './styles.module.scss';

const ShareModal = () => {
    const context = useContext(Context)
    const {device, cafes} = context.state
    const isModalOpen = context.state.shareModalOpen
    const modalPage = context.state.shareModalPage
    const postId = context.state.shareModalId
    const [copy, setCopy] = useState(false)
    const [currentCafe, setCurrentCafe] = useState(null)

    useLayoutEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden"
            setCurrentCafe(cafes.read().find(el => el.id === postId))
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
        el.value = `${window.location.origin}/${modalPage}/${postId}`
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
                                <a
                                    href={`https://vk.com/share.php?url=${window.location.origin}/${modalPage}/${postId}&title=${currentCafe && currentCafe.title}&image=${currentCafe && currentCafe.photos[0]["640"]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 112.196 112.196"
                                        style={{enableBackground: "new 0 0 112.196 112.196"}}
                                        xmlSpace="preserve"
                                    >
                                        <g>
                                            <g>
                                                <circle id="XMLID_11_" style={{fill: "#4D76A1"}} cx="56.098" cy="56.098" r="56.098"/>
                                            </g>
                                            <path
                                                style={{fillRule:"evenodd", clipRule: "evenodd",fill: "#FFFFFF"}}
                                                d="M53.979,80.702h4.403c0,0,1.33-0.146,2.009-0.878
                                                c0.625-0.672,0.605-1.934,0.605-1.934s-0.086-5.908,2.656-6.778c2.703-0.857,6.174,5.71,9.853,8.235
                                                c2.782,1.911,4.896,1.492,4.896,1.492l9.837-0.137c0,0,5.146-0.317,2.706-4.363c-0.2-0.331-1.421-2.993-7.314-8.463
                                                c-6.168-5.725-5.342-4.799,2.088-14.702c4.525-6.031,6.334-9.713,5.769-11.29c-0.539-1.502-3.867-1.105-3.867-1.105l-11.076,0.069
                                                c0,0-0.821-0.112-1.43,0.252c-0.595,0.357-0.978,1.189-0.978,1.189s-1.753,4.667-4.091,8.636c-4.932,8.375-6.904,8.817-7.71,8.297
                                                c-1.875-1.212-1.407-4.869-1.407-7.467c0-8.116,1.231-11.5-2.397-12.376c-1.204-0.291-2.09-0.483-5.169-0.514
                                                c-3.952-0.041-7.297,0.012-9.191,0.94c-1.26,0.617-2.232,1.992-1.64,2.071c0.732,0.098,2.39,0.447,3.269,1.644
                                                c1.135,1.544,1.095,5.012,1.095,5.012s0.652,9.554-1.523,10.741c-1.493,0.814-3.541-0.848-7.938-8.446
                                                c-2.253-3.892-3.954-8.194-3.954-8.194s-0.328-0.804-0.913-1.234c-0.71-0.521-1.702-0.687-1.702-0.687l-10.525,0.069
                                                c0,0-1.58,0.044-2.16,0.731c-0.516,0.611-0.041,1.875-0.041,1.875s8.24,19.278,17.57,28.993
                                                C44.264,81.287,53.979,80.702,53.979,80.702L53.979,80.702z"
                                            />
                                        </g>
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(`${window.location.origin}/${modalPage}/${postId}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M46 23C46 35.7025 35.7025 46 23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23ZM21.4235 12.2489C22.4877 11.1917 24.0038 10.6567 25.7588 10.6567C27.324 10.6567 29.036 10.7845 29.5102 10.8474C29.6392 10.8645 29.7575 10.9277 29.8433 11.0255C29.9291 11.1232 29.9765 11.2488 29.9767 11.3789V15.4867C29.9767 15.629 29.9201 15.7655 29.8195 15.8661C29.7188 15.9668 29.5823 16.0233 29.44 16.0233H26.22C25.6207 16.0233 25.1467 16.4974 25.1467 17.0967V19.2433H29.44C29.5161 19.2433 29.5914 19.2595 29.6608 19.2909C29.7302 19.3222 29.7921 19.3679 29.8425 19.425C29.8929 19.4821 29.9305 19.5493 29.9529 19.6221C29.9753 19.6948 29.982 19.7715 29.9725 19.8471L29.4358 24.1404C29.4195 24.2701 29.3563 24.3894 29.2583 24.4758C29.1603 24.5623 29.034 24.61 28.9033 24.61H25.1467V34.8067C25.1467 34.949 25.0901 35.0855 24.9895 35.1861C24.8888 35.2868 24.7523 35.3433 24.61 35.3433H20.3167C20.1743 35.3433 20.0378 35.2868 19.9372 35.1861C19.8366 35.0855 19.78 34.949 19.78 34.8067V24.61H16.56C16.4177 24.61 16.2812 24.5534 16.1805 24.4528C16.0799 24.3522 16.0233 24.2157 16.0233 24.0733V19.78C16.0233 19.6377 16.0799 19.5012 16.1805 19.4005C16.2812 19.2999 16.4177 19.2434 16.56 19.2433H19.78V16.7571C19.78 14.8555 20.3594 13.306 21.4235 12.2489Z" fill="#3765A3"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M46 23C46 35.7025 35.7025 46 23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23ZM21.4235 12.2489C22.4877 11.1917 24.0038 10.6567 25.7588 10.6567C27.324 10.6567 29.036 10.7845 29.5102 10.8474C29.6392 10.8645 29.7575 10.9277 29.8433 11.0255C29.9291 11.1232 29.9765 11.2488 29.9767 11.3789V15.4867C29.9767 15.629 29.9201 15.7655 29.8195 15.8661C29.7188 15.9668 29.5823 16.0233 29.44 16.0233H26.22C25.6207 16.0233 25.1467 16.4974 25.1467 17.0967V19.2433H29.44C29.5161 19.2433 29.5914 19.2595 29.6608 19.2909C29.7302 19.3222 29.7921 19.3679 29.8425 19.425C29.8929 19.4821 29.9305 19.5493 29.9529 19.6221C29.9753 19.6948 29.982 19.7715 29.9725 19.8471L29.4358 24.1404C29.4195 24.2701 29.3563 24.3894 29.2583 24.4758C29.1603 24.5623 29.034 24.61 28.9033 24.61H25.1467V34.8067C25.1467 34.949 25.0901 35.0855 24.9895 35.1861C24.8888 35.2868 24.7523 35.3433 24.61 35.3433H20.3167C20.1743 35.3433 20.0378 35.2868 19.9372 35.1861C19.8366 35.0855 19.78 34.949 19.78 34.8067V24.61H16.56C16.4177 24.61 16.2812 24.5534 16.1805 24.4528C16.0799 24.3522 16.0233 24.2157 16.0233 24.0733V19.78C16.0233 19.6377 16.0799 19.5012 16.1805 19.4005C16.2812 19.2999 16.4177 19.2434 16.56 19.2433H19.78V16.7571C19.78 14.8555 20.3594 13.306 21.4235 12.2489Z" fill="#3765A3"/>
                                    </svg>
                                </a>
                            </li>
                            
                            <li onClick={copyToClipboard}>
                                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="23" cy="23" r="23" fill="#467AFF"/>
                                    <path d="M12.9091 23.0002C12.9091 20.8698 14.6408 19.1381 16.7712 19.1381H21.7545V16.771H16.7712C13.3327 16.771 10.542 19.5617 10.542 23.0002C10.542 26.4387 13.3327 29.2293 16.7712 29.2293H21.7545V26.8622H16.7712C14.6408 26.8622 12.9091 25.1305 12.9091 23.0002ZM18.017 24.246H27.9837V21.7543H18.017V24.246ZM29.2295 16.771H24.2462V19.1381H29.2295C31.3599 19.1381 33.0916 20.8698 33.0916 23.0002C33.0916 25.1305 31.3599 26.8622 29.2295 26.8622H24.2462V29.2293H29.2295C32.668 29.2293 35.4587 26.4387 35.4587 23.0002C35.4587 19.5617 32.668 16.771 29.2295 16.771Z" fill="white"/>
                                </svg>
                            </li>
                        </ul>

                        {copy && device !== "mobile" &&
                            <div className={styles.copySuccess}>
                                Ссылка скопирована
                            </div>
                        }
                    </div>

                    {copy && device === "mobile" &&
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
