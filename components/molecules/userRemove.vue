<template>
  <div>
    foo
    <hr/>
    <button
      class="button is-danger is-fullwidth"
      @click="$emit('remove')"
      style="margin-bottom:16px;"
    >
      削除
    </button>
    <button
      class="button is-outlined is-fullwidth"
      @click="$emit('update', tmp)"
    >
      閉じる
    </button>
  </div>
</template>

<script>
export default {
  // props: ['user']
}
</script>
