import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from './styles.module.scss';

import Footer from '../Footer';
import Header from '../Header';

const MapPage = React.lazy(() => import('../Map'))
const PostCard = React.lazy(() => import('../PostCard'))
const Main = React.lazy(() => import('../Main'))

const App = () => {
	return (
		<Router>
			<div className={ styles.app }>
				<Header />

				<Suspense fallback={"Loafing..."}>
					<Switch>
						<Route exact path='/' component={Main} />
						<Route exact path='/post/:id' component={PostCard} />
						<Route exact path='/map/:coords' component={MapPage} />
						<Route exact path='/map' component={MapPage} />
					</Switch>
				</Suspense>

				<Footer />
			</div>
		</Router>
	)
}

export default App;
