<template>
  <div id="app" class="bg-red-400 h-screen relative">
    <div id="control-box" class="z-50 bg-gray-200 absolute top-0 right-0 bg-white shadow-lg p-2 m-2 border-2 border-gray-600">
      <div class="mb-2 text-sm font-bold">
        View types
      </div>
      <div class="flex justify-around">
        <button v-for="view in views" :key="view.key" class="btn" :class="view.btnclass" @click="selectedView = view" :selected="selectedView.key === view.key">
          {{view.label}}
        </button>
      </div>
      <div class="flex flex-col">
        <div class="mt-8 mb-3 text-sm font-bold">
           HTML element dimensions
        </div>
        <div class="flex">
          <div class="form-group flex w-1/2 p-2">
            <label class="text-xs font-bold">Width (px)</label>
            <input
              class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              v-model="width"
              type="number">
          </div>
          <div class="form-group flex w-1/2 p-2">
            <label class="text-xs font-bold">Height (px)</label>
            <input
              class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              v-model="height"
              type="number">
          </div>
        </div>
        <div class="flex p-2 bg-green-100 justify-end">
          <button class="btn bg-red-500 hover:bg-red-700 text-white" :style="'opacity: 1; width: 50px'" @click="resetElementDimensions">
            <font-awesome-icon icon="undo" />
          </button>
          <button class="btn bg-green-500 hover:bg-green-700 text-white ml-1 w-10" :style="'opacity: 1; width: 50px'" @click="setElementDimensions">
            <font-awesome-icon icon="check" />
          </button>
        </div>
      </div>
    </div>
    <div id="report-container">
      <component :is="selectedView.component" :as-canvas="selectedView.asCanvas"/>
    </div>
  </div>
</template>

<script>
import Flexbox from '@/components/Flexbox'
import Grid from '@/components/Grid'
import ForceNetwork from '@/components/ForceNetwork'

export default {
  name: 'app',
  components: { Flexbox, Grid, ForceNetwork },
  data: () => ({
    width: 0,
    height: 0,
    selectedView: { key: 'flexbox', component: 'flexbox', label: 'Flexbox', btnclass: 'bg-green-500 hover:bg-green-700 text-white' },
    views: [
      { key: 'flexbox', component: 'flexbox', label: 'Flexbox', btnclass: 'bg-green-500 hover:bg-green-700 text-white' },
      { key: 'grid', component: 'grid', label: 'Grid', btnclass: 'bg-blue-500 hover:bg-blue-700 text-white' },
      { key: 'canvas-component', component: 'force-network', asCanvas: true, label: 'Canvas', btnclass: 'bg-red-500 hover:bg-red-700 text-white' },
      { key: 'svg-component', component: 'force-network', label: 'SVG', btnclass: 'bg-pink-500 hover:bg-pink-700 text-white' }
    ]
  }),
  methods: {
    getViewportDimensions () {
      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      return { w, h }
    },
    resetElementDimensions () {
      const { w, h } = this.getViewportDimensions()
      this.height = h
      this.width = w
    },
    setElementDimensions () {
      console.log('SETTING ELEMENT DIMENSIONS')
    }
  },
  created () {
    this.$lx.init()
      .then(reportSetup => {
        const config = {
          allowTableView: false,
          facets: [
            { key: 1, label: '' }
          ],
          export: {
            autoscale: true,
            exportElementSelector: 'div#report-container'
          }
        }
        this.$lx.ready(config)
      })
  },
  mounted () {
    const { w, h } = this.getViewportDimensions()
    this.height = h
    this.width = w
  }
}
</script>

<style lang="stylus" scoped>
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.btn
  @apply font-bold py-2 px-4 rounded py-2 px-4 rounded mr-2 w-24 outline-none
  opacity 0.4
  transition opacity ease 0.5s
  &[selected]
    opacity 1
    transition opacity ease 0.5s

.form-group
  position relative

.form-group > label
  position absolute
  top -10px
  left 10px

.form-group > input
  border none
</style>
