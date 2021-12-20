import React, { useState, useEffect } from "react";
import img from "./img/bg.jpg"
// require('dotenv').config()
// import * as dotenv from "dotenv"

const API_KEY = process.env.REACT_APP_KEY

const App = () => {
  const [data, setData] = useState(null)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [temperature, setTemperature] = useState("")
  const [humidity, setHumidity] = useState("")
  const [description, setDescription] = useState("")
  const [windSpeed, setWindSpeed] = useState("")
  const [error, setError] = useState(false)

  const fetchWeather = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(json => setData(json))
  }


  useEffect(() => {
    if (data) {
      if (data.cod === "200") {
        setTemperature(data.main.temp)
        setHumidity(data.main.humidity)
        setDescription(data.weather[0].description)
        setWindSpeed(data.wind.speed)
        setError(false)
      }
      else {
        setError(true)
      }
    }
  }, [data])

  return (
    <div className="container position-absolute top-50 start-50 translate-middle">
      <div className="card border-info pb-3">
        <img src={img} className="card-img-top" style={{ height: "20vh" }} alt="..." />

        <div className="card-body">
          <h5 className="card-title m-2">
            <h1 className="title-container__title">Atmosph</h1>
            <p className="title-container__subtitle">Weather finder app</p>
          </h5>

          {/* <span className="position-absolute" style={{ top: '20vh', left: '30vw' }}>
            <i style={{ fontSize: '5rem', color: 'cornflowerblue' }} className="bi bi-cloud-drizzle"></i>
          </span> */}


          <div className="d-flex flex-row">
            <input className="m-2 col border-primary form-control" onInput={e => setCity(e.target.value)} type="text" name="city" placeholder="City..." />
            <input className="m-2 col border-primary form-control" onInput={e => setCountry(e.target.value)} type="text" name="country" placeholder="Country..." />
            <button className="m-2 btn btn-sm btn-outline-primary" onClick={fetchWeather}>Submit</button>
          </div>

          {data && !error &&
            (
              <table className="table table-responsive table-sm table-borderless mt-4">
                <thead>
                  <tr>
                    <th>Temperature</th>
                    <th>Description</th>
                    <th>Wind Speed</th>
                    <th>Humidity</th>
                  </tr>
                </thead>
                <tbody className="text-capitalize">
                  <tr>
                    <td>{temperature}°C</td>
                    <td>{description}</td>
                    <td>{windSpeed} mph</td>
                    <td>{humidity} Relative Humidity</td>
                  </tr>
                </tbody>
              </table>
            )
          }

          {error &&
            (
              <div className="text-center text-danger mt-5 mx-2 py-2 card border-danger">
                <span>Please fill in the city and country name</span>
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default App;