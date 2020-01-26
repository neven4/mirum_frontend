import React, { useContext, useLayoutEffect } from 'react';
import Context from "../../Context/Context"

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';
import ShareBtn from '../ShareBtn';
import Carousel from "../Carousel"


const PostCard = props => {
	const context = useContext(Context)
	const id = props.data ? props.data.id : props.id
	const {isModal} = props

	const postData = props.data
		? props.data
		: context.state.cafes.read().find(el => el.id === id)

	const {
		title,
		addressName,
		likes,
		mainText,
		photos,
		smallText,
		instagramLink,
		metroName
	} = postData

	useLayoutEffect(() => {
		if (context.state.device === "mobile") {
			window.scrollTo(0, 0);
		}
	}, [])

	return (
		<article className={ `${styles.postCard} ${isModal ? styles.modalPostCard : ""} ` }>
			<Carousel
				images={photos}
				authorInside={isModal}
			/>

			<section className={ styles.postCardInfo }>
				<div className={ styles.postCardTitle }>
					<h1>
						{title}
					</h1>

					<ShareBtn
						page={props.data ? "map" : "cafes"}
						id={id}
					/>
				</div>

				<Metro className={ styles.postCardAdress }
					label={addressName}
					metro={metroName}
					withArrow={props.disableAddress ? false : true}
					withClick={props.disableAddress ? false : true}
					id={id}
				/>
				
				<div className={ styles.postCardLikeContainer }>
					<Like
						className={ styles.postCardLike }
						numOfLikes={likes}
						id={id}
					/>

					<a
						className={ styles.postCardInstagramLink }
						href={instagramLink ? instagramLink : ""}
						target="_blank"
						rel="noopener noreferrer"
					>
						Instagram
					</a>
				</div>
				
		
				<p className={ styles.postCardAbout }>
					{smallText}
				</p>
				<p className={ styles.postCardAbout }>
					{mainText}
				</p>
			</section>
		</article>
	)
}

export default React.memo(PostCard);
