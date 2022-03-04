import React from 'react'
import './GameBlocks.css'
function GameBlocks({ordered,show, ringIs, exodus, lightDisease}) {
  return (
      <div onClick={!exodus ? ordered : null }  className={`block ${show ? ' show' : ''}`}> <span className={`items ${show ? ' show' : ''}`}>{ringIs ? '🥩': lightDisease?  '😰' : '👤'}</span></div>
  )
}

export default GameBlocks