import agent from 'superagent'

export default function makeAPI (entity) {
  const url = process.env.STUDNINGSBANKINN_API_URL + '/' + entity

  return {
    get (id) {
      if (isNaN(Number(id))) {
        return Promise.resolve({})
      }

      return agent
        .get(url)
        .withCredentials()
        .query({ id })
        .then(res => {
          if (res.body.length === 1) {
            return res.body[0]
          } else {
            throw new Error('API should only find one')
          }
        })
    },
    getAll () {
      return agent
        .get(url)
        .withCredentials()
        .then(res => res.body)
    },
    upsert (data) {
      const hasId = Boolean(data.id)

      if (hasId) {
        return agent
          .put(url)
          .withCredentials()
          .send(data)
          .then(res => res.body)
      }

      return agent
        .post(url)
        .withCredentials()
        .send(data)
        .then(res => res.body)
    },
    delete (data) {
      return agent
        .delete(url)
        .withCredentials()
        .send(data)
        .then(res => res.body)
    }
  }
}
