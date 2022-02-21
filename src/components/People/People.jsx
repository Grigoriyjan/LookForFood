import React from 'react'

import Person from './Person/Person';

function People({people, change, increase, remove}) {
  return (
    <div className="wrapper">
      {people.map((person) => {
        return (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            click={() => increase(person.id)}
            change={(event) => change(event, person.id)}
            remove={() => remove(person.id)}
          >
            {person.prof}
          </Person>
        );
      })}
    </div>
  );
}

export default People
