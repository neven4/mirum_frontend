import Context from './Context';
import React, {Component} from 'react';
import fetchCafes from "../Utils/fetchCafes"

const cafes = fetchCafes()

interface Props {
    children: React.ReactNode
}

export interface State {
    cafes: {
        read: () => any
    };
    likedCafes: string[];
    shareModalOpen: boolean;
    shareModalPage: string | null;
    shareModalId: string | null;
    device: string | null;
}

class AppProvider extends Component<Props, State> {
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
        const storageLikedCafes: string = localStorage.getItem("likedCafes") || ""

        const newLikedCafes: [] = JSON.parse(storageLikedCafes)

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

    saveToStorage = () : void => {
        const {likedCafes} : {likedCafes: string[]} = this.state
        localStorage.setItem("likedCafes", JSON.stringify(likedCafes))
    }
    
    setDevice = () => {
        const width = window.innerWidth

        let device: string = ""
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

    updateState = (newState: any): void => {
        this.setState({...this.state, ...newState})
    }

    render() {
        const {children} = this.props

        return (
            <Context.Provider
                value={{
                    state: this.state,
                    update: this.updateState
                }}
            >
                {children}
            </Context.Provider>
        );
    }
}

export default AppProvider;