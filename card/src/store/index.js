import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 300;

export default new Vuex.Store({
  state: {
    imageHeight: IMAGE_HEIGHT,
    imageWidth: IMAGE_WIDTH,
    currentEstablishment: {
      name: 'Tsala Treetop Lodge',
      shortDescription: 'Dié lodge se toweragtige ligging is onweerstaanbaar vir diegene wat op soek is na eksklusiewe verblyf.',
      tourismGrading: 5,
      averageUserRating: {
        overall: 0.8
      },
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
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
