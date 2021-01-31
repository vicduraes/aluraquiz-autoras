import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizzBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

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
                name="userName"
                value={userName}
                placeholder="Digite seu nome e vamos jogar :)"
                onChange={(event) => setUserName(event.target.value)}
              />
              <Button type="submit" disabled={!userName}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h3>Quizes da Galera</h3>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((link, index) => {
                const [projectName, githubUser] = link
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={`externalLink__${index + 1}`}>
                    <Widget.Topic href={`/quiz/${projectName}___${githubUser}`}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/vicduraes/aluraquiz-autoras" />
    </QuizBackground>
  );
}
