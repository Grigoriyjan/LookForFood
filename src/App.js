import './App.css';

import React, { Component } from 'react';
import GameBlocks from './components/GameBlocks/GameBlocks';
import { v1 as uuidv1 } from 'uuid'

class App extends Component {
  state = {
    items: [],
    exodus: '',
    treats: 0,
    people: 15,
    event:'',
    food:0,
    population:300,
    show: false
  };
  addGameBlocks = () => {
    let randNum = Math.floor(Math.random(1) * 36);
    let randDisease = Math.floor(Math.random(1) * 36);
    let randMapSize = Math.floor(Math.random(10) * 50);
    console.log(randMapSize);
    let items = []
    while (items.length !== randMapSize) {
      if (items.length === randNum) {
        items.push({ show: false, diseaseIs: true, ringIs: true, id: uuidv1() })
      }
      if (items.length === randDisease) {
        items.push({ show: false, lightDisease: true, id: uuidv1() })
      }else {
        items.push({treatIs: false, show: false, ringIs: false, id: uuidv1() })
      }
    }
    this.setState({ items })
  }
  componentDidMount() {
    this.addGameBlocks()
  }
  setPurchasing = (id) => {
    const items = this.state.items.map(item => {
      if (item.id === id) {
        item.show = true
      }
      return item
    })
    this.getExodus(id)
    this.setState({ items })
  };
  getExodus = (id) => {
    this.state.items.forEach(item => {
      if (this.state.people === 0) {
        return this.setState({ exodus: 'Все ваши люди мертвы'})
      }
      if (item.id === id && item.ringIs === true) {
        return this.setState({ exodus: 'Вы нашли еду! Выжило: ' + this.state.people + ' человек' })
      }
      if (item.id === id && item.lightDisease === true) {
        if (item.id === id && item.treatIs=== true) {
          return
        }
        let of_death = Math.floor(Math.random(1) * 6);
        console.log(of_death);
        this.setState({event: 'Ваши люди заболели ', people: this.state.people - of_death})
      }
      if (item.id === id && item.ringIs === false) {
        if (item.id === id && item.treatIs=== true) {
          return
        }
        this.setState({treats: + this.state.treats + 1, treatIs: item.treatIs = true, people: + this.state.people -1})
      }
    })
  }
  render() {
    let blocks = (
      <div className="blocks-container">
        {
          this.state.items.map(block => {
            return <GameBlocks
              key={block.id}
              ringIs={block.ringIs}
              lightDisease={block.lightDisease}
              show={block.show}
              exodus ={this.state.exodus}
              ordered={() => this.setPurchasing(block.id)}
            />
          })
        }
      </div>
    )
    return (
      <div className="App">
        {blocks}
        <h3 className='exodus'>{this.state.exodus}</h3>
        <div className='treats'>Умерло с голоду: <strong>{this.state.treats}</strong><h4 className='people-info'>Население: <strong>{this.state.people}</strong></h4></div>
        <h3 className='event'>{this.state.event}</h3>
      </div>
    );
  }
}

export default App;