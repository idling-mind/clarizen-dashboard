<template>
  <div class="col-lg-4 col-md-8 col-sm-12">
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
import tabler from '../../assets/js/Colors.js'

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
      data: {
        json: this.datajson,
        type: 'bar',
        groups: [
          this.chartkeys()
        ],
        legend: {
          position: 'right'
        },
        labels: true
      },
      color: {
        pattern: tabler.primary
      },
      axis: {
        rotated: true,
        x: {
          show: false
        },
        y: {
          show: false
        }
      },
      size: {
        height: 76
      }
    })
  },
  watch: {
    datajson: function (val) {
      this.chart.load({
        json: val
      })
      this.chart.groups([
        this.chartkeys()
      ])
    }
  }
}
</script>
