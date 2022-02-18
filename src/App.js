import './App.css';
import Person from './components/Person/Person';

import React, { Component } from 'react';

class App extends Component {
  state = {
    people: [
      { name: "Mike", age: 20, prof: "Web Developer", id: 1 },
      { name: "John", age: 40, prof: "UI/UX Designer", id: 2 },
      { name: "Sam", age: 30, prof: "Граф Designer", id: 3 },
      { name: "Ketty", age: 50, prof: "Backend Developer", id: 4 },
    ],
    title: "Hello React",
    isShow: true,
  };

  changeName = (event, id) => {
    const index = this.state.people.findIndex((person) => person.id === id);
    const people = [...this.state.people];
    const person = { ...this.state.people[index] };

    person.name = event.target.value;
    people[index] = person;

    this.setState({ people });
  };

  increaseAge = (id) => {
    const index = this.state.people.findIndex(person => person.id === id);
    const people = [...this.state.people];
    const person = { ...this.state.people[index] };

    person.age++;
    people[index] = person;

    this.setState({ people });
  };

  changeTitle = () => {
    this.setState({
      title: "Bye React",
    });
  };

  toggle = () => {
    this.setState({
      isShow: !this.state.isShow, // false
    });
  };

  removePerson = (id) => {
    const people = this.state.people.filter(person => person.id !== id);

    this.setState({people});
  }

  render() {
    let wrapper = null;

    if (this.state.isShow) {
      wrapper = (
        <div className="wrapper">
          {
            this.state.people.map( (person) => {
              return (
                <Person
                  key={person.id}
                  name={person.name}
                  age={person.age}
                  click={() => this.increaseAge(person.id)}
                  change={(event) => this.changeName(event, person.id)}
                  remove={() => this.removePerson(person.id)}
                >
                  {person.prof}
                </Person>
              );
            })
          }
        </div>
      );
    }

    return (
      <div className="App">
        <h1 onClick={this.changeTitle}>{this.state.title}</h1>
        <button onClick={this.toggle}>Переключить Юзеров</button>
        {wrapper}
      </div>
    );
  }
}

export default App;
