<template>
  <div class="columns is-multiline">
    <div class="column is-4" v-for="(user, i) in userList">
      <div class="box" :key={i}>
        {{user}}
      </div>
    </div>
  </div>
  
</template>

<script>
// import { UserBox } from '@/components/molecules'

export default {
  components: {
    // UserBox
  },
  computed: {
    userList() {
      return this.$store.getters['user/getUsers']
    }
  }

}
</script>
