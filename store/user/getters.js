const getUsers = ({ list }) => list

const getUser = ({ list }) => uid => (
  list.find(user => user.uid === uid)
)

export default {
  getUsers,
  getUser
}
