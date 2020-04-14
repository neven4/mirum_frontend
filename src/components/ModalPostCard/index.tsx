import React, { useContext } from 'react';
import Context, {IContext} from "../../Context/Context"
import {Data} from "../Main"

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';
import ShareBtn from '../ShareBtn';
import Carousel from "../Carousel"

interface Props {
	data?: Data,
	id: string,
	disableAddress: boolean,
}

const PostCard: React.FC<Props> = (props) => {
	const context = useContext<IContext>(Context)
	const id: string = props.data ? props.data.id : props.id

	const postData: Data = props.data
		? props.data
		: context.state.cafes.read().find((el: Data) => el.id === id)

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

	return (
		<article className={ styles.postCard }>
			<Carousel images={photos} />

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

				<Metro
					className={ styles.postCardAdress }
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
