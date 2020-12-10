<template>
<div>
    <v-expansion-panels>
        <v-expansion-panel v-for="(item,i) in names" :key="i">
            <v-expansion-panel-header>
                {{item.G}} {{i}}
                <!-- {{item}} -->
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-for="(item2,i2) in item.B" :key="i2">
                {{item2.N}} {{i2}}
                <!-- {{dataValue[i2]}} -->
              </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    {{names}}
    <br/>
    <br/>
    {{dataValue}}
</div>
</template>

<script>
const getData = () => import('~/task/data.json').then(m => m.default || m)
const getNames = () => import('~/task/names.json').then(m => m.default || m)

export default {
    async asyncData({
        req
    }) {
        const data = await getData()
        const names = await getNames()
        const dataValue = data.Value.Goods

        return {
            dataValue,
            names,
        }
    }
}
</script>
