<template>
    <v-container>
        <v-row class="py-10" align="center" justify="center">
            <v-col cols="11" md="9" justify="center" align="center">
                <v-card light class="py-2 px-10" max-width="1000" justify="center">
                    <v-list-item>
                        <v-list-item-content class="px-2">
                            <h1 class="teal--text">Oops!</h1>
                            <h2 class="py-3">We can't seem to find the page you are looking for.<br></h2>
                            <v-btn to="/Home" outlined color="teal">Take me back to Home</v-btn>
                            <h3 class="pt-3">Error code: 404</h3>
                        </v-list-item-content>
                        <v-img class="pt-n16 pl-n16" src="../assets/Error404.png" max-width="400"></v-img>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: "Error404"
}
</script>

<style scoped>
h1 {
    font-size: 100px;
}

h2 {
    font-size: 40px;
}

h3 {
    font-size: 20px;
    font-weight: bold;
}
</style>