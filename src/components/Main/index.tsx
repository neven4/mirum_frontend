import React, {useContext} from 'react';
import Context, {IContext} from "../../Context/Context"
import styles from './styles.module.scss';
import { RouteComponentProps } from 'react-router-dom';

import MainCard from '../MainCard';
import MainModal from "../MainModal"
import PostCard from "../PostCard"

interface Props {
	id: string;
}

// Your component own properties
type PropsType = RouteComponentProps<Props> & {
    inHeader?: boolean,
}

export interface IPhoto {
	640?: string,
	750?: string,
	1080?: string
	source: string
	author: string
}

export interface Data {
	photos: IPhoto[],
	likes: number,
	smallText: string,
	addressName: string,
	id: string,
	title: string,
	metroName: string,
	mainText: string,
	addressCoord: [string, string],
	instagramLink: string
}

const Main: React.FC<PropsType> = props => {
	const context = useContext<IContext>(Context)
	const {id} = props.match.params
	const {device} = context.state
	const cafes = context.state.cafes.read()

	return (
		<>
			{id && device === "mobile"
				? <PostCard id={id} />
				: <main className={ styles.main }>
					<h2>Лучшее</h2>

					<article className={ styles.main_container }>
						{cafes &&
							cafes
								.sort((a: Data, b: Data) => b.likes - a.likes)
								.map((el: Data, i: number) => 
									<MainCard data={el} key={`mainCard_${i}`}/>
								)
						}
					</article>

					{id &&
						<MainModal id={id} />
					}
				</main>
			}
		</>
	)
}

export default React.memo(Main);
