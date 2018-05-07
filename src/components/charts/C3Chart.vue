<template>
  <div id="c3chart">

  </div>
</template>

<script>
import c3 from 'c3'

export default {
  name: 'C3Chart',
  props: {
    chartdata: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chart: Object
    }
  },
  mounted () {
    console.log('Mounted C3 chart')
    var vm = this
    console.log(this.chartdata)
    this.chart = c3.generate({
      bindto: vm.$el,
      data: vm.chartdata
    })
  },
  watch: {
    chartdata: function (val) {
      this.chart.load(val)
    }
  }
}
</script>
