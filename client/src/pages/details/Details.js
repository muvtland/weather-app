import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Loader from 'react-loader-spinner'
import style from './details.module.css'
import CardContent from '../../components/cardContent/CardContent'
import {clearLocationDetails, detailsFetch} from '../../redux/actions'

const Details =  React.memo(props  =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const locationDetails = useSelector(state => state.currentLocationDetails)
    const loading = useSelector(state => state.loading)


    if (!loading && !locationDetails){
        dispatch(detailsFetch(props.match.params.location))
    }

    useEffect(() => {
        return () => {
            dispatch(clearLocationDetails())
        }
    }, [dispatch])

    const back = () => {
        history.push('/')
    }

    return (
        <>
            <div className={style.navbar}>
                <button className={style.back} onClick={back}>
                    <span>&#8592;</span> вернутся к списку городов
                </button>
            </div>
            <div className={style.content}>
                {
                    locationDetails ?
                        <div className={style.card}>
                            <div className={style.cardImage}/>
                            <CardContent type={'day'}/>
                        </div>
                        :
                        <Loader
                            type="TailSpin"
                            color="#00BFFF"
                            height={70}
                            width={70}
                        />
                }
            </div>
        </>
    )
})

export default Details