import React from 'react'
import {useSelector} from 'react-redux'
import style from './search.module.css'
import LocationItem from '../locationItem/LocationItem'

export default () => {
    const searchLocation = useSelector(state => state.findLocation)
    const text = searchLocation && searchLocation.code === 404 ? 'К сожилению Мы не нашли Ваш Город' : 'Мы нашли Ваш город'

    return (
        <div className={style.container}>
            {searchLocation ?
                <>
                    <div className={style.title}>{text}</div>
                    {!searchLocation.code && <LocationItem location={searchLocation.location} type={'search'} temperature={searchLocation.temperature}/>}
                </>
                : null
            }
        </div>
    )
}