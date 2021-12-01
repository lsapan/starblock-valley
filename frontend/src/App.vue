<template lang="pug">
    h1 Starblock Valley
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'App',

    methods: {
        ...mapActions(['prepareFarm', 'connect']),
    },

    mounted() {
        this.prepareFarm()
    },
}
</script>

<style lang="scss">
</style>
