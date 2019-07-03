// Store/Reducers/favoriteReducer.js

const initialState = { favoritesBar: [] }

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoritesBarIndex = state.favoritesBar.findIndex(item => item.id === action.value.id)
            if (favoritesBarIndex !== -1) {
                nextState = {
                    ...state,
                    favoritesBar: state.favoritesBar.filter( (item, index) => index !== favoritesBarIndex)
                }
            }
            else {
                nextState = {
                    ...state,
                    favoritesBar: [...state.favoritesBar, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite