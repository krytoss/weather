import Rain from "./Rain"
import './WeatherAnimation.css'

const WeatherAnimation = ({ weather }) => {

    return (
        <div id='weatherAnimation'>
            { weather?.weather.map((e, i) => {
                if (['Rain', 'Drizzle', 'Thunderstorm'].includes(e.main)) {
                    <Rain />
                }
            }) }
        </div>
    )

}

export default WeatherAnimation