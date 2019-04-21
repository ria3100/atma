<template>
  <div class="box" :class="{'is-simple': !isEdit}">
    <strong>{{user.name}}</strong><br/>
    <small>{{user.uid}}</small>
    <div v-if="isEdit" @click="$emit('update')"><i class="fas fa-edit"></i></div>
    <div v-if="isEdit" @click="$emit('remove')"><i class="fas fa-trash-alt"></i></div>
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
