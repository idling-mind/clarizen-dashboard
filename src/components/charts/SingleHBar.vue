<template>
  <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card">
      <div class="card-body text-center">
        <div class="h5">{{ title }}</div>
        <c3-chart :chartdata="c3chartdata" :chartaxis="c3chartaxis" :chartsize="c3chartsize"></c3-chart>
      </div>
    </div>
  </div>
</template>

<script>
import C3Chart from './C3Chart.vue'
export default {
  name: 'SingleHBar',
  props: {
    datajson: {
      type: Object,
      required: false,
      default () {
        return {
          Full: 20,
          TeamMember: 130
        }
      }
    }
  },
  data () {
    return {
      title: 'HBar',
      c3chartdata: {
        json: this.datajson,
        type: 'bar',
        groups: [
          ['Full', 'TeamMember']
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
  components: {
    C3Chart
  },
  mounted () {
    console.log(this.datajson)
    console.log(this.datajson.keys)
  }
}
</script>
