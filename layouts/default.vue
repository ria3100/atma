<template>
  <div id="wrapper">
    <Navbar :is-edit="$route.name === 'edit'"/>
    <nuxt />
  </div>
</template>

<script>
import { Navbar } from '@/components/organisms'

export default {
  components: {
    Navbar,
  },
}
</script>

<style lang="scss" scoped>
#wrapper {
  margin-top: 52px;
}
</style>
