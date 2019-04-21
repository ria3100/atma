<template>
  <section class="section">
    <div class="container">
      <Users @editUser="editUser"/>
    </div>
    <Modal :isOpen="editUid !== null" @close="editUser(null)">
      <div class="box">
        {{editUid}}
      </div>
    </Modal>
  </section>
</template>

<script>
import { Users, Modal } from '@/components/organisms'

export default {
  components: {
    Users,
    Modal
  },

  data() {
    return {
      editUid: null,
    }
  },

  methods: {
    editUser(uid) {
      this.editUid = uid
    }
  },


}
</script>

<style lang="scss" scoped>

</style>
