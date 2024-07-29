const Display = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, please specify another filter...
            </div>
        )
    } else if (countries.length > 1 && countries.length < 10) {
        return (
            countries.map(country =>
                <li>
                    {country.name.common}
                </li>
            )
        )
    }
}

export default Display