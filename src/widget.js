import React from 'react'

//weathe widget
const Widget = (props) =>{
  if (object.keys(props.data).length > 0){
    return (
      <div>
      <h1>{props.data.name} Weather</h1>
      <p> Latitude{props.data.coord.lat} longitude {props.data.coord}</p>
      <h4> {props.data.weather[0].main}</h4>
      <h3> current temperature is{props.data.main.temp} degrees F </h3>
      <p> Expected highs{props.data.main.temp_max} degrees F</p>
      <p> Wind Speeds{props.data.main.speed} mph</p>
      <h4> humidity{props.data.main.humidity} % | Pressure is{props.data.main.pressure}</h4>
      </div>
    )
  )



}else{
  return(
    <div>
    <h1>hello</h1>
    </div>
  )
  }
}
