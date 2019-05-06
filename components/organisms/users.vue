<template>
  <div>
    <div
      class="notification"
      :class="{
        'is-success': resNotification && resNotification.status === 'success',
        'is-warning':  resNotification && resNotification.status === 'error',
      }"
      v-show="resNotification !== null"
    >
      <button class="delete" @click="resNotification = null"></button>
      <p v-if="resNotification && resNotification.status === 'success'">
        {{resNotification.msg || '成功しました。'}}
      </p>
      <p v-if="resNotification && resNotification.status === 'error'">
        {{resNotification.msg}}
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
          :is-edit="isEdit"
          @update="openModal('update', user.uid)"
          @remove="openModal('remove', user.uid)"
        />
      </div>
      <div class="column is-4">
        <div
          class="box has-text-centered is-edit"
          v-if="isEdit"
          @click="openModal('add', '')"
        >
          <i class="fas fa-plus-circle"></i>
        </div>
      </div>
    </Draggable>

    <Modal :is-open="modalUid !== null" @close="closeModal">
      <div class="box">
        <TimecardButtons
          v-if="action === 'timecard'"
          :user="getUser(modalUid)"
          @going="post('in')"
          @leaving="post('out')"
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
import _ from 'lodash'

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
      isDrag: false,
      isLoding: false
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

    async post(action) {
      if (this.isLoding) return

      this.isLoding = true
      const { uid, pass } = this.$store.getters['user/getUser'](this.modalUid)
      console.log(action)
      const res = await this.$store.dispatch(
        "user/submitTimeCard",
        { type: action, uid, pass }
      )
      this.result(res)
      this.isLoding = false
    },

    add(user) {
      this.$store.dispatch("user/addUser", user)
        .then(() => this.result({
          status: 'success',
        }))
        .catch(() => this.result({
          status: 'error',
          msg: 'エラーが発生しました。'
        }))
        this.modalUid = null
    },

    update(user) {
      this.$store.dispatch("user/updateUser", { uid: this.modalUid, user })
        .then(() => this.result({
            status: 'success',
        }))
        .catch(() => this.result({
            status: 'error',
            msg: 'エラーが発生しました。'
        }))
        this.modalUid = null
    },

    remove(uid) {
      this.$store.dispatch("user/removeUser", this.modalUid)
        .then(() => this.result({
            status: 'success',
        }))
        .catch(() => this.result({
            status: 'error',
            msg: 'エラーが発生しました。'
        }))
        this.modalUid = null
    },

    async notification(status) {
      this.resNotification = status
      clearTimeout(this.setTimeoutId)
      this.setTimeoutId = await setTimeout(() => {
        this.resNotification = null
      }, 3000)
    },

    result(status) {
      this.closeModal()
      this.notification(status)
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
        this.$store.dispatch('user/updateList', val)
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
  .box.is-edit {
    height: 90px;
    &.has-text-centered {
      line-height: 50px;
    }
  }
  
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
