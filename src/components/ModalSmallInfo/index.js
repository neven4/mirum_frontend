import React, {useContext} from 'react';
import Context from '../../Context/Context';

import styles from './styles.module.scss';
import ShareBtn from '../ShareBtn';
import Like from '../Like';

const ModalSmallInfo = ({ data, touchStart, touchMove, touchEnd }) => {
    const context = useContext(Context)
    const { title, smallText, photos, id, likes, instagramLink } = data
    const { device } = context.state

    return (
        <div className={styles.smallModal}>
            <div
                className={styles.smallModal_body}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEnd={touchEnd}
            >
                <div className={styles.smallModal_img}>
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
                    <h2>{title}</h2>
                        
                    <p className={styles.smallModal_about}> 
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
