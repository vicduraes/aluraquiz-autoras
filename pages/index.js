import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizzBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
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

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
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
                    <Widget.Topic
                      href={`/quiz/${projectName}___${githubUser}`}
                      as={Link}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 1.0, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/vicduraes/aluraquiz-autoras" />
    </QuizBackground>
  );
}
