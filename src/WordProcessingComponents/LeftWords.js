import React from 'react'

export default function LeftWords({words, changeFocus}){
  const fillWords = (words) => {
    return  words.map(word => {
       return(
         <span className = { word.className }>{word.text + " "}</span>
       )
     })
   }
   return (
     <p
       className="left-words"
       onClick={changeFocus}
     >
       {fillWords(words)}
     </p>
   )
}