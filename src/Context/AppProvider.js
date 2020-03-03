import Context from './Context';
import React, {Component} from 'react';
import fetchCafes from "../Utils/fetchCafes"

const cafes = fetchCafes()

class AppProvider extends Component {
    state = {
        cafes: cafes,
        likedCafes: [],
        shareModalOpen: false,
        shareModalPage: null,
        shareModalId: null,
        device: null,
    };

    componentDidMount() {
        window.addEventListener("resize", this.setDevice)
        window.addEventListener("pagehide", this.saveToStorage)
        this.setDevice()

        const newLikedCafes = JSON.parse(localStorage.getItem("likedCafes"))

        if (newLikedCafes && Array.isArray(newLikedCafes)) {
            this.setState({
                likedCafes: newLikedCafes
            })
        }
    }

    componentWillUnmount() {
        this.saveToStorage()
        window.removeEventListener("resize", this.setDevice)
        window.removeEventListener("pagehide", this.saveToStorage)  
    }

    saveToStorage = () => {
        localStorage.setItem("likedCafes", JSON.stringify(this.state.likedCafes))
    }
    
    setDevice = () => {
        const width = window.innerWidth

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