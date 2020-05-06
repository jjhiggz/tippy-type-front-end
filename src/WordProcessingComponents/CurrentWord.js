import React from 'react'

export default class CurrentWord extends React.Component{

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

  isSpace = ( inputArray ) => {
    if(inputArray.end === ' '){
    }
  }

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
     return splitWord.slice( splitInput.
    length ,splitWord.length)}
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
  render() {
    const{ currentWord, currentInput } = this.props
    return (
      <p className = 'current-word'>
        {this.handleCurrentWord(currentWord, currentInput)}
      </p>
    )
  }
}
