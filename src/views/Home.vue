<template>
  <div>
    <c-video-background></c-video-background>
    <h1 class="mainText py-8 px-15 teal--text">Train <br>and<br>Help Others.</h1>
  </div>
</template>

<script>
import VideoBackground from "../components/VideoBackground";

export default {
  name: "Home",
  components: {
    CVideoBackground: VideoBackground,
  }
}
</script>

<style>
</style>