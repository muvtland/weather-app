import React from 'react'
import style from './locations.module.css'
import LocationsItem from '../locationItem/LocationItem'
import {useSelector} from 'react-redux'
import Loader from "react-loader-spinner";


export default ({title, type}) => {
    const {popularLocations, myLocations, loading} = useSelector(state => state)
    const locationList = type === 'my' ? myLocations : popularLocations


    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.title}>{title}</div>
            </div>
            <>
                {
                    locationList.length ?
                        locationList.map((item, index) =>
                            <LocationsItem key={index} index={index} type={type} location={item.location}
                                           temperature={item.temperature}/>
                        )
                        : loading ?
                        <div className={style.loading}>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={70}
                                width={70}
                            />
                        </div> :
                        <div className={style.empty}>Список городов пуст</div>
                }
            </>
        </div>
    )
}