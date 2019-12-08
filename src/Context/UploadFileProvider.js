import Context from './Context';
import React, {Component} from 'react';

class UploadFileProvider extends Component {
    state = {
        width: '', 
        coords: null,
        placeCoords: null,
        // cards: [
        //     {
        //     }
        // ]
    };

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

export default UploadFileProvider;