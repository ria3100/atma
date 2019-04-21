<template>
  <section class="section">
    <div class="container">
      <div @click="isEdit = !isEdit">{{isEdit}}</div>
      <Users :isEdit="isEdit" />
    </div>
  </section>
</template>

<script>
import { Modal, Users } from '@/components/organisms'

export default {
  components: {
    Users,
  },

  data() {
    return {
      isEdit: false,
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
