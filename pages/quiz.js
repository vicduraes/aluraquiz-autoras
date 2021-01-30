import React from 'react';
import PropTypes from 'prop-types';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizzBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content>[DESAFIO: Criar um spinner de loading]</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, questionIndex, onSubmit }) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${db.questions.length}`}</h3>
      </Widget.Header>
      <img
        alt="Imagem da pergunta 1"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
        </form>
        <Button type="submit">Confirmar</Button>
      </Widget.Content>
    </Widget>
  );
}

export default function Quiz() {
  const screenStates = {
    LOADING: 'LOADING',
    QUIZ: 'QUIZ',
    RESULT: 'RESULT',
  };

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  });

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < db.questions.length) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
          />
          // eslint-disable-next-line react/jsx-one-expression-per-line
        )}
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {screenState === screenStates.LOADING && <LoadingWidget />};
      </QuizContainer>
    </QuizBackground>
  );
}

QuestionWidget.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  answer: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  alternatives: PropTypes.array.isRequired,
};
