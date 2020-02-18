import React, {useState, useEffect, useReducer} from 'react';
import {initialState, reducer} from "./CafesReducer"

export const CafesContext = React.createContext()
export const LikedCafesContext = React.createContext()
export const ShareModalContext = React.createContext()
export const DeviceContext = React.createContext()

const AppProvider = ({children}) => {
    const [width, setWidth] = useState(null)
    const [cafesState, dispatch] = useReducer(reducer, initialState)
    const [likedCafes, setLikedCafes] = useState([])
    const [device, setDevice] = useState(null)
    const [shareModalState, setShareModalState] = useState({
        shareModalOpen: false,
        shareModalPage: null,
        shareModalId: null,
    })

    useEffect(() => {
        window.addEventListener("resize", updateScreenWidth)
        window.addEventListener("pagehide", saveToStorage)
        updateScreenWidth()
        loadCafes()

        const newLikedCafes = JSON.parse(localStorage.getItem("likedCafes"))

        if (newLikedCafes && Array.isArray(newLikedCafes)) {
            setLikedCafes(newLikedCafes)
        }

        return () => {
            saveToStorage()
            window.removeEventListener("resize", updateScreenWidth)
            window.removeEventListener("pagehide", saveToStorage) 
        }
    }, [])

    useEffect(() => {
        setDeviceType(width)
    }, [width])

    const loadCafes = () => {
        let resCopy
        dispatch({type: "fetchCafesStart"})

        fetch("https://europe-west1-mirum-e30cc.cloudfunctions.net/api/cafes")
            .then((res) => {
                resCopy = res.clone()

                if (window.caches) {
                    window.caches.open("mirum-cache")
                        .then(function(cache) {
                            cache.put("cafesData", resCopy)
                        })
                }

                return res.json()
            })
            .then(data => dispatch({type: "fetchCafesEnd", data}))
            .catch(() => {
                dispatch({type: "fetchCafesError"})
                if (window.caches) {
                    window.caches.match("cafesData")
                        .then(response => response.json())
                        .then(data => dispatch({type: "fetchCafesEnd", data}))
                }
            })
    }

    const saveToStorage = () => {
        localStorage.setItem("likedCafes", JSON.stringify(likedCafes))
    }

    const updateScreenWidth = () => {
        const width = window.innerWidth

        setWidth(width)
		if (!device) {
            setDeviceType(width)
        }
    }
    
    const setDeviceType= (width) => {
        let newDevice = ""
        if (width <= 650) {
            newDevice = "mobile"
        } else if (width > 650 && width < 1100) {
            newDevice = "tablet"
        } else if (width >= 1100) {
            newDevice = "desktop"
        }

        if (newDevice !== device) {
            setDevice(newDevice)
        }
    }

    return (
        <CafesContext.Provider value={cafesState}>
            <LikedCafesContext.Provider value={{
                likedCafes,
                update: setLikedCafes
            }}>
                <DeviceContext.Provider value={device}>
                    <ShareModalContext.Provider
                        value={{
                            data: shareModalState,
                            update: setShareModalState
                        }}
                    >
                        {children}
                    </ShareModalContext.Provider>
                </DeviceContext.Provider>
            </LikedCafesContext.Provider>
        </CafesContext.Provider>
    )
}

export default AppProvider;