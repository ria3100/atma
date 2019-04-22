<template>
  <a class="button" @click="$emit('setIsEdit', true)">
    <i class="fas fa-cog"></i>
  </a>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
 .button {
   position: absolute;
   right: 0;
   top: 100px;
 }
</style>
