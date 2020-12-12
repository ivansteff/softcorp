import VuexPersistence from 'vuex-persist'

export default ({
  store
}) => {
  new VuexPersistence({
    key: 'sfotcorp',
    modules: [
      'basket'
    ]
  }).plugin(store)
}
