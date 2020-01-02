import React, {useContext, useState, useEffect} from 'react';
import Context from "../../Context/Context"

import styles from './styles.module.scss';

const Like = ({ numOfLikes, className, id }) => {	
	const context = useContext(Context)
	const [likesNum, setLikesNum] = useState(0)
	const isLiked = context.state.likedCafes.includes(id)

	useEffect(() => {
		setLikesNum(Number(numOfLikes))
	}, [])

	const handleLikeClick = () => {
		const newLikedPosts = [...context.state.likedCafes]
		let likeState

		if (!isLiked) {
			newLikedPosts.push(id)
			likeState = "inc"
			setLikesNum(likesNum + 1)

			context.update({
				likedCafes: newLikedPosts
			})
		} else {
			const removedLikeArr = newLikedPosts.filter(el => el !== id)
			likeState = "dec"
			setLikesNum(likesNum - 1)
	
			context.update({
				likedCafes: removedLikeArr
			})

		}

		// fetch(`https://europe-west1-mirum-e30cc.cloudfunctions.net/api/cafes/${id}/like/${likeState}`,
		// 	{ method: "PUT" }
		// )
		// 	.then(res => res.json())
		// 	.then(data => setLikesNum(data.likes))
	}

	return (
		<section className={ `${ styles.like } ${ className }` }>
			<div className={ styles.like_icon }
				onClick={ handleLikeClick }
			>
				<svg width="100%" height="100%" viewBox="0 0 21 21" fill={ isLiked ? '#FF2929' : 'none' } xmlns="http://www.w3.org/2000/svg">
					<path d="M20.4673 6.60488L20.4688 6.6218L20.4715 6.63858C20.4862 6.73014 20.5853 7.44813 20.2997 8.65667L20.2997 8.65682C19.8888 10.3984 18.9388 11.9878 17.5446 13.2519C17.5441 13.2524 17.5436 13.2528 17.5431 13.2532L10.44 19.5899L3.4571 13.253L3.45682 13.2528C2.0619 11.9889 1.11132 10.3986 0.700268 8.65679L0.700247 8.6567C0.414631 7.44742 0.513961 6.72978 0.528643 6.63948L0.531481 6.62203L0.533079 6.60442C0.820667 3.43488 3.03853 1.23746 5.71797 1.23746C7.48855 1.23746 9.07782 2.18316 10.0103 3.77886L10.4373 4.50947L10.8713 3.783C11.8104 2.21089 13.4737 1.23786 15.282 1.23786C17.9618 1.23786 20.1793 3.43527 20.4673 6.60488Z"
						stroke={ isLiked ? '#FF2929' : '#2A2A2A' }
					/>
				</svg>
			</div>

			<div className={ styles.like_count }>
				{likesNum}
			</div>
		</section>
	);
}

export default React.memo(Like);
