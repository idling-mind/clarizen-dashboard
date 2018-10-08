<template>
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container-fluid">
          <page-header title='GAI Strategy Matrix'></page-header>
          <div class="row row-cards">
            <div class="col-xl-3 col-lg-6 col-sm-12">
              <circle-progress title="Overall Progress" :number=strategyMatrix.PercentCompleted :status="strategyMatrix.TrackStatus.Name"></circle-progress>
            </div>
            <div class="col-xl-3 col-lg-6 col-sm-12">
              <circle-progress title="Priority CIPs for the Quarter" :number=this.progressQPrio() :status="this.statuscolor('On Track')"></circle-progress>
            </div>
            <div class="col-xl-6 col-lg-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Priority CIP List for the Quarter</h3>
                </div>
                <div class="table-responsive">
                  <table class="table card-table table-vcenter text-nowrap">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Lead</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="cip in priocips" :key="cip.id">
                        <td>
                          {{ cip.Name }}
                        </td>
                        <td>
                          {{ cip.ProjectManager.Name }}
                        </td>
                        <td>
                          <radial-progress-bar :diameter=54
                              :completed-steps=Math.floor(cip.PercentCompleted)
                              :total-steps=100
                              :startColor="statuscolor(cip.TrackStatus.Name)"
                              :stopColor="statuscolor(cip.TrackStatus.Name)"
                              :strokeWidth=5
                              innerStrokeColor="#dddddd">
                            <div style="font-size:1em">{{ Math.floor(cip.PercentCompleted) }}</div>
                          </radial-progress-bar>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <page-header title='Strategy Matrix - CIPs'></page-header>
          <div class="row row-cards">
            <div class="col-lg-12">
              <projects-carousel></projects-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import RadialProgressBar from 'vue-radial-progress'
import PageHeader from './PageHeader.vue'
import CircleProgress from './charts/CircleProgress.vue'
import ProjectsCarousel from './ProjectsCarousel.vue'
import clapi from '../clarizen/clapi.js'
import tabler from '../assets/js/Colors.js'

export default {
  name: 'StrategyMatrix',
  components: {
    CircleProgress,
    PageHeader,
    RadialProgressBar,
    ProjectsCarousel
  },
  data () {
    return {
      strategyMatrix: {},
      priocips: {}
    }
  },
  methods: {
    getStrategyProject () {
      clapi.get('data/query?q=SELECT%20@Name,%20PercentCompleted,%20TrackStatus.Name%20FROM%20Project%20WHERE%20Project%20=%20%22/Project/5r4db1jbd0biqmx59gobn5o6s681%22'
      ).then(response => {
        this.strategyMatrix = response.data.entities[0]
      }).catch(error => {
        console.log(error)
      })
    },
    getQ2Prio () {
      clapi.post('data/relationQuery', '{"entityId":"/EnhancementRequest/vy6p0hxaxniwfdof0cydfx8x140","relationName":"WorkItems","fields":["Name", "TrackStatus.Name", "ProjectManager.Name", "PercentCompleted"]}'
      ).then(response => {
        this.priocips = response.data.entities
      }).catch(error => {
        console.log(error)
      })
    },
    progressQPrio () {
      return _.meanBy(this.priocips, 'PercentCompleted')
    },
    statuscolor (status) {
      if (status === 'On Track') {
        return tabler.colors.green
      } else if (status === 'At Risk') {
        return tabler.colors.orange
      } else if (status === 'Off Track') {
        return tabler.colors.red
      }
    }
  },
  mounted () {
    var vm = this
    vm.getStrategyProject()
    vm.getQ2Prio()
    setInterval(function () {
      vm.getStrategyProject()
      vm.getQ2Prio()
    }, 300000)
  }
}
</script>
