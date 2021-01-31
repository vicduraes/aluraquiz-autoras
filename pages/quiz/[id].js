/* eslint-disable react/prop-types */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function ExternalQuizPage({ externalDb }) {
  return (
    <>
      <ThemeProvider theme={externalDb.theme}>
        <QuizScreen
          externalQuestions={externalDb.questions}
          externalBg={externalDb.bg}
        />
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDb = await fetch(
    `https://${projectName}.${githubUser}.vercel.app/api/db`
  )
    .then((serverResponse) => {
      if (serverResponse.ok) {
        return serverResponse.json();
      }
      throw new Error('Falha para pegar os dados do Quiz!');
    })
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
      throw new Error(error);
    });

  return {
    props: {
      externalDb,
    },
  };
}
