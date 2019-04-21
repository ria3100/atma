<template>
  <div>
    <div class="columns is-multiline">
      <div
        class="column is-4" v-for="(user, i) in userList"
        :key="i"
        @click="!isEdit && openModal('timecard', user.uid)"
      >
        <UserBox
          :user="user"
          :isEdit="isEdit"
          @update="openModal('update', user.uid)"
          @remove="openModal('remove', user.uid)"
        />
      </div>
      <div class="column is-4">
        <div
          class="box"
          v-if="isEdit"
          @click="openModal('add', '')"
        >
          ＋
        </div>
      </div>
    </div>

    <Modal :isOpen="modalUid !== null" @close="closeModal">
      <div class="box">
        <TimecardButtons
          v-if="action === 'timecard'"
          :user="getUser(modalUid)"
          @going="going(modalUid)"
          @leaving="leaving(modalUid)"
        />
        <UserEdit
          v-if="action === 'update' || action === 'add'"
          :user="getUser(modalUid)"
          :action="action"
          @add="add"
          @update="update"
        />
        <UserRemove
          v-if="action === 'remove'"
          @remove="remove(modalUid)"
        />
      </div>
    </Modal>

  </div>
</template>

<script>
import Modal from './modal'
import { TimecardButtons, UserEdit, UserRemove, UserBox } from '@/components/molecules'

export default {
  props: ['isEdit'],
  components: {
    UserBox,
    Modal,
    TimecardButtons,
    UserEdit,
    UserRemove
  },

  data() {
    return {
      modalUid: null,
      action: null,
    }
  },

  methods: {
    openModal(action, uid) {
      console.log(action) 
      this.modalUid = uid
      this.action = action
    },
    closeModal() {
      this.modalUid = null
      this.action = null
    },
    going(uid) {
      console.log('going', uid)
      // axios
    },
    leaving(uid) {
      console.log('leaving', uid)
      // axios
    },
    add(user) {
      this.$store.dispatch("user/addUser", user)
      this.closeModal()
    },
    update(user) {
      this.$store.dispatch("user/updateUser", { uid: this.modalUid, user })
      this.closeModal()
    },
    remove(uid) {
      this.$store.dispatch("user/removeUser", this.modalUid)
      this.closeModal()
    },
    getUser(uid) {
      if (!uid) return { name: '', uid: '', pass: '' }
      return this.$store.getters['user/getUser'](uid)
    }
  },

  computed: {
    userList() {
      return this.$store.getters['user/getUsers']
    }
  }

}
</script>
