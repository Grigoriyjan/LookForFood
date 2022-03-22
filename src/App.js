import './App.css';

import React, { Component } from 'react';
import { v1 as uuidv1 } from 'uuid'

import Maps from './components/Maps/Maps';
import GameBlocks from './components/GameBlocks/GameBlocks';
import GameBegining from './components/GameBegining/GameBegining';

import forest from './img/forest.png'
import fields from './img/fields.jpg'
import mount from './img/inMount.jpg'
import desert from './img/desert.jpg'
import ExpInfo from './components/ExpInfo/ExpInfo';

const mapImg = [
  fields,
  forest,
  mount,
  desert,
]

class App extends Component {
  state = {
    items: [],
    exodus: null,
    treats: 0,
    people: 0,
    allPeople: 0,
    event: '',
    food: 0,
    population: 50,
    show: false,
    start: false,
    expInfo: {},
    randMaps: [],
    map: {}
  };
  backToStart = () => {
    this.setState({ start: false })
  }
  chooseMap = (number) => {
      if (number === 1) {
        return this.setState({ map: { mapSize: 40, food: 40, disease: 50, death: 60, show: true } })
      }
      if (number === 2) {
        return this.setState({ map: { mapSize: 30, food: 50, disease: 60, death: 70, show: true } })
      }
      if (number === 3) {
        return this.setState({ map: { mapSize: 30, food: 50, disease: 60, death: 70, show: true } })
      }
      if (number === 4) {
        return this.setState({ map: { mapSize: 70, food: 20, disease: 30, death: 40, show: true } })
      }
  }
  randMap = () => {
    let randMaps = [];
    let randNum
    while (randMaps.length !== 2) {
      randNum = Math.floor(Math.random() * 4 + 1);

      if (randMaps[0] && (randMaps[0].number === randNum)) {
        continue;
      }

      randMaps.push({ mapImg: mapImg[ randNum - 1 ], number: randNum, id: uuidv1() });

    }
    this.setState({ randMaps })
  }
  componentDidMount() {
    this.randMap()
  }
  getFood = () => {
    return ({ show: false, foodIs: true, id: uuidv1() })
  }
  getDisease = () => {
    return ({ show: false, lightDisease: true, id: uuidv1() })
  }
  getDeath = () => {
    return ({ treatIs: false, show: false, foodIs: false, id: uuidv1() })
  }
  addMap = (num) => {
    if (this.state.exodus !== null) {
      this.setState({ exodus: null })
    }
    this.setState({ people: num, allPeople: num })

    let items = []
    let randNum
    while (items.length !== this.state.map.mapSize) {
      randNum = Math.floor(Math.random() * 100);
      if (randNum <= this.state.map.food) {
        items.push(this.getFood())
      }
      if (randNum > this.state.map.food && randNum < this.state.map.disease) {
        items.push(this.getDisease())
      }
      if (randNum > this.state.map.death) {
        items.push(this.getDeath())
      }
    }

    this.setState({ items, start: true })
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
    if (this.state.items.filter(item => {
      return item.show
    }).length === 30) {
      this.setState({ start: false })
    }
    this.state.items.forEach(item => {
      let expInfo = this.getExpInfo()
      if (item === true) {
        return this.setState({ exodus: 'Экспедиция завершена', expInfo: this.getExpInfo() })
      }
      if (this.state.people === 0) {
        return this.setState({ exodus: 'Все ваши люди мертвы', expInfo: { people: 'Ваши люди погибли на экспедицие' }, food: 0 })
      }
      if (item.id === id && item.foodIs === true) {
        if (item.id === id && item.treatIs === true) {
          return
        }
        let food = this.state.food + 1;
        expInfo.booty = 'Добыто ' + food + ' единиц пищи.';
        return this.setState({ event: 'Вы нашли ' + food + ' еды', food, expInfo, treatIs: item.treatIs = true })
      }
      if (item.id === id && item.lightDisease === true) {
        if (item.id === id && item.treatIs === true) {
          return
        }
        let of_death = Math.floor(Math.random() * 6);
        if (this.state.people < of_death) {
          of_death = this.state.people
        }
        this.setState({ event: 'Ваши люди заболели!', treatIs: item.treatIs = true, people: this.state.people - of_death, treats: + this.state.treats + of_death })
      }
      if (item.id === id && item.foodIs === false) {
        if (item.id === id && item.treatIs === true) {
          return
        }
        this.setState({ treats: + this.state.treats + 1, treatIs: item.treatIs = true, people: + this.state.people - 1 })
      }
    })
  }
  getExpInfo = () => {
    return ({ people: 'Из людей в количестве ' + this.state.allPeople + ' человек, вернулись ' + this.state.people + ' человек.' })
  }
  stopExpedition = (expInfo) => {
    return this.setState({ exodus: 'Экспедиция завершена', expInfo })
  }
  render() {
    let blocks = (
      <div className="blocks-container">
        {
          this.state.items.map(block => {
            return <GameBlocks
              key={block.id}
              foodIs={block.foodIs}
              lightDisease={block.lightDisease}
              show={block.show}
              exodus={this.state.exodus}
              expFinished={this.backToStart}
              ordered={() => this.setPurchasing(block.id)}
            />
          })
        }
      </div>
    )
    let chooseMap =
      (
        <div className="maps-container">
          {
            this.state.randMaps.map(maps => {
              return <Maps
                key={maps.id}
                map={maps.mapImg}
                choosen={() => this.chooseMap(maps.number)}
              />
            })
          }
        </div>
      )
    let gameBegining =
      (
        <div className="choose">
          {
            <GameBegining
              start={this.addMap}
              population={this.state.population}
              food={this.state.food}
              treats={this.state.treats}
            />
          }
        </div>
      )
    let expInfo =
      (
        <div className="exp-info">
          {
            <ExpInfo
              expInfo={this.state.expInfo}
            />
          }
        </div>
      )
    if (this.state.start) {
      return (
        <div className="App">
          {blocks}
          <button onClick={() => this.stopExpedition(this.state.expInfo)} className='stop-exp'>Завершить</button>
          <h3 className='exodus'>{this.state.exodus}</h3>
          <div className='treats'>Погибло: <strong>{this.state.treats}</strong><h4 className='people-info'>Людей: <strong>{this.state.people}</strong></h4></div>
          <h3 className='event'>{this.state.event}</h3>
        </div>
      );
    } else {
      return (
        <div className="App">
          {gameBegining}
          <h1>Выберите локацию:</h1>
          {chooseMap}
          {expInfo}
        </div>
      )
    }
  }
}

export default App;
