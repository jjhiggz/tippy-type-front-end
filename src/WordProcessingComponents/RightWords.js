import React from 'react'

export default function RightWords({words}){
  const fillWords = (words) => {
   return  words.map(word => {
      return(
        <span className = "incomplete">{word + " "}</span>
      )
    })
  }
  return (
    <p
      className="right-words"
    >
      {fillWords(words)}
    </p>
  )
}