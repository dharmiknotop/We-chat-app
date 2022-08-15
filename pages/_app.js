import { Fragment } from 'react'
import '../styles/globals.css'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>{' '}
    </Fragment>
  )
}

export default MyApp
