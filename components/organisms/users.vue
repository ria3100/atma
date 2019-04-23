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

    <Draggable
      v-model="userList"
      v-bind="dragOptions"
      handle=".handle"
      @start="isDrag = true"
      @end="isDrag = false"
      class="columns is-multiline"
    >
      <div
        class="column is-4" v-for="user in userList"
        :key="user.uid"
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
    </Draggable>

    <a
      class="button is-primary is-fullwidth"
      @click="$emit('setIsEdit', false)"
      v-if="isEdit"
    >
      編集を終わる
    </a>

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
import Draggable from 'vuedraggable'
import Modal from './modal'
import { TimecardButtons, UserEdit, UserRemove, UserBox } from '@/components/molecules'

export default {
  props: ['isEdit'],
  components: {
    UserBox,
    Modal,
    TimecardButtons,
    UserEdit,
    UserRemove,
    Draggable
  },

  data() {
    return {
      modalUid: null,
      action: null,
      resNotification: null,
      setTimeoutId: null,
      isDrag: false
    }
  },

  methods: {
    openModal(action, uid) {
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
    userList: {
      get() {
        return this.$store.getters['user/getUsers']
      },
      set(val) {
        this.$store.dispatch('user/updateList', val)[0]
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
  }

}
</script>

<style lang="scss" scoped>
  .notification {
    margin-bottom: 32px;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #ddd;
  }
</style>
