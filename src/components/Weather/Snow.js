import './Snow.css'

const Snow = () => {
    return (
        Array(100).fill(null).map((x, i) => {
            return (
                <hr
                    key={i}
                    className='snow'
                    style={{
                        'left': Math.floor(Math.random() * window.innerWidth) + "px",
                        'animationDuration': 2 + Math.random() * 0.3 + "s",
                        'animationDelay': Math.random() * 5 + "s"
                    }}
                />
            )
        })
    )
}

export default Snow