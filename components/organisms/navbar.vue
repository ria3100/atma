<template>
  <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <n-link class="navbar-item" to="/">
        簡単にタイムカードを押すアプリ(仮)
      </n-link>

      <div class="button-area navbar-item">
            <n-link v-if="!isEdit" class="button is-primary" to="/edit">
              <i class="fas fa-cog"></i>
            </n-link>
            <n-link v-if="isEdit" class="button is-info" to="/">
              <i class="fas fa-sign-out-alt"></i>
            </n-link>
      </div>
    </div>


  </nav>  
</template>

<script>
export default {
  props: ['isEdit'],
  created() {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
.navbar-brand {
  width: 100%;
}
.button-area {
  margin-left: auto;
}
</style>
