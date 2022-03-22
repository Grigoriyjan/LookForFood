import React from 'react'
import forest from '../../img/forest.png'
import fields from '../../img/fields.jpg'
import mount from '../../img/inMount.jpg'
import desert from '../../img/desert.jpg'
import './Maps.css'
function Maps({map, choosen}) {
  return (
    <div onClick={choosen} className="map-container">
        <img src={map} alt="" className="map-img" />
    </div>
  )
}

export default Maps