<template>
  <div>
    <div
      class="notification"
      :class="{
        'is-success': resNotification === 'success',
        'is-warning':  resNotification === 'error',
      }"
      v-show="resNotification !== null"
    >
      <button class="delete" @click="resNotification = null"></button>
      <p v-if="resNotification === 'success'">
        成功しました。
      </p>
      <p v-if="resNotification === 'error'">
        失敗しました。メールアドレス課パスワードが間違ってる可能性があります。
      </p>
    </div>

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
          class="box has-text-centered"
          v-if="isEdit"
          @click="openModal('add', '')"
        >
          <i class="fas fa-plus-circle"></i>
        </div>
      </div>

      <div class="column is-12" v-if="isEdit">
        <a
          class="button is-primary is-fullwidth"
          @click="$emit('setIsEdit', false)"
        >
          編集を終わる
        </a>
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
          @close="closeModal"
        />
        <UserRemove
          v-if="action === 'remove'"
          :user="getUser(modalUid)"
          @remove="remove(modalUid)"
          @close="closeModal"
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
      resNotification: null,
      setTimeoutId: null
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
      this.post('in', uid)
      this.closeModal()
    },
    leaving(uid) {
      this.post('out', uid)
      this.closeModal()
    },
    async post(type, uid) {
      const { pass } = this.$store.getters['user/getUser'](uid)
      const res = await this.$axios.post('http://localhost:3000/foo', { type, uid, pass })

      const status = res.status === 200
        ? 'success'
        :'error'

      await this.notification(status)
    },
    add(user) {
      this.$store.dispatch("user/addUser", user)
      this.closeModal()
      this.notification('success')
    },
    update(user) {
      this.$store.dispatch("user/updateUser", { uid: this.modalUid, user })
      this.closeModal()
      this.notification('success')
    },
    remove(uid) {
      console.log('remove',uid)
      this.$store.dispatch("user/removeUser", this.modalUid)
      this.closeModal()
      this.notification('success')
    },
    async notification(status) {
      this.resNotification = status
      clearTimeout(this.setTimeoutId)
      this.setTimeoutId = await setTimeout(() => {
        this.resNotification = null
      }, 3000)
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

<style lang="scss" scoped>
  .notification {
    margin-bottom: 32px;
  }
</style>
