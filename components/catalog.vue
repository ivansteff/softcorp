<template>
<div>
    <h1>
        Каталог
    </h1>
    <v-expansion-panels v-model="groups_counter" multiple>
        <v-expansion-panel v-for="(group,gindex) in groupsList" :key="`groups-${gindex}`">
            <v-expansion-panel-header>
                <h3>
                    {{group}}
                </h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <div v-for="(product,pindex) in productsList" :key="`products-${pindex}`" @click="addToBasket(product)" class="product">
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
import {
    mapGetters
} from "vuex";
export default {
    props: {
        groups:Array,
        products:Array,
    },
    data() {
        return {
            groups_counter: [],
        }
    },
    mounted() {
        this.groups_counter = [...Array(this.groups.length).keys()]
    },
    methods: {
        addToBasket(product) {
            this.$store.dispatch('basket/add_to_basket', Object.assign({},product));
        },
    },
    computed: {
        groupsList(){
            return this.groups
        },
        productsList(){
            return this.products
        },
    },
}
</script>
