<template>
<div>
    <v-expansion-panels>
        <v-expansion-panel v-for="(group,gindex) in groups" :key="`groups-${gindex}`">
            <v-expansion-panel-header>
                {{group}}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <div v-for="(product,pindex) in products" :key="`products-${pindex}`">
                    <div v-if="group == product.group_name" class="d-flex flex-row align-center justify-space-between">
                    <div class="d-flex flex-row align-center">
                        <h3>
                            {{product.name}}
                        </h3>
                        <span class="pl-1">
                            ({{product.P}})
                        </span>
                    </div>
                        <span>
                            {{product.C}} BYN
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

export default {
    async asyncData({
        req
    }) {
        var data = await getData()
        var names = await getNames()
        var dataValue = data.Value.Goods
        var products = []
        var groups = []

        function computedList() {
            dataValue.forEach(dv => {
                let item = {
                    ...dv
                }
                let dollar_rate = 2.55
                item.name = names[item.G].B[item.T].N
                item.group_name = names[item.G].G
                item.current_price = item.C * dollar_rate
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
        }
    }
}
</script>
