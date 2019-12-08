import React from 'react';

import styles from './styles.module.scss';

import MainCard from '../MainCard';

const Main = () => {
  return (
    <main className={ styles.main }>
      <article className={ styles.main_container }>
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
      </article>
    </main>
  )
}

export default Main;
