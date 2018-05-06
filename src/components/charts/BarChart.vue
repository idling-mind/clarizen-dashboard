<template>
  <div class="">
    <div class="card">
        <div class="card-body p-3 text-center">
          <vue-c3 :handler="handler"></vue-c3>
        </div>
        <button v-on:click="loaddata">Load New data</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueC3 from 'vue-c3'

export default {
  name: 'BarChart',
  components: {
    VueC3
  },
  data () {
    return {
      handler: new Vue()
    }
  },
  methods: {
    loaddata () {
      console.log('Load data function called')
      this.handler.$emit('dispatch', (chart) => chart.load({
        columns: [
          ['data1', 130, 120, 150, 140, 160, 150],
          ['data4', 30, 20, 50, 40, 60, 50]
        ]}
      ))
    }
  },
  mounted () {
    // to init the graph call:
    const options = {
      data: {
        columns: [
          ['data1', 2, 4, 1, 5, 2, 1],
          ['data2', 7, 2, 4, 6, 10, 1]
        ],
        type: 'spline'
      }
    }
    this.handler.$emit('init', options)
  }
}
</script>
