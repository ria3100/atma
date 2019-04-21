<template>
  <div class="box">
    {{user.name}}
    {{user.uid}}
  </div>
</template>

<script>
export default {
  props: ['user'],
}
</script>
