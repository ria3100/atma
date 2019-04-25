<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-12">
      <strong>{{user.name}}</strong>
    </div>
    <div class="column is-6">
      <a
        class="button is-large is-primary is-fullwidth"
        @click="$emit('going')"
      >
        出勤
      </a>
    </div>
    <div class="column is-6">
      <a
        class="button is-large is-info is-fullwidth"
        @click="$emit('leaving')"
      >
        退勤
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style lang="scss" scoped>
.button.is-large {
  padding-top: 32px;
  padding-bottom: 32px; 
}
</style>
