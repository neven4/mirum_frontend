export const initialState = {
    cafes: null,
    cafesLoading: false
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'fetchCafesStart':
            return {
                cafes: null,
                cafesLoading: true
            }
        case 'fetchCafesEnd':
            return {
                cafes: action.data,
                cafesLoading: false
            }
        case 'fetchCafesError':
            return {
                cafes: null,
                cafesLoading: false
            }
        default:
            throw new Error();
    }
}