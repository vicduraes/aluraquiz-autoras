import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import db from '../db.json';

import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizzBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h2>
              Quantas escritoras de ficção científica você conhece? Descubra
              agora!
            </h2>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${userName}`);
              }}
            >
              <Input
                placeholder="Digite seu nome e vamos jogar :)"
                onChange={(event) => {
                  event.preventDefault();
                  setUserName(event.target.value);
                }}
              />
              <Button type="submit" disabled={!userName}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h3>Quiz da galera</h3>
          </Widget.Header>
          <Widget.Content>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              aliquid veniam ipsum laborum. Sunt, quae
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://www.github.com/vicduraes" />
    </QuizBackground>
  );
}
