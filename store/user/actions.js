const addUser = ({ commit }, user) => {
  commit('addUser', user)
}

const removeUser = ({ commit }, uid) => {
  commit('removeUser', uid)
}

const updateUser = ({ commit }, { uid, user }) => {
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
