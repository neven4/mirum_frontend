import React, {Suspense, useContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from "../../Context/Context"
import GA from "../../Utils/GoogleAnalytics"

import styles from './styles.module.scss';

import Footer from '../Footer';
import Header from '../Header';
import ShareModal from '../ShareModal';
import Spiner from '../Spiner';
import MapPage from "../Map"
import Main from "../Main"

const App = () => {
	const context = useContext(Context)
	const {device} = context.state

	return (
		<Router>
			{ GA.init() && <GA.RouteTracker /> }

			<div className={ styles.app }>
				<ShareModal />
				<Header />

				<Suspense fallback={
					<div className={ styles.appLoading }>
						<Spiner />
					</div>
				}>
					<Switch>
						<Route exact path='/' component={MapPage} />
						<Route exact path='/map/:id' component={MapPage} />
						<Route exact path='/cafes/:id' component={Main} />
						<Route exact path='/cafes' component={Main} />
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
