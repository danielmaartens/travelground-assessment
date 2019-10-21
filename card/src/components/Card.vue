<template>
    <div class="card">
        <div @mousemove="(e) => onMouseMove(e, 'premium-banner-tooltip', 10)" class="premium-banner">
            <div class="premium-banner-tooltip">
                <span>
                    Dié verblyf is <b>top qualiteit</b> !
                </span>
            </div>
            <div></div>
            <div class="premium-text">PREMIUM</div>
        </div>

        <Heading :on-mouse-move="onMouseMove"/>

        <div class="ux-button-container">
            <img v-if="favourite" @click.prevent="toggleLike()" class="ux-button pulse" src="@/assets/like.png">
            <img v-if="!favourite" class="ux-button no-like-pulse" @click.prevent="toggleLike()"
                 src="@/assets/not-like.png">
            <img v-clipboard="() => establishment.link" @click.prevent="alertMessage()" class="ux-button"
                 src="@/assets/send.png">
        </div>

        <Carousel/>
        <InfoBanner :on-mouse-move="onMouseMove"/>

        <div class="bottom-container">
            <span id="bottom-page-scroll-to"></span>
            <ViewMorePage/>
            <ReviewPage/>
            <div class="brief-info">
                <p>{{currentEstablishment.shortDescription}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import JQuery from 'jquery';

    import Heading from './Heading';
    import Carousel from "./Carousel";
    import InfoBanner from "./InfoBanner";
    import ViewMorePage from "./ViewMorePage";
    import ReviewPage from "./ReviewPage";

    const $ = JQuery;

    export default {
        name: 'Card',
        components: {
            Heading,
            Carousel,
            InfoBanner,
            ViewMorePage,
            ReviewPage
        },
        data() {
            return {
                link: '',
                favourite: false,
                establishment: {},
            }
        },
        mounted() {
            console.log('CARD');
            const establishment = this.currentEstablishment;

            this.establishment = establishment;
            this.favourite = establishment.favourite;
            this.link = establishment.link;
        },
        computed: {
            ...mapState([
                    'currentEstablishment',
                ],
            ),

        },
        methods: {
            toggleLike() {
                this.favourite = !this.favourite;
            },
            onMouseMove(e, tooltipClass, yOffset) {
                const tooltip = $(`.${tooltipClass}`);
                let x = (e.clientX) + 'px',
                    y = (e.clientY + (yOffset || 20)) + 'px';

                console.log('tip', tooltip);
                tooltip.css('top', y);
                tooltip.css('left', x);
            },
            alertMessage() {
                alert(`The link to ${this.establishment.name}'s LekkeSlaap page has been copied to your clipboard to share !`);
            }
        }

    }
</script>


<style lang="scss">

    $cardWidth: 500px;
    $bottomWidth: 502px;
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
            } @else {
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

    @mixin tooltip-hover() {

        &-tooltip {
            text-decoration: none;
            position: fixed;
            z-index: 2;

            span {
                display: none;
                background-color: #FFF9EF;
                padding: 2px 4px;
                text-align: center;
                font-size: 10px;
                border-radius: 3px;
                border: 1px solid black;
                color: #5d5a5a;
                z-index: 1;
            }
        }

        &:hover &-tooltip span {

            display: block;
            position: fixed;
            overflow: hidden;

        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        40% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes no-like-pulse {
        0% {
            transform: scale(1);
        }
        40% {
            transform: scale(0.5);
        }
        100% {
            transform: scale(1);
        }
    }

    .card {
        display: block;
        top: 50px;
        width: $cardWidth;
        margin: 0 auto;
    }

    .heading {
        position: absolute;
        width: $cardWidth;
        height: 50px;
        background-color: rgba(black, .5);
        color: white;
        z-index: 2;
        text-align: left;
    }

    .ux-button-container {
        height: 50px;
        top: 115px;
        position: absolute;
        z-index: 1;
        width: $cardWidth;
    }

    .ux-button {
        height: 20px;
        float: right;
        margin-right: 5px;
        opacity: 0.8;
        cursor: pointer;
        position: relative;
        right: 5px;
    }

    .pulse {
        opacity: 1;
        animation: pulse 0.5s linear;
    }

    .no-like-pulse {
        animation: no-like-pulse 0.5s linear;
    }

    .establishment {
        position: absolute;
        bottom: 2px;
        left: 6px;
        margin: 0 0 0 5px;
        color: white;
        float: left;
    }

    .location {
        font-size: 10px;
        font-weight: bold;
    }

    .name {
        font-size: 24px;
        position: relative;
        top: 6px;
    }

    .premium-banner {
        width: 20px;
        height: 290px;
        position: absolute;
        color: white;
        z-index: 1;
        cursor: help;


        &:after {
            content: '';
            position: absolute;
            top: 295px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: #ed762d;
            transform-origin: 0 0;
            transform: rotate(180deg);

        }

        @include tooltip-hover;
    }

    .premium-text {
        position: absolute;
        bottom: 0;
        left: -20px;
        z-index: 1;

        transform-origin: 0 0;
        transform: rotate(-90deg);
    }

    .tourism-grading {
        float: right;
        height: 80%;
        margin-right: 10px;
        cursor: help;

        img {
            width: 20px;
            height: 100%;
            vertical-align: middle;
            margin: {
                left: 5px;
                top: 5px;
            }
        }

        @include tooltip-hover;
    }

    .bottom-container {
        display: flex;
    }

    @mixin bottom-container-page {
        width: 500px;
        position: absolute;
        overflow: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height 1.5s linear;
        background-color: #FFF9EF;
        color: #5d5a5a;
        z-index: 1;
        box-sizing: border-box;
        border: {
            left: 1px solid #b9babb;
            right: 1px solid #b9babb;
            bottom: 1px solid #b9babb;
        }
        padding: 8px;
    }

    .view-more-container {
        @include bottom-container-page;

    }

    .review-container {
        @include bottom-container-page;

        text-align: left;
    }

    .brief-info {
        transition: max-height 1.5s linear, padding 1.5s linear;
        overflow: hidden;
        width: 500px;
        max-height: 100%;
        position: absolute;
        transform: scale(1);
        padding: 10px;
        margin: 0;
        color: #5d5a5a;
        background-color: #FFF9EF;
        box-sizing: border-box;
        border: {
            left: 1px solid #b9babb;
            right: 1px solid #b9babb;
            bottom: 1px solid #b9babb;
        }

        p {
            margin: 0 auto;
            padding: 10px 0;
        }
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
        margin-bottom: 0;
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
