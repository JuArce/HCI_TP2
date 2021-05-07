<template>
  <video class="homeBG" autoplay loop muted>
    <source
        src="https://assets.mixkit.co/videos/preview/mixkit-lifting-weights-against-a-dark-background-11830-large.mp4"
        type="video/mp4">
  </video>
</template>

<script>
export default {
  name: "VideoBackground"
}
</script>

<style scoped>
.homeBG {
  position: fixed;
  right: 0;
  bottom: 0;

  min-width: 100%;
  min-height: 100%;
  z-index: 0;
}
</style>