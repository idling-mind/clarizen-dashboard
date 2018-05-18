<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-body">
        <div class="card-value float-right text-blue">{{ bignumber }}</div>
        <h3 class="mb-1">{{ smallnumber }}</h3>
        <div class="text-muted">{{ title }}</div>
      </div>
      <div class="c3"></div>
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
          value: ['On Track', 'At Risk', 'Off Track', 'None']
        },
        groups: [
          ['On Track', 'At Risk', 'Off Track', 'None']
        ],
        labels: false,
        type: 'bar'
      },
      grid: {
        lines: {
          front: false
        },
        y: {
          lines: [
            {value: 5},
            {value: 10},
            {value: 15},
            {value: 20},
            {value: 25},
            {value: 30}
          ]
        }
      },
      padding: {
        left: 30,
        right: 30
      },
      legend: {
        show: false
      },
      color: {
        pattern: [tabler.colors.green, tabler.colors.orange, tabler.colors.red, tabler.colors.gray]
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
            rotate: 60,
            multiline: false
          },
          height: 150
        },
        y: {
          show: true
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
        json: val,
        keys: {
          x: 'Name',
          value: ['WorkItemCount.Task']
        },
        labels: true,
        type: 'bar'
      })
    }
  }
}
</script>
