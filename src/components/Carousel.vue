<template>
    <div class="carousel">

        <agile v-if="establishment.images" :autoplay-speed="5000" :speed="2500" fade autoplay>
            <div class="slide" v-for="(image, index) in establishment.images" :key="`image--${index}`">
                <img class="image" :src="image" :alt="`image--${index}`">
            </div>
            <template v-slot:prevButton>
                <img class="chevron-left" height="30px" width="30px" src="@/assets/chevron-left.svg">
            </template>
            <template v-slot:nextButton>
                <img height="30px" width="30px" src="@/assets/chevron-right.svg">

            </template>
        </agile>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "Carousel",
        data() {
            return {
                establishment: {},
            }
        },
        mounted() {
            this.establishment = this.currentEstablishment;
        },
        computed: {
            ...mapState([
                    'currentEstablishment',
                ],
            ),
        },
    }
</script>

<style scoped>

</style>