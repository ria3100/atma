<template>
  <div>
    <strong>{{user.name}}</strong><br/>
    <small>{{user.uid}}</small>
    <hr/>
    <form autocomplete="off">
      確認のためメールアドレスを入力してください。
      <div class="field">
        <div class="control">
          <input
            class="input"
            type="text"
            name="uid"
            placeholder="このユーザーのメールアドレスを入力してください"
            v-model="uid"
            data-vv-as="メールアドレス"
            v-validate="`required|is:${user.uid}`"
          />
          <p class="has-text-danger">{{ errors.first('uid') }}</p>
        </div>
      </div>
    </form>
    <hr/>
    <button
      class="button is-danger is-fullwidth"
      @click="submit"
      style="margin-bottom:16px;"
    >
      削除
    </button>
    <button
      class="button is-outlined is-fullwidth"
      @click="$emit('close', uid)"
    >
      閉じる
    </button>
  </div>
</template>

<script>
export default {
  props: ['user'],

  data() {
    return {
      uid: null,
    }
  },

  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('remove', this.uid)
          return
        }
      })
    },
  },

}
</script>
