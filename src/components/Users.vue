<template>
  <page-header title='Clarizen Users' subtitle='Clarizen Users at GAI'></page-header>
</template>

<script>
import PageHeader from './PageHeader.vue'

export default {
  name: 'Users',
  data () {
    return {
      msg: 'Clarizen User Statistics'
    }
  },
  components: {
    PageHeader
  }
}
</script>
