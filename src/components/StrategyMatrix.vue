<template>
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container-fluid">
          <page-header title='GAI Strategy Matrix'></page-header>
          <div class="row row-cards">
            <div class="col-lg-3 col-md-6 col-sm-12">
              <circle-progress title="Overall Progress" :number=strategyMatrix.PercentCompleted :status="strategyMatrix.TrackStatus.Name"></circle-progress>
            </div>
            div.col-lg-9
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue'
import CircleProgress from './charts/CircleProgress.vue'
import clapi from '../clarizen/clapi.js'

export default {
  name: 'StrategyMatrix',
  components: {
    CircleProgress,
    PageHeader
  },
  data () {
    return {
      strategyMatrix: {}
    }
  },
  methods: {
    getProject () {
      clapi.get('data/query?q=SELECT%20@Name,%20PercentCompleted,%20TrackStatus.Name%20FROM%20Project%20WHERE%20Project%20=%20%22/Project/5r4db1jbd0biqmx59gobn5o6s681%22'
      ).then(response => {
        this.strategyMatrix = response.data.entities[0]
        console.log(this.strategyMatrix)
      }).catch(error => {
        console.log(error)
      })
    },
    getQ2Prio () {
      clapi.get()
    }
  },
  mounted () {
    this.getProject()
    console.log('Executed query')
  }
}
</script>
