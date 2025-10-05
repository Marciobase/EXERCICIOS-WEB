import React from 'react'
import ReactDOM from 'react-dom/client'

import First from './components/FirstComponent'
import GoodMorning from './components/Bomdia'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <First />
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoodMorning nome='Marcio' sobrenome='Sant Anna' idade={15} />
)

// ReactDOM.render(
//     <GoodMorning />    
// , document.getElementById('root'))