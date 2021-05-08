import { FunctionComponent } from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: FunctionComponent = () => (
    <div className={styles.container}>
      <Head>
        <title>Chuck Norris Facts</title>
        <meta name="description" content="Chuck Norris Facts" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      Hello World!
    </div>
  );

export default Home;
