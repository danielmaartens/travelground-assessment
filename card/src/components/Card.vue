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


        <div class="heading">
            <div class="establishment">
                <div class="name">{{establishment.name}}</div>
                <div class="location">{{establishment.city}}</div>
            </div>
            <div class="tourism-grading" @mousemove="(e) => onMouseMove(e, 'tourism-grading-tooltip', 10)"
                 :style="cssVars">
                <div class="tourism-grading-tooltip">
                    <span><b>{{establishment.name}}</b> het 'n <b>{{establishment.tourismGrading}} stêr</b> gradering van die <b>Toerismegraderingsraad van Suid-Afrika</b></span>
                </div>
                <img :style="cssVars" v-for="index in establishment.tourismGrading" :key="`tgcsa--${index}`"
                     src="@/assets/tgcsa.svg">
            </div>
        </div>
        <div class="ux-button-container">
            <img v-if="favourite" @click.prevent="toggleLike()" class="ux-button pulse" src="@/assets/like.png">
            <img v-if="!favourite" class="ux-button no-like-pulse" @click.prevent="toggleLike()"
                 src="@/assets/not-like.png">
            <img v-clipboard="() => establishment.link" @click.prevent="alertMessage()" class="ux-button"
                 src="@/assets/send.png">

        </div>

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


        <div class="info-container">


            <div class="info-icons-left">


                <div @mousemove="(e) => onMouseMove(e, 'price-tooltip', 10)" class="icon-left icon-price price">
                    <div class="price-tooltip">
                        <span><b>{{priceRankDescription}}</b> teen <b>{{minPrice}} per nag</b><br>vir die <b>goedkoopste kamer</b> beskikbaar</span>
                    </div>
                    <div class="price-value">{{minPrice}}<span class="per-night"></span></div>
                    <div class="price-rank">{{priceRank}}</div>
                </div>


                <div @mousemove="(e) => onMouseMove(e, 'availability-tooltip', 10)" class="icon-left availability">
                    <div class="availability-tooltip">
                        <span><b>{{availability.overall}} kamers</b> is tans <b>beskikbaar</b></span>
                    </div>
                    <div class="bed-count">{{availability.overall}}</div>
                    <img class="icon icon-double-bed" src="@/assets/double-bed-color.png">
                </div>
            </div>

            <div class="button-container">
                <div
                        @mousemove="(e) => onMouseMove(e, 'rating-review-tooltip')"
                        @click.prevent="toggle(pages.REVIEW)"
                        class="rating-review">
                    <div class="rating-review-tooltip">
                        <span>
                            <b>{{rating}} stêr</b> gradering uit <b>{{currentEstablishment.reviews.length}} resensies</b>.
                        <br>
                            <b>Kliek op die sterre om al individuele resensies te sien.</b>
                        </span>
                    </div>
                    <star-rating
                            :show-rating="false"
                            :rating="rating.averageOverallRating"
                            :read-only="true"
                            :star-size="25"
                            :glow="0"
                            :increment="0.1"
                            inactive-color="#fff9ef"
                            active-color="#ED762D"
                            :border-width="2"
                            border-color="#FFFFFF"
                            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                    >
                    </star-rating>
                    <div class="review-count">({{currentEstablishment.reviews.length}})</div>

                </div>


                <div>
                    <div class="view-more">
                        <a href="https://www.lekkeslaap.co.za/akkommodasie/tsala-treetop-lodge/bespreek" target="_blank"
                           :class="`view-more-button view-more-button-left booking ${showBooking ? 'active' : ''}`">
                            <img class="booking-icon" src="@/assets/booking.png">
                            <span class="booking-text">
                        bespreek
                    </span>
                        </a>
                        <div @click="toggle(pages.VIEW_MORE)"
                             :class="`view-more-button view-more-button-right ${showMore ? 'active' : ''}`">
                    <span>
                        weet meer
                    </span>
                            <img class="view-more-button-icon" src="@/assets/information.png">
                        </div>

                    </div>
                </div>
            </div>

            <div class="info-icons-right">
                <div @mousemove="(e) => onMouseMove(e, 'building-type-tooltip', 10)" class="icon-right building-type">
                    <div class="building-type-tooltip">
                        <span>Dié verblyf is 'n <b>{{establishment.type}}</b></span>
                    </div>
                    <div class="icon-right-text">{{currentEstablishment.type}}</div>
                    <img class="icon-clock-out" src="@/assets/building-type.png">
                </div>
                <div @mousemove="(e) => onMouseMove(e, 'clock-out-tooltip', 10)" class="icon-right clock-out">
                    <div class="clock-out-tooltip">
                        <span>
                            Klok-uit tyd is om <b>{{establishment.clockOut}}</b>
                        </span>
                    </div>
                    <div class="icon-right-text">{{currentEstablishment.clockOut}}</div>
                    <img class="icon-clock-out" src="@/assets/clockwise-rotation.png">
                </div>


            </div>


        </div>


        <div class="bottom-container">
            <span id="bottom-page-scroll-to"></span>
            <div class="booking-container">
            </div>
            <div class="view-more-container">

                <div class="detailed-info">
                    <p v-for="(paragraph, index) in establishment.detailedDescription"
                       v-bind:key="`--detailed-info-p-${index}`">{{paragraph}}</p>
                </div>
                <div class="info-list">

                    <div class="info-category" v-for="(info, infoIndex) in establishment.additionalInfo"
                         v-bind:key="`--info-${infoIndex}`">
                        <div class="info-category-title">{{info.title}}</div>
                        <div class="info-item-list">
                            <div class="info-item" v-for="(item, itemIndex) in info.list"
                                 v-bind:key="`--info-${infoIndex}-item-${itemIndex}`">
                                <img v-if="item !== ''" class="info-item-tick" src="@/assets/tick.png">
                                <span class="info-item-text">{{item}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="google-map">
                    <GmapMap
                            :center="establishment.location"
                            :zoom="15"
                            map-type-id="roadmap"
                            style="width: 100%; height: 300px"
                    >
                        <GmapMarker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                                :clickable="true"
                                :draggable="true"
                                @click="center=m.position"
                        />
                    </GmapMap>
                </div>
            </div>
            <div class="review-container">
                <div class="average-rating">
                    <div class="average-rating-heading">Algehele Oorsig</div>
                    <div class="average-rating-break-down">
                        <div class="individual-rating" v-for="(overallRating, ratingIndex) in rating.overallRatings"
                             v-bind:key="`--average-rating-${ratingIndex}`">
                            <div class="rating-title">{{overallRating[0]}}</div>
                            <div class="individual-star-rating">
                                <star-rating
                                        :show-rating="false"
                                        :rating="overallRating[1]"
                                        :read-only="true"
                                        :star-size="10"
                                        :glow="0"
                                        :increment="0.1"
                                        inactive-color="#fff"
                                        active-color="#ED762D"
                                        :border-width="2"
                                        border-color="#5d5a5a"
                                        :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                                >
                                </star-rating>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reviews">

                    <div class="individual-review" v-for="(review, reviewIndex) in establishment.reviews"
                         v-bind:key="`--review-${reviewIndex}`">

                        <div class="individual-review-header">
                            <div class="review-name-date">
                            <div class="user-name">{{review.reviewer}}</div>
                            <div class="review-date">
                                {{formatDate(review.date)}}
                            </div>
                            </div>

                            <div class="average-star-rating">
                                <star-rating
                                        :show-rating="false"
                                        :rating="calculateIndividualOverallRating(review.ratings)"
                                        :read-only="true"
                                        :star-size="20"
                                        :glow="0"
                                        :increment="0.1"
                                        inactive-color="#fff"
                                        active-color="#ED762D"
                                        :border-width="2"
                                        border-color="#5d5a5a"
                                        :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                                >
                                </star-rating>
                            </div>



                        </div>

                        <div class="comment-ratings-box">
                            <i></i>
                            <div class="individual-comment">
                                <p>{{review.comment}}</p>
                            </div>

                            <div class="individual-ratings">

                                <div class="individual-rating" v-for="(rating, ratingIndex) in review.ratings"
                                     v-bind:key="`--review-${reviewIndex}-rating-${ratingIndex}`">
                                    <div class="rating-title">{{rating[0]}}</div>
                                    <div class="individual-star-rating">
                                        <star-rating
                                                :show-rating="false"
                                                :rating="rating[1]"
                                                :read-only="true"
                                                :star-size="10"
                                                :glow="0"
                                                :increment="0.1"
                                                inactive-color="#fff"
                                                active-color="#ED762D"
                                                :border-width="2"
                                                border-color="#5d5a5a"
                                                :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                                        >
                                        </star-rating>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

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
    import moment from 'moment';

    const $ = JQuery;

    const pages = {
        BOOKING: 'booking',
        REVIEW: 'review',
        VIEW_MORE: 'view-more'
    };

    export default {
        name: 'Card',
        components: {
            StarRating,
        },
        props: {
            msg: String
        },
        data() {
            return {
                link: '',
                favourite: false,
                rating: 0,
                showHomePage: true,
                showBooking: false,
                showMore: false,
                showReview: false,
                minPrice: 0,
                priceRank: '',
                availability: {},
                establishment: {},
                priceRankDescription: '',
                previouslySelectedPage: null,
                pages
            }
        },
        mounted() {
            console.log('CARD');
            const establishment = this.currentEstablishment;
            const price = establishment.minimumCurrentPrice;

            this.establishment = establishment;
            this.minPrice = this.convertPriceToString(price);
            this.favourite = establishment.favourite;
            this.rating = this.calculateOverallRating();
            this.priceRank = this.convertPriceRankToString();
            this.availability = establishment.availability;
            this.priceRankDescription = this.priceRankDescriptions[establishment.priceRank];
            this.link = establishment.link;
        },
        computed: {
            ...mapState([
                    'currentEstablishment',
                    'priceRankDescriptions'
                ],
            ),
            cssVars() {
                return {
                    '--grading-margin': (this.currentEstablishment.premium ? 32 : 10) + 'px',
                }
            },

        },
        methods: {
            async setRating() {

                console.log('CLICKED THE DIV');

            },
            showCurrentRating(rating) {

                this.currentRating = (rating / 5) * 100 + "%"
            },
            formatDate(dateString) {
                return moment(dateString).format('dddd, D MMMM YYYY @ HH:mm');
            },
            calculateOverallRating() {

                const reviews = this.establishment.reviews;
                const maxRatingSum = reviews.length * 25;
                const reviewsMapped = {};

                const allRatings = reviews.reduce((ratings, currentReview) => {

                    if (Object.keys(reviewsMapped).length === 0) {
                        const keys = currentReview.ratings.map(r => r[0]);
                        keys.forEach(k => {
                            reviewsMapped[k] = 0;
                        });
                    }
                    return ratings.concat(currentReview.ratings.map(r => {
                        reviewsMapped[r[0]] += r[1];
                        return r[1];
                    }));
                }, []);

                const overallRatings = Object.keys(reviewsMapped).map(k => {
                    const rating = reviews.length > 0 ? reviewsMapped[k]/reviews.length : 0;
                    return [k, rating];
                });

                const sumOfAllRatings = allRatings.reduce((sum, rating) => {
                    return sum += rating;
                }, 0);

                const averageOverallRating = maxRatingSum > 0 ? Number((sumOfAllRatings / maxRatingSum * 5).toFixed(1)) : 0;

                return {
                    averageOverallRating,
                    overallRatings
                };
            },
            calculateIndividualOverallRating(ratings) {

                const sumRatings = ratings.map(r => {
                    return r[1];
                }).reduce((sum, rating) => {
                    return sum += rating;
                }, 0);

                return Number((sumRatings / 25 * 5).toFixed(1));
            },
            toggle(page) {

                const toggleBooking = page === pages.BOOKING || this.previouslySelectedPage === pages.BOOKING;
                const toggleViewMore = page === pages.VIEW_MORE || this.previouslySelectedPage === pages.VIEW_MORE;
                const toggleReview = page === pages.REVIEW || this.previouslySelectedPage === pages.REVIEW;

                this.toggleReview(toggleReview);
                this.toggleBooking(toggleBooking);
                this.toggleViewMore(toggleViewMore);

                const showBriefInfo = !this.showReview && !this.showBooking && !this.showMore;

                if (!showBriefInfo) {
                    setTimeout(() => {
                        document.getElementById('bottom-page-scroll-to').scrollIntoView();
                    }, 1500);
                }

                this.showBriefInfo(showBriefInfo);

                this.previouslySelectedPage = showBriefInfo ? null : page;
            },
            toggleBooking(toggle) {

                if (toggle) {
                    this.showBooking = !this.showBooking;
                    const height = this.showBooking ? '300%' : 0;
                    $('.booking-container').css('max-height', height);
                }
            },
            toggleViewMore(toggle) {

                if (toggle) {
                    this.showMore = !this.showMore;
                    const height = this.showMore ? '300%' : 0;
                    const opacity = this.showMore ? 1 : 0;
                    $('.view-more-container').css('max-height', height).css('opacity', opacity);
                }
            },
            toggleReview(toggle) {

                if (toggle) {
                    this.showReview = !this.showReview;
                    const height = this.showReview ? '300%' : 0;
                    const opacity = this.showReview ? 1 : 0;
                    $('.review-container').css('max-height', height).css('opacity', opacity);
                }
            },
            showBriefInfo(show) {
                const height = show ? '100%' : 0;
                const opacity = show ? 1 : 0;

                $('.brief-info').css('max-height', height);
                $('.brief-info p').css('opacity', opacity);
                $('.card').css('border-bottom', 'none');

            },
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
            convertPriceToString(price) {
                return this.currentEstablishment.currencySymbol + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            convertPriceRankToString() {
                const rank = this.currentEstablishment.priceRank;
                return '$'.repeat(rank);
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

    .info-container {
        height: 70px;
        background-color: #5A5B5D;
        box-sizing: border-box;

        color: white;
        border: {
            /*top: 1px solid black;*/
            bottom: 4px solid #ec762d;;

        }
        display: flex;
        flex-direction: row;

        div {
            vertical-align: middle;
            justify-content: center;
        }
    }

    .info-icons {

        &-right {
            height: 100%;
            display: table;
            flex: .25;
        }

        &-left {
            /*position: relative;*/
            flex: .25;
            display: table;
            height: 100%;
        }

    }

    .icon {

        &-right {
            display: table-cell;
            vertical-align: middle;
            width: 40%;

            img {
                height: 20px;
                vertical-align: middle;
                position: relative;
                top: 0.75px;
            }
        }

        &-left {
            display: table-cell;
            margin-right: 10px;
            width: 50%;


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

        &-single-bed {
            height: 20px;
        }

        &-double-bed {
            height: 20px;
            transform: translateY(5px);

        }

        &-right-text {
            font-size: 14px;
            text-align: center;
            font-weight: bold;
        }

    }

    .availability {
        cursor: help;
        width: 40%;

        @include tooltip-hover;

        &-tooltip {

        }

    }

    .building-type {
        cursor: help;
        @include tooltip-hover;
    }

    .clock-out {
        cursor: help;
        @include tooltip-hover;
    }

    .rating-review {
        cursor: pointer;
        display: flex;
        align-items: center;

        @include tooltip-hover;
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
        font-weight: bold;
        /*position: relative;*/
        /*right: 3px;*/
        transform: translateY(3px);

    }

    .price {

        cursor: help;
        position: relative;
        left: 10px;

        @include tooltip-hover;

        &-value {
            font-size: 14px;
            font-weight: bold;
        }

        &-rank {
            letter-spacing: 0.75px;
            font-weight: bold;
            font-size: 17px;
            color: #ED762D;
            position: relative;
            top: 2px;
        }

    }


    .per-night {
        font-size: 8px;
        font-weight: bolder;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        flex: .5;
    }

    .view-more {
        flex: 0.5;
        margin: 0 auto;
        height: 50%;
        color: white;
        background: #ED762D;
        border-radius: 5px 5px 0 0;
        display: table;
        z-index: 1;
        transform: translateY(3px);
    }

    .booking {
        z-index: 1;

        &-icon {
            position: relative;
            top: 3px;
            width: 20px;
            right: 3.5px;
        }

        &-text {
            position: relative;
            right: 4px;
        }
    }

    .view-more-button {
        display: table-cell;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 15px;
        height: 26px;

        &-left {
            border-right: 1px solid #5d5a5a;
        }

        &-icon {
            position: relative;
            top: 3px;
            height: 15px;
            width: 15px;
        }

        &:hover, &.active {
            background-color: black;
            color: #ED762D;
        }

        &-left:hover, &-left.active {
            border-radius: 5px 0 0 0;
        }

        &-right:hover, &-right.active {
            border-radius: 0 5px 0 0;
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

    .booking-container {
        @include bottom-container-page;
    }


    .view-more-container {
        @include bottom-container-page;

    }

    .detailed-info {
        padding: 0 10px;
        position: sticky;
        font-size: 12px;
        text-align: justify;
    }

    .info-list {

        position: sticky;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
        grid-auto-rows: auto;

        grid-row-gap: 1px;
        grid-column-gap: 5px;
    }

    .info-category {
        text-align: left;
        padding-top: 10px;

        /*&-title {*/
        /*    text-align: left;*/
        /*}*/

    }

    .info-item-list {
        background: #FFF9EF;
        border: 1px solid #5A5B5D;
        border-radius: 5px;

        padding: 10px;
        min-height: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
        grid-auto-rows: auto;

        grid-row-gap: 1px;
        grid-column-gap: 5px;
    }

    .info-item {

        min-width: 50%;
        max-height: 20px;
        white-space: nowrap;

        &-tick {
            display: inline-block;
            width: 10px;
            vertical-align: middle;
        }

        &-text {
            display: inline-block;
            font-size: 10px;
            font-weight: bold;
            margin-left: 3px;
        }
    }

    .google-map {
        position: sticky;
        padding-top: 10px;
    }

    .review-container {
        @include bottom-container-page;

        text-align: left;
    }

    .average-rating-heading {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-top: 10px;
    }

    .average-rating-break-down {
        display: flex;

        margin: {
            left: 20px;
            bottom: 30px;
            top: 10px;
        }

    }

    .individual-review {
        width: 100%;
    }

    .individual-review-header {
        display:flex;
        margin-bottom: 10px;
    }

    .review-name-date {
        width: 50%;
    }

    .comment-ratings-box {
        display: flex;

        i:before {
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            bottom: 73px;
            right: 469px;
            border-left: 10px solid #ffffff;
            border-right: 10px solid #00bfb600;
            border-top: 10px solid #00bfb600;
            border-bottom: 10px solid transparent;
            z-index: 1;
        }

        i:after {
            z-index: -1;
            content: "";
            width: 0px;
            height: 10px;
            position: absolute;
            bottom: 75px;
            right: 470px;
            border-left: 10px solid #b9babb;
            border-right: 10px solid #00bfb600;
            border-top: 10px solid #53585800;
        }
    }

    .individual-comment {
        word-wrap: break-spaces;
        font-size: 12px;
        width: 48%;
        margin-right: 2%;
        background: #ffffff;
        border: 1px solid #b9babb;
        border-radius: 5px;

        p {
            text-align: justify;
            margin: 10px;
        }
    }

    .individual-ratings {
        width: 52%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
        grid-auto-rows: auto;

        grid-row-gap: 1px;
        grid-column-gap: 5px;
    }

    .individual-rating {
        display: inline-block;
        width: 20%;

    }

    .rating-title {
        font-size: 12px;
        font-weight: bold;
    }

    .review-date {
        position: relative;
        font-size: 10px;
        left: 10px;
        top: 10px;
        margin: 2px;
    }

    .user-name {
        font-weight: bold;
        font-size: 16px;
        position: relative;
        top: 11px;
    }

    .average-star-rating {
        position: relative;
        top: 14px;
        width: 50%;
        right: 7px;
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
            /*transition: opacity 0.5s linear;*/
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
