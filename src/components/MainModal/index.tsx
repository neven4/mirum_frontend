import React, {useLayoutEffect} from 'react';
import styles from './styles.module.scss';
import {withRouter, RouteComponentProps} from "react-router-dom"

import PostCard from "../PostCard"


type PropsType = RouteComponentProps & {
    id: string
}

const MainModal: React.FC<PropsType> = props => {
	const {id} = props

	const closeModal = () => {
		props.history.push(`/cafes`)
	}

	useLayoutEffect(() => {
		document.body.style.overflow = "hidden"
		
		return () => {
			document.body.style.overflow = ""
		}
    }, [])

	return (
		<div
			className={styles.mainModalBackground}
			onClick={closeModal}
		>
			<div
				className={styles.mainModalBody}
				onClick={e => e.stopPropagation()}
			>
				<div
					className={styles.mainModalClose}
					onClick={closeModal}
				>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 1L1 19M1 1L19 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</div>

				<PostCard id={id} isModal={true} />
			</div>
		</div>
	)
}

export default withRouter(MainModal);
