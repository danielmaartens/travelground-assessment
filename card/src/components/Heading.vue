<template>
    <div class="heading">
        <div class="establishment">
            <div class="name">{{establishment.name}}</div>
            <div class="location">{{establishment.city}}</div>
        </div>
        <div class="tourism-grading" @mousemove="(e) => onMouseMove(e, 'tourism-grading-tooltip', 10)"
             >
            <div class="tourism-grading-tooltip">
                <span><b>{{establishment.name}}</b> het 'n <b>{{establishment.tourismGrading}} stêr</b> gradering van die <b>Toerismegraderingsraad van Suid-Afrika</b></span>
            </div>
            <img v-for="index in establishment.tourismGrading" :key="`tgcsa--${index}`"
                 src="@/assets/tgcsa.svg">
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "Heading",
        onMouseMove: {
            type: Function,
            required: true
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