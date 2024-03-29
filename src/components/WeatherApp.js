import { useState, useEffect, useCallback } from "react"
import Button from "./Button"
import './WeatherApp.css'

const WeatherApp = ({ setTimeClass, weather, setWeather }) => {

    const [location, setLocation] = useState(null)
    const [city, setCity] = useState(null)

    const getLocation = useCallback(() => {
        setLocation(null)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                locationSuccess,
                locationError,
                {
                    enableHighAccuracy: false,
                    maximumAge: Infinity
                }
            )
        } else {
            alert("Geolocation not supported")
        }
    }, [])

    const locationSuccess = (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        setLocation({ lat: lat, lon: lon })
    }

    const locationError = () => {
        alert("Unable to retrieve your location.")
    }

    useEffect(() => {
        if (location) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lon}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setCity(
                    data.results[0].address_components.find((component) =>
                        component.types.includes('postal_town')
                    ).long_name
                )
            })
            .catch(error => console.log(error));
        } else {
            setCity(null)
        }
    }, [ location, setCity ])

    useEffect(() => {
        if (location) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                setWeather(data)
                const hour = 60 * 60
                const time = data.dt
                if (time - hour >= data.sys.sunset || time + hour < data.sys.sunrise) {
                    setTimeClass('night')
                } else if (time + hour >= data.sys.sunset) {
                    setTimeClass('evening')
                } else if (time - hour >= data.sys.sunrise) {
                    setTimeClass(null)
                } else if (time + hour >= data.sys.sunrise) {
                    setTimeClass('morning')
                }
                console.log(data)
            })
        }
    }, [ location, setWeather, setTimeClass ])

    useEffect(() => {
        getLocation()
    }, [ getLocation ])

    return (
        <div id='weather' className='p-10 max-w-xl md:px-10 md:py-8 backdrop-blur-xl w-full rounded-xl bg-white/90 text-black/90 shadow-2xl'>
            <Button onClick={ getLocation } className='bg-white hover:bg-gray-100 text-gray-800 border-gray-400' value='Get location'/>
            { !location && <p>Getting a location...</p> }
            { city && <h3 className='text-3xl'>{ city }</h3>}
            { weather &&
                <p>
                    { Math.round(weather.main.temp) } °C<br/>
                    (feels like { Math.round(weather.main.feels_like) } °C)
                </p>
            }
        </div>
    )
}

export default WeatherApp