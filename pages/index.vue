<template>
<div>
    <div>
        <v-card>
            <v-card-title class="d-flex flex-row justify-space-between">
                <div>
                    Корзина
                </div>
                <div v-if="getItemList.length > 0" @click="dropbasket()" class="curp">
                    <v-icon>
                        delete_forever
                    </v-icon>
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
                        {{product.quantity_in_basket}} шт.
                    </div>
                    <div class="product_price justify-space-between">
                        <div>
                            {{product.current_price.toFixed(2)}} / шт.
                        </div>
                        <div class="delete-product curp" @click="decrementProduct(index)">
                            Удалить
                        </div>
                    </div>
                </div>
                <v-divider />
                <div class="d-flex flex-row justify-space-between px-4 py-3">
                    <div>
                        Курс доллара: 1$ = {{dollar_rate}} BYN
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
                        <span>
                            {{product.C}} $
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
        req,
    }) {
        var data = await getData()
        var names = await getNames()
        var dataValue = data.Value.Goods
        var products = []
        var groups = []
        var groups_counter = []
        let dollar_rate = 2.55

        function computedList() {
            dataValue.forEach((dv, index) => {
                let item = {
                    ...dv
                }
                item.name = names[item.G].B[item.T].N
                item.group_name = names[item.G].G
                item.current_price = item.C * dollar_rate
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
            products: products,
            groups: groups,
            groups_counter: groups_counter,
            dollar_rate: dollar_rate,
        }
    },
    methods: {
        addToBasket(product) {
            console.log(` addToBasket product`, product)
            this.$store.dispatch('basket/add_to_basket', product);
        },
        decrementProduct(index) {
            this.$store.dispatch('basket/decrement_product', index);
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
    watch: {
        getItemList(newValue) {
            return newValue
        },
        getTotalSum(newValue) {
            return newValue
        },
    },
}
</script>

<style lang="scss" scoped>
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
