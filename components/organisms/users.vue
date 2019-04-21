<template>
  <div class="columns is-multiline">
    <div
      class="column is-4" v-for="(user, i) in userList"
      :key="i"
      @click="edit(user.uid)"
    >
      <UserBox :user="user" />
      <!-- <AddUserBox /> -->
    </div>
  </div>
  
</template>

<script>
import { UserBox } from '@/components/molecules'

export default {
  components: {
    UserBox
  },

  methods: {
    edit(uid) {
      this.$emit('editUser', uid)
    },
  },

  computed: {
    userList() {
      return this.$store.getters['user/getUsers']
    }
  }

}
</script>
