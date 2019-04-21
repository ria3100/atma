<template>
  <div class="box" :class="{'is-simple': !isEdit}">
    <strong>{{user.name}}</strong><br/>
    <small>{{user.uid}}</small>
    <div v-if="isEdit" @click="$emit('update')">edit</div>
    <div v-if="isEdit" @click="$emit('remove')">remove</div>
  </div>
</template>

<script>
export default {
  props: ['user', 'isEdit'],
}
</script>

<style lang="scss" scoped>
  .box.is-simple {
    padding: 16px;
    text-align: center;

    strong {
      font-size: 32px;
    }
  }

</style>
