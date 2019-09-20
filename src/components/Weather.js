import React from 'react'

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const Weather = props => (
    <div className="weather__info">
        { 
            props.city && props.country && <p className="weather__key">Location:
            <span className="weather__value"> { props.city }, { props.country }</span>
            </p> 
        }
        { 
            props.temperature && <p className="weather__key">Temperature:
            <span className="weather__value"> {`${parseInt (props.temperature, 10)}`} °C</span>
            </p> 
        }
        { 
            props.humidity && <p className="weather__key">Humidity:
            <span className="weather__value"> { props.humidity } RH</span>
            </p> 
        }
        { 
            props.description && <p className="weather__key">Conditions:
            <span className="weather__value"> { capitalize (props.description) }</span>
            </p>
        }
        {
            props.error && <p className="weather__key">
            <span className="weather__value"> { props.error }</span>
            </p> 
        }
    </div>
)

export default Weather;