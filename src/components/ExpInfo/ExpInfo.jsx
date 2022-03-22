import React from 'react'

function ExpInfo({expInfo}) {
  return (
    <div className="exp-info">
          <h2>Информация о прошлой экспедиции:</h2>
          <p>{expInfo.people}</p>
          <p>{expInfo.booty}</p>
    </div>
  )
}

export default ExpInfo