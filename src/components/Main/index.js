import React, {useContext} from 'react';
import Context from "../../Context/Context"
import styles from './styles.module.scss';

import MainCard from '../MainCard';

const Main = () => {
	const context = useContext(Context)

	const cafes = context.state.cafes.read()
	
	return (
			<main className={ styles.main }>
				<h2>Лучшее</h2>

				<article className={ styles.main_container }>
					{cafes && cafes.map((el, i) => 
						<MainCard data={el} key={`mainCard_${i}`}/>
					)}
				</article>
			</main>
	)
}

export default Main;
