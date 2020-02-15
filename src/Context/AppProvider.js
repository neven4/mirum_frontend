import Context from './Context';
import React, {Component} from 'react';
import fetchCafes from "../Utils/fetchCafes"

const cafes = fetchCafes()

class AppProvider extends Component {
    state = {
        width: null, 
        coords: null,
        placeCoords: null,
        cafes: cafes,
        likedCafes: [],
        shareModalOpen: false,
        shareModalPage: null,
        shareModalId: null,
        device: null,
        map: null
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateScreenWidth)
        window.addEventListener("pagehide", this.saveToStorage)
        this.updateScreenWidth()

        const newLikedCafes = JSON.parse(localStorage.getItem("likedCafes"))

        if (newLikedCafes && Array.isArray(newLikedCafes)) {
            this.setState({
                likedCafes: newLikedCafes
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {width} = this.state
        if (prevState.width !== width) {
            this.setDevice(width)
        }
    }

    componentWillUnmount() {
        this.saveToStorage()
        window.removeEventListener("resize", this.updateScreenWidth)
        window.removeEventListener("pagehide", this.saveToStorage)  
    }

    saveToStorage = () => {
        localStorage.setItem("likedCafes", JSON.stringify(this.state.likedCafes))
    }

    updateScreenWidth = () => {
        const width = window.innerWidth
		this.setState({
			width
		}, () => {
            if (!this.state.device) {
                this.setDevice(width)
            }
        })
    }
    
    setDevice = (width) => {
        let device = ""
        if (width <= 650) {
            device = "mobile"
        } else if (width > 650 && width < 1100) {
            device = "tablet"
        } else if (width >= 1100) {
            device = "desktop"
        }

        if (device !== this.state.device) {
            this.setState({
                device
            })
        }
    }

    updateState = (newState) => {
        this.setState({...this.state, ...newState})
    }

    render() {
        return (
            <Context.Provider
                value={{
                    state: this.state,
                    update: this.updateState
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default AppProvider;