import React from 'react';
import PostCard from '../PostCard';
import {Data} from "../Main"

import styles from './styles.module.scss';

interface Props {
	data: Data,
	onSmallClick: () => void
}

const MapModal: React.FC<Props> = ({ data, onSmallClick }) => {
	return (
		<div className={styles.mapFullModalWindow}>
			<div
				className={styles.mapFullModalLessBtn}
				onClick={onSmallClick}
			>
				<svg width="8" height="20" viewBox="0 0 8 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7 19L1 10L7 1" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</div>
			<div className={styles.mapFullModalBody}>
				<PostCard
					data={data}
					disableAddress={true}
				/>
			</div>
		</div>
	)
}

export default React.memo(MapModal);
