import React, { useState } from 'react';

import styles from './styles.module.scss';

import Like from '../Like';
import Metro from '../Metro';
import SocialIcons from '../SocialIcons';

import Carousel from "../Carousel"


const PostCard = props => {
	const [isLiked, setIsLiked] = useState(false)

	const handleLike = () => {
		setIsLiked(!isLiked)
	}

	return (
		<article className={ styles.postCard }>
			<Carousel />

			<section className={ styles.postCardInfo }>
				<p className={ styles.postCardAuthor }>
					Источник: кофе.рф
				</p>

				<div className={ styles.postCardTitle }>
					<h1>
						Coffee 3
					</h1>

					<SocialIcons />
				</div>

				<Metro className={ styles.postCardAdress }
					label='Петроградская, пр. Медиков, д.3'
					withArrow={true}
					withClick={true}
					coords={[59.931105, 30.320476]}
				/>
				
				<Like active={ isLiked }
					className={ styles.postCardLike }
					click={ handleLike }
					numOfLikes='24400'
				/>
		
				<p className={ styles.postCardAbout }>
					Когда в феврале 2018 года я узнал о перезапуске Coffee 3 и согласился туда пойти с другом, то совсем не ожидал, что меня поведут в подозрительный с первого взгляда двор, заведут в здание бывшего завода и заставят подняться там на 5 этаж... Дошел я тогда до туда только потому, что у меня в кошельке было мало налички и я решил, что в принципе терять нечего
				</p>

				<p className={ styles.postCardAbout }>
					Но то ощущение, которое я испытал войдя в кофейню, хочется чувствовать каждый раз. Большое лофтовое двухэтажное помещение с неординарым видом из окна, отлично продуманное в плане свободного пространства, цветов, контрастов, с огромным крутым рисунком на стене, барной стойкой, которая, находясь в центре зала, излучает культуру кофе и ,тогда еще небольшим количеством улыбчивых людей — то, ради чего я прихожу в Cofee 3 и сегодня. 
				</p>
			</section>
		</article>
	)
}

export default PostCard;
