<template>
  <d3-network
    class="shadow h-screen w-full"
    :class="asCanvas ? 'bg-red-300' : 'bg-pink-300'"
    :style="computedStyle"
    :net-nodes="nodes" :net-links="links" :options="options"/>
</template>

<script>
import D3Network from 'vue-d3-network'

export default {
  name: 'SvgComponent',
  components: { D3Network },
  props: {
    asCanvas: {
      type: Boolean,
      required: false
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    }
  },
  data: () => ({
    nodes: [
      { id: 1, name: 'my node 1' },
      { id: 2, name: 'my node 2' },
      { id: 3, _color: 'orange' },
      { id: 4, _color: 'red' },
      { id: 5, _color: 'green' },
      { id: 6, _color: 'blue' },
      { id: 7, _color: 'magenta' },
      { id: 8, _color: 'pink' },
      { id: 9 }
    ],
    links: [
      { sid: 1, tid: 2, _color: 'red' },
      { sid: 2, tid: 8, _color: 'f0f' },
      { sid: 3, tid: 4, _color: 'rebeccapurple' },
      { sid: 4, tid: 5, _color: 'green' },
      { sid: 5, tid: 6, _color: 'grey' },
      { sid: 7, tid: 8, _color: 'blue' },
      { sid: 5, tid: 8, _color: 'cyan' },
      { sid: 3, tid: 8, _color: 'black' },
      { sid: 7, tid: 9, _color: 'pink' }
    ],
    options:
    {
      force: 3000,
      nodeSize: 50,
      nodeLabels: true,
      linkWidth: 5
    }
  }),
  watch: {
    asCanvas (val) {
      this.options = { ...this.options, canvas: this.asCanvas }
    },
    computedStyle () {
      this.options = { ...this.options }
      console.log('redraw...')
    }
  },
  computed: {
    computedStyle () {
      return `${this.width ? `width: ${this.width}px;` : ''}${this.height ? `height: ${this.height}px` : ''}`
    }
  },
  mounted () {
    this.options = { ...this.options, canvas: this.asCanvas }
  }
}
</script>
