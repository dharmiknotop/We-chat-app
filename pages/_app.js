import { Fragment } from 'react';
import '@src/styles/globals.css';
import { RecoilRoot } from 'recoil';
import ValidateSession from '../src/utils/ValidateUser';

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
