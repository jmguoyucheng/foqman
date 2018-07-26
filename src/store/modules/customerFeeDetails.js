import types from '../types'
import axios from 'axios'

const state = {
  // 客户明细记录
  customerFeeDetails: [],
  // 客户明细记录总数
  total: 0
}

const getters = {
  customerFeeDetails(){
    return state.customerFeeDetails;
  },
  total(){
    return state.total;
  }
}

const actions = {
  getCustomerFeeDetails({commit, state}, params){
    commit(types.GET_CUSTOMERFEEDETAILS, params);
  }
}

const mutations = {
  [types.GET_CUSTOMERFEEDETAILS](state, params){
    axios.get('/foq/customerfee/list/100', {
      params
    })
      .then(resp => {
        state.customerFeeDetails = resp.data.data.content;
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
