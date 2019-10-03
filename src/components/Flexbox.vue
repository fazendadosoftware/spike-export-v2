<template>
  <div
    class="flex flex-wrap bg-green-300 pt-4 pl-4 h-screen"
    :style="computedStyle">
    <div v-for="item in Array(12).keys()" :key="item" class="w-1/3 pr-4 pb-4">
      <div class="flex justify-center items-center box h-full">Flexbox {{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flexbox',
  props: {
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    }
  },
  computed: {
    computedStyle () {
      return `${this.width ? `width: ${this.width}px;` : ''}${this.height ? `height: ${this.height}px` : ''}`
    }
  }
}
</script>
<style lang="stylus" scoped>
.box
  background-color #444
  color #fff
  font-size 150%
  border-radius 5px
  padding 20px
</style>
