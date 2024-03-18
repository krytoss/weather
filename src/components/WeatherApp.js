import { useState, useEffect, useCallback } from "react"

const WeatherApp = () => {

    const [location, setLocation] = useState(null)
    const [city, setCity] = useState(null)
    const [weather, setWeather] = useState(null)

    const getLocation = useCallback(() => {
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
                console.log(data)
                setWeather(data)
            })
        }
    }, [ location, setWeather ])

    useEffect(() => {
        getLocation()
    }, [ getLocation ])

    return (
        <div id='weather'>
            { !location && <p>Getting a location...</p> }
            { city && <p>{ city }</p>}
            { weather &&
                <p>
                    { Math.round(weather.main.temp) } °C<br/>
                    (feels like { Math.round(weather.main.feels_like) } °C)
                </p>
            }
            <button onClick={ getLocation }>Get loc</button>
        </div>
    )
}

export default WeatherApp