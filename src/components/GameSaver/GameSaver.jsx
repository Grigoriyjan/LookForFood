import React, { useEffect, useState } from 'react'
import './GameSaver.css'
import axios from '../../api/axios.orders'
function GameSaver({population, food, randMaps, expInfo, treats, loadGame}) {
    const [save, setSave] = useState({})
    useEffect(() => {
        axios.get('/orders.json').then(res => {
          let save = Object.keys(res.data).map(key => {
            return {
              ...res.data[key],
              id: key
            }
          })
          setSave(save[0])
        })
      }, [])
    const saveGame = () =>
    {
      let gamePost = {population: population - treats, food: food, expInfo: expInfo, randMaps: randMaps}
      if (Object.keys(save).length) {
        return axios.put(`/orders/${save.id}.json`, gamePost)
      }
      axios.post(`/orders.json`, gamePost)
    }
  return (
    <div className='save-load'>
        <button onClick={saveGame} className="save-btn">Сохранить прогресс</button>
        <button onClick={() => loadGame(save)} className="load-btn">Загрузить прогресс</button>
    </div>
  )
}

export default GameSaver