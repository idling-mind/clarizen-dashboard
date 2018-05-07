<template>
  <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card">
      <div class="card-body text-center">
        <div class="h5">{{ title }}</div>
        <div class="c3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import c3 from 'c3'

export default {
  name: 'SingleHBar',
  props: {
    title: {
      type: String,
      required: true
    },
    datajson: {
      type: Object,
      required: false,
      default () {
        return {
          data1: 20,
          data2: 80
        }
      }
    }
  },
  data () {
    return {
      c3chartdata: {
        json: this.datajson,
        type: 'bar',
        groups: [
          this.chartkeys()
        ],
        legend: {
          position: 'right'
        }
      },
      c3chartaxis: {
        rotated: true,
        x: {
          show: false
        },
        y: {
          show: false
        }
      },
      c3chartsize: {
        height: 76
      }
    }
  },
  methods: {
    chartkeys () {
      var keys = []
      for (var i in this.datajson) {
        if (this.datajson.hasOwnProperty(i)) {
          keys.push(i)
        }
      }
      return keys
    }
  },
  mounted () {
    var vm = this
    this.chart = c3.generate({
      bindto: vm.$el.querySelector('.c3'),
      data: vm.c3chartdata,
      axis: vm.c3chartaxis,
      size: vm.c3chartsize
    })
  },
  watch: {
    chartdata: function (val) {
      this.chart.load(val)
    }
  }
}
</script>
