<template>
  <div id="app" class="bg-red-400 h-screen relative">
    <div id="control-box" class="z-50 bg-gray-200 absolute top-0 right-0 bg-white shadow-lg p-2 m-2 border-2 border-gray-600">
      <div class="mb-2 text-sm font-bold">
        View types {{orientation}}
      </div>
      <div class="flex justify-around">
        <button v-for="view in views" :key="view.key" class="btn" :class="view.btnclass" @click="selectedView = view" :selected="selectedView.key === view.key">
          {{view.label}}
        </button>
      </div>
      <div class="flex flex-col">
        <div class="mt-8 mb-3 text-sm font-bold">
           HTML element dimensions
           <span class="ml-2 p-1 rounded text-white" :class="dimensionsLocked ? 'bg-green-500' : 'bg-red-500'" >
             <font-awesome-icon :icon="dimensionsLocked ? 'link' : 'unlink'" />
           </span>
        </div>
        <div class="flex">
          <div class="form-group flex w-1/2 p-2">
            <label class="text-xs font-bold">Width (px)</label>
            <input
              class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              v-model.number="localWidth"
              type="number">
          </div>
          <div class="form-group flex w-1/2 p-2">
            <label class="text-xs font-bold">Height (px)</label>
            <input
              class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              v-model.number="localHeight"
              type="number">
          </div>
        </div>
        <div class="flex p-2 justify-end">
          <button
            class="btn text-white"
            :class="{ 'bg-red-300 cursor-default': !dimensionsDirty, 'hover:bg-red-700 bg-red-500 opacity-50': dimensionsDirty || !dimensionsLocked }"
            :disabled="!dimensionsDirty && dimensionsLocked"
            :style="'opacity: 1; width: 50px'"
            @click="resetElementDimensions">
            <font-awesome-icon icon="undo" />
          </button>
          <button
            class="btn text-white ml-1 w-10"
            :class="{ 'bg-green-300 cursor-default': !dimensionsDirty, 'hover:bg-green-700 bg-green-500 opacity-50': dimensionsDirty }"
            :disabled="!dimensionsDirty"
            :style="'opacity: 1; width: 50px'"
            @click="setElementDimensions">
            <font-awesome-icon icon="check" />
          </button>
        </div>
        <div class="flex p-2 mt-4">
          <div class="form-group relative w-1/2">
            <label class="text-xs font-bold" :style="'top: -17px; left: 0px'">Orientation</label>
            <select
              v-model="orientation"
              class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
              <option v-for="option in orientations" :key="option.key" v-bind:value="option.key">{{option.label}}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div class="form-group relative w-1/2 ml-4">
            <label class="text-xs font-bold" :style="'top: -17px; left: 0px'">Format</label>
            <select
              v-model="format"
              class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
              <option v-for="option in formats" :key="option.key" v-bind:value="option.key">{{option.label}}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div class="flex p-2 mt-3">
          <label class="text-gray-900 font-bold">
            <input v-model="autoscale" class="mr-2 leading-tight" type="checkbox">
            <span class="text-sm">
              Autoscale
            </span>
          </label>
        </div>
      </div>
    </div>
    <div id="report-container">
      <component :is="selectedView.component" :as-canvas="selectedView.asCanvas" :width="elWidth" :height="elHeight"/>
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
    autoscale: true,
    elWidth: 0,
    elHeight: 0,
    localWidth: 0,
    localHeight: 0,
    windowWidth: 0,
    windowHeight: 0,
    selectedView: { key: 'flexbox', component: 'flexbox', label: 'Flexbox', btnclass: 'bg-green-500 hover:bg-green-700 text-white' },
    views: [
      { key: 'flexbox', component: 'flexbox', label: 'Flexbox', btnclass: 'bg-green-500 hover:bg-green-700 text-white' },
      { key: 'grid', component: 'grid', label: 'Grid', btnclass: 'bg-blue-500 hover:bg-blue-700 text-white' },
      { key: 'canvas-component', component: 'force-network', asCanvas: true, label: 'Canvas', btnclass: 'bg-red-500 hover:bg-red-700 text-white' },
      { key: 'svg-component', component: 'force-network', label: 'SVG', btnclass: 'bg-pink-500 hover:bg-pink-700 text-white' }
    ],
    orientations: [
      { key: 'portrait', label: 'Portrait' },
      { key: 'landscape', label: 'Landscape' }
    ],
    orientation: 'portrait',
    formats: [
      { key: 'a0', label: 'A0' },
      { key: 'a1', label: 'A1' },
      { key: 'a2', label: 'A2' },
      { key: 'a3', label: 'A3' },
      { key: 'a4', label: 'A4' },
      { key: 'letter', label: 'Letter' }
    ],
    format: 'a4'
  }),
  methods: {
    resetElementDimensions () {
      this.localHeight = this.windowHeight
      this.localWidth = this.windowWidth
      this.elHeight = this.windowHeight
      this.elWidth = this.windowWidth
    },
    setElementDimensions () {
      this.elHeight = this.localHeight
      this.elWidth = this.localWidth
    },
    getWindowSize (evt) {
      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      if (this.elWidth === this.windowWidth && this.elHeight === this.windowHeight) {
        this.elWidth = w
        this.elHeight = h
        this.localWidth = w
        this.localHeight = h
      }
      this.windowWidth = w
      this.windowHeight = h
    },
    getReportConfiguration () {
      return {
        allowTableView: false,
        facets: [
          { key: 1, label: '' }
        ],
        export: {
          autoscale: this.autoscale,
          orientation: this.orientation,
          format: this.format,
          exportElementSelector: 'div#report-container'
        }
      }
    }
  },
  computed: {
    dimensionsDirty () {
      return (this.elWidth !== this.localWidth) || (this.elHeight !== this.localHeight)
    },
    dimensionsLocked () {
      return this.elWidth === this.windowWidth && this.elHeight === this.windowHeight
    }
  },
  watch: {
    autoscale () {
      const config = this.getReportConfiguration()
      this.$lx.updateConfiguration(config)
    },
    orientation () {
      const config = this.getReportConfiguration()
      this.$lx.updateConfiguration(config)
    },
    format () {
      const config = this.getReportConfiguration()
      this.$lx.updateConfiguration(config)
    }
  },
  created () {
    this.$lx.init()
      .then(reportSetup => {
        const config = this.getReportConfiguration()
        this.$lx.ready(config)
      })
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowSize)
      this.getWindowSize()
      this.localHeight = this.windowHeight
      this.localWidth = this.windowWidth
      this.elHeight = this.windowHeight
      this.elWidth = this.windowWidth
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowSize)
  }
}
</script>

<style lang="stylus" scoped>
#app
  font-family 'HussarBoldWeb', 'Avenir', Helvetica, Arial, sans-serif
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

@font-face
  font-family 'HussarBoldWeb'
  src url('./assets/font/HussarBoldWeb.woff') format('woff')

</style>
