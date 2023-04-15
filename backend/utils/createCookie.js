import { serialize } from 'cookie'

export const createCookie = async (res, cookies, token) => {
  try {
    const jwt = cookies.token

    if (jwt) {
      return res.json({ message: 'Already Login' })
    } else {
      const serialized = serialize('token', token, {
        httpsOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      res.setHeader('Set-Cookie', serialized)
    }
  } catch (err) {
    console.log(err.message)
  }
}
