<template>
    <div>
<!--        <video-background-->
<!--            src="https://assets.mixkit.co/videos/preview/mixkit-lifting-weights-against-a-dark-background-11830-large.mp4"-->
<!--            style="max-height: 400px; height: 100vh;"-->
<!--        >-->
<!--            <h1 style="color: white;">Hello welcome!</h1>-->
<!--        </video-background>-->
        <video class="homeBG" src="https://assets.mixkit.co/videos/preview/mixkit-lifting-weights-against-a-dark-background-11830-large.mp4" autoplay loop muted >

            <h1 class="teal">Home!</h1>

        </video>

    </div>
</template>



<script>

export default {
    name: "Home",
}

</script>

<style scoped>
    video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url('https://assets.mixkit.co/videos/preview/mixkit-lifting-weights-against-a-dark-background-11830-large.mp4') no-repeat center center fixed !important;
        background-size: cover;
    }

</style>