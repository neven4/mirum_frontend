import React, {useContext, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Context from '../../Context/Context';
import styles from './styles.module.scss';

import Footer from '../Footer';
import PostCard from '../PostCard';
import Main from '../Main';
import Header from '../Header';
import PopAppMap from '../PopAppMap';

const App = () => {
	const context = useContext(Context)

	useEffect(() => {
		fetch("https://us-central1-mirum-e30cc.cloudfunctions.net/api/cafes")
			.then(res => res.json())
			.then(data => {
				console.log(data)
				context.update({
					cards: data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		// <Provider>
			<Router>
				<div className={ styles.app }>
					<Header />
					<Route exact path='/' component={Main} />
					<Route exact path='/post/:id' component={PostCard} />
					<Route exact path='/map' component={PopAppMap} />
					<Footer />
				</div>
			</Router>
		// </Provider>
	)
}

export default App;
