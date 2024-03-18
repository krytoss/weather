import { useState } from "react"

const WeatherApp = () => {

    const [location, setLocation] = useState(null)

    const getLocation = () => {
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
    }

    const locationSuccess = (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        setLocation({ lat: lat, lon: lon })
    }

    const locationError = () => {
        alert("Unable to retrieve your location.")
    }

    return (
        <div id='weather'>
            { !location && <p>Getting a location...</p> }
            <button onClick={ getLocation }>Get loc</button>
        </div>
    )
}

export default WeatherApp