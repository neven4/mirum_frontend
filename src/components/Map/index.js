import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import Context from '../../Context/Context';

import styles from './styles.module.scss';

import placemark from '../../images/placemark.png'
import geoPosImg from '../../images/geoPos.png'
import MapModal from '../MapModal';
import MapTabletFullModal from '../MapTabletFullModal';
import Spiner from "../Spiner"

const MapPage = props => {
	const context = useContext(Context)
	const cafes = context.state.cafes.read()
	const urlId = props.match.params.id
	const {device} = context.state
	let localMap = null
	let mapHeight

	const [isLoading, setIsLoading] = useState(true)
	const [modalType, setModalType] = useState("")
	const [modalHeight, setModalHeight] = useState(0)
	const [modalData, setModalData] = useState(null)
	const [localMapId, setLocalMapId] = useState(null)
	const [isSearchShow, setSearchShow] = useState(false)
	const [searchValue, setSearchValue] = useState("")

	useLayoutEffect(() => {
		if (!window.ymaps) {
			const script = document.createElement('script');
			const onloadScript = document.createElement('script');
	
			onloadScript.type = 'text/javascript';
		
			script.src = "https://api-maps.yandex.ru/2.1/?apikey=36c0289b-59c0-493e-9d11-69d0114f742e&load=package.geoObjects&lang=ru-RU";
			script.async = true;
			script.type = 'text/javascript';
			script.onload = createYmaps;
		
			document.body.appendChild(script);
		
			return () => {
			  document.body.removeChild(script);
			}
		} else {
			createYmaps()
		}
	}, []);

	const createYmaps = () => {
		window.ymaps.ready(() => {
			window.ymaps.geolocation.get().then((res) => {
				const mapContainer = window.document.getElementById('map')
				const bounds = res.geoObjects.get(0).properties.get('boundedBy')
				const mapState = window.ymaps.util.bounds.getCenterAndZoom(
					bounds,
					[mapContainer.offsetWidth, mapContainer.offsetHeight - 50]
				)
				mapState.zoom = 14
				mapHeight = mapContainer.offsetHeight - 50
				setModalHeight(mapHeight * 0.87)
				createMap(mapState)
			}, function() {
				createMap({
					center: [55.751574, 37.573856],
					zoom: 9
				})
			})	
		})
	}

	useEffect(() => {
		if (urlId && localMapId) {
			const dataFromId = cafes.find(el => el.id === urlId)
			localMapId.setCenter(dataFromId.addressCoord, 14)
			openSmallModal(dataFromId)
		}
	}, [localMapId])

	const createMap = (state) => {
		localMap = new window.ymaps.Map('map', {...state, controls: []}, {
			searchControlProvider: 'yandex#search',
			suppressMapOpenBlock: true,
			suppressObsoleteBrowserNotifier: true,
			hotspotLayerInteractivityModel: 'default#silent'
		})

		const ZoomLayout = window.ymaps.templateLayoutFactory.createClass(
			"<div class='zoom-btn-container'>" +
			"<div id='zoom-in' class='map-round-btn'><svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10.5 1V20' stroke='#727272' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M20 10.5L1 10.5' stroke='#727272' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></div>" +
			"<div id='zoom-out' class='map-round-btn'><svg width='21' height='19' viewBox='0 0 21 19' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M20 10.5L1 10.5' stroke='#727272' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></div>" +
			"</div>", 
			{
				build: function () {
					ZoomLayout.superclass.build.call(this);
					this.zoomInCallback = window.ymaps.util.bind(this.zoomIn, this);
					this.zoomOutCallback = window.ymaps.util.bind(this.zoomOut, this);

					window.document.getElementById('zoom-in').addEventListener('click', this.zoomInCallback);
					window.document.getElementById('zoom-out').addEventListener('click', this.zoomOutCallback);
				},
				clear: function () {
					window.document.getElementById('zoom-in').removeEventListener('click', this.zoomInCallback);
					window.document.getElementById('zoom-out').removeEventListener('click', this.zoomOutCallback);
					ZoomLayout.superclass.clear.call(this);
				},
				zoomIn: function () {
					const map = this.getData().control.getMap();
					map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
				},
				zoomOut: function () {
					const map = this.getData().control.getMap();
					map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
				}
			}
		)

		const zoomControl = new window.ymaps.control.ZoomControl({
			options: {layout: ZoomLayout}
		})

		localMap.controls.add(zoomControl, {
			position: {
				top: mapHeight / 2 - 60,
				right: 10
			}
		})

		const GeoLayout = window.ymaps.templateLayoutFactory.createClass(
			"<div id='cur-geo' class='map-round-btn map-round-btn-sm'><svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10.5 7C8.56625 7 7 8.56625 7 10.5C7 12.4337 8.56625 14 10.5 14C12.4338 14 14 12.4337 14 10.5C14 8.56625 12.4338 7 10.5 7ZM18.3225 9.625C17.92 5.97625 15.0238 3.08 11.375 2.6775V0.875H9.625V2.6775C5.97625 3.08 3.08 5.97625 2.6775 9.625H0.875V11.375H2.6775C3.08 15.0237 5.97625 17.92 9.625 18.3225V20.125H11.375V18.3225C15.0238 17.92 17.92 15.0237 18.3225 11.375H20.125V9.625H18.3225ZM10.5 16.625C7.11375 16.625 4.375 13.8862 4.375 10.5C4.375 7.11375 7.11375 4.375 10.5 4.375C13.8863 4.375 16.625 7.11375 16.625 10.5C16.625 13.8862 13.8863 16.625 10.5 16.625Z' fill='#727272'/></svg></div>",
			{
				build: function () {
					GeoLayout.superclass.build.call(this);
					this.currentGeo = window.ymaps.util.bind(this.curGeoClick, this);
					window.document.getElementById('cur-geo').addEventListener('click', this.currentGeo);
				},

				clear: function () {
					window.document.getElementById('cur-geo').removeEventListener('click', this.currentGeo);
					GeoLayout.superclass.clear.call(this);
				},

				curGeoClick: function () {
					window.ymaps.geolocation.get()
						.then(el => {
							localMap.setCenter(el.geoObjects.position, 16)
							const mark = new window.ymaps.Placemark(el.geoObjects.position, {}, {
								draggable: false,
								iconLayout: 'default#image',
								iconImageHref: geoPosImg,
								iconImageSize: [24, 24],
								iconImageOffset: [-12, -12]
							});

							localMap.geoObjects.add(mark)
						})
				}
			}
		)

		const GeolocationControl = new window.ymaps.control.GeolocationControl({
			options: {
				layout: GeoLayout,
				noPlacemark: true
			}
		})

		localMap.controls.add(GeolocationControl, {
			position: {
				bottom: 20,
				right: 10
			}
		})
		const createPlacemark = (coords, text)=> {
			return new window.ymaps.Placemark(coords, {
				iconContent: text
			}, {
				draggable: false,
				iconLayout: 'default#imageWithContent',
				iconImageHref: placemark,
				iconImageSize: [22, 30],
				iconImageOffset: [-11, -30],
				iconContentOffset: [30, 5],
				iconContentLayout: window.ymaps.templateLayoutFactory.createClass(
					'<div style="color: #2A2A2A; font-size: 18px; white-space: nowrap;">{{ properties.iconContent }}</div>'
				)
			});
		}

		const setCenter = coords => {
			return localMap.setCenter(coords, 18)
		}

		const points = cafes.map(el => {
			return {
				coords: el.addressCoord,
				text: el.title,
				address: el.addressName,
				data: el
			}
		})

		const findPlaces = (arr, findName) => {
			return arr.filter(value => {
				const searchingName = findName.toLowerCase()
				if (
					value.text.toLowerCase().indexOf(searchingName) !== -1 ||
					value.address.toLowerCase().indexOf(searchingName) !== -1
				) {
					return true
				} else {
					return false
				}
			});
		}

		const SeggestProvider = {
			suggest: (request, options) => {
				const res = findPlaces(points, request)
				const results = Math.min(options.results, res.length)
				let arrayResult = []
				for (var i = 0; i < results; i++) {
					arrayResult.push({
						displayName: `<span style="font-size: 12px; color: #2A2A2A;">${res[i].text},</span> <small style="font-size: 12px; color: #BABABA;">${res[i].address}</small>`,
						value: res[i].text,
						coords: res[i].coords
					})
				}

				return window.ymaps.vow.resolve(arrayResult);
			}
		}

		const suggestView1 = new window.ymaps.SuggestView('suggested', {
			provider: SeggestProvider,
			results: 5
		})

		suggestView1.events.add('select', e => {
			const coords = e.get('item').coords

			setCenter(coords)
		})

		const clusterer = new window.ymaps.Clusterer({
			clusterIcons: [
				{
					href: placemark,
					size: [26, 39],
					offset: [-13, -39]
				}
			],
			zoomMargin: 50,
			clusterNumbers: [3],
			clusterIconContentLayout: window.ymaps.templateLayoutFactory.createClass(
				'<div style="color: #FFFFFF; font-weight: bold;">{{ properties.geoObjects.length }}<div>'
			)
		})

		clusterer.add(
			points.map(el => {
				let placemark = createPlacemark(el.coords, el.text)
				placemark.events.add('click', e => {
					localMap.setCenter(el.coords, 15, {})
					openSmallModal(el.data)
					e.stopPropagation()
				})

				return placemark;
			})
		)

		localMap.geoObjects.add(clusterer);
		// localMap.setBounds(clusterer.getBounds(), {});

		const layer = function () {
			return new window.ymaps.Layer('', {
				// Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
				// раскомментируйте эту строчку и укажите ссылку на изображение.
				// notFoundTile: 'url'
			});
			// Указываем доступный диапазон масштабов для данного слоя.
			// layer.getZoomRange = function () {
			// 	return ymaps.vow.resolve([0, 4]);
			// };
			// // Добавляем свои копирайты.
			// layer.getCopyrights = function () {
			// 	return ymaps.vow.resolve('©');
			// };
			// return layer;
		};
		// Добавляем в хранилище слоев свой конструктор.
		localMap.layer.storage.add('pep', layer);

		setLocalMapId(localMap)
		setIsLoading(false)
	}

	const openSmallModal = el => {
		setModalData(el)
		setModalType("small")
	}

	const onCloseModal = () => {
		setModalType("")
	}

	const onSmallModal = () => {
		setModalType("small")
	}

	const onFullModal = () => {
		setModalType("full")
	}

	return (
		<section className={ styles.mapPage }>
			{isLoading &&
				<div className={ styles.mapPageLoading }>
					<Spiner />
				</div>
			}

			<div className={`map-input-container ${isSearchShow ? "show-input" : ""}`}>
				<div className="search-input-body">
					<div className="search-input-icon">
						<i className="fas fa-search" />
					</div>
		
					<input type="text" id="suggested" value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
						placeholder="Search"
					/>
		
					<div className="clear-input-btn"
						onClick={() => setSearchValue("")}
						style={{display: searchValue === "" ? "none" : "flex"}}
					>
						<i className="fas fa-times-circle" />
					</div>
				</div>
				
				<div className="search-input-cancel"
					onClick={() => setSearchShow(false)}
				>
					Cancel
				</div>
			</div>

			<div className={`map-round-btn map-search-btn ${isSearchShow ? "hide-search-btn" : ""}`}
				onClick={() => setSearchShow(true)}
			>
				<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.48528" cy="8.73218" r="5" transform="rotate(-45 8.48528 8.73218)" stroke="#727272" strokeWidth="2"/><path d="M12.3743 12.6212L16.2634 16.5103" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
			</div>

			<div id="map" />

			{modalData &&
				<MapModal
					height={modalHeight}
					type={modalType}
					data={modalData}
					onClose={onCloseModal}
					onFullModal={onFullModal}
				/>
			}

			{modalData && device !== "mobile" && modalType === "full" &&
				<MapTabletFullModal
					data={modalData}
					onSmallClick={onSmallModal}
				/>
			}
		</section>
	)
}

export default React.memo(MapPage);
