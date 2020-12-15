<template>
<div>
    <v-card>
        <v-card-title class="d-flex flex-row justify-space-between">
            <div>
                Корзина
            </div>
            <div v-if="getItemList.length > 0" @click="dropbasket()" class="curp">
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
                    <div>
                        <v-icon class="curp" @click="decrement_product(index)">
                            remove
                        </v-icon>
                        {{product.quantity_in_basket}} шт.
                        <v-icon class="curp" @click="increment_product(index)">
                            add
                        </v-icon>
                    </div>
                    <div v-if="product.P == product.quantity_in_basket" class='caption count-limited'>
                        Количество ограничено
                    </div>
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
                    Курс доллара: 1$ = {{dollar_rate.toFixed(2)}} BYN
                </div>
                <div>
                    Итого : {{getTotalSum}} BYN
                </div>
            </div>
        </div>
        <div v-else class="px-4 pb-5">
            Корзина пуста
        </div>
    </v-card>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    props: {
        dollar_rate: Number,
    },
    methods: {
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
    watch: {
        getItemList(newValue) {
            return newValue
        },
    },
}
</script>
