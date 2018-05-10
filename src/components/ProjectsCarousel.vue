<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <div class="card-body text-center">
      <carousel :scrollPerPage="false" :autoplay="true">
        <slide>
          <div class="col-6">
          Slide 1 Content
          </div>
        </slide>
        <slide>
          <div class="col-6">
          Slide 1 Content
          </div>
        </slide>
        <slide>
          <div class="col-6">
          Slide 1 Content
          </div>
        </slide>
        <slide>
          <div class="col-6">
          Slide 1 Content
          </div>
        </slide>
        <slide>
          <div class="col-6">
          Slide 1 Content
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'ProjectsCarousel',
  components: {
    Carousel,
    Slide
  }
}
</script>
