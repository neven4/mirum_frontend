import React from 'react';

import styles from './styles.module.scss';
import SocialIcons from '../SocialIcons';
import Like from '../Like';

const ModalSmallInfo = ({ data, touchStart, touchMove, touchEnd }) => {
    const { title, smallText, photos, id, likes, instagramLink } = data
    return (
        <div className={styles.smallModal}>
            <div
                className={styles.smallModal_body}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEnd={touchEnd}
            >
                <div className={styles.smallModal_img}>
                    <div style={{
                            backgroundImage: `url(${photos[0]["640"]})`
                        }}
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
                </div>
            </div>

            <div className={styles.smallModal_footer}>
                <Like
                    numOfLikes={likes}
                    id={id}
                />

                <a href={instagramLink ? instagramLink : ""}>
                    Instagram
                </a>

                <SocialIcons />
            </div>
        </div>
    )
}

export default ModalSmallInfo;
