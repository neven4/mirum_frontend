import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';

const MainCard = () => {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <section className={ styles.mainCard }>
      <Link to='/post'
        className={ styles.cardImage }
      >
        <div className={ styles.cardImage_container }
          style={{backgroundImage: 'url(https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/032/medium/oapgW_Fp_400x400.jpg)' }}/>
      </Link>

      <div className={ styles.mainCard_footer }>
        <Like active={ isLiked }
          click={ handleLike }
          numOfLikes='244'
        />

        <Metro label='Петроградская' />
      </div>
    </section>
  );
}

export default MainCard;
