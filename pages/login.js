import { useEffect, useState } from 'react'
import inputValidation from '../src/commonFiles/inputValidation'
import Link from 'next/link'
import axios from 'axios'
import styles from '../styles/register.module.scss'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { authUserAtom } from '../src/recoil/recoil'

const Login = () => {
  const router = useRouter()

  const [requestPostData, setRequestPostData] = useState({
    loading: false,
    success: '',
    error: '',
  })

  const [showBtn, setShowBtn] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [formDataError, setFormDataError] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [user, setUser] = useRecoilState(authUserAtom)

  const uploadDetails = () => {
    if (!validateForm()) {
      return
    }

    logIn()
  }

  const validateForm = async () => {
    let hasError = false

    let tempError = {
      email: '',
      password: '',
    }

    tempError.email = inputValidation.isInputEmpty(formData.email)
    if (tempError.email !== '') {
      hasError = true
      setShowBtn(false)
    }

    tempError.password = inputValidation.isInputEmpty(formData.password)
    if (tempError.password !== '') {
      hasError = true
      setShowBtn(false)
    }

    setFormDataError({
      ...tempError,
    })

    return hasError
  }

  const logIn = async () => {
    setRequestPostData({
      loading: true,
      success: '',
      error: '',
    })

    try {
      const res = await axios.post(
        `api/auth/login`,
        { ...formData },
        {
          withCredentials: true,
        },
      )
      setUser({
        id: res.data.data._id,
        name: res.data.data.name,
        email: res.data.data.email,
        logoUrl: res.data.data.logoUrl,
        isLoggedIn: 'true',
      })

      console.log(res.data.data)

      setRequestPostData({
        loading: false,
        success: 'sign up done succesfully.',
        error: '',
      })

      console.log(user)

      router.push('/')
    } catch (error) {
      console.log('error: ', error)
      setRequestPostData({
        loading: false,
        success: '',
        error: 'Some unexpected error occur.',
      })
    }
  }
  useEffect(() => {
    user && user.isLoggedIn === 'true' ? router.push('/') : null
  }, [])

  useEffect(() => {
    user && user.isLoggedIn === 'true' ? router.push('/') : null
  }, [user, router])

  return (
    <div className={styles.s}>
      <div className={styles.s__registerContainer}>
        <h2 className={styles.s__title}>Log in to your account</h2>
        <h3 className={styles.s__subTitle}>log in to chat with the world.</h3>

        <div className={styles.s__inputContainer}>
          <label>Email</label>
          <input
            type="text"
            onChange={(val) => {
              setShowBtn(true)
              setFormData({
                ...formData,
                email: val.target.value,
              })
            }}
          />
          {formDataError.email !== '' && (
            <span className={styles.errorMessage}>
              Please Enter Valid Email
            </span>
          )}
        </div>
        <div className={styles.s__inputContainer}>
          <label>Password</label>
          <input
            type="text"
            onChange={(val) => {
              setShowBtn(true)
              setFormData({
                ...formData,
                password: val.target.value,
              })
            }}
          />
          {formDataError.password !== '' && (
            <span className={styles.errorMessage}>
              Please Enter Valid password
            </span>
          )}
        </div>
        <div className={styles.s__btnContainer}>
          <button
            className={`${
              formData.email !== '' && formData.password !== '' && showBtn
                ? styles.s__activeBtn
                : styles.s__notActiveBtn
            }`}
            onClick={() => {
              uploadDetails()
            }}
          >
            {' '}
            Log in
          </button>
          <button className={`${styles.s__defaultUserBtn}`}>
            Pre Defined User
          </button>
        </div>
        <span className={`${styles.s__alreadyHaveAnAccTxt}`}>
          Have an account ?{' '}
          <Link href="/register">
            <a> Sign Up</a>
          </Link>
        </span>
      </div>

      <div className={styles.s2__backgroundImgContainer}>
        <h5 className={styles.s2__backgroundImgContainer__title}>
          Get started with account
        </h5>
        <h6 className={styles.s2__backgroundImgContainer__subTitle}>
          Communication has never been this
          <br /> easy, you're just one click far to use this.
          <br />
          log in if already registered.
        </h6>
        <div className={styles.s2__backgroundImgContainer__logInTxt}>
          Log in to your account
          <div className={styles.s2__underline}></div>
        </div>
        <img
          className={styles.s2__backgroundImg}
          src="/img/register/backgroundImg.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Login
