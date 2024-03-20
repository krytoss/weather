import Rain from "./Rain"
import Snow from "./Snow"
import Sun from "./Sun"
import Moon from "./Moon"
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
                } else if (e.main === "Clear") {
                    return <Sun key={i} />
                }
                return <></>
            }) }
            {
                (weather?.dt < weather?.sys.sunrise ||
                    weather?.dt > weather?.sys.sunset) ? <Moon /> : <Sun />
            }
        </div>
    )

}

export default WeatherAnimation