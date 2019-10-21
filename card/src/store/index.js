import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 300;
const PRICE_RANK_DESCRIPTIONS = {
    1: 'Verskriklik Goedkoop',
    2: 'Goedkoop',
    3: 'Redelik Geprys',
    4: 'Luuks',
    5: 'Ontsettend Luuks'
};

export default new Vuex.Store({
    state: {
        imageHeight: IMAGE_HEIGHT,
        imageWidth: IMAGE_WIDTH,
        priceRankDescriptions: PRICE_RANK_DESCRIPTIONS,
        pages: {
            BOOKING: 'booking',
            REVIEW: 'review',
            VIEW_MORE: 'view-more'
        },
        currentEstablishment: {
            name: 'Tsala Treetop Lodge',
            location: {
                lat: -34.051196,
                lng: 23.273610
            },
            link: "https://www.lekkeslaap.co.za/akkommodasie/tsala-treetop-lodge",
            city: 'Plettenbergbaai',
            type: 'Hotel',
            additionalInfo: [
                {
                    title: 'Kenmerke',
                    list: [
                        'Afrikaans',
                        'Swembad',
                        'Veilige Parkering',


                    ]
                },
                {
                    title: 'Hier praat ons',
                    list: [
                        'Afrikaans',
                        'Engels',
                        'Xhosa'
                    ]
                },
                {
                    title: 'Aktiwiteite op perseel',
                    list: [
                        'Voëlkyk',
                        'Swem'

                    ]
                },
                {
                    title: 'Parkeerplek',
                    list: [
                        'Veilige Parkering'
                    ]
                },
                {
                    title: 'Betaalopsies op Perseel',
                    list: [
                        'Visa',
                        'Mastercard',
                        'American Express',
                        'Diners-kaart',
                        'Kontant',
                        '',
                        '',
                        '',

                    ]
                },
                {
                    title: 'Maaltye Aangebied',
                    list: [
                        'Ontbyt',
                        'Tee',
                        'Middagete',
                        'Piekniek-middagete',
                        'Aandete',
                        '24h Kamerbediening',
                        'Piekniekmandjies Op Versoek'
                    ]
                },
                {
                    title: 'Geriewe',
                    list: [
                        '24-uur Ontvangs',
                        'Swembad',
                        'Portier',
                        'Gastesitkamer',
                        'Wasgoeddiens',
                        'Restaurant',
                        'Persoonlike Kluis',
                        'Satelliet-TV',
                        'Daagliks Skoonmaak',
                        'Wynkelder',
                        'Lughawe-pendeldiens'
                    ]
                },
            ],
            clockOut: '11:00',
            currencySymbol: 'R',
            priceRank: 5,
            availability: {
                overall: 3,
                rooms: {
                    single: 1,
                    double: 2
                }
            },
            minimumCurrentPrice: 12070,
            shortDescription: 'Dié lodge se toweragtige ligging is onweerstaanbaar vir diegene wat op soek is na eksklusiewe verblyf.',
            detailedDescription: [
                'Tsala Treetop Lodge is tussen \'n oeroue inheemse woud se boomtoppe geleë en is \'n lieflike\n' +
                '                        viering van die Afrika-gees. Dié lodge se toweragtige ligging is onweerstaanbaar vir diegene wat\n' +
                '                        op soek is na eksklusiewe verblyf. Hiér kan gaste die woud se rustigheid beleef terwyl die\n' +
                '                        diskrete personeel topgehalte en persoonlike diens bied.',

                'Verblyf word gebied in 10 suites en 6 villas. Die suites skuil tussen die woud se boomtoppe en is\n' +
                '                        ideaal vir \'n paartjie wat op soek is na \'n romantiese wegbreek. Terwyl die\n' +
                '                        tweeslaapkamer-villas vir \'n groep van 4 geskik is. Die suites en villas het privaat dekke met\n' +
                '                        randvloerswembaddens.',

                'Die hoofrestaurant se gebou is aan die einde van die paadjie en lei na die pragtige ontvangsarea\n' +
                '                        met die woud in die agtergrond. Die sitarea is baie gewild en hiér kan gaste drankies geniet, \'n\n' +
                '                        boek uit die biblioteek lees en die WiFi benut. Daar is ook \'n dek buite waar gaste na die\n' +
                '                        Knysna-loeries kan luister en dalk nog een raaksien!',

                'Gaste kan op die dek eet met \'n uitsig oor die woud. Middagete en groep-aandete kan ook op die\n' +
                '                        dek bedien word as die weer dit toelaat. Daar is plaaslike en internasionale wyn te kies en te\n' +
                '                        keur.',

                'Plettenbergbaai, een van Suid-Afrika se voorste kusbestemmings, bied pragtige goue strande en is\n' +
                '                        slegs 10 km oos van die lodge, en die gewilde Knysna teen die Knysna-strandmeer is net 20 km\n' +
                '                        wes.'
            ],
            tourismGrading: 5,
            reviews: [
                {
                    reviewer: 'Johan Labuschagne',
                    comment: "Lekker plek. Duur, maar 'n lekke jol.",
                    ratings: [
                        ['Waarde', 2],
                        ['Ligging', 5],
                        ['Diens', 2],
                        ['Veiligheid', 5],
                        ['Netheid', 5],
                    ],
                    date: '2019-10-07T07:15:20.087Z'
                }
            ],

            premium: true,
            images: [
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJDc2NDdjZWE5LTM4YWQtNDY4Yy05MmEzLWI3MDM1MTdmYWE2Yw?fit=crop&w=638&h=440&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJDg0MzkzZjQ5LTg0OWItNDA0Ni1hZjEwLTg4YzMzNTE3ZmEwMw?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJGNiN2JmYTllLTNhMDYtNDE1ZS1iMmMyLTZmYjViZWUwODk5Mg?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJGI2ZThkNmE5LWRmOWUtNDEwYi1hZjI5LTM4OTNkYzc2MmE3NA?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJDE5M2I2ODQ5LTE2YTItNGVjMS1hMjJlLWYwOGIwOGZhODFjZA?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJDBkM2I5ZWU4LTU3ZmQtNDMwZS1iNTc5LTY3NGM5NGY1NWZmNw?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJDJhYzdiZTkxLWNmODUtNDI3ZS1hNTc5LTA2ZTA3MjQ4MWE0NA?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJDNlYzM3ZTlhLWI3NjctNDc0MS04YzY4LWZkZTQ1MDkyMjMzMA?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJDk5ZTg5ZGJjLWZjMzQtNGJlZC1iYzRlLTZlNzI1Mjk1MmJlMw?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJGRjODQ3YzdhLWE1MzMtNGM3MC04NmEyLWM3YzUyYTA2MDFjMQ?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJGU1YWVlMDRkLWY4NjEtNGY5OC04ZWQxLTdiMmY2MGZhYjhlZQ?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJDVhZTAyYjUwLTBkODctNGE0OS1hMDA1LWVjN2Y0NDMyMGVjOA?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
                'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAJGJhMzMzMDM5LTJiODItNDE1Mi04YzM5LWQ5YzJmOWEzY2MzNA?fit=crop&w=1200&h=800&bg=000000&auto=enhance,compress&q=80',
            ],
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})
