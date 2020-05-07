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
    correctWordCount: 0,
    incorrectWordCount: 0,
    completedWordCount: 0,
  }

//lifecycle methods
  componentDidUpdate(prevProps){
    if(this.props.words !== prevProps.words){
      this.setState( { words: this.props.words })
      this.populateGameWords(this.props.words)

    }
  }
  
  populateGameWords = (words) => {
    this.setState({ currentWord: words[0] })
    const newWords = words
    words.shift()
    this.setState({incompletedWords:newWords})
  }

  getLastCharacter = (string) => {
    return string.charAt( string.length - 1 )
  }

  //state functions
  statePush = ( stateKey, newTerm ) => {
    this.setState( { [stateKey]: [ ...this.state[stateKey], newTerm]} )
  }

  stateShift = ( stateKey ) => {
    let newStateValue = this.state[stateKey]
    newStateValue.shift()
    this.setState({ [stateKey]: newStateValue })  
  }

  stateIncrement = ( stateKey ) => {
    this.setState( { [stateKey]: this.state[stateKey] + 1})
  }

// game functions

  //this function will track the state of input box

  handleInputChange = (event) => {
    let input = event.target.value
    const currentCharacter = this.getLastCharacter(input)
    if( currentCharacter === ' ' ){
      event.target.value = ''
      this.setState( {currentWord: this.state.incompletedWords[0]})
      this.setState( {nextWord: this.state.incompletedWords[1]})
      const wordObject = () => this.generateWordObject(input.trim())
      this.stateShift('incompletedWords')
      this.statePush('completedWords', wordObject())
      this.incrementWordCounts(wordObject())
      //update counts
    }

    this.setState({ currentInput: input })

  }

  incrementWordCounts = (wordObject) => {
 
    if( wordObject.className === 'correct'){
      this.stateIncrement('correctWordCount')
    }
    else{
      this.stateIncrement('incorrectWordCount')
    }
      this.stateIncrement('completedWordCount')
  }

  generateWordObject = (input) => {
    return {
      text: input,
      className: input === this.state.currentWord ? "correct" : "incorrect"
     }
  }
  
  
  inputElement = React.createRef()

  changeFocusToInput = () => {
    console.log('fuck')
    this.inputElement.current.focus();
  }

  log = ()=> {
    console.log('fuck you')
  }

  handleCurrentWord = (currentWord, input) => {
  let splitWord = currentWord.split('')
  const splitInput = input.split('')
  const indexOfFirstWrong = this.indexLastCorrectCharacter(splitInput, splitWord)
  const assignCorrect = this.isInputEqual( splitWord, splitInput ) ? "correct" : "incorrect"
  splitWord = this.adjustRightShift(indexOfFirstWrong, splitWord, splitInput)
  
  let rightside = splitWord.map( letter => <span className="incomplete" >{letter}</span> )
  let leftside = splitInput.map( letter => <span className={ assignCorrect}>{letter}</span>)
  return( <> {leftside}{rightside} </> )
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
        <LeftWords
          words = { completedWords }  
          onClick = { this.changeFocusToInput }
        />
        <input
          id='input-form'
          onChange = { handleInputChange }
          ref={this.inputElement}
          
        />
        <CurrentWord
          currentInput = { currentInput }
          currentWord = { currentWord }
          updateAppStringState = { updateAppStringState }
          onClick = { this.changeFocusToInput }

        />
        <RightWords
          words = { incompletedWords }
          onClick = { this.changeFocusToInput }
        />
        <button onClick = { this.changeFocusToInput }>push me</button>
      </section>
    );
  }
}


