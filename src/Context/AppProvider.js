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
        likedCafes: []
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

    componentWillUnmount() {
        this.saveToStorage()
        window.removeEventListener("resize", this.updateScreenWidth)
        window.removeEventListener("pagehide", this.saveToStorage)  
    }

    saveToStorage = () => {
        localStorage.setItem("likedCafes", JSON.stringify(this.state.likedCafes))
    }

    updateScreenWidth = () => {
		this.setState({
			width: window.innerWidth
		})
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