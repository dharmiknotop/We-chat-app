import { Fragment } from 'react';
import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import ValidateSession from '../src/commonFiles/ValidateUser';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <RecoilRoot>
        <ValidateSession />
        <Component {...pageProps} />
      </RecoilRoot>
    </Fragment>
  );
}

export default MyApp;
