<template>
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container-fluid">
          <page-header title='Clarizen Users' subtitle='Clarizen Users at GAI'></page-header>
          <div class="row row-cards">
            <card-big-progress title="Number of Users" hilight="106" :progress=100 color="bg-blue"></card-big-progress>
            <card-small-progress title="Not Logged in a Month" hilight="28" :progress=28 color="bg-red"></card-small-progress>
            <card-small-progress title="Logged in today" hilight="21" :progress=21 color="bg-green"></card-small-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue'
import CardBigProgress from './cards/CardBigProgress.vue'
import CardSmallProgress from './cards/CardSmallProgress.vue'

export default {
  name: 'Users',
  data () {
    return {
      msg: 'Clarizen User Statistics'
    }
  },
  components: {
    PageHeader,
    CardBigProgress,
    CardSmallProgress
  }
}
</script>
