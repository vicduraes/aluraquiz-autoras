/* eslint-disable react/prop-types */

import React from 'react';

// import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizzBackground';
import QuizLogo from '../../components/QuizLogo';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content>[DESAFIO: Criar um spinner de loading]</Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Acabou! Veja sua pontuação: </Widget.Header>
      <Widget.Content>
        <p>{`Você acertou ${results.filter((x) => x).length} perguntas!`}</p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index + 1}`}>
              {`#0${index + 1} Resultado: `}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  onSubmit,
  addResults,
  totalQuestions,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(
    undefined
  );
  const [isFormSubmited, setIsFormSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
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

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsFormSubmited(true);
            setTimeout(() => {
              addResults(isCorrect);
              onSubmit();
              setIsFormSubmited(false);
              setSelectedAlternative(undefined);
            }, 3000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const selectedAlternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isFormSubmited && selectedAlternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>
        {isFormSubmited && isCorrect && <p>Parabéns, você acertou!</p>}
        {isFormSubmited && !isCorrect && <p>Não foi dessa vez! </p>}
      </Widget.Content>
    </Widget>
  );
}

export default function QuizScreen({ externalQuestions, externalBg }) {
  const screenStates = {
    LOADING: 'LOADING',
    QUIZ: 'QUIZ',
    RESULT: 'RESULT',
  };

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < externalQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function addResults(result) {
    setResults([...results, result]);
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResults={addResults}
            totalQuestions={totalQuestions}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}

// QuestionWidget.propTypes = {
//   questionIndex: PropTypes.number.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   question: PropTypes.object.isRequired,
//   image: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   alternatives: PropTypes.array.isRequired,
// };
