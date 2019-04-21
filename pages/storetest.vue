<template>
  <section class="section">
    <input v-model="name" />
    <input v-model="uid" />
    <input v-model="pass" />
    <button @click="addUser">add</button>
    <button @click="removeUser">remove</button>
    <button @click="updateUser">update</button>
    {{userList}}
  </section>
</template>

<script>
export default {
  data: () => ({
    name: 'foo',
    uid: 'bar',
    pass: 'baz',
  }),

  methods: {
    addUser() {
      const { name, uid, pass } = this
      this.$store.dispatch("user/addUser", { name, uid, pass })
    },
    removeUser() {
      const { name, uid, pass } = this
      this.$store.dispatch("user/removeUser", uid)
    },
    updateUser() {
      const { name, uid, pass } = this
      this.$store.dispatch("user/updateUser", { uid, user: { name, uid, pass }})
    },
  },

  computed: {
    userList() {
      return this.$store.getters['user/getUsers']
    },
  },

}
</script>

<style lang="scss" scoped>

</style>
