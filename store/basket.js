export const state = () => ({
  items_list: []
})

export const actions = {
  add_to_basket(context, payload) {
    let fined = context.state.items_list.findIndex((item)=>{
        return item.T == payload.T
    })
    console.log(`fined`, fined)
    if (fined !== -1) {
        context.commit('INCREMENT_ITEM', fined)
    } else {
        let a = payload
        a.quantity_in_basket = 1
        context.commit('ADD_ITEM', a)
    }
  },
  decrement_product(context, payload) {
    context.commit('DECREMENT_ITEM',payload)
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
  INCREMENT_ITEM(state, payload) {
      console.log(` state.items_list[payload]`,  state.items_list[payload])
      state.items_list[payload].quantity_in_basket++
  },
  DECREMENT_ITEM(state, payload) {
    if (state.items_list[payload].quantity_in_basket == 1) {
      state.items_list.splice(payload, 1)
    } else {
      state.items_list[payload].quantity_in_basket--
    }
  },
  DROP_BASKET(state) {
      state.items_list = []
  },
    
};

export const getters = {
  getItemList(state) {
    return state.items_list
  },
  getTotalSum(state) {
    let sum = 0
    state.items_list.forEach(item =>{
    console.log(`item`, item)
      sum += item.quantity_in_basket * item.current_price
    })
    return sum.toFixed(2)
  },
};

export const strict = false