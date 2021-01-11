import agent from 'superagent'

export default function getUser () {
  const userSession = sessionStorage.getItem('STUDNINGSBANKINN_ADMIN')
  if (userSession) {
    const user = JSON.parse(userSession)
    return Promise.resolve(user)
  } else {
    return agent
      .get(process.env.STUDNINGSBANKINN_API_URL + '/user')
      .withCredentials()
      .then(res => {
        if (res.body && res.body.name) {
          sessionStorage.setItem('STUDNINGSBANKINN_ADMIN', JSON.stringify(res.body))
          return res.body
        }
      })
  }
}
