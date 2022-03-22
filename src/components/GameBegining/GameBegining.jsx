import React, { Component } from 'react'
import './GameBegining.css'
export default class GameBegining extends Component {
  state = {
    num:0,
  }
  addPeople = (event) =>
  {
    this.setState({ num: +event.target.value});
  }
  render() {
    let { population, food, start, treats} = this.props;
    return (
      <div className="game-began">
        <div className="resources">
          <h3 className='population'>👨‍🌾 {population - treats}</h3>
          <h3 className='food'>🍖{food}</h3>
        </div>
        <h3>Количество людей на экспедицию</h3>
        <input type="number" name='num' onChange={(event) => this.addPeople(event)} />
        <button disabled = {!this.state.num || this.state.num > population} className='startExpedition' onClick={() => start(this.state.num)}>Начать экспедицию</button>
      </div>
    )
  }
}
