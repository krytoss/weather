import Rain from "./Rain"
import Snow from "./Snow"
import './WeatherAnimation.css'

const WeatherAnimation = ({ weather }) => {

    return (
        <div id='weatherAnimation'>
            { weather?.weather.map((e, i) => {
                console.log(e.main)
                if (['Rain', 'Drizzle', 'Thunderstorm'].includes(e.main)) {
                    return <Rain key={i} />
                } else if (e.main === 'Snow') {
                    return <Snow key={i} />
                }
            }) }
        </div>
    )

}

export default WeatherAnimation