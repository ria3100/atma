<template>
  <section class="section">
    <div class="container">
      <Users :isEdit="isEdit" @setIsEdit="setIsEdit" />
    </div>
    <EditButton v-if="!isEdit" @setIsEdit="setIsEdit"/>
  </section>
</template>

<script>
import { Users } from '@/components/organisms'
import { EditButton } from '@/components/atoms'

export default {
  components: {
    Users,
    EditButton
  },

  data() {
    return {
      isEdit: false,
    }
  },

  methods: {
    setIsEdit(isEdit) {
      this.isEdit = isEdit
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
