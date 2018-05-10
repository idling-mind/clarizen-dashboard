<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-body">
        <div class="card-value float-right text-blue">{{ bignumber }}</div>
        <h3 class="mb-1">{{ smallnumber }}</h3>
        <div class="text-muted">{{ title }}</div>
      </div>
      <div class="card-chart-bg" style="min-height: 200px">
        <div class="c3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import c3 from 'c3'
import _ from 'lodash'
import tabler from '../../assets/js/Colors.js'

export default {
  name: 'LineChartCard',
  props: {
    title: {
      type: String,
      required: true
    },
    xlabel: {
      type: String,
      required: false
    },
    smallnumber: {
      type: String,
      required: false
    },
    bignumber: {
      type: String,
      required: false
    },
    datajson: {
      type: Object,
      required: true
    }
  },
  mounted () {
    var vm = this
    this.chart = c3.generate({
      bindto: vm.$el.querySelector('.c3'),
      data: {
        json: this.datajson,
        x: 'day',
        type: 'bar'
      },
      legend: {
        show: false
      },
      bar: {
        width: {
          ratio: 0.5
        }
      },
      color: {
        pattern: tabler.primary
      },
      area: {
        zerobased: true
      },
      axis: {
        x: {
          show: true,
          min: 0,
          max: 24,
          tick: {
            values: _.range(25)
          }
        },
        y: {
          show: false
        }
      },
      size: {
        height: 150
      }
    })
  },
  watch: {
    datajson: function (val) {
      this.chart.load({
        json: val
      })
    }
  }
}
</script>
