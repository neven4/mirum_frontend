import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {CafesContext, DeviceContext} from '../../Context/AppProvider';
import MarkerClusterer from "@google/markerclustererplus"

import styles from './styles.module.scss';

import place from '../../images/place.svg'
import geo from "../../images/geo.svg"
import MapModal from '../MapModal';
import MapTabletFullModal from '../MapTabletFullModal';
import Spiner from "../Spiner"
import MapSearch from "../MapSearch"
import {standartMap, bigMap} from "./mapStyle"

const MapPage = props => {
	const cafesState = useContext(CafesContext)
	const device = useContext(DeviceContext)
	const urlId = props.match.params.id
	console.log(cafesState)

	const [isLoading, setIsLoading] = useState(true)
	const [modalType, setModalType] = useState("")
	const [modalHeight, setModalHeight] = useState(0)
	const [modalData, setModalData] = useState(null)
	const [localMapId, setLocalMapId] = useState(null)
	const [isSearchShow, setSearchShow] = useState(false)

	useLayoutEffect(() => {
		if (window.google && window.google.maps) {
			initMap()
		} else {
			const script = document.createElement('script');
	
			script.async = true;
			script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgkawtYk61G3q4zBrUuxzkcDOY_bd1XFU";
			
			script.onload = initMap;
		
			document.body.appendChild(script);
		}
	}, []);

	useEffect(() => {
		if (localMapId && cafesState.cafes) {
			initPlaces(localMapId)
		}
	}, [cafesState])

	const initMap = () => {
		if (window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(function(position) {
				const state = {
					center: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					},
					zoom: 14
				}

				createMap(state)
			}, function() {
				const state = {
					center: {lat: 59.9343, lng: 30.3351},
					zoom: 14
				}
	
				createMap(state)
			})
		} else {
			const state = {
				center: {lat: 59.9343, lng: 30.3351},
				zoom: 14
			}

			createMap(state)
		}
	}

	const createMap = state => {
		const mapContainer = window.document.getElementById('map')
		setModalHeight(mapContainer.offsetHeight)

		const map = new window.google.maps.Map(mapContainer, {
			...state,
			disableDefaultUI: true,
			gestureHandling: "greedy",
			styles: standartMap,
			clickableIcons: false
		})

		map.addListener('zoom_changed', function() {
			const zoom = map.getZoom()

			if (zoom <= 13) {
				map.setOptions({styles: bigMap})
			} else {
				map.setOptions({styles: standartMap})
			}
		})

		setLocalMapId(map)
		setIsLoading(false)

		initZoomControl(map)
		initGeolocationControl(map)
		initPlaces(map)
		initSearchControl(map)
	}

	const initZoomControl = (map) => {
        document.getElementById('zoom-in').onclick = function() {
          	map.setZoom(map.getZoom() + 1);
		}

        document.getElementById('zoom-out').onclick = function() {
          	map.setZoom(map.getZoom() - 1);
		}

        map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(
			document.querySelector('.zoom-btn-container')
		)
	}

	const initSearchControl = (map) => {
        map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(
			document.querySelector('.map-search-btn')
		)
	}

	const initGeolocationControl = map => {
		const geoBtn = document.getElementById('cur-geo')
		geoBtn.onclick = () => {
			geolocate(map)
		}
		  
		map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(geoBtn)
	}

	const geolocate = map => {
		if (window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(function (position) {
				const pos = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				const icon = {
					url: geo,
					scaledSize: new window.google.maps.Size(24, 24),
					origin: new window.google.maps.Point(0, 0),
					anchor: new window.google.maps.Point(0, 0)
				}

				new window.google.maps.Marker({
					position: pos,
					draggable: false,
					clickable: false,
					icon,
					map
				});
				
				map.setCenter(pos);
			});
		}
	}

	const initPlaces = async (map) => {
		const MarkerWithLabel = await import("@google/markerwithlabel").then(foo => foo.default)

		const markerPlaces = await cafesState.cafes && cafesState.cafes.map(cafe => {
			const pos = new window.google.maps.LatLng(cafe.addressCoord[0], cafe.addressCoord[1]);
			const textLength = cafe.title.length
			const labelWidth = (textLength) * 8
			const markerWidth = (textLength) * 12

			const icon = {
				url: place,
				scaledSize: new window.google.maps.Size(labelWidth + 30, 20),
				origin: new window.google.maps.Point(labelWidth / 2 + 7, 0),
				anchor: new window.google.maps.Point(0, 0)
			}

			var shape = {
				coords: [0, 0, markerWidth + 30, 20],
				type: "rect"
			}

			const placeMarker = new MarkerWithLabel({
				position: pos,
				draggable: false,
				icon,
				shape,
				labelContent: cafe.title,
				labelAnchor: new window.google.maps.Point(0, 0),
				labelClass: "placeMarkLabel",
				labelInBackground: true
			})

			placeMarker.addListener('click', function() {
				map.setZoom(16)
				map.setCenter(placeMarker.getPosition())
				openSmallModal(cafe)
			})

			return placeMarker
		})

		new MarkerClusterer(map, markerPlaces,
			{
				gridSize: 50,
				zoomOnClick: true,
				minimumClusterSize: 2,
				styles: [{
					url: place,
					scaledSize: new window.google.maps.Size(21, 30),
					height: 30,
					width: 21,
					iconAncor: [0, 0],
					textColor: "#fff"
				}],
			}
		);
	}

	useEffect(() => {
		if (urlId && localMapId) {
			const dataFromId = cafesState.cafes && cafesState.cafes.find(el => el.id === urlId)
			localMapId.setZoom(16)
			localMapId.setCenter({
				lat: dataFromId.addressCoord[0],
				lng: dataFromId.addressCoord[1]
			})
			openSmallModal(dataFromId)
		}
	}, [localMapId])

	const onSuggestInputClick = cafe => {
		localMapId.setZoom(16)
		localMapId.setCenter({
			lat: cafe.addressCoord[0],
			lng: cafe.addressCoord[1]
		})
		openSmallModal(cafe)
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

			{isSearchShow &&
				<MapSearch
					setSearchShow={setSearchShow}
					cafes={cafesState.cafes}
					onItemClick={onSuggestInputClick}
				/>
			}

			<div id="map" />

			<div style={{ display: "none" }}>
				<div className={`map-round-btn map-search-btn ${isSearchShow ? "hide-search-btn" : ""}`}
					onClick={() => setSearchShow(true)}
				>
					<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.48528" cy="8.73218" r="5" transform="rotate(-45 8.48528 8.73218)" stroke="#727272" strokeWidth="2"/><path d="M12.3743 12.6212L16.2634 16.5103" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
				</div>

				<div className="zoom-btn-container">
					<div
						id="zoom-in"
						className="map-round-btn"
						title="Zoom In"
					>
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11 1.04761V20.9524" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M20.9524 11H1.04761" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>

					</div>
					<div 
						id="zoom-out"
						className="map-round-btn"
						title="Zoom Out"
					>
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20.9524 12.1579H1.04761" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
				</div>

				<div
					id="cur-geo"
					className="map-round-btn map-round-btn-sm"
				>
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.0001 7.33335C8.97425 7.33335 7.33341 8.97419 7.33341 11C7.33341 13.0258 8.97425 14.6667 11.0001 14.6667C13.026 14.6667 14.6667 13.0258 14.6667 11C14.6667 8.97419 13.026 7.33335 11.0001 7.33335ZM19.1951 10.0834C18.7734 6.26085 15.7393 3.22669 11.9167 2.80502V0.916687H10.0834V2.80502C6.26091 3.22669 3.22675 6.26085 2.80508 10.0834H0.916748V11.9167H2.80508C3.22675 15.7391 6.26091 18.7734 10.0834 19.195V21.0834H11.9167V19.195C15.7393 18.7734 18.7734 15.7391 19.1951 11.9167H21.0834V10.0834H19.1951ZM11.0001 17.4167C7.45258 17.4167 4.58341 14.5475 4.58341 11C4.58341 7.45252 7.45258 4.58335 11.0001 4.58335C14.5476 4.58335 17.4167 7.45252 17.4167 11C17.4167 14.5475 14.5476 17.4167 11.0001 17.4167Z" fill="#727272"/>
					</svg>
				</div>
			</div>

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
