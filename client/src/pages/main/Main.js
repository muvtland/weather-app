import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from 'react-loader-spinner'
import style from './main.module.css'
import Search from '../../components/search/Search'
import Locations from '../../components/locations/Locations'
import {locationsFetch, searchFetch} from '../../redux/actions'


const Main = React.memo(() => {
    const dispatch = useDispatch()
    const {myLocations, searchLoading} = useSelector(state => state)
    const [location, setLocation] = useState('')
    const [error, setError] = useState(false)
    const [errorText] = useState('Пожалуйста введите названия города')

    useEffect(() => {
            dispatch(locationsFetch(myLocations))
    }, [dispatch])

    const onChangeLocation = e => {
        setError(false)
        setLocation(e.target.value)
    }

    const searchLocation = () => {
        if (location.length) {
            dispatch(searchFetch(location))
        } else {
            setError(true)
        }
    }

    return (
        <>
            <div className={style.header}>

                <div className={style.title}>
                    Выберите Город
                </div>
                <div className={style.error} style={{visibility: error ? 'visible' : 'hidden'}}>
                    {errorText}
                </div>
                <div className={style.searchInner}>
                    <input type="text"
                           className={style.searchInput}
                           placeholder={'введите название города'}
                           onChange={onChangeLocation}
                    />
                    <button className={style.searchButton} onClick={searchLocation}>Искать</button>
                </div>
            </div>
            <div className={style.inner}>
                <Locations title='популярные города' type='popular'/>
                {
                    searchLoading && location ?
                        <div className={style.loading}>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={70}
                                width={70}
                            />
                        </div> :
                        <Search/>
                }

                <Locations title='ваш список городов' type='my'/>
            </div>
        </>
    )
})

export default Main