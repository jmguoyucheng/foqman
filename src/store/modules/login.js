import types from '../types'
import axios from 'axios'

const state = {
  user:{}
}

const getters = {
  user(){
    return state.user;
  }
}

const actions = {
  login({commit, state}, params){
    commit(types.GET_USER, params);
  }
}

const mutations = {
  [types.GET_USER](state, params){
    console.log(params)
    axios.post('/foq/auth', {
      params
    })
      .then(resp => {
        console.log(resp.data.data)
        state.user = resp.data.data.content;
      });
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
