<template>
  <div class="col-lg-2 col-md-4 col-sm-6">
    <div class="card">
      <div class="card-body text-center">
        <div class="h5">{{ title }}</div>
        <div class="display-4 font-weight-bold mb-4">{{ hilight }}</div>
        <div class="progress progress-sm">
            <div :class="color" class="progress-bar" :style="getProgress()"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSmallProgress',
  props: {
    hilight: String,
    title: String,
    progress: Number,
    color: String
  },
  methods: {
    getProgress () {
      var p = this.progress
      if (p > 100) {
        p = 100
      } else if (p < 0) {
        p = 0
      }
      return 'width: ' + p + '%'
    }
  }
}
</script>
