import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';

const MainCard = ({data}) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <section className={ styles.mainCard }>
      <Link to={`/post/${data.id}`}
        className={ styles.cardImage }
      >
        <div className={ styles.cardImage_container }
          style={{backgroundImage: `url(${data.photos[0]["1080"]})` }}/>
      </Link>

      <div className={ styles.mainCard_footer }>
        <Like active={ isLiked }
          click={ handleLike }
          numOfLikes={data.likes}
        />

        <Metro label={data.metroName} />
      </div>
    </section>
  );
}

export default MainCard;
