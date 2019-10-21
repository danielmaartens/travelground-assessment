<template>
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
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ViewMorePage",
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

<style lang="scss">

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

    }

    .info-item-list {
        background: #FFF;
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

</style>