import React, {Suspense, useContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from "../../Context/Context"

import styles from './styles.module.scss';

import Footer from '../Footer';
import Header from '../Header';
import ShareModal from '../ShareModal';

const MapPage = React.lazy(() => import('../Map'))
const PostCard = React.lazy(() => import('../PostCard'))
const Main = React.lazy(() => import('../Main'))


const App = () => {
	const context = useContext(Context)
	const {device} = context.state
	console.log(device)

	return (
		<Router>
			<div className={ styles.app }>
				<ShareModal />
				<Header />

				<Suspense fallback={"Loafing..."}>
					<Switch>
						<Route exact path='/' component={Main} />
						<Route exact path='/post/:id' component={PostCard} />
						<Route exact path='/map/:id' component={MapPage} />
						<Route exact path='/map' component={MapPage} />
					</Switch>
				</Suspense>

				{device === "mobile" &&
					<Footer />
				}
			</div>
		</Router>
	)
}

export default React.memo(App);
