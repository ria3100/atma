<template>
  <section class="section">
    <div class="container">
      <Users :isEdit="true" />
    </div>
  </section>
</template>

<script>
import { Users } from '@/components/organisms'

export default {
  components: {
    Users,
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
