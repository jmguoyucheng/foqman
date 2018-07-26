import types from '../types'
import axios from 'axios'

const state = {
  // 销售记录
  saleHistory: [],
  // 销售记录总数
  total: 0
}

const getters = {
  saleHistory(){
    return state.saleHistory;
  },
  total(){
    return state.total;
  }
}

const actions = {
  getSaleHistory({commit, state}, params){
    commit(types.GET_SALEHISTORY, params);
  }
}

const mutations = {
  [types.GET_SALEHISTORY](state, params){
    axios.get('/foq/salehistory/list', {
      params
    })
      .then(resp => {
        state.saleHistory = resp.data.data.content;
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
