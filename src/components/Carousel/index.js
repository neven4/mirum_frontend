import React from 'react';

import styles from './styles.module.scss';

class Slider extends React.Component {
    isOx = null;
    isOy = null;
    lastTouch = 0;
    state = {
        imgs: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"],
        currentIndex: 0,
        movement: 0,
        transitionDuration: "0s",
        imageWidth: null
    };

    componentDidMount() {
        this.setState({
            imageWidth: window.innerWidth
        })
    }

    handleTouchStart = e => {
        this.lastTouch = e.nativeEvent.touches[0].clientX;
        this.startY = e.nativeEvent.touches[0].clientY;
        this.startX = e.nativeEvent.touches[0].clientX;
    };

    handleTouchMove = e => {
        const delta = this.lastTouch - e.nativeEvent.touches[0].clientX;
        const lastX = e.nativeEvent.touches[0].clientX - this.startX
        this.lastTouch = e.nativeEvent.touches[0].clientX;
        const lastY = e.nativeEvent.touches[0].clientY - this.startY
        
        if (this.isOx === null && this.isOy === null) {
            if (Math.abs(lastY) < Math.abs(lastX)) {
                this.isOx = true
            } else {
                this.isOy = true
            }
        }

        if (this.isOx) {
            document.body.style.overflowY = 'hidden'
            this.handleMovement(delta)
            e.preventDefault()
        }
        
        return;
    };

    handleTouchEnd = () => {
        this.handleMovementEnd();
        document.body.style.overflowY = 'scroll'
        this.lastTouch = 0;
        this.isOx = null
        this.isOy = null
    }

    handleMovement = delta => {
        const maxLength = this.state.imgs.length - 1;
        let nextMovement = this.state.movement + delta;

        if (nextMovement < 0) {
            nextMovement = 0;
        }

        if (nextMovement > maxLength * this.state.imageWidth) {
            nextMovement = maxLength * this.state.imageWidth;
        }

        this.setState({
            movement: nextMovement,
            transitionDuration: "0s"
        });
    };

    handleMovementEnd = () => {
        const { movement, currentIndex } = this.state;

        const endPosition = movement / this.state.imageWidth;
        const endPartial = endPosition % 1;
        const endingIndex = endPosition - endPartial;
        const deltaInteger = endingIndex - currentIndex;

        let nextIndex = endingIndex;

        if (deltaInteger >= 0) {
        if (endPartial >= 0.1) {
            nextIndex += 1;
        }
        } else if (deltaInteger < 0) {
            nextIndex = currentIndex - Math.abs(deltaInteger);
        if (endPartial > 0.9) {
            nextIndex += 1;
        }
        }

        this.transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));
    }

    transitionTo = (index, duration) => {
        this.setState({
        currentIndex: index,
        movement: index * this.state.imageWidth,
        transitionDuration: `${duration}s`,
        });
    }
    render() {
        const { currentIndex, movement, transitionDuration, imgs } = this.state;
        const maxLength = imgs.length - 1;
        const maxMovement = maxLength * this.state.imageWidth;

        return (
            <div className={ styles.slider}>
                <div
                    className={styles.main}
                    style={{
                        width: `${this.state.imageWidth}px`,
                        height: `${this.state.imageWidth}px`,
                    }}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                >
                    <div className={styles.photoCount}>
                        {`${currentIndex + 1}/${maxLength + 1}`}
                    </div>

                    <div className={styles.swiper}
                        style={{
                        transform: `translateX(${movement * -1}px)`,
                        transitionDuration: transitionDuration,
                        }}
                    >
                        
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                {movement !== 0 && (
                    <button
                    className="back move"
                    onClick={() => {
                        this.transitionTo(currentIndex - 1, 0.5);
                    }}
                    >
                    ←
                    </button>
                )}
                {movement !== maxMovement && (
                    <button
                    className="next move"
                    onClick={() => {
                        this.transitionTo(currentIndex + 1, 0.5);
                    }}
                    >
                    →
                    </button>
                )}
                </div>
            </div>
        );
    }
}

export default Slider;