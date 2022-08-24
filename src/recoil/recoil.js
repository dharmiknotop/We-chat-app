import { atom } from 'recoil'
import { AUTH_ATOM_KEY, THE_OTHER_USER } from './constant'

export const authUserAtom = atom({
  key: AUTH_ATOM_KEY,
  default: {
    id: '',
    name: '',
    email: '',
  },
})
export const theOtherUser = atom({
  key: THE_OTHER_USER,
  default: {
    id: '',
    name: '',
  },
})
