<template>
    <div class="review-container">
        <div class="average-rating">
            <div class="average-rating-heading">Algehele Oorsig</div>
            <div class="average-rating-break-down">
                <div class="individual-rating" v-for="(overallRating, ratingIndex) in rating.overallRatings"
                     v-bind:key="`--average-rating-${ratingIndex}`">
                    <div class="rating-title">{{overallRating[0]}}</div>
                    <div class="overall-average-star-rating">
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

                    <div class="individual-comment">
                        <i></i>
                        <p v-for="(p,index) in review.comment" v-bind:key="index">{{p}}</p>
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
</template>

<script>
    import {mapState} from 'vuex';
    import moment from 'moment';
    import StarRating from 'vue-star-rating';

    export default {
        name: "ReviewPage",
        components: {
            StarRating,
        },
        data() {
            return {
                establishment: {},
                rating: {},
            }
        },
        mounted() {
            this.establishment = this.currentEstablishment;
            this.rating = this.calculateOverallRating();
        },
        computed: {
            ...mapState([
                    'currentEstablishment',
                ],
            ),
        },
        methods: {
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
        }
    }
</script>

<style lang="scss">
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
        margin-bottom: 20px;
    }

    .individual-review-header {
        display: flex;
        margin-bottom: 10px;
    }

    .review-name-date {
        width: 50%;
    }

    .comment-ratings-box {
        display: flex;
    }

    .individual-comment {
        word-wrap: break-spaces;
        font-size: 12px;
        width: 48%;
        margin-right: 2%;
        background: #ffffff;
        border: 1px solid #b9babb;
        border-radius: 5px;

        i:before {
            content: "";
            width: 0;
            height: 0;
            position: relative;
            top: 1px;
            right: 0px;
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
            position: relative;
            bottom: 1px;
            right: 21px;
            border-left: 10px solid #b9babb;
            border-right: 10px solid #00bfb600;
            border-top: 10px solid #53585800;
        }

        p {
            text-align: justify;
            margin: 0 10px;
            position: relative;
            bottom: 8px;

            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
    }

    .individual-ratings {
        width: 52%;
        height: 80px;
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

    .individual-star-rating {
        position: relative;
        bottom: 3px;
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
</style>