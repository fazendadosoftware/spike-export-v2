<template>
  <div class="wrapper py-2 px-2 bg-blue-300 h-screen">
    <div class="box a p-4">Grid A</div>
    <div class="box b p-4">Grid B</div>
    <div class="box c p-4">Grid C</div>
    <div class="box d p-4">Grid D</div>
    <div class="box e p-4">Grid E</div>
    <div class="box f p-4">Grid F</div>
  </div>
</template>

<style lang="stylus" scoped>
  .wrapper
    display grid
    grid-gap 10px
    grid-template-columns "[col] 100px [col] 100px [col] 100px [col] 100px"
    grid-template-rows "[row] auto [row] auto [row]"

  .box
    background-color #444
    color #fff
    border-radius 5px
    font-size 150%

  .a
    grid-column 1 / 3
    grid-row 1 / 3
  .b
    grid-column col 2 / span 3
    grid-row 1 / 3
  .c
    grid-column 1/ 2
    grid-row 3 / span 2
  .d
    grid-column col 1 / span 4
    grid-row row 2
  .e
    grid-column 2 / span 1
    grid-row row 3
  .f
    grid-column 3 / span 3
    grid-row row 3
</style>
