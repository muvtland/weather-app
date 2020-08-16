import {
    SEARCH,
    LOADINGSTART,
    LOADINGEND,
    GETLOCATIONDETAILS,
    GETOCATIONTEMPERATURE,
    ADDLOCATION,
    CELARSEARCH,
    CELARLOCATIONDETAILS,
    REMOVELOCATION,
    SEARCHLOADINGSTART,
    SEARCHLOADINGEND
} from './types'

const loadingStart = () => ({type: LOADINGSTART})
const loadingEnd = () => ({type: LOADINGEND})
const searchLoadingStart = () => ({type: SEARCHLOADINGSTART})
const searchLoadingEnd = () => ({type: SEARCHLOADINGEND})
export const clearSearch = () => ({type: CELARSEARCH})
export const clearLocationDetails = () => ({type: CELARLOCATIONDETAILS, payload: null})
export const removeLocation = index => ({type: REMOVELOCATION, payload: index })


const addFoundLocation = location => {
    return dispatch => {
        dispatch({type: SEARCH, payload: location})
    }
}
const addLocationDetail = location => {
    return dispatch => {
        dispatch({type: GETLOCATIONDETAILS, payload: location})
    }
}
const addLocationsTemperature = locations => {
    return dispatch => {
        dispatch({type: GETOCATIONTEMPERATURE, payload: locations})
    }
}

export const addLocation = location => {
    return dispatch => {
        dispatch({type: ADDLOCATION, payload: location})
    }
}



export const searchFetch = location => {
    return async dispatch => {
        try{
            dispatch(searchLoadingStart())
            const response = await fetch('/api/weather/' + location)
            let data
            if (response.status === 200){
                data = await response.json()
            }else {
                data = null
            }
            dispatch(addFoundLocation(data))
            dispatch(searchLoadingEnd())
        }catch (e) {
            dispatch(addFoundLocation([]))
            dispatch(searchLoadingEnd())
        }
    }
}

export const detailsFetch = location => {
    return async dispatch => {
        try{
            dispatch(loadingStart())
            const response = await fetch('/api/weather/details/' + location)
            let data
            if (response.status === 200){
                data = await response.json()
            }else {
                data = null
            }
            dispatch(addLocationDetail(data))
            dispatch(loadingEnd())
        }catch (e) {
            dispatch(addLocationDetail(null))
            dispatch(loadingEnd())
        }
    }
}

export const locationsFetch = locations => {
    return async dispatch => {
        try{
            dispatch(loadingStart())
            const response = await fetch('/api/weather/temperature',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(locations)
                })
            let data
            if (response.status === 200){
                data = await response.json()
            }else {
                data = {popular: [], myLocations: []}
            }
            dispatch(addLocationsTemperature(data))
            dispatch(loadingEnd())
        }catch (e) {
            dispatch(addLocationsTemperature([]))
            dispatch(loadingEnd())
        }
    }
}