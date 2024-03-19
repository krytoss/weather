const Button = ({ value, className, onClick }) => {

    const handleClick = () => {
        onClick()
    }

    return (
        <button
            className={'btn font-semibold py-2 px-4 border rounded shadow ' + className}
            onClick={ handleClick }
        >
            {value}
        </button>
    )
}

export default Button