import React, {useState, useLayoutEffect} from "react"

import styles from './styles.module.scss';

const MapSearch = ({ setSearchShow, cafes, onItemClick }) => {
    const [searchValue, setSearchValue] = useState("")
    const [showSuggestedList, setShowSuggestedList] = useState(false)

    useLayoutEffect(() => {
        document.addEventListener("click", outsideEventListener)

        return () => document.removeEventListener("click", outsideEventListener)
    }, [])

    const outsideEventListener = () => {
        setShowSuggestedList(false)
    }

    const onInputChange = (el) => {
        if (!showSuggestedList) {
            setShowSuggestedList(true)
        }

        setSearchValue(el.target.value)
    }
    
    return (
        <div className={`${styles.suggestInputContainer} ${styles.showInput}`}>
            <div className={`${styles.mapInputContainer}`}>
                <div className={styles.searchInputBody}>
                    <div className={styles.searchInputIcon}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="7.11907" cy="7.11914" rx="5.03394" ry="5.03394" transform="rotate(-45 7.11907 7.11914)" stroke="#727272" strokeWidth="2"/>
                            <path d="M10.3823 10.3823L13.6452 13.6452" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
        
                    <input
                        type="text"
                        value={searchValue}
                        onChange={onInputChange}
                        placeholder="Search"
                        onFocus={() => setShowSuggestedList(true)} 
                    />
        
                    <div className={styles.clearInputBtn}
                        onClick={() => setSearchValue("")}
                        style={{display: searchValue === "" ? "none" : "flex"}}
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1L1 9M1 1L9 9" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                
                <div className={styles.searchInputCancel}
                    onClick={() => setSearchShow(false)}
                >
                    Cancel
                </div>
            </div>

            {searchValue !== "" && showSuggestedList &&
                <div className={styles.suggestedList}>
                    {cafes
                        .filter(cafe =>
                            cafe.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                            cafe.addressName.toLowerCase().includes(searchValue.toLowerCase()))
                        .slice(0, 5)
                        .map(cafe =>
                            <div
                                key={cafe.id}
                                className={styles.suggestedValue}
                                onClick={() => onItemClick(cafe)}
                            >
                                <span>{cafe.title},</span> <span>{cafe.addressName}</span>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default React.memo(MapSearch)