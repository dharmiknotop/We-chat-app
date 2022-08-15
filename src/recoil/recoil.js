import { atom } from 'recoil'
import { AUTH_ATOM_KEY } from './constant'

export const authAtom = atom({
  key: AUTH_ATOM_KEY,
  default: null,
})
