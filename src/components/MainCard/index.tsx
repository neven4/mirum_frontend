import React, { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Data} from "../Main"

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';

interface Props {
	data: Data
}

const MainCard: React.FC<Props> = ({ data }) => {
	const targetRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);

	useLayoutEffect(() => {
		if (targetRef.current) {
			setWidth(targetRef.current.offsetWidth);
		}
	}, []);

	return (
		<section className={ styles.mainCard }>
			<Link
				to={`/cafes/${data.id}`}
				className={ styles.cardImage }
			>
				<div
					ref={targetRef}
					className={ styles.cardImage_container }
				>
					<img
						alt={`Cafe img num 0. author: ${data.photos[0].author}`}
						decoding="auto"
						sizes={`${width}px`}
						srcSet={`${data.photos[0]["640"]} 640w, ${data.photos[0]["750"]} 750w, ${data.photos[0]["1080"]} 1080w`}
						src={data.photos[0].source}
						style={{objectFit: "cover"}}
					/>
				</div>
			</Link>

			<div className={ styles.mainCard_footer }>
				<Like
					numOfLikes={data.likes}
					id={data.id}
				/>

				<Metro
					metro={data.metroName}
					label={data.metroName}
					fitSmall={width < 170}
				/>
			</div>
		</section>
	);
}

export default React.memo(MainCard);
