<template>
  <div>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="tmp.name"
          data-vv-as="name"
          v-validate="'required'"
        />
        <p class="error">{{ errors.first('name') }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Uid</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="tmp.uid"
          data-vv-as="uid"
          v-validate="'required'"
        />
        <p class="error">{{ errors.first('uid') }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Pass</label>
      <div class="control">
        <textarea
          class="textarea"
          type="text"
          placeholder="Text input"
          v-model="tmp.pass"
          data-vv-as="pass"
          v-validate="'required'"
        />
        <p class="error">{{ errors.first('pass') }}</p>
      </div>
    </div>
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
      @click="$emit('update', tmp)"
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
      tmp: {}
    }
  },

  created() {
    this.tmp = {...this.user}
  },

  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit(action, tmp)
          return
        }
      })
    },
  },
}
</script>
