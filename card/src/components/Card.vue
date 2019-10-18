<template>
    <div class="card-container">



        <div class="card">



            <div class="heading">
                <img height="60px" width="50px" v-if="currentEstablishment.premium" class="premium-ribbon" src="@/assets/premium-ribbon.png">
                <h2>{{currentEstablishment.name}}</h2>
                <div class="tourism-grading" :style="cssVars" >

                    <img :style="cssVars" v-for="index in currentEstablishment.tourismGrading" :key="`tgcsa--${index}`"
                         src="@/assets/tgcsa.svg">
                </div>
            </div>

            <div class="carousel">

                <agile :autoplay-speed="5000" :speed="2500" fade autoplay>
                    <div class="slide" v-for="(image, index) in currentEstablishment.images" :key="`image--${index}`">
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

            <div class="info-container">

                <div class="info-icons left">
                    <div class="icon-left">
                        <div class="bed-count">3</div>
                        <img class="icon" src="@/assets/double-bed.svg">
                    </div>

                    <div class="icon-left">
                        <div class="bed-count">2</div>
                        <img class="icon icon-left" src="@/assets/single-bed.svg">
                    </div>

                    <div class="icon-left">

                        <div>$$$</div>
                        <div class="price-container">
                            <div>from</div>
                            <div class="price"><b>R10</b></div>
                        </div>
                    </div>



                </div>
                <div class="view-more">
                    <div class="view-more-button">
                        view more
                    </div>

                </div>
                <div class="info-icons right">
                    <img class="icon icon-right" src="@/assets/user-rating-star.svg">
                    <img class="icon icon-right" src="@/assets/review-icon.svg">
                </div>

            </div>
            <p>{{currentEstablishment.shortDescription}}</p>
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
                    'currentEstablishment',
                ],
            ),
            cssVars() {
                return {
                    '--grading-margin': (this.currentEstablishment.premium ? 32 : 10) + 'px',
                }
            }
        },

    }
</script>

<style lang="scss">

    $cardWidth: 500px;
    $carouselHeight: 300px;

    @function debug($list, $type: true, $root: true) {
        $line-break: "\A ";
        $result: if($type,
                "(list:#{length($list)})[ "+ $line-break,
                "[ " + $line-break
        );
        $space: if($root,
                "",
                "  "
        );

        @each $item in $list {
            $result: $result + "  ";

            @if length($item) > 1 {
                $result: $result + debug($item, $type, false);
            }

            @else {
                $result: if($type,
                        $result + $space + "(" + type-of($item) + ") " + $item,
                        $result + $space + $item
                );
            }

            @if index($list, $item) != length($list) {
                $result: $result + ", " + $line-break;
            }
        }

        $result: $result + $line-break + $space + "]";
        @return quote($result);
    }

    @mixin debug($list) {
        body:before {
            content: debug($list) !important;

            display: block !important;
            margin: 1em !important;
            padding: 0.5em !important;

            background: #efefef !important;
            border: 1px solid #ddd !important;
            border-radius: 0.2em !important;

            color: #333 !important;
            font: 0.75em/1.5 'Courier New', monospace !important;
            text-shadow: 0 1px white !important;
            white-space: pre-wrap !important;
        }
    }

    .card-container {
        display: block;
        position: absolute;
        top: 50px;
        width: 100%;
    }

    .card {
        height: 800px;
        width: $cardWidth;
        border: 1px solid black;
        margin: 0 auto;

        p {
            margin: 10px;
        }
    }

    .heading {
        position: absolute;
        top: 0;
        width: $cardWidth;
        height: 5%;
        background-color: rgba(black, .5);
        color: white;
        z-index: 1;
        text-align: left;

        h2 {
            position: absolute;
            bottom: 0;
            margin: 0 0 0 5px;
            color: white;
            float: left;
        }

        div {

        }
    }

    .premium-ribbon {
        position: absolute;
        z-index: 1;
        right: -22px;
        top: -20px;
    }

    .tourism-grading {
        float: right;
        height: 100%;
        margin-right: var(--grading-margin);

        img {
            width: 20px;
            height: 100%;
            vertical-align: middle;
            margin: {
                left: 5px;
                top: 5px;
            }
        }
    }

    .info-container {
        width: 100%;
        height: 50px;
        background-color: #dddddd;
        border: 1px solid black;
        display: flex;
        flex-direction: row;

        div {
            flex: .333;
            vertical-align: middle;
        }
    }

    .icon {
        height: 30px;
        width: 30px;

        &-left {

                display: inline-block;
                margin: 0 5px 0 5px;

        }

        &-right {
            padding: 6% 0;
            margin: 0 10px 0 10px;
        }

    }

    .info-icons {

    }

    .bed-count {
        position: relative;
        top: 5px;
    }

    .price-container {
        font-size: 10px;
        position: relative;
    }

    .price {
        position: relative;
        bottom: 3px;
    }



    .view-more {
        margin-top: auto;
        height: 60%;
        color: white;
        background-color: black;
        border-radius: 5px 5px 0 0;
        display: table;

    }

    .view-more-button {
        display: table-cell;
        vertical-align: middle;
    }

    .agile {
        height: $carouselHeight;
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
        height: $carouselHeight;
        object-fit: cover;
        width: 100%;
    }

    .carousel {
        overflow: hidden;
        min-width: 100%;
        width: 0;
        height: $carouselHeight;
    }

    .agile__actions {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .image {
        width: $cardWidth;
        height: $carouselHeight;
    }

    .chevron-left {
        margin-left: -6px;
    }

</style>
