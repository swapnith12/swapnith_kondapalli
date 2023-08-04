import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import questions from './questions.json';
import Option_tracks from './Option_tracks';
import 'bootstrap/dist/css/bootstrap.min.css';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 18,
  width: '80%',
  borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#ffff',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: '#808080',
  },
}));

const decodedQuestions = questions.map((each, key) =>
  decodeURI(
    each.question
      .replaceAll('%3F', '?')
      .replaceAll('%27', "'")
      .replaceAll('%2C', ',')
  )
);

function App() {
  const [Q_No, setQ_No] = useState(0);

  const changeQuestion = () => {
    if (Q_No < 19) {
      setQ_No((prevQ_No) => prevQ_No + 1);
    }
  };

  return (
    <>
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <BorderLinearProgress variant="determinate" value={(100 / 20) * Q_No + 1} />
      <Box sx={{ width: '80%', mt: 4 }}>
        <Typography variant="h5" sx={{ fontFamily: 'sans-serif', fontWeight: '200', color: '#36454F' }}>
          Questions {Q_No + 1} of 20
        </Typography>
        <Typography variant="p" sx={{ fontFamily: 'sans-serif', fontWeight: '200', color: '#A9A9A9' }}>
          Entertainment: Board Games
        </Typography>
        <Box>
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" color={questions[Q_No].difficulty === "easy" ? "disabled" : ''} />
          <StarIcon fontSize="small" color={questions[Q_No].difficulty === "easy" ? "disabled" :
            questions[Q_No].difficulty === "hard" ? '' : 'disabled'} />
          <StarIcon fontSize="small" color="disabled" />
          <StarIcon fontSize="small" color="disabled" />
        </Box>
      </Box>
      <Box sx={{ width: '80%', mt: 4 }}>
        <Typography variant="p" sx={{ fontFamily: 'sans-serif', fontWeight: '400', fontSize: '5vmin', color: '#111111' }}>
          {decodedQuestions[Q_No]}
        </Typography>
      </Box>
      <Box sx={{ width: '80%', mt: 4 }}>
        <Option_tracks
          answer={questions[Q_No].correct_answer}
          wrong_answers={questions[Q_No].incorrect_answers}
          changeQuestion={changeQuestion}
          Q_No={Q_No}
          BorderLinearProgress={BorderLinearProgress}
        />
      </Box>
    </Box>
    </>
  );
}

export default App;
