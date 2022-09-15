const loginInput = document.getElementById("login")
const passInput = document.getElementById("pass")
const regBtn = document.getElementById("register")
const logBtn = document.getElementById("signIn")
const authResult = document.getElementById("auth-result")


// export const api = "/api"      // debug-local-proxy-api
export const api = "http://slimbde.atwebpages.com"


const checkInputs = () => {
  if (!loginInput.value) return "Не указан логин"
  if (!passInput.value) return "Не указан пароль"
  return ""
}

const clearInputs = () => {
  authResult.innerHTML = "&nbsp;"
  loginInput.value = ""
  passInput.value = ""
}


export const responseHandler = async (response) => {
  if (response.ok) return response.json()

  const msg = await response.text()
  throw new Error(msg)
}


export const setUpAuth = (startGameCallback) => {
  clearInputs()

  ///// register action
  regBtn.onclick = () => {
    const inputsError = checkInputs()
    if (inputsError) {
      authResult.textContent = inputsError
      return
    }

    const login = loginInput.value
    const hash = window.btoa(unescape(encodeURIComponent(passInput.value)))  // using base64 string encoding

    fetch(`${api}/php-api/users/fish-register?login=${login}&hash=${hash}`)
      .then(responseHandler)
      .then(data => {
        startGameCallback({ login, prevScore: 0 })
      })
      .catch(err => {
        if (err.message.includes("exists")) {
          authResult.textContent = "Пользователь уже существует"
          setTimeout(() => clearInputs(), 2000)
        }
      })
  }

  ///// login action
  logBtn.onclick = () => {
    const inputsError = checkInputs()
    if (inputsError) {
      authResult.textContent = inputsError
      return
    }

    const login = loginInput.value
    const hash = window.btoa(unescape(encodeURIComponent(passInput.value)))

    fetch(`${api}/php-api/users/fish-auth?login=${login}&hash=${hash}`)
      .then(responseHandler)
      .then(data => {
        startGameCallback({ login, prevScore: data[0] })
      })
      .catch(err => {
        if (err.message.includes("No")) {
          authResult.textContent = "Не верные учетные данные"
          setTimeout(() => clearInputs(), 2000)
        }
      })
  }
}


export const saveScores = async (login, score) => {
  try {
    const resp = await fetch(`${api}/php-api/users/fish-add-scores?login=${login}&scores=${score}`)
    await responseHandler(resp)
    return "Ok"
  } catch (error) {
    console.error(error.message)
  }
}