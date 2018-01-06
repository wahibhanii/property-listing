import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'http://35.185.185.63:3002'
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

}

export default mutations