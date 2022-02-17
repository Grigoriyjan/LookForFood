import React from 'react'
import './Person.css'
import avatar from './avatar.png';

function Person({name, age, children}) { // {name: "Mike", age: 30}
  return (
    <div className="person">
      <img className="person-img" src={avatar} alt="" />
      <h3 className="title">{name}</h3>
      <p className="age">
        Age: <span>{age}</span>
      </p>
      <p className="proffession">
        Профессия: {children}
      </p>
    </div>
  );
}

export default Person
