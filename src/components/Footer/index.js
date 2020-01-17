import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import styles from './styles.module.scss';

const Footer = props => {
	const {pathname} = props.location
	return (
		<footer className={ `${styles.footer} ${props.inHeader ? styles.footer_inHeader : ""}` }>
			<nav>
				<ul className={ `${styles.footer_nav} ${props.inHeader ? styles.footer_nav_inHeader : ""}` }>
					<li>
						<Link to='/'>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill={pathname === "/" || pathname.indexOf("/post") === 0 ? "#2A2A2A" : "#BABABA"}
									fillRule="evenodd"
									clipRule="evenodd"
									d="M0 3C0 1.34315 1.34315 0 3 0H11L11 10H0V3ZM0 12V21C0 22.6569 1.34315 24 3 24H21C22.6569 24 24 22.6569 24 21V12H13H11L0 12ZM13 10H24V3C24 1.34315 22.6569 0 21 0H13L13 10Z"
								/>
							</svg>
						</Link>
					</li>
					<li>
						<Link to='/map'>
							<svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill={pathname.indexOf("/map") === 0 ? "#2A2A2A" : "#BABABA"}
									stroke={pathname.indexOf("/map") === 0 ? "#2A2A2A" : "#BABABA"}
									d="M1 12.3333L26 1L13.8378 25L12.4865 14.3333L1 12.3333Z" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	)
}

export default withRouter(React.memo(Footer));
