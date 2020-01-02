import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
// import Context from "../../Context/Context"

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';

const MainCard = ({ data }) => {
	return (
		<section className={ styles.mainCard }>
			<Link
				to={`/post/${data.id}`}
				className={ styles.cardImage }
			>
				<div
					className={ styles.cardImage_container }
					style={{backgroundImage: `url(${data.photos[0]["640"]})` }}
				/>
			</Link>

			<div className={ styles.mainCard_footer }>
				<Like
					numOfLikes={data.likes}
					id={data.id}
				/>

				<Metro label={data.metroName} />
			</div>
		</section>
	);
}

export default React.memo(MainCard);
