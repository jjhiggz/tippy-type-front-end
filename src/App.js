import AllWordContainer from './containers/AllWordContainer'
import TopicMenu from './containers/TopicMenu'
import ThemeBox from './containers/ThemeBox'
import Timer from './customHooks/Timer'
import React, { useState, useEffect } from 'react';

export default function App(props){
  const [words, setWords] = React.useState([])
  const [topic, setTopic] = React.useState('')
  const [gameActive, setGameActive] = React.useState('')
  
  const sample = (array) => {
    return array[Math.floor ( Math.random() * array.length )]
  }
  const getWords = (topic) => {
    fetch('http://localhost:9000/topics')
      .then(response => response.json())
      .then(topics => findTopic(topic,topics))
  }

  const findTopic = ( topicName, topicsArray ) => {
    const topicObject = topicsArray.find( top => {
      return top.name === topicName
    })
    const {name, words} = topicObject
    createGameWords(JSON.parse(words))
  }

  const createGameWords = (words) => {
    let newWords = []
    for(let i=0; i < 300; i++){
      newWords.push(sample(words))
    }
    newWords = newWords
      .join(' ')
      .split(' ')
      .filter(term => term !== '')

    setWords(newWords)
  }
    return(
      <>
        <ThemeBox/>
        < TopicMenu 
          getWords = { getWords }
        />
      
        <AllWordContainer
          words = { words }
        />
        <Timer/>
      </>
    )
}