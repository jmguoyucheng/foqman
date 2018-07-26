import types from '../types'
import axios from 'axios'

const state = {
  // 客户列表
  customers: [],
  // 客户总数
  total: 0,
}

const getters = {
  customers(){
    return state.customers;
  },
  total(){
    return state.total;
  }
}

const actions = {
  getCustomers({commit, state}, params){
    commit(types.GET_CUSTOMERS, params);
  },
  getDeletedCustomers({commit, state}, params){
    commit(types.GET_DELETEDCUSTOMERS, params);
  }
}

const mutations = {
  [types.GET_CUSTOMERS](state, params){
    axios.get('/foq/customer/list', {
      params
    })
      .then(resp => {
        console.log(resp.data.data.content);
        state.customers = resp.data.data.content;
        state.total = resp.data.data.totalElements;
      });
  },
  [types.GET_DELETEDCUSTOMERS](state, params){
    axios.get('/foq/customer/deleted', {
      params
    })
      .then(resp => {
        console.log(resp.data.data.content);
        state.customers = resp.data.data.content;
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
