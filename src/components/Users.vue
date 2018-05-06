<template>
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container-fluid">
          <page-header title='Clarizen Users' subtitle='Clarizen Users at GAI'></page-header>
          <div class="row row-cards">
            <div class="col-lg-8 col-md-6">
              <div class="row">
                <div class="col-lg-6">
                  <card-big-progress title="Number of Users" hilight="106" :progress=100></card-big-progress>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue'
import CardBigProgress from './cards/CardBigProgress.vue'

export default {
  name: 'Users',
  data () {
    return {
      msg: 'Clarizen User Statistics'
    }
  },
  components: {
    PageHeader,
    CardBigProgress
  }
}
</script>
