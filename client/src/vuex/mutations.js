import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'http://35.185.113.211'
const mutations = {
 
  setLoginStatus(){
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
    if (this.state.isSearch) {
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
      axios({
        method: 'get',
        url: `${baseURL}/props`,
        headers: {token: localStorage.token}
      })
      .then(response => {
        this.state.allProps = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },

}

export default mutations