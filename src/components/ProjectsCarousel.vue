<template>
  <div v-if="dataisloaded">
    <carousel :scrollPerPage="false" :autoplay="true" :perPageCustom="[[768, 1], [1024, 2], [1400, 3]]" :autoplayTimeout=8000 :loop="true">
      <slide v-for="project in projects" :key="project.id">
        <div class="col-md-12 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-9">
                  <h3>{{ project.Name }}</h3>
                  <div class="text-muted-small">
                    {{ project.ProjectManager.Name }}
                  </div>
                </div>
                <div class="col-3">
                  <radial-progress-bar :diameter=100
                                :completed-steps=Math.floor(project.PercentCompleted)
                                :total-steps=100
                                :startColor="statuscolor(project.TrackStatus.Name)"
                                :stopColor="statuscolor(project.TrackStatus.Name)"
                                :strokeWidth=10
                                innerStrokeColor="#dddddd"
                                class="d-flex mr-5">
                    <div style="font-size:1.5em">{{ Math.floor(project.PercentCompleted) }}</div>
                  </radial-progress-bar>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="h4">Team Members</div>
                  <p>
                    <span v-for="member in project.Resources.entities" :key="member.id">
                      {{ member.Name }},
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <span class="badge" :style="'background-color:' + domaincolor(project.Domain)">{{ project.Domain }}</span>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import RadialProgressBar from 'vue-radial-progress'
import _ from 'lodash'
import clapi from '../clarizen/clapi.js'
import tabler from '../assets/js/Colors.js'

export default {
  name: 'ProjectsCarousel',
  components: {
    Carousel,
    Slide,
    RadialProgressBar
  },
  props: {
    title: {
      type: String,
      default: 'Project Carousel'
    }
  },
  data () {
    return {
      projects: [],
      domains: [],
      dataisloaded: false
    }
  },
  methods: {
    getStrategyProject () {
      var vm = this
      clapi.get('data/query?q=SELECT%20@Name,%20PercentCompleted,%20TrackStatus.Name,%20ProjectManager.Name,%20%28SELECT%20Name%20FROM%20Resources%29,%20%28SELECT%20Title%20FROM%20RelatedRequests%29%20FROM%20Project%20WHERE%20ParentProject%20=%20%22/Project/5r4db1jbd0biqmx59gobn5o6s681%22'
      ).then(response => {
        vm.projects = response.data.entities
        clapi.post('data/relationQuery', '{"entityId":"/Topic/tpofjhhfustp9fpijy1r9zmd398","relationName":"Cases","fields":["Title"]}'
        ).then(response => {
          vm.domains = _.map(response.data.entities, 'Title')
          vm.projects.forEach(function (project) {
            if (project.RelatedRequests) {
              var requests = _.map(project.RelatedRequests.entities, 'Title')
              project['Domain'] = _.intersectionWith(vm.domains, requests, _.isEqual)[0]
            } else {
              project['Domain'] = ''
            }
          })
          vm.dataisloaded = true
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    domaincolor (domain) {
      var i = _.indexOf(this.domains, domain)
      return tabler.primary[i]
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
    setInterval(function () {
      vm.getStrategyProject()
    }, 300000)
  }
}
</script>
