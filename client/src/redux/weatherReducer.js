import {
    SEARCH,
    CELARSEARCH,
    ADDLOCATION,
    REMOVELOCATION,
    GETLOCATIONDETAILS,
    LOADINGSTART,
    LOADINGEND,
    GETOCATIONTEMPERATURE,
    CELARLOCATIONDETAILS,
    SEARCHLOADINGSTART,
    SEARCHLOADINGEND
} from './types'

const handlers = {
    [SEARCH]: (state, action) => {
        return {...state, findLocation: action.payload}
    },
    [CELARSEARCH]: state => {
        return{...state, findLocation: null}
    },
    [ADDLOCATION]: (state, action) => {
        let exist = false
        for (let i = 0; i < state.myLocations.length;i++){
            const location = state.myLocations[i].location
            if (location === action.payload.location){
                exist = true
                break
            }
        }
        if (!exist){
            localStorage.setItem('myLocations', JSON.stringify([...state.myLocations, action.payload]))
            return {...state, myLocations: [...state.myLocations, action.payload]}
        }else {
            return state
        }

    },
    [REMOVELOCATION]: (state, action) => {
        state.myLocations.splice(action.payload, 1)
        const locations = [...state.myLocations]
        localStorage.setItem('myLocations', JSON.stringify(locations))
        return {...state, myLocations: locations}
    },
    [GETLOCATIONDETAILS]: (state, action) => {
        console.log('GETLOCATIONDETAILS')
        return {...state, currentLocationDetails: action.payload}
    },
    [CELARLOCATIONDETAILS]: (state, action) => {
        return {...state, currentLocationDetails: action.payload}
    },
    [GETOCATIONTEMPERATURE]: (state, action) => {
        if (action.payload.myLocations.length){
            localStorage.setItem('myLocations', JSON.stringify(action.payload.myLocations))
        }
        return {...state, popularLocations: [...action.payload.popular], myLocations: [...action.payload.myLocations]}
    },
    [LOADINGSTART]: state => ({...state, loading: true}),
    [LOADINGEND]: state => ({...state, loading: false}),
    [SEARCHLOADINGSTART]: state => ({...state, searchLoading: true}),
    [SEARCHLOADINGEND]: state => ({...state, searchLoading: false}),
    DEFAULT: state => state
}



const initialState =  {
    popularLocations: [],
    myLocations: JSON.parse(localStorage.getItem('myLocations')) || [],
    findLocation: null,
    currentLocationDetails: null,
    loading: false,
    searchLoading: false
}


export const weatherReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}