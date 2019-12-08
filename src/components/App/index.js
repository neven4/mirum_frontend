import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Provider from '../../Context/UploadFileProvider';
import styles from './styles.module.scss';

import Footer from '../Footer';
import PostCard from '../PostCard';
import Main from '../Main';
import Header from '../Header';
import PopAppMap from '../PopAppMap';

const App = () => {
	return (
		<Provider>
			<Router>
				<div className={ styles.app }>
					<Header />
					<Route exact path='/' component={Main} />
					<Route exact path='/post' component={PostCard} />
					<Route exact path='/map' component={PopAppMap} />
					<Footer />
				</div>
			</Router>
		</Provider>
	)
}

export default App;
