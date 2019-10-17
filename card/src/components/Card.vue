<template>
    <div class="card-container">
        <div class="card">

            <div class="carousel">


                <agile :autoplay-speed="5000" :speed="2500" fade autoplay>
                    <div class="slide" v-for="(image, index) in images" :key="`image--${index}`">
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

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Card',
        props: {
            msg: String
        },
        computed: {
            ...mapState([
                    'images',
                    'imageHeight',
                    'imageWidth'
                ],
            ),
            cssVars() {
                return {
                    '--height': this.imageHeight + 'px',
                    '--width': this.imageWidth + 'px',
                }
            }
        },

    }
</script>

<style lang="scss">

    .card-container {
        display: block;
        position: absolute;
        top: 50px;
        width: 100%;
    }

    .card {
        height: 800px;
        width: 500px;
        border: 1px solid black;
        margin: 0 auto;
    }

    .agile {
        height: 300px;
    }

    .agile__nav-button {
        background: transparent;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 24px;
        height: 100%;
        position: absolute;
        top: 0;
        transition-duration: 0.3s;
        width: 40px;
    }

    .agile__nav-button:hover {
        background-color: rgba(0, 0, 0, .5);
        opacity: 1;
    }

    .agile__nav-button--prev {
        left: 0;
    }

    .agile__nav-button--next {
        right: 0;
    }

    .agile__dots {
        bottom: 10px;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
    }

    .agile__dot {
        margin: 0 10px;
    }

    .agile__dot button {
        background-color: transparent;
        border: 1px solid rgba(#fff, .5);
        border-radius: 50%;
        cursor: pointer;
        display: block;
        height: 10px;
        font-size: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
        transition-duration: 0.3s;
        width: 10px;
    }

    .agile__dot--current, .agile__dot:hover button {
        background-color: #fff;
        border-radius: 50%;
    }

    .agile .slide {
        display: block;
        height: 300px;
        object-fit: cover;
        width: 100%;
    }

    .carousel {
        overflow: hidden;
        min-width: 100%;
        width: 0;
        height: 300px;
    }

    .agile__actions {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .image {
        width: 500px;
        height: 300px;
    }

    .chevron-left {
        margin-left: -6px;
    }

</style>
