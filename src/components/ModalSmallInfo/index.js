import React from 'react';

import styles from './styles.module.scss';
import SocialIcons from '../SocialIcons';
import Like from '../Like';

const ModalSmallInfo = () => {
    return (
        <div className={styles.smallModal}>
            <div className={styles.smallModal_body}>
                <div className={styles.smallModal_img}>
                    <div style={{
                        backgroundImage: `url(https://www.restoclub.ru/uploads/place_thumbnail_big/9/d/2/f/9d2f609989510aec8db5af81b1a8b34e.jpg)`
                        }}
                    />

                    <p className={styles.smallModal_author}>
                        Источник: кофе.рф
                    </p>
                </div>
                <div className={styles.smallModal_info}>
                    <h2>Coffee 3</h2>
                        
                    <p className={styles.smallModal_about}> 
                        Большая двухэтажная кофейня с панорамными окнами на пятом этаже Ленполиграфмаша, кофейным производством, миллионом розеток и большим выбором еды.
                    </p>
                </div>
            </div>

            <div className={styles.smallModal_footer}>
                <Like numOfLikes="20000" />

                <a href="google.com">
                    Instagram
                </a>

                <SocialIcons />
            </div>
        </div>
    )
}

export default ModalSmallInfo;
