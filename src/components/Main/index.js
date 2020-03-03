import React, {useContext} from 'react';
import Context from "../../Context/Context"
import styles from './styles.module.scss';

import MainCard from '../MainCard';
import MainModal from "../MainModal"
import PostCard from "../PostCard"

const Main = props => {
	const context = useContext(Context)
	const {id} = props.match.params
	const {device} = context.state
	const cafes = context.state.cafes.read()

	return (
		<>
			{id && device === "mobile"
				? <PostCard id={id} />
				: <main className={ styles.main }>
					<h2>Лучшее</h2>

					<article className={ styles.main_container }>
						{cafes &&
							cafes
								.sort((a, b) => b.likes - a.likes)
								.map((el, i) => 
									<MainCard data={el} key={`mainCard_${i}`}/>
								)
						}
					</article>

					{id &&
						<MainModal id={id} />
					}
				</main>
			}
		</>
	)
}

export default React.memo(Main);
