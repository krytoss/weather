import { useState, useEffect } from "react"

const WeatherApp = () => {

    const [location, setLocation] = useState(null)
    const [city, setCity] = useState(null)

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
    }, [ location ])

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <div id='weather'>
            { !location && <p>Getting a location...</p> }
            { city && <p>{ city }</p>}
            <button onClick={ getLocation }>Get loc</button>
        </div>
    )
}

export default WeatherApp