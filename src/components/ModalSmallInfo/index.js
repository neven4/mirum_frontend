import React, {useContext, useRef, useLayoutEffect} from 'react';
import Context from '../../Context/Context';

import styles from './styles.module.scss';
import ShareBtn from '../ShareBtn';
import Like from '../Like';

const ModalSmallInfo = ({ data, touchStart, touchMove, touchEnd, onFullModalClick, getInfoHeight }) => {
    const smallModalRef = useRef(null);
    const context = useContext(Context)
    const { title, smallText, photos, id, likes, instagramLink } = data
    const { device } = context.state

    useLayoutEffect(() => {
        const height = device === "mobile" ? +smallModalRef.current.offsetHeight + 35 : 216

        getInfoHeight(height)
    }, [])

    return (
        <div
            className={styles.smallModal}
            ref={smallModalRef}
        >
            <div
                className={styles.smallModal_body}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEnd={touchEnd}
            >
                <div
                    className={styles.smallModal_img}
                    onClick={device !== "mobile" ? onFullModalClick : null}
                >
                    <img
                        alt={`Main Cafe img. author: ${photos[0].author}`}
                        decoding="auto"
                        src={photos[0]["640"]}
                        style={{objectFit: "cover"}}
                        
                    />

                    <p className={styles.smallModal_author}>
                        {photos[0].author}
                    </p>
                </div>
                <div className={styles.smallModal_info}>
                    <h2 onClick={device !== "mobile" ? onFullModalClick : null}>{title}</h2>
                        
                    <p
                        className={styles.smallModal_about}
                        onClick={device !== "mobile" ? onFullModalClick : null}
                    > 
                        {smallText}
                    </p>

                    {device !== "mobile" &&
                        <div className={styles.smallModal_footer}>
                            <Like
                                className={styles.smallModal_like}
                                numOfLikes={likes}
                                id={id}
                            />

                            <a href={instagramLink ? instagramLink : ""}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram
                            </a>

                            <ShareBtn
                                page="map"
                                id={id}
                            />
                        </div>
                    }
                </div>
            </div>

            {device === "mobile" &&
                <div className={styles.smallModal_footer}>
                    <Like
                        className={styles.smallModal_like}
                        numOfLikes={likes}
                        id={id}
                    />

                    <a href={instagramLink ? instagramLink : ""}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Instagram
                    </a>

                    <ShareBtn
                        page="map"
                        id={id}
                    />
                </div>
            }
        </div>
    )
}

export default React.memo(ModalSmallInfo);
