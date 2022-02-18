import React from 'react'
import './Person.css'
import avatar from './avatar.png';

function Person({ name, age, children, click, change, remove }) {
  // {name: "Mike", age: 30}
  return (
    <div className="person">
      <img onClick={click} className="person-img" src={avatar} alt="" />
      <h3 className="title" onClick={remove}>{name}</h3>
      <input
        type="text"
        className="change__name"
        value={name}
        onChange={change}
      />
      <p className="age">
        Age: <span>{age}</span>
      </p>
      <p className="proffession">Профессия: {children}</p>
    </div>
  );
}

export default Person
