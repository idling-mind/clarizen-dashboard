<template>
  <div class="page-header">
    <h1 class="page-title">
      {{ title }}
    </h1>
    <div class="page-subtitle">
      {{ subtitle }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: String,
    subtitle: String
  },
  data () {
    return {
      title: 'Page Title',
      subtitle: 'Page Subtitle'
    }
  }
}
</script>
