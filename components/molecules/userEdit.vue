<template>
  <div>
    <form autocomplete="off" @submit.prevent>
      <div class="field">
        <label class="label">名前</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="name"
            placeholder="名前を入力してください"
            v-model="tmp.name"
            data-vv-as="名前"
            v-validate="'required'"
          />
          <p class="has-text-danger">{{ errors.first('name') }}</p>
        </div>
      </div>
      <div class="field">
        <label class="label">メールアドレス</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="uid"
            placeholder="メールアドレスを入力してください"
            v-model="tmp.uid"
            data-vv-as="メールアドレス"
            v-validate="'required|email'"
          />
          <p class="has-text-danger">{{ errors.first('uid') }}</p>
        </div>
      </div>
      <div class="field">
        <label class="label">{{action === 'update' ? '変更する' : ''}}パスワード</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="pass"
            :placeholder="`${action === 'update' ? '変更する' : ''}パスワードを入力してください`"
            v-model="tmp.pass"
            :data-vv-as="`${action === 'update' ? '変更する' : ''}パスワード`"
            v-validate="action === 'add' ? 'required' : ''"
          />
          <p class="has-text-danger">{{ errors.first('pass') }}</p>
        </div>
      </div>
    </form>
    <hr/>
    <button
      class="button is-primary is-fullwidth"
      @click="submit"
      style="margin-bottom:16px;"
    >
      {{action === 'add' ? '登録' : '更新'}}
    </button>
    <button
      class="button is-outlined is-fullwidth"
      @click="$emit('close')"
    >
      閉じる
    </button>
  </div>
</template>

<script>
export default {
  props: ['user', 'action'],

  data() {
    return {
      tmp: {
        name: null,
        uid: null,
        pass: null
      }
    }
  },

  created() {
    this.tmp.name = this.user.name
    this.tmp.uid = this.user.uid
  },

  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {

        // 登録済みのメアド submit()のときしかチェックできてない
        const exist = this.$store.getters['user/getUser'](this.tmp.uid)
        if (this.action === 'add' && exist) {
          this.$validator.errors.add({
            field: 'uid',
            msg: '同一のメールアドレスが既に存在します'
          })
          return
        }

        // エラーが存在する
        if (!result) return

        this.$emit(this.action, this.tmp)
      })
    },
  },
}
</script>
