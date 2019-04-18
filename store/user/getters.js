const getUsers = state => {
  return state.list
}

const getUser = state => id => {
  // return state.list.find(user => user.id === id)
  return null
}

export default {
  getUsers,
  getUser
}
