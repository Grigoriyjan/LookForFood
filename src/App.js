import './App.css';
import Person from './components/Person/Person';

import React, { Component } from 'react';

class App extends Component {
  state = {
    people: [
      { name: "Mike", age: 20, prof: "Web Developer" },
      { name: "John", age: 40, prof: "UI/UX Designer" },
    ],
    title: "Hello React",
  };

  changeName = () => {
    const people = [...this.state.people];
    const person = { ...this.state.people[0] };

    person.name = "Sam";
    people[0] = person;

    this.setState({ people });
  };

  increaseAge = () => {
    const people = this.state.people.map((person) => {
      return {
        ...person,
        age: ++person.age,
      };
    });

    this.setState({ people });
  };

  changeTitle = () => {
    this.setState({
      title: "Bye React"
    })
  }

  render() {
    return (
      <div className="App">
        <h1 onClick={this.changeTitle}>{this.state.title}</h1>

        <button onClick={this.changeName}>Изменить имя</button>
        <button onClick={this.increaseAge}>Увеличить возраст</button>

        <div className="wrapper">
          <Person
            name={this.state.people[0].name}
            age={this.state.people[0].age}
          >
            {this.state.people[0].prof}
          </Person>
          <Person
            name={this.state.people[1].name}
            age={this.state.people[1].age}
          >
            {this.state.people[1].prof}
          </Person>
        </div>
      </div>
    );
  }
}

export default App;
