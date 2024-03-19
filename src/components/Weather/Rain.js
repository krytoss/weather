import './Rain.css'

const Rain = () => {
    return (
        Array(100).fill(null).map((x, i) => {
            return (
                <hr
                    key={i}
                    className='raindrop'
                    style={{
                        'left': Math.floor(Math.random() * window.innerWidth) + "px",
                        'animationDuration': 0.3 + Math.random() * 0.3 + "s",
                        'animationDelay': Math.random() * 5 + "s"
                    }}
                />
            )
        })
    )
}

export default Rain