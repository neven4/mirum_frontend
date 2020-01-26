import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './styles.module.scss';

const Metro = props => {
	const {
		className,
		id,
		withClick = false,
		label,
		withArrow = false,
		metro,
		fitSmall
	} = props

	const onMetroClick = () => {
		props.history.push(`/map/${id}`)
	}

	const getMetroColor = () => {
		let color = ""
		switch(metro) {
			case "Девяткино":
			case "Гражданский пр.":
			case "Академическая":
			case "Политехническая":
			case "Площадь Муж.":
			case "Лесная":
			case "Выборгская":
			case "Площадь Ленина":
			case "Чернышевская":
			case "Площадь Восст.":
			case "Владимирская":
			case "Пушкинская":
			case "Технологический":
			case "Балтийская":
			case "Нарвская":
			case "Кировский завод":
			case "Ленинский пр.":
			case "Пр. Ветеранов":
				color = "#D61C38";
				break;
			case "Парнас":
			case "Пр. Просвещения":
			case "Озерки":
			case "Удельная":
			case "Пионерская":
			case "Черная Речка":
			case "Петроградская":
			case "Горьковская":
			case "Невский пр.":
			case "Сенная Площадь":
			case "Фрунзенская":
			case "Московские Вор.":
			case "Электросила":
			case "Парк победы":
			case "Московская":
			case "Звездная":
			case "Купчино":
				color = "#007DCC";
				break;
			case "Беговая":
			case "Новокрестовская":
			case "Приморская":
			case "Василеостровская":
			case "Гостиный Двор":
			case "Маяковская":
			case "Площадь Ал. Н.":
			case "Елизаровская":
			case "Ломоносовская":
			case "Пролетарская":
			case "Рыбацкое":
				color = "#009959";
				break;
			case "Спасская":
			case "Достоевская":
			case "Лиговский пр.":
			case "Новочеркасская":
			case "Ладожская":
			case "Пр. Большевиков":
			case "Ул. Дыбенко":
				color = "#DE7008";
				break;
			case "Комендантский":
			case "Старая Деревня":
			case "Крестовский Ост.":
			case "Чкаловская":
			case "Спортивная":
			case "Адмиралтейская":
			case "Садовая":
			case "Звенигородская":
			case "Обводный канал":
			case "Волковская":
			case "Бухарестская":
			case "Международная":
			case "Проспект славы":
			case "Дунайская":
			case "Шушары":
				color = "#6E0A78";
				break;
			default: color = "rgba(255, 255, 255, 0)"
		}

		return color
	}

	return (
		<section className={ `${ styles.metro } ${ withClick ? styles.withClick : "" } ${ className }`}
			onClick={withClick ? onMetroClick : null}
		>
			<div className={ styles.metro_icon }
				style={{backgroundColor: getMetroColor()}}
			/>

			<div className={ `${styles.metro_label} ${fitSmall ? styles.labelFitSmall : ""}` }>
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
