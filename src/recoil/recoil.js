import { atom } from 'recoil'
import { AUTH_ATOM_KEY } from './constant'

export const authUserAtom = atom({
  key: AUTH_ATOM_KEY,
  default: {
    id: '',
    name: '',
    email: '',
  },
})
