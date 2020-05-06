import React from 'react'
import './TopicMenu.css'

export default function TopicMenu({getWords}) {
const handleClick = (input) => {
  getWords(input)
}
  return (
  <div id='topic-menu'>
    <h3>Choose a Topic</h3>
    <nav id="topic-menu-items">
      <li onClick={()=> handleClick('doom')}>DOOM</li>
      <li onClick={()=> handleClick('fastFood')}>Fast Food</li>
      <li onClick={()=> handleClick('music')}>Music</li>
      <li onClick={()=> handleClick('tigerKing')}>Tiger King</li>
      <li onClick={()=> handleClick('badWords')}>Bad Words</li>
    </nav>
  </div>
  )
}