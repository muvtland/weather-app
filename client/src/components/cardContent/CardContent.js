import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import style from './cardContent.module.css'

const CardContent = React.memo(() =>  {
    const locationDetails = useSelector(state => state.currentLocationDetails)
    const [temp] = useState(Math.round(locationDetails.main.temp))
    const [tempMax] = useState(Math.round(locationDetails.main.temp_max))
    const [tempMin] = useState(Math.round(locationDetails.main.temp_min))
    const [pressure] = useState(locationDetails.main.pressure)
    const [humidity] = useState(Math.round(locationDetails.main.humidity))
    const [description] = useState(locationDetails.weather[0].description)
    const [windSpeed] = useState(Math.round(locationDetails.wind.speed) * 3.6)
    const [sunrise] = useState(convertMS(locationDetails.sys.sunrise))
    const [sunset] = useState(convertMS(locationDetails.sys.sunset))
    const [icon] = useState(locationDetails.weather[0].icon)
    const [dayDuration] = useState(dayDurationCalc(locationDetails.sys.sunrise, locationDetails.sys.sunset))
    const [location] = useState(`${locationDetails.name}, ${locationDetails.sys.country}`)
    const [date] = useState(getDate())



    function convertMS(milliseconds) {
        const d = new Date(milliseconds * 1000)
        let time, hours, minutes
        hours = d.getHours().toString().length < 2 ? `0${d.getHours()}` : d.getHours()
        minutes = d.getMinutes().toString().length < 2 ? `0${d.getMinutes()}` : d.getMinutes()
        time = `${hours}:${minutes}`
        return time
    }

    function dayDurationCalc(start, end) {
        const difference = end - start
        const hours = Math.floor(difference / (60 * 60))
        const minutes = Math.round(difference % (60 * 60) / 60)
        return `${hours}h ${minutes}m`
    }

    function getDate () {
        const date = new Date(Date.now()).toString().split(' ')
        const timeArr = date[4].split(':')
        const time = `${timeArr[0]}:${timeArr[1]}`
        return `${date[0]}, ${date[2]} ${date[1]} ${date[3]} | ${time}`
    }


    return (
        <div className={style.container}>
            {console.log('date')}
            <div className={style.title}>
                <div className={style.titleDate}>{date}</div>
                <div className={style.titleLocation}>{location}</div>
            </div>
            <div className={style.content}>
                <div className={style.main}>
                    <div className={style.description}>
                        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={'sunny'}/>
                        <div className={style.descriptionText}>{description}</div>
                    </div>
                    <div className={style.temperature}>
                        <div className={style.temperatureValue}>{temp}</div>
                    </div>
                    <div className={style.maxMin}>
                        <div className={style.max}>{tempMax}°C<span>&#8593;</span>
                        </div>
                        <div className={style.min}>{tempMin}°C<span>&#8595;</span></div>
                    </div>
                </div>
                <div className={style.atmosphere}>
                    <div className={style.humidity}>
                        <img src={'/img/humidity-icon.png'} alt={'humidity'}/>
                        <div className={style.humidityValue}>{humidity}%</div>
                        <div className={style.humidityText}>Humidity</div>
                    </div>
                    <div className={style.pressure}>
                        <img src={'/img/pressure-icon.png'} alt={'pressure'}/>
                        <div className={style.pressureValue}>{pressure}mBar</div>
                        <div className={style.pressureText}>Pressure</div>
                    </div>
                    <div className={style.wind}>
                        <img src={'/img/wind-icon.png'} alt={'wind'}/>
                        <div className={style.windValue}>{windSpeed} km/h</div>
                        <div className={style.windText}>Wind</div>
                    </div>
                </div>
                <div className={style.timing}>
                    <div className={style.sunrise}>
                        <img src={'/img/sunrise-icon.png'} alt={'sunrise'}/>
                        <div className={style.sunriseValue}>{sunrise} </div>
                        <div className={style.sunriseText}>Sunrise</div>
                    </div>
                    <div className={style.sunset}>
                        <img src={'/img/sunset-icon.png'} alt={'sunset'}/>
                        <div className={style.sunsetValue}>{sunset} </div>
                        <div className={style.sunsetText}>Sunset</div>
                    </div>
                    <div className={style.daytime}>
                        <img src={'/img/daytime-icon.png'} alt={'daytime'}/>
                        <div className={style.daytimeValue}>{dayDuration}</div>
                        <div className={style.daytimeText}>Daytime</div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default CardContent