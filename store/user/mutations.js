const addUser = (state, user) => {
  state.list = [...state.list, user]
}

const removeUser = (state, uid) => {
  const tmp = state.list.filter(user => user.uid !== uid)
  state.list = [...tmp]
}

const updateUser = (state, { uid, user }) => {
  const tmp = state.list.map(item => {
    if (item.uid === uid) item = user
    return item
  })
  state.list = [...tmp]
}

const updateList = (state, list) => {
  state.list = [...list]
}

export default {
  addUser,
  removeUser,
  updateUser,
  updateList
}
