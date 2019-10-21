<template>
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
                            <b>{{rating.averageOverallRating}} stêr</b> gradering uit <b>{{establishment.reviews.length}} resensies</b>.
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
                <div class="review-count">({{establishment.reviews.length}})</div>

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
                <div class="icon-right-text">{{establishment.type}}</div>
                <img class="icon-clock-out" src="@/assets/building-type.png">
            </div>
            <div @mousemove="(e) => onMouseMove(e, 'clock-out-tooltip', 10)" class="icon-right clock-out">
                <div class="clock-out-tooltip">
                        <span>
                            Klok-uit tyd is om <b>{{establishment.clockOut}}</b>
                        </span>
                </div>
                <div class="icon-right-text">{{establishment.clockOut}}</div>
                <img class="icon-clock-out" src="@/assets/clockwise-rotation.png">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import JQuery from 'jquery';
    import StarRating from 'vue-star-rating';

    const $ = JQuery;

    export default {
        name: "InfoBanner",
        components: {
            StarRating
        },
        props: {
            onMouseMove: {
                type: Function,
                required: true
            },
        },
        data() {
            return {
                establishment: {},
                showHomePage: true,
                showBooking: false,
                showMore: false,
                showReview: false,
                previouslySelectedPage: null,
                availability: {},
                rating: 0,
                minPrice: 0,
                priceRank: '',
                priceRankDescription: ''

            }
        },
        mounted() {
            const establishment = this.currentEstablishment;
            const price = establishment.minimumCurrentPrice;

            this.establishment = establishment;
            this.minPrice = this.convertPriceToString(price);
            this.rating = this.calculateOverallRating();
            this.priceRank = this.convertPriceRankToString();
            this.availability = establishment.availability;
            this.priceRankDescription = this.priceRankDescriptions[establishment.priceRank];
        },
        computed: {
            ...mapState([
                    'currentEstablishment',
                    'priceRankDescriptions',
                    'pages'
                ],
            ),
        },
        methods: {
            toggle(page) {

                const toggleBooking = page === this.pages.BOOKING || this.previouslySelectedPage === this.pages.BOOKING;
                const toggleViewMore = page === this.pages.VIEW_MORE || this.previouslySelectedPage === this.pages.VIEW_MORE;
                const toggleReview = page === this.pages.REVIEW || this.previouslySelectedPage === this.pages.REVIEW;

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
                    const rating = reviews.length > 0 ? reviewsMapped[k] / reviews.length : 0;
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
            convertPriceToString(price) {
                return this.currentEstablishment.currencySymbol + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            convertPriceRankToString() {
                const rank = this.currentEstablishment.priceRank;
                return '$'.repeat(rank);
            },
        }
    }
</script>

<style lang="scss">

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

    .info-container {
        height: 70px;
        background-color: #5A5B5D;
        box-sizing: border-box;
        color: white;
        border: {
            bottom: 4px solid #ec762d;

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
</style>