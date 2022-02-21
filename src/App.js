import './App.css';

import React, { Component } from 'react';
import People from './components/People/People';
import ToggleButton from './components/ToggleButton/ToggleButton';
import Counter from './components/Counter/Counter';

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

    return (
      <div className="App">
        <h1 onClick={this.changeTitle}>{this.state.title}</h1>

        <ToggleButton
          show={this.state.isShow}
          toggler={this.toggle}
          count={this.state.people.length}
        >
          Переключить пользователей
        </ToggleButton>

        <Counter units={this.state.people}>Количество людей</Counter>

        {this.state.isShow ? (
          <People
            people={this.state.people}
            increase={this.increaseAge}
            change={this.changeName}
            remove={this.removePerson}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
