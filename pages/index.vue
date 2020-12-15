<template>
<div>
    <basket :dollar_rate="dollar_rate"/>
    <catalog :products="this.products" :groups="this.groups" />
</div>
</template>

<script>
const getData = () => import('~/assets/data.json').then(m => m.default || m)
const getNames = () => import('~/assets/names.json').then(m => m.default || m)

import basket from '@/components/basket'
import catalog from '@/components/catalog'

import {
    mapGetters
} from "vuex";
export default {
    components: {
        basket,
        catalog,
    },
    async asyncData({
        app,
        req
    }) {
        var data = await getData()
        var names = await getNames()
        var dataValue = data.Value.Goods
        var products = []
        var groups = []
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
        }
        await computedList()

        return {
            products: products,
            groups: groups,
            dollar_rate: dollar_rate,
        }
    },
    
    mounted() {
        setInterval(() => {
            this.products.forEach((dv, index) => {
                this.dollar_rate = Math.random() * (80 - 20 + 1) + 20
                let find = this.products.find(item => item.T === dv.T)
                find.prev_price = find.current_price
                find.current_price = dv.C * this.dollar_rate
                find.current_price.toFixed(2)
            })
        }, 15000);
    },
}
</script>

<style lang="scss">
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
