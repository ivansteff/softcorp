<template>
<div>
    <div>
        <v-card>
            <v-card-title class="d-flex flex-row justify-space-between">
                <div>
                    Корзина
                </div>
                <div v-if="getItemList.length > 0" @click="dropbasket()" class="curp">
                    <!-- <v-icon>
                        delete_forever
                    </v-icon> -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon dark v-bind="attrs" v-on="on">
                                delete_forever
                            </v-icon>
                        </template>
                        <span>Очистка корзины</span>
                    </v-tooltip>
                </div>
            </v-card-title>
            <div v-if="getItemList.length > 0">
                <div class="d-flex flex-row pb-2 px-4 w-100 justify-space-between">
                    <div class="product_title">
                        Наименование товара и описание
                    </div>
                    <div class="product_counter">
                        Количество
                    </div>
                    <div class="product_price">
                        Цена (BYN)
                    </div>
                </div>
                <div v-for="(product,index) in getItemList" :key="`product-${index}`" class="d-flex flex-row justify-space-between px-4 py-3 product-item">
                    <div class="product_title">
                        {{product.name}}
                    </div>
                    <div class="product_counter">
                        <v-icon class="curp" @click="decrement_product(index)">
                            remove
                        </v-icon>
                        {{product.quantity_in_basket}} шт.
                        <v-icon class="curp" @click="increment_product(index)">
                            add
                        </v-icon>
                    </div>
                    <div class="product_price justify-space-between">
                        <div>
                            {{product.current_price.toFixed(2)}} / шт.
                        </div>
                        <div class="delete-product curp" @click="drop_product(index)">
                            Удалить
                        </div>
                    </div>
                </div>
                <v-divider />
                <div class="d-flex flex-row justify-space-between px-4 py-3">
                    <div>
                        Курс доллара: 1$ = {{dollar_rates.toFixed(2)}} BYN
                    </div>
                    <div>
                        Итого : {{getTotalSum}} BYN
                    </div>
                </div>
            </div>
            <div v-else class="px-4">
                Корзина пуста
            </div>
        </v-card>
    </div>
    <h1>
        Каталог
    </h1>
    <v-expansion-panels v-model="groups_counter" multiple>
        <v-expansion-panel v-for="(group,gindex) in groups" :key="`groups-${gindex}`">
            <v-expansion-panel-header>
                <h3>
                    {{group}}
                </h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <div v-for="(product,pindex) in products" :key="`products-${pindex}`" @click="addToBasket(product)" class="product">
                    <div v-if="group == product.group_name" class="d-flex flex-row align-center justify-space-between pa-3 product-item">
                        <div class="d-flex flex-row align-center">
                            <h4>
                                {{product.name}}
                            </h4>
                            <span class="pl-1">
                                ({{product.P}})
                            </span>
                        </div>
                        <span :class="{'up': product.current_price > product.prev_price, 'down': product.current_price < product.prev_price}" class="d-flex flex-row align-center">
                            {{product.current_price.toFixed(2)}} BYN
                            <v-icon v-if="product.prev_price" :color="product.current_price > product.prev_price ? 'red' : 'green'">
                                {{product.current_price > product.prev_price ? 'expand_less' : 'expand_more'}}
                            </v-icon>
                        </span>
                    </div>
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</div>
</template>

<script>
const getData = () => import('~/task/data.json').then(m => m.default || m)
const getNames = () => import('~/task/names.json').then(m => m.default || m)
import {
    mapGetters
} from "vuex";
export default {
    async asyncData({
        app,req
    }) {
        var data = await getData()
        var names = await getNames()
        var dataValue = data.Value.Goods
        var products = []
        var groups = []
        var groups_counter = []
        var dollar_rate = 2.55

        function computedList() {
            dataValue.forEach((dv, index) => {
                let item = {
                    ...dv
                }
                item.name = names[item.G].B[item.T].N
                item.group_name = names[item.G].G
                item.current_price = item.C * dollar_rate
                item.current_price.toFixed(2)
                item.previos_price = 0
                if (!(groups.includes(item.group_name))) {
                    groups.push(item.group_name)
                }
                products.push(item)
            })
            groups_counter = [...Array(groups.length).keys()]
        }
        await computedList()

        return {
            products,
            groups: groups,
            groups_counter: groups_counter,
            dollar_rate: dollar_rate,
        }
    },
    data() {
        return {
            dollar_rates: 0,
        }
    },
    methods: {
        addToBasket(product) {
            this.$store.dispatch('basket/add_to_basket', product);
        },
        decrement_product(index) {
            this.$store.dispatch('basket/decrement_product', index);
        },
        increment_product(index) {
            this.$store.dispatch('basket/increment_product', index);
        },
        drop_product(index) {
            this.$store.dispatch('basket/drop_product', index);
        },
        dropbasket() {
            this.$store.dispatch('basket/drop_basket');
        },
    },
    computed: {
        ...mapGetters({
            getItemList: "basket/getItemList",
            getTotalSum: "basket/getTotalSum",
        }),
    },
    mounted() {
        this.dollar_rates = this.dollar_rate
        setInterval(() => {
            this.products.forEach((dv, index) => {
                this.dollar_rates = Math.random() * (80 - 20 + 1) + 20
                let find = this.products.find(item => item.T === dv.T)
                find.prev_price = find.current_price
                find.current_price = dv.C * this.dollar_rates
                find.current_price.toFixed(2)
            })
        }, 5000);
    },
    watch: {
        // getItemList(newValue) {
        //     return newValue
        // },
        // getTotalSum(newValue) {
        //     return newValue
        // },
        // products(newValue) {
        //     console.log(`products -> newValue`, newValue)
        //     return newValue
        // },
        // groups(newValue) {
        //     return newValue
        // },
        dollar_rate(newValue) {
            return newValue
        },
    },
}
</script>

<style lang="scss" scoped>
.up {
    color: red;
    border-radius: 2px;
}

.down {
    color: greenyellow;
    border-radius: 2px;
}

.curp {
    cursor: pointer;
}

.total-sum {
    width: 75%;
    display: flex;
    justify-content: flex-end;
}

.product {
    cursor: pointer;

    &_title {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    &_counter {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &_price {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &-item {
        transition: .3s;

        &:hover {
            background-color: rgba($color: #000000, $alpha: .3);
        }
    }
}
</style>
