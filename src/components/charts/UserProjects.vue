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
import tabler from '../../assets/js/Colors.js'

export default {
  name: 'UserProjects',
  props: {
    title: {
      type: String,
      required: true
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
      type: Array,
      required: true
    }
  },
  mounted () {
    var vm = this
    this.chart = c3.generate({
      bindto: vm.$el.querySelector('.c3'),
      data: {
        json: this.datajson,
        keys: {
          x: 'Name',
          value: ['WorkItemCount.Task']
        },
        labels: true,
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
          type: 'category',
          show: true,
          fit: true,
          padding: {
            left: 1,
            right: 1
          },
          tick: {
            rotate: 75,
            multiline: false
          },
          height: 50
        },
        y: {
          show: false
        }
      },
      grid: {
        y: {
          show: true
        }
      },
      size: {
        height: 180
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
