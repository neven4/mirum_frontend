import React, { useState, useContext } from 'react';
import Context from "../../Context/Context"

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';
import SocialIcons from '../SocialIcons';

import Carousel from "../Carousel"


const PostCard = props => {
	const context = useContext(Context)
	const [isLiked, setIsLiked] = useState(false)
	const { id } = props.match.params

	const postData = context.state.cards.find(el => el.id === id)

	const handleLike = () => {
		setIsLiked(!isLiked)
	}

	return (
		<article className={ styles.postCard }>
			<Carousel images={postData.photos} />

			<section className={ styles.postCardInfo }>
				<p className={ styles.postCardAuthor }>
					Источник: кофе.рф
				</p>

				<div className={ styles.postCardTitle }>
					<h1>
						{postData.title}
					</h1>

					<SocialIcons />
				</div>

				<Metro className={ styles.postCardAdress }
					label={postData.addressName}
					withArrow={true}
					withClick={true}
					coords={postData.addressCoord}
				/>
				
				<Like active={ isLiked }
					className={ styles.postCardLike }
					click={ handleLike }
					numOfLikes={postData.likes}
				/>
		
				<p className={ styles.postCardAbout }>
					{postData.mainText}
				</p>
			</section>
		</article>
	)
}

export default PostCard;
