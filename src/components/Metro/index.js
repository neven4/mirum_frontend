import React, {useContext} from 'react';
import { withRouter } from 'react-router-dom';
import Context from "../../Context/Context";

import styles from './styles.module.scss';

const Metro = props => {
	const context = useContext(Context);
	const {
		className,
		coords,
		withClick,
		label,
		withArrow
	} = props

	const onMetroClick = () => {
		console.log(coords)
		// context.update({
		// 	placeCoords: coords
		// })
		props.history.push(`/map/${coords}`)
	}

	return (
		<section className={ `${ styles.metro } ${ className }`}
			onClick={withClick ? onMetroClick : null}
		>
			<div className={ styles.metro_icon }
				style={{backgroundColor: '#1C72BB'}}
			/>

			<div className={ styles.metro_label }>
				{label}
			</div>

			{withArrow &&
				<div className={ styles.metro_arrow }>
					<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L6 6L1 11" stroke="#727272"/>
					</svg>
				</div>
			}
		</section>
	);
}

export default withRouter(React.memo(Metro));
