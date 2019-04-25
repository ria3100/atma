import cryptico from 'cryptico-js'

const publicKeyString =
  'hDsLO7x5n0Pfqfo4I+lUMW2vFFNzgC7XC86pfSPQScTdbVFNNoC5qICyvNb1yewfxrbIc2Emyczp4w0qDgJp6UgwKMJgHUnS41FqGgxA9X3Mh9qbpWyvZv6khg6+OSmDehZBLp094bTH8uSn1jR0Q5DwyGjfJZCIpTPpnd576/FK6RAQWSi9T8Gxl4EBUSLNus+yIzsoMZvypiaqEjm/hGm1+UsQxEBRJMptx36fW6XeV8qm1W+xScN7PzBDDHq7uAsubMwuc3rKo9k2wmUY6nW2BE6CqaSl3g+/OgNcFXVQ64ccEPbKchlbxrYnqqwrnqZSuhE22pL+7rlNxLIuYw=='

const addUser = ({ commit }, user) => {
  user.pass = cryptico.encrypt(user.pass, publicKeyString).cipher
  commit('addUser', user)
}

const removeUser = ({ commit }, uid) => {
  commit('removeUser', uid)
}

const updateUser = ({ commit, state }, { uid, user }) => {
  if (user.pass) {
    user.pass = cryptico.encrypt(user.pass, publicKeyString).cipher
  } else {
    const { pass } = state.list.find(user => user.uid === uid)
    user.pass = pass
  }
  commit('updateUser', { uid, user })
}

const updateList = ({ commit }, list) => {
  commit('updateList', list)
}

export default {
  addUser,
  removeUser,
  updateUser,
  updateList
}
