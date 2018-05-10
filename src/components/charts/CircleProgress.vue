<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <div class="card-body text-center">
      <div class="c3">
        <radial-progress-bar :diameter=diameter
                              :completed-steps=Math.floor(number)
                              :total-steps=100
                              :startColor="statuscolor()"
                              :stopColor="statuscolor()"
                              :strokeWidth=strokewidth
                              innerStrokeColor="#dddddd">
          <div class="h1">{{ Math.floor(number) }}%</div>
        </radial-progress-bar>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
import tabler from '../../assets/js/Colors.js'

export default {
  name: 'RadialProgress',
  props: {
    title: String,
    number: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'On Track'
    },
    diameter: {
      type: Number,
      required: false,
      default: 305
    },
    strokewidth: {
      type: Number,
      required: false,
      default: 25
    }
  },
  methods: {
    statuscolor () {
      if (this.status === 'On Track') {
        return tabler.colors.green
      } else if (this.status === 'At Risk') {
        return tabler.colors.orange
      } else if (this.status === 'Off Track') {
        return tabler.colors.red
      }
    }
  },
  components: {
    RadialProgressBar
  }
}
</script>

<style scoped>
  .radial-progress-container {
    margin-left: auto;
    margin-right: auto;
  }
</style>
