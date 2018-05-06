<template>
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container-fluid">
          <page-header title='Clarizen Users' subtitle='Clarizen Users at GAI'></page-header>
        </div>
      </div>
    </div>
  </div>
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
