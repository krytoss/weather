import './Snow.css'

const Snow = () => {
    return (
        Array(200).fill(null).map((x, i) => {
            const classRand = Math.random()
            return (
                <hr
                    key={i}
                    className={
                        'snow ' +
                        (classRand < 0.33
                            ? 'left'
                            : classRand < 0.66
                                ? 'center'
                                : 'right' )
                    }
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