<template>
  <div class="columns is-mobile">
    <div class="column is-6">
      <a
        class="button is-large is-primary is-fullwidth"
        @click="$emit('going')"
      >
        出勤
      </a>
    </div>
    <div class="column is-6">
      <a
        class="button is-large is-info is-fullwidth"
        @click="$emit('leaving')"
      >
        退勤
      </a>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['user']
}
</script>
