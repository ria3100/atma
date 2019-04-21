<template>
  <div class="modal" :class="{'is-active': isOpen}">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-content">
      <slot/>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close()"></button>
  </div>
</template>

<script>
export default {
  props: ['isOpen'],

  methods: {
    close () {
      this.$emit('close')
    },
  },
}
</script>
