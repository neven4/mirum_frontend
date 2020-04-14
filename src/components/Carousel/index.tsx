import React from 'react';
import Context, {IContext} from "../../Context/Context"
import {IPhoto} from "../Main"

import styles from './styles.module.scss';

interface Props {
    images: IPhoto[],
    authorInside?: boolean
}

interface State {
    imgs: IPhoto[],
    currentIndex: number,
    movement: number,
    transitionDuration: string,
    imageWidth: number
}

class Slider extends React.Component<Props, State> {
    static contextType = Context

    isOx: boolean | null = null;
    isOy: boolean | null = null;
    startY: number = 0;
    startX: number = 0;
    lastTouch = 0;
    sliderDiv: React.RefObject<HTMLDivElement> = React.createRef()
    state = {
        imgs: [],
        currentIndex: 0,
        movement: 0,
        transitionDuration: "0s",
        imageWidth: 0
    };

    componentDidMount() {
        this.setState({
            imageWidth: this.sliderDiv.current ? this.sliderDiv.current.offsetWidth : 0,
            imgs: this.props.images
        })
    }

    handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        this.lastTouch = e.nativeEvent.touches[0].clientX;
        this.startY = e.nativeEvent.touches[0].clientY;
        this.startX = e.nativeEvent.touches[0].clientX;
    };

    handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
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

    handleMovement = (delta: number) => {
        const maxLength = this.state.imgs.length - 1;
        let nextMovement = this.state.movement + delta;
        const {imageWidth} = this.state

        if (nextMovement < 0) {
            nextMovement = 0;
        }

        if (nextMovement > maxLength * imageWidth) {
            nextMovement = maxLength * imageWidth;
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

    transitionTo = (index: number, duration: number) => {
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
            <div>
                <div
                    className={ styles.slider}
                    ref={this.sliderDiv}
                >
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
                            {imgs.map((el: IPhoto, i) => {
                                return <div key={i}
                                    className={styles.imageHolder}
                                >
                                    <img
                                        alt={`Cafe img num. ${i}. author: ${el.author}`}
                                        decoding="auto"
                                        sizes="(max-width: 374px) 640w, (max-width: 699px) 750w, (min-width: 700px) 1080w"
                                        srcSet={`${el["640"]} 640w, ${el["750"]} 750w, ${el["1080"]} 1080w`}
                                        src={el.source}
                                        style={{objectFit: "cover"}}
                                    />
                                </div>
                            })}
                        </div>
                    {movement !== 0 &&
                        <div
                            className={`${styles.moveContainer} ${styles.moveContainer_left}`} 
                            onClick={() => {
                                this.transitionTo(currentIndex - 1, 0.5);
                            }}
                        >
                            <button
                                className={styles.move} 
                            >
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.11108 0.666626L0.777751 3.99996L4.11108 7.33329" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        
                    }
                    {movement !== maxMovement &&
                        <div
                            className={`${styles.moveContainer} ${styles.moveContainer_right}`} 
                            onClick={() => {
                                this.transitionTo(currentIndex + 1, 0.5);
                            }}
                        >
                            <button
                                className={styles.move}
                            >
                                <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.888916 0.666626L4.22225 3.99996L0.888916 7.33329" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        
                    }
                    </div>
                </div>
                <p className={ `${styles.authorText} ${this.props.authorInside ? styles.authorTextInside : ""}`}>
                    {imgs && imgs[currentIndex] && imgs[currentIndex]["author"]
                        ? `Источник: ${imgs[currentIndex]["author"]}`
                        : ""
                    }
				</p>
            </div>
        );
    }
}

export default Slider;