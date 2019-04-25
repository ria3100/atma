<template>
  <div class="box handle" :class="{'is-edit': isEdit}">
    <div class="name-area">
      <i class="fas fa-bars" v-if="isEdit"></i>
      <strong>{{user.name}}</strong><br/>
      <small>{{user.uid}}</small>
    </div>
    <div class="icon-area" v-if="isEdit">
      <a class="button is-info" @click="$emit('update')">
        <i class="fas fa-edit"/>
      </a>
      <a class="button is-danger" @click="$emit('remove')">
        <i class="fas fa-trash-alt" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user', 'isEdit'],
}
</script>

<style lang="scss" scoped>
  .box.is-edit {
    display: flex;

    .name-area {
      margin-right: auto;
    }
  }
  .box:not(.is-edit) {
    padding: 16px;
    text-align: center;

    strong {
      font-size: 32px;
    }
  }

</style>
