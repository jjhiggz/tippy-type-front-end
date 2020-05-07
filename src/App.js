import React from 'react'
import AllWordContainer from './containers/AllWordContainer'
import TopicMenu from './containers/TopicMenu'
import ThemeBox from './containers/ThemeBox'
import Timer from './customHooks/Timer'

export default class App extends React.Component{
  state = {
    words: [],
    topic: [],
    // timeLeft: 5,
    gameActive: false,
  }


  // startTimer = () => {
  //   let interval = setInterval( () => {
  //     this.setState({ timeLeft: this.state.timeLeft - 1})
  //   }, 1000)
  //   if(this.state.timeLeft === 0){ clearInterval(interval) }
  // }


  sample = (array) => {
    return array[Math.floor ( Math.random() * array.length )]
  }
  getWords = (topic) => {
    fetch('http://localhost:9000/topics')
      .then(response => response.json())
      .then(topics => this.findTopic(topic,topics))

  }

  findTopic = ( topicName, topicsArray ) => {
    const topicObject = topicsArray.find( top => {
      return top.name === topicName
    })
    const {name, words} = topicObject
    this.createGameWords(JSON.parse(words))
  }

  createGameWords(words){
    let newWords = []
    for(let i=0; i < 300; i++){
      newWords.push(this.sample(words))
    }

  newWords = newWords
    .join(' ')
    .split(' ')
    .filter(term => term !== '')
  this.setState({words: newWords})
}

  render(){
    const  { getWords, updateGameActive } = this
    const { words, gameActive } = this.state
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
    )}
}