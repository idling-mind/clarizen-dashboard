<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-body">
        <div class="card-value float-right text-red">{{ bignumber }} <h6 class="text-muted">Tasks past due</h6></div>
        <h3 class="mb-1">{{ title }}</h3>
      </div>
      <div class="c3"></div>
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
      required: false
    },
    xlabel: {
      type: String,
      required: false
    },
    datajson: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      bignumber: _.sum(this.datajson.pastvalues),
      smallnumber: _.sum(this.datajson.pastvalues) + _.sum(this.datajson.values)
    }
  },
  mounted () {
    var vm = this
    this.chart = c3.generate({
      bindto: vm.$el.querySelector('.c3'),
      data: {
        json: this.datajson,
        xs: {
          'pastvalues': 'pastdates',
          'values': 'dates'
        },
        xFormat: '%m/%d/%Y',
        type: 'bar',
        colors: {
          'pastvalues': tabler.colors.red,
          'values': tabler.colors.green
        }
      },
      legend: {
        show: false
      },
      color: {
        pattern: tabler.primary
      },
      bar: {
        width: 10
      },
      grid: {
        x: {
          lines: [
            {value: new Date(), text: 'Today'}
          ]
        }
      },
      area: {
        zerobased: true
      },
      padding: {
        left: 10,
        right: 10
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
            fit: false,
            rotate: 75,
            multiline: false
          },
          show: true,
          height: 150
        },
        y: {
          show: false
        }
      },
      size: {
        height: 350
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
