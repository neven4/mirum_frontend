import React, {useContext, useRef, useLayoutEffect} from 'react';
import Context, {IContext} from '../../Context/Context';
import {Data} from "../Main"

import styles from './styles.module.scss';
import ShareBtn from '../ShareBtn';
import Like from '../Like';

interface Props {
    data: Data,
    touchStart: (e: React.TouchEvent<HTMLDivElement>) => void,
    touchMove: (e: React.TouchEvent<HTMLDivElement>) => void,
    touchEnd: (e: React.TouchEvent<HTMLDivElement>) => void,
    onFullModalClick: () => void,
    getInfoHeight: (heigth: number) => void
}

const ModalSmallInfo: React.FC<Props> = ({
    data,
    touchStart,
    touchMove,
    touchEnd,
    onFullModalClick,
    getInfoHeight
}) => {
    const smallModalRef = useRef<HTMLDivElement>(null);
    const context = useContext<IContext>(Context)
    const { title, smallText, photos, id, likes, instagramLink } = data
    const { device } = context.state

    useLayoutEffect(() => {
        const height = device === "mobile" && smallModalRef.current
            ? +smallModalRef.current.offsetHeight + 35
            : 216

        getInfoHeight(height)
    }, [])

    const fullModalClick = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        if (device !== "mobile") {
            onFullModalClick()
        }
    }

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
                    onClick={fullModalClick}
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
                    <h2 onClick={fullModalClick}>{title}</h2>
                        
                    <p
                        className={styles.smallModal_about}
                        onClick={fullModalClick}
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
