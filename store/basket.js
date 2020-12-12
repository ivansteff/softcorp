export const state = () => ({
  items_list: []
})

export const actions = {
  add_to_basket(context, payload) {
    context.commit('ADD_ITEM', payload)
  },
  remove_to_basket(context, payload) {

  },
  drop_basket(context) {
    context.commit('DROP_BASKET')
  },
};

export const mutations = {
  ADD_ITEM(state, payload) {
      state.items_list.push(payload)
      console.log(`state.items_list`, state.items_list)
  },
  REMOVE_ITEM(state, payload) {

  },
  DROP_BASKET(state) {
      state.items_list = []
  },
    
};

export const getters = {
  getItemList(state) {
    return state.items_list
  },
};

export const strict = false