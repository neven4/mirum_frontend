import React, {useContext} from 'react';
import {CafesContext, DeviceContext} from "../../Context/AppProvider"
import styles from './styles.module.scss';

import MainCard from '../MainCard';
import MainModal from "../MainModal"
import PostCard from "../PostCard"

const Main = props => {
	const cafes = useContext(CafesContext)
	const device = useContext(DeviceContext)
	const {id} = props.match.params
	console.log(cafes)

	return (
		<>
			{id && device === "mobile"
				? <PostCard id={id} />
				: <main className={ styles.main }>
					<h2>Лучшее</h2>

					<article className={ styles.main_container }>
						{cafes && cafes.map((el, i) => 
							<MainCard data={el} key={`mainCard_${i}`}/>
						)}
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
