import types from '../types'
import axios from 'axios'

const state = {
  // 所有产品种类
  saleCategories: []
}

const getters = {
  saleCategories(){
    return state.saleCategories;
  }
}

const actions = {
  getSaleCategories({commit, state}, params){
    commit(types.GET_SALECATEGORIES, params);
  }
}

const mutations = {
  [types.GET_SALECATEGORIES](state){
    axios.get('/foq/salecategory/list')
      .then(resp => {
        console.log(resp.data.data)
        state.saleCategories = resp.data.data;
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
