import types from '../types'
import axios from 'axios'

const state = {
  // 所有销售策略
  saleStrategies: [],
  // 销售策略总数
  total: 0
}

const getters = {
  saleStrategies(){
    return state.saleStrategies;
  },
  total(){
    return state.total;
  }
}

const actions = {
  getSaleStrategies({commit, state}, params){
    commit(types.GET_SALESTRATEGIES, params);
  }
}

const mutations = {
  [types.GET_SALESTRATEGIES](state,params){
    axios.get('/foq/salestrategy/list', {
      params
    })
      .then(resp => {
        console.log(resp.data.data.content);
        state.saleStrategies = resp.data.data.content;
        state.total = resp.data.data.totalElements;
      });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
