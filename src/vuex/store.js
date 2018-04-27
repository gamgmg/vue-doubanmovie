import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
	cityed: '广州'
}

const mutations = {
	SELECTCITY (state, data) {
		state.cityed = data
	}
}

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations
})