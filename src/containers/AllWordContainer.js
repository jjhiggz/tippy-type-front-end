import React from 'react';
import BadWords from '../words/BadWords'
import LeftWords from '../WordProcessingComponents/LeftWords'
import RightWords from '../WordProcessingComponents/RightWords'
import CurrentWord from '../WordProcessingComponents/CurrentWord'
import './AllWordContainer.css'

export default class AllWordContainer extends React.Component{

  state = {
    topic: 'badwords',
    words: [],
    completedWords: [],
    incompletedWords: [],
    currentWord: '',
    currentInput: '',
    currentInputCharacter: '',
    currentCharacter: '',
    characterCount:1,
    correctWordCount: 0,
    incorrectWordCount: 0,
    completedWordCount: 0,
  }
incrementState = (stateKey) => {
  this.setState({[stateKey]:this.state[stateKey]+1})
}
resetState = ( stateKey, defaultValue = 0 ) => {
  this.setState({[stateKey]: defaultValue})
}
//lifecycle methods
  componentDidUpdate(prevProps){
    if(this.props.words !== prevProps.words){
      this.setState( { words: this.props.words })
      this.populateGameWords(this.props.words)
      this.changeFocusToInput()
    }
  }
//populates Game Words
  populateGameWords = (words) => {
    this.setState({incompletedWords:words})
    this.setState({currentWord:words[0]})
  }
// gets last character of a string
  getLastCharacter = (string) => {
    return string.charAt( string.length - 1 )
  }

  handleInputChange = (event) => {
    let input = event.target.value
    this.setState({currentInput: input})
    const currentCharacter = this.getLastCharacter(input)
    this.setState({characterCount:input.split('').length})
    if( currentCharacter === ' ' ){
      this.handleSpace()
    }
    else{
      this.handleCharacter()
    }
  }
  handleSpace = () => {
    console.log('handling space')
    if(this.state.characterCount !== 0){
      const newWord = this.state.currentInput.trim()
      const newWordObj = this.generateCompletedWordObject(newWord)
      const existingCompletedWords = this.state.completedWords
      existingCompletedWords.push(newWordObj)
      this.setState({completedWords: existingCompletedWords})
      this.setState({currentInput:''})
      this.nextWord()
      this.incrementStateCounts()
    }
    else{
      this.setState({currentInput:''})
    }
  }

  nextWord = () => {
    let incompleteWords = this.state.incompletedWords
    incompleteWords.shift()
    this.setState({incompletedWords: incompleteWords})
    this.setState({currentWord: incompleteWords[0]})
  }

  incrementStateCounts = () => {
    const {currentInput, currentWord} = this.state
    if(currentInput.trim() !== currentWord){
      this.incrementState('incorrectWordCount')
    }
    else{
      this.incrementState('correctWordCount')
    }
    this.incrementState('completedWordCount')
    this.resetState('characterCount')

  }

  handleCharacter = () => {


  }

  // generatePartialObjects = (input) => {
  //   const splitWord = this.state.currentWord
  //   const splitInput = this.state.currentInput
  //   const indexLastCorrectCharacter = this.indexLastCorrectCharacter(splitInput, splitWord)
    
  //   const returnObject = indexLastCorrectCharacter !== 'all-correct' ? 
  //    {
  //     left:{
  //       text: input,
  //       className: "incorrect"
  //     },
  //     right:{
  //       text: input,
  //       className: "incomplete"
  //     },

  //    }
  // }

  indexLastCorrectCharacter = (splitInput, splitWord) => {
    for(let i=0 ; i < splitInput.length; i++){
      if( splitInput[i] != splitWord[i] ){
        return i
      }
    }
    return 'all-correct'
}

adjustRightShift = ( index, splitWord , splitInput) => {
  if(index == 'all-correct' && splitInput.length <= splitWord.length){
    return splitWord.slice( splitInput.length ,splitWord.length )}
  else if( splitInput.length > splitWord.length){
    return []
    }
    else if( index !== 'all-correct' ){ 
      return splitWord.slice(index-1, splitWord.length)
    }
}

isInputEqual = ( currentArray, inputArray ) => {

  if( inputArray.length  > currentArray.length ){
    return false
  }
  else if( inputArray.join('') !== currentArray.slice(0,inputArray.length).join('')){
    return false
  }
  else {
    return true
  }
}
  generateCompletedWordObject = (input) => {
    return {
      text: input,
      className: input === this.state.currentWord ? "correct" : "incorrect"
    }
  }
  
  
  inputElement = React.createRef()

  changeFocusToInput = () => {
    this.inputElement.current.focus();
  }

  render(){
    // destructuring state
    const {
      incompletedWords,
      completedWords,
      currentWord,
      currentInput,
    } = this.state

    //destructuring functions
    const {
      updateAppStringState,
      handleInputChange,
      
    } = this
    return (
      <section id="words">
        <input
          id='input-form'
          value = {this.state.currentInput}
          onChange = { handleInputChange }
          ref = { this.inputElement }
        />
        <LeftWords
          words = { completedWords }  
          onClick = { this.changeFocusToInput }
          changeFocus = { this.changeFocusToInput } 
        />
        <RightWords
          words = { incompletedWords }
          changeFocus = { this.changeFocusToInput }
        />
      </section>
    );
  }
}


