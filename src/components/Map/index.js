import React, {useContext, useEffect, useState} from 'react';
import Context from '../../Context/Context';

import styles from './styles.module.scss';

import placemark from '../../images/placemark.png'
import MapModal from '../MapModal';

const MapPage = props => {
	const context = useContext(Context)
	const cafes = context.state.cafes.read()
	const urlCoords = props.match.params.coords
	let localMap = null

	const [isLoading, setIsLoading] = useState(true)
	const [modalType, setModalType] = useState("")
	const [modalHeight, setModalHeight] = useState(0)
	const [modalData, setModalData] = useState(null)
	const [localMapId, setLocalMapId] = useState(null)
	const [isSearchShow, setSearchShow] = useState(false)
	const [searchValue, setSearchValue] = useState("")

  	useEffect(() => {
		let mapHeight

		window.ymaps.ready(() => {
			setIsLoading(false)

			window.ymaps.geolocation.get().then((res) => {
				const mapContainer = window.document.getElementById('map')
				const bounds = res.geoObjects.get(0).properties.get('boundedBy')
				const mapState = window.ymaps.util.bounds.getCenterAndZoom(
					bounds,
					[mapContainer.offsetWidth, mapContainer.offsetHeight - 50]
				)
				mapHeight = mapContainer.offsetHeight - 50
				setModalHeight(mapHeight * 0.87)
				createMap(mapState)
			}, function() {
				createMap({
					center: [55.751574, 37.573856],
					zoom: 9
				})
			})

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
					"<div id='cur-geo' class='map-round-btn map-round-btn-sm'><svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'><g clip-path='url(#clip0)'><path d='M14.5979 12.5766C14.5956 11.4208 13.6579 10.4851 12.5021 10.4851C11.3446 10.4851 10.4062 11.4235 10.4062 12.5809C10.4062 13.7384 11.3446 14.6768 12.5021 14.6768C13.6596 14.6768 14.5979 13.7384 14.5979 12.5809C14.5979 12.5795 14.5979 12.5781 14.5979 12.5766ZM12.5021 13.8135C11.819 13.8135 11.2652 13.2598 11.2652 12.5766C11.2652 11.8935 11.819 11.3398 12.5021 11.3398C13.1852 11.3398 13.739 11.8935 13.739 12.5766C13.739 13.2598 13.1852 13.8135 12.5021 13.8135Z' fill='#545454'/><path d='M23.7374 12.1472H21.6587C21.4318 7.42456 17.6544 3.64712 12.9318 3.42025V1.3373C12.9318 1.10012 12.7395 0.907822 12.5023 0.907822C12.2651 0.907822 12.0728 1.10012 12.0728 1.3373V3.41595C7.34867 3.64298 3.57064 7.42289 3.34592 12.1472H1.26297C1.02579 12.1472 0.833496 12.3395 0.833496 12.5766C0.833496 12.8138 1.02579 13.0061 1.26297 13.0061H3.34163C3.56866 17.7303 7.34857 21.5083 12.0728 21.733V23.8117C12.0728 24.0489 12.2651 24.2412 12.5023 24.2412C12.7395 24.2412 12.9318 24.0489 12.9318 23.8117V21.733C17.6544 21.5062 21.4318 17.7287 21.6587 13.0061H23.7374C23.9745 13.0061 24.1668 12.8138 24.1668 12.5766C24.1668 12.3395 23.9745 12.1472 23.7374 12.1472ZM18.764 13.0061H20.7998C20.575 17.2549 17.1806 20.6494 12.9318 20.8741V18.8384C12.9318 18.6012 12.7395 18.4089 12.5023 18.4089C12.2651 18.4089 12.0728 18.6012 12.0728 18.8384V20.8741C7.82405 20.6494 4.42959 17.2549 4.20487 13.0061H6.24058C6.47775 13.0061 6.67005 12.8138 6.67005 12.5766C6.67005 12.3395 6.47775 12.1472 6.24058 12.1472H4.20487C4.42959 7.89837 7.82405 4.50392 12.0728 4.27919V6.3149C12.0728 6.55208 12.2651 6.74438 12.5023 6.74438C12.7395 6.74438 12.9318 6.55208 12.9318 6.3149V4.27919C17.1806 4.50392 20.575 7.89837 20.7998 12.1472H18.764C18.5269 12.1472 18.3346 12.3395 18.3346 12.5766C18.3346 12.8138 18.5269 13.0061 18.764 13.0061Z' fill='#545454'/></g><defs><clipPath id='clip0'><rect width='23.3333' height='23.3333' fill='white' transform='translate(0.833496 0.907822)'/></clipPath></defs></svg></div>",
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
										draggable: false
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

				const createPlacemark = coords => {
					return new window.ymaps.Placemark(coords, {}, {
						draggable: false,
						iconLayout: 'default#image',
						iconImageHref: placemark,
						iconImageSize: [22, 30],
						iconImageOffset: [-11, -30]
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
								displayName: `<strong>${res[i].text}</strong><small>${res[i].address}</small>`,
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
						},
						{
							href: placemark,
							size: [52, 78],
							offset: [-26, -78]
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
						let placemark = createPlacemark(el.coords)
						placemark.events.add('click', e => {
							localMap.setCenter(el.coords, 18, {})
							openSmallModal(el.data)
							e.stopPropagation()
						})

						return placemark;
					})
				)

				localMap.geoObjects.add(clusterer);
				localMap.setBounds(clusterer.getBounds(), {});

				setLocalMapId(localMap)
			}
		})
	}, [])

	useEffect(() => {
		if (urlCoords && localMapId) {
			const parsedUrlCoords = urlCoords.split(",")
			localMapId.setCenter(parsedUrlCoords, 14)
			openSmallModal(parsedUrlCoords)
		}
	}, [localMapId])

	const openSmallModal = el => {
		setModalData(el)
		setModalType("small")
	}

	const onCloseModal = () => {
		setModalType("")
	}

	return (
		<section className={ styles.mapPage }>
			{isLoading
				? <span>isLodaing...</span>
				: <>
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

					<div id="map" style={{flexGrow: 1, backgroundColor: "#fff"}} />

					{modalData &&
						<MapModal
							height={modalHeight}
							type={modalType}
							data={modalData}
							onClose={onCloseModal}
						/>
					}
				</>
			}
		</section>
	)
}

export default React.memo(MapPage);
