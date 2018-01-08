import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'http://35.185.185.63:3004'
const mutations = {
 
  setLoginStatus(){
    console.log('login status')
    if (localStorage.token !== undefined){
      this.state.isLoggedIn = true
    } else {
      this.state.isLoggedIn = false
    }
    
  },

  setInitialPage() {
    if(!this.state.isLoggedIn) {
      this.state.currentPage = '/signup' 
    }
  },

  getAllProps () {
    console.log('getting all props')
    if (this.state.isSearch) {
      console.log('with search', this.state.searchField)
      axios({
        method: 'get',
        url: `${baseURL}/props/search?field=${this.state.searchField}`,
        headers: {token: localStorage.token}
      })
      .then(response => {
        this.state.allProps = response.data
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      console.log('no search')
      axios({
        method: 'get',
        url: `${baseURL}/props`,
        headers: {token: localStorage.token}
      })
      .then(response => {
        console.log('get data ok')
        this.state.allProps = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },

}

export default mutations