import React from 'react'
import './GameBlocks.css'
function GameBlocks({ordered,show, foodIs, exodus, lightDisease,expFinished}) {
  return (
      <div onClick={!exodus ? ordered : expFinished }  className={`block ${show ? ' show' : ''}`}> <span className={`items ${show ? ' show' : ''}`}>{foodIs ? '🍖': lightDisease?  '😰' : '👤'}</span></div>
  )
}

export default GameBlocks