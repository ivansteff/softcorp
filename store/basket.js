export const state = () => ({
  items_list: []
})

export const actions = {
  add_to_basket(context, payload) {
    let fined = context.state.items_list.findIndex((item)=>{
        return item.T == payload.T
    })
    if (fined !== -1) {
        if (context.state.items_list[fined].P !== context.state.items_list[fined].quantity_in_basket) {
          context.commit('INCREMENT_ITEM', fined) 
        }
    } else {
        context.commit('ADD_ITEM', payload)
    }
  },
  decrement_product(context, payload) {
    context.commit('DECREMENT_ITEM',payload)
  },
  increment_product(context, payload) {
    context.commit('INCREMENT_ITEM',payload)
  },
  drop_basket(context) {
    context.commit('DROP_BASKET')
  },
  drop_product(context, index) {
    context.commit('DROP_PRODUCT', index)
  },
};

export const mutations = {
  ADD_ITEM(state, product) {
      product.quantity_in_basket = 1
      state.items_list.push(product)
  },
  INCREMENT_ITEM(state, index) {
      state.items_list[index].quantity_in_basket++
  },
  DECREMENT_ITEM(state, index) {
    if (state.items_list[index].quantity_in_basket == 1) {
      state.items_list.splice(index, 1)
    } else {
      state.items_list[index].quantity_in_basket--
    }
  },
  DROP_BASKET(state) {
      state.items_list = []
  },
  DROP_PRODUCT(state, index) {
      state.items_list.splice(index, 1)
  },
    
};

export const getters = {
  getItemList(state) {
    return state.items_list
  },
  getTotalSum(state) {
    let sum = 0
    state.items_list.forEach(item =>{
      sum += item.quantity_in_basket * item.current_price
    })
    return sum.toFixed(2)
  },
};

export const strict = false