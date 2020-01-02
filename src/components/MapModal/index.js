import React, {useState, useEffect} from 'react';

import styles from './styles.module.scss';

import SmallInfo from '../ModalSmallInfo';
import PostCard from '../PostCard';

const MapModal = ({ type, height, data, onClose }) => {
	const [modalType, setModalType] = useState("")
	const [getMoveStarted, setMoveStarted] = useState(false)
	let startY = null

	useEffect(() => {
		setModalType(type)
	}, [type])

	const handleTouchStart = e => {
		startY = e.nativeEvent.touches[0].clientY
	};

	const handleTouchMove = e => {
		const delta = startY - e.nativeEvent.touches[0].clientY

		if (!getMoveStarted) {
			handleMovement(delta)
		}
	};

	const handleTouchEnd = () => {
		setMoveStarted(false)
		startY = 0;
	}

	const handleMovement = delta => {
		setMoveStarted(true)

		if (delta > 0 && modalType === "small") {
			setModalType("full")
		} else if (delta < 0 && modalType === "full") {
			setModalType("small")
		}
	}

	const onCloseModal = () => {
		onClose()
		setModalType("")
	}

	return (
		<div className={styles.mapModalWindow}
			style={{
				bottom: `-${height}px`,
				height: `${height}px`,
				transform: modalType === "small"
					? `translateY(-216px)`
					: modalType === "full"
						? `translateY(-${height}px)`
						: `translateY(0)`
			}}
		>
			<div className={styles.mapModalHeader}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<div className={styles.mapModalHeader_arrow}
					onClick={() => {
						modalType === "full"
						? setModalType("small")
						: setModalType("full")
					}}
				>
					<svg transform={modalType === "full" ? `rotate(180)` : `rotate(0)`}
						width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 7L10 1L19 7" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</div>
			</div>

			<div className={styles.mapModalHeader_close}
				onClick={ onCloseModal }
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15 1L1 15M1 1L15 15" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</div>

			<div className={styles.mapModalBody}
				style={{
					overflowY: modalType === "full" ? "scroll" : "hidden"
				}}
			>
				{modalType === "full"
					? <PostCard data={data} />
					: <SmallInfo
						data={data}
						touchStart={handleTouchStart}
						touchMove={handleTouchMove}
						touchEnd={handleTouchEnd}
					/>
				}
			</div>
		</div>
	)
}

export default React.memo(MapModal);
