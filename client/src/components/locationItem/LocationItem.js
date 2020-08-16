import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import style from './locationItem.module.css'
import {addLocation, clearSearch, detailsFetch, removeLocation} from '../../redux/actions'


const LocationItem = React.memo(({location, temperature, type, index}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleteAllowed, setDeleteAllowed] = useState(false)
    const currentLocation = location.split(',')[0]


    const goTo = () => {
        if (!deleteAllowed){
            if (type === 'search') {
                dispatch(addLocation({location, temperature}))
            }
            dispatch(clearSearch())
            dispatch(detailsFetch(currentLocation))
            history.push(`/details/${currentLocation}`)
        }
    }

    const removeCurrentLocation = () => {
        dispatch(removeLocation(index))
    }


    return (
        <div
            className={style.container}
            onClick={goTo}
            onMouseEnter={() => setDeleteVisible(true)}
            onMouseLeave={() => setDeleteVisible(false)}
        >
            <div className={style.location}>{location}</div>
            {
                type === 'my' && deleteVisible ?
                    null :
                    <div className={style.temperature}>{temperature}°C</div>
            }
            {
                type === 'my' && deleteVisible ?
                <div className={style.delete}
                     onMouseEnter={() => setDeleteAllowed(true)}
                     onMouseLeave={() => setDeleteAllowed(false)}
                     onClick={removeCurrentLocation}>
                    &#9746;
                </div> : null
            }
        </div>
    )
})

export default LocationItem