<template>
    <div class="card">

        <div class="premium-banner">
            <div></div>
            <div class="premium-text">PREMIUM</div>
        </div>


        <div class="heading">
            <div class="establishment">
                <div class="name">{{currentEstablishment.name}}</div>
                <div class="location">{{currentEstablishment.city}}</div>
            </div>
            <div class="tourism-grading" :style="cssVars">

                <img :style="cssVars" v-for="index in currentEstablishment.tourismGrading" :key="`tgcsa--${index}`"
                     src="@/assets/tgcsa.svg">
            </div>
        </div>
        <div class="ux-button-container">
            <img v-if="currentEstablishment.favourite" class="ux-button" src="@/assets/like.png">
            <img v-else class="ux-button" src="@/assets/not-like.png">
            <img class="ux-button" src="@/assets/send.png">

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


            <div class="info-icons-left">

                <div class="icon-left icon-price">

                    <div class="price-container">

                        <div class="price">R10,000+<span class="per-night">/nag</span></div>
                        <div class="price-range">RRR</div>
                    </div>

                </div>

                <div class="icon-left icon-bed">
                    <div class="bed-count">3</div>
                    <img class="icon icon-double-bed" src="@/assets/double-bed-color.png">
                </div>
            </div>

            <div class="button-container" @click.prevent="setRating">

                <div @click.prevent="toggleReview()" class="action-buttons">
                    <star-rating
                            :show-rating="false"
                            :rating="rating"
                            :read-only="true"
                            :star-size="20"
                            :glow="0"
                            :increment="0.5"
                            inactive-color="#E5F4E3"
                            active-color="#ED762D"
                            :border-width="2"
                            border-color="#FFFFFF"
                            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                    >
                    </star-rating>
                    <div class="review-count">({{2}})</div>

                </div>

                <div class="view-more">
                    <div @click.prevent="toggleBooking()" class="view-more-button view-more-button-left book">
                        <img class="book-icon" src="@/assets/booking.png">
                        <span>
                        bespreek
                    </span>
                    </div>
                    <div @click.prevent="toggleViewMore()" class="view-more-button view-more-button-right">
                    <span>
                        weet meer
                    </span>
                        <img class="view-more-button-icon" src="@/assets/information.png">
                    </div>

                </div>
            </div>

            <div class="info-icons-right">
                <div class="icon-right">
                    <div class="icon-right-text">{{currentEstablishment.type}}</div>
                    <img class="icon-clock-out" src="@/assets/building-type.png">
                </div>
                <div class="icon-right">
                    <div class="icon-right-text">{{currentEstablishment.clockOut}}</div>
                    <img class="icon-clock-out" src="@/assets/clockwise-rotation.png">
                </div>


            </div>


        </div>


        <div class="bottom-container">
            <div class="bottom-container-page booking-container">
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
            </div>
            <div class="bottom-container-page view-more-container">
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
            </div>
            <div class="bottom-container-page review-container">
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
                <button>hi</button>
            </div>
            <div class="brief-info">
                <p>{{currentEstablishment.shortDescription}}</p>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import StarRating from 'vue-star-rating';
    import JQuery from 'jquery';

    const $ = JQuery;

    export default {
        name: 'Card',
        components: {
            StarRating
        },
        props: {
            msg: String
        },
        data() {
            return {
                rating: 0,
                showBriefInfo: true,
                showBooking: false,
                showMore: false,
                showReview: false,
            }
        },
        mounted() {
            console.log('CARD');
            this.rating = this.currentEstablishment.averageUserRating.overall;
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
        methods: {
            async setRating() {

                console.log('CLICKED THE DIV');

            },
            showCurrentRating(rating) {

                this.currentRating = (rating / 5) * 100 + "%"
            },
            toggleBooking() {

                if (this.showBriefInfo) this.toggleBriefInfo();
                if (this.showMore) this.toggleViewMore();
                if (this.showReview) this.toggleReview();

                this.showBooking = !this.showBooking;
                const height = this.showBooking ? '100%' : 0;

                $('.booking-container').css('max-height', height);
            },
            toggleViewMore() {

                if (this.showBriefInfo) this.toggleBriefInfo();
                if (this.showBooking) this.toggleBooking();
                if (this.showReview) this.toggleReview();

                this.showMore = !this.showMore;
                const height = this.showMore ? '100%' : 0;

                $('.view-more-container').css('max-height', height);
            },
            toggleReview() {

                if (this.showBriefInfo) this.toggleBriefInfo();
                if (this.showBooking) this.toggleBooking();
                if (this.showMore) this.toggleViewMore();

                this.showReview = !this.showReview;
                const height = this.showReview ? '100%' : 0;

                $('.review-container').css('max-height', height);
            },
            toggleBriefInfo() {
                this.showBriefInfo = !this.showBriefInfo;
                const height = this.showBriefInfo ? '100%' : 0;
                const opacity = this.showBriefInfo ? 1 : 0;

                $('.brief-info').css('max-height', height);
                $('.brief-info p').css('opacity', opacity);
                $('.card').css('border-bottom', 'none');
            },
            toggleInfoContainerBorder() {

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

    .card {
        display: block;
        top: 50px;
        width: $cardWidth;
        /*border: 1px solid #5A5B5D;*/
        margin: 0 auto;
    }

    .heading {
        position: absolute;
        width: $cardWidth;
        height: 50px;
        background-color: rgba(black, .5);
        color: white;
        z-index: 1;
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
    }

    .establishment {
        position: absolute;
        bottom: 2px;
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
        height: 55px;
        background-color: #5A5B5D;

        color: white;
        border: {
            top: 1px solid black;
            bottom: 1px solid black;

        }
        display: flex;
        flex-direction: row;

        div {
            /*flex: .4;*/
            vertical-align: middle;
            justify-content: center;
        }
    }

    .info-icons {

        &-right {
            position: relative;
            top: 20px;
            display: flex;
            flex: .3;
        }

        &-left {
            position: relative;
            flex: .3;
        }

    }

    .icon {

        &-right {
            display: inline-block;
            width: 40%;
            position: relative;
            bottom: 12px;
        }

        &-left {
            position: relative;
            top: 4px;
            display: inline-block;
            margin: 0 10px;


        }

        &-middle {
            position: relative;
            top: 3px;
            width: 30%;
            display: inline-block;

            img {
                vertical-align: middle;
            }
        }

        &-bed {
            width: 20%;
            right: 5px;

        }

        &-price {
            width: 50%;
        }

        &-single-bed {
            height: 20px;
            /*width: 30px;*/
        }

        &-double-bed {
            height: 20px;
            position: relative;
            top: 2px;
        }

        &-clock-out {
            height: 20px;
            vertical-align: middle;
        }

        &-right-text {
            font-size: 12px;
            text-align: center;
            font-weight: bold;
        }

    }

    .action-buttons {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .vue-star-rating {
        position: relative;
        top: 0.5px;
    }

    .review-count {
        position: relative;
        font-size: 10px;
        margin-left: 2px;
        top: 1px;
    }

    .review {
        position: relative;
        top: -2px;
    }

    .icon-review {
        margin-top: 0;
        height: 35px;
    }

    .icon-user-rating {
        height: 40px;
    }

    .bed-count {
        font-size: 14px;
        position: relative;
        top: 7px;
        margin-bottom: 4px;
        font-weight: bold;
    }

    .price-container {
        position: relative;

    }

    .price {
        font-size: 14px;
        position: relative;
        top: 2px;
        font-weight: bold;
    }

    .price-range {
        font-weight: bolder;
        font-size: 13px;
        color: #ED762D;
        position: relative;
        top: 2px;
    }

    .per-night {
        font-size: 8px;
        font-weight: bolder;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        flex: .45;
    }

    .view-more {
        flex: 0.5;
        margin-top: auto;
        height: 46%;
        color: white;
        background: #ED762D;
        border-radius: 5px 5px 0 0;
        display: table;

        div.view-more-button-left:hover {
            background-color: black;
            color: #ED762D;
            border-radius: 5px 0 0 0;
        }

        div.view-more-button-right:hover {
            background-color: black;
            color: #ED762D;
            border-radius: 0 5px 0 0;
        }

    }

    .book {
        border-right: 1px solid #5d5a5a;

        &-icon {
            position: relative;
            top: 2px;
            height: 15px;
            width: 15px;
        }
    }

    .view-more-button {
        display: table-cell;
        vertical-align: middle;
        cursor: pointer;
        width: 50%;

        &-icon {
            position: relative;
            top: 2px;
            height: 15px;
            width: 15px;
        }
    }

    .bottom-container {
        display: flex;
    }

    @mixin bottom-container-page {
        width: 500px;
        position: absolute;
        overflow: hidden;
        max-height: 0;
        transition: max-height .5s 0.3s ease-in-out;
        background-color: #5d5a5a;
        z-index: 1;
    }

    .bottom-container-page {

    }

    .booking-container {
        @include bottom-container-page;
    }

    .view-more-container {
        @include bottom-container-page;
    }

    .review-container {
        @include bottom-container-page;
    }

    .brief-info {
        transition: max-height 0.5s linear, padding 0.5s linear;
        box-sizing: border-box;
        overflow: hidden;
        width: 500px;
        max-height: 100%;
        position: absolute;
        transform: scale(1);
        padding: 10px;
        margin: 0;
        background-color: #FFF9EF;
        border: {
            left: 1px solid #5A5B5D;
            right: 1px solid #5A5B5D;
            bottom: 1px solid #5A5B5D;
        }

        p {
            margin: 0 auto;
            transition: opacity 0.5s linear;
            opacity: 1;
            /*width: 90%;*/
            /*height: 90%;*/
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
