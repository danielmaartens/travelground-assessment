<template>
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

</template>

<script>
    import {mapState} from 'vuex';
    import StarRating from 'vue-star-rating';
    import JQuery from 'jquery';
    import moment from 'moment';
    const $ = JQuery;

    export default {
        name: "BottomContainer",
        components: {
            StarRating,
        },
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