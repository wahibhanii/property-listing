import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'http://localhost:3004'
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
  },

}

export default mutations