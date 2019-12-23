import React, {useContext} from 'react';
import Context from "../../Context/Context"
import styles from './styles.module.scss';

import MainCard from '../MainCard';

const Main = () => {
	const context = useContext(Context)
	
	return (
			<main className={ styles.main }>
				<article className={ styles.main_container }>
					{context.state.cards.length > 0 &&
						context.state.cards.map((el, i) => {
							return <MainCard data={el} key={`mainCard_${i}`}/>
						})
					}
				</article>
			</main>
	)
}

export default Main;
