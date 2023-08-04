import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from 'react-bootstrap';
import './Option.css';
import { Typography } from '@material-ui/core';

function Option_tracks(props) {
  const { answer, wrong_answers,Q_No,changeQuestion } = props;
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isOpted, setIsOpted] = useState(false);

  useEffect(() => {
    const decodedanswer = decodeURI(answer);
    const incorrectAnswer = wrong_answers.map((each) => decodeURI(each));
    const allAnswers = incorrectAnswer.concat([decodedanswer]);
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, [answer, wrong_answers,Q_No]);

  const handleClick = (clickedAnswer) => {
    setSelectedAnswer(clickedAnswer);
    setIsOpted(true);
  };
  const QuestionChange = ()=>{
    setIsOpted(false)
    changeQuestion()
  }
  const ButtonGroup = shuffledAnswers.map((options) => (
    <OptionButton
      key={options}
      answer={options}
      correctAnswer={decodeURI(answer)}
      onClick={handleClick}
      isOpted={isOpted}
      selectedAnswer={selectedAnswer}
    />

  ));

  return (
    <Box>
      <Box className='button-group'>{ButtonGroup}</Box>
      <br />
      <br />
      {isOpted ? <NextQuestion
        selectedAnswer={selectedAnswer}
        correctAnswer={decodeURI(answer)}
        Q_No={Q_No}
        QuestionChange={QuestionChange}
      /> : ''}
    </Box>
  );
}

function OptionButton({ answer, correctAnswer, onClick, isOpted, selectedAnswer }) {
  const [isSelected, setIsSelected] = useState(false);
  const isCorrectAnswer = answer === correctAnswer;

  const handleButtonClick = () => {
    setIsSelected(true);
    onClick(answer);
  };

  return (
    <Button
      className={isSelected && !isCorrectAnswer && isOpted && answer === selectedAnswer ? 'selected-wrong-option' : ''}
      style={{
        width: '350px',
        padding: '8px',
        border: '1px solid black',
        borderRadius: '5px',
        color: isSelected || (isOpted && answer === correctAnswer) ? 'white' : 'black',
        backgroundColor: isSelected
          ? isCorrectAnswer
            ? 'black'
            : 'white'
          : isOpted && answer === correctAnswer
            ? 'black'
            : isOpted && answer === selectedAnswer
              ? 'white'
              : '#D3D3D3',
        marginBottom: '20px',
      }}
      disabled={isOpted}
      onClick={handleButtonClick}
    >
      {answer}
    </Button>
  );
}

function NextQuestion({ correctAnswer, selectedAnswer,Q_No,QuestionChange }) {
  return (
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Typography variant="h3">{correctAnswer === selectedAnswer ? "Correct" : "Sorry. Please try again"}</Typography>
      {Q_No<19?<Button onClick={QuestionChange} style={{marginTop:"10px",backgroundColor:'#D3D3D3',color:'black',border:'1px black'}}>Next Question</Button>:
      <Typography variant="h3">Test Done!</Typography>}
    </Box>
  )
}

export default Option_tracks;
