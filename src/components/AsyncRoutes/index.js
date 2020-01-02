import React, {useContext, useEffect, Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from '../../Context/Context';
import styles from './styles.module.scss';

import Footer from '../Footer';
import Header from '../Header';

const PopAppMap = React.lazy(() => import('../Map'))
const PostCard = React.lazy(() => import('../PostCard'))
const Main = React.lazy(() => import('../Main'))


const App = () => {
	const context = useContext(Context)


	return (
        <Router>
            <Suspense fallback={"Loafing..."}>
                <Switch>
                    <Route exact path='/' component={Main} />
                    <Route exact path='/post/:id' component={PostCard} />
                    <Route exact path='/map' component={PopAppMap} />
                </Switch>
            </Suspense>
        </Router>
	)
}

export default App;
