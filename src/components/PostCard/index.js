import React, { useContext } from 'react';
import Context from "../../Context/Context"

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';
import SocialIcons from '../SocialIcons';
import Carousel from "../Carousel"


const PostCard = props => {
	const context = useContext(Context)
	const id = props.data ? props.data.id : props.match.params.id

	const postData = props.data
		? props.data
		: context.state.cafes.read().find(el => el.id === id)

	const {
		title,
		addressName,
		addressCoord,
		likes,
		mainText,
		photos
	} = postData

	return (
		<article className={ styles.postCard }>
			<Carousel images={photos} />

			<section className={ styles.postCardInfo }>
				<div className={ styles.postCardTitle }>
					<h1>
						{title}
					</h1>

					<SocialIcons />
				</div>

				<Metro className={ styles.postCardAdress }
					label={addressName}
					withArrow={true}
					withClick={true}
					coords={addressCoord}
				/>
				
				<Like
					className={ styles.postCardLike }
					numOfLikes={likes}
					id={id}
				/>
		
				<p className={ styles.postCardAbout }>
					{mainText}
				</p>
			</section>
		</article>
	)
}

export default React.memo(PostCard);
