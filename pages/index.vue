<template>
  <section class="section">
    <div class="container">
      <Users @editUser="editUser"/>
    </div>
    <Modal :isOpen="editUid !== null" @close="editUser(null)">
      <div class="box">
        <div v-if="1">
          <Buttons @going="going(editUid)" @leaving="leaving(editUid)"/>
        </div>
        <div v-else>
          <Edit :uid="editUid"/>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script>
import { Users, Modal, Edit } from '@/components/organisms'
import { Buttons } from '@/components/molecules'

export default {
  components: {
    Users,
    Modal,
    Edit,
    Buttons,
  },

  data() {
    return {
      editUid: null,
    }
  },

  methods: {
    editUser(uid) {
      this.editUid = uid
    },
    going(uid) {
      console.log('going', uid)
      // axios
    },
    leaving(uid) {
      console.log('leaving', uid)
      // axios
    },
  },


}
</script>

<style lang="scss" scoped>

</style>
