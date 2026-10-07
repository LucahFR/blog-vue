<template>
<blog_dummy>

  <div>
    <p>test2</p>
  </div>

</blog_dummy>
</template>

<script>
import { blog_dummy } from "/components/blog_dummy";

export default {
  name: 'App',
  components: {
    blog_dummy
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
