<template>
  <div>
    <UserInput />
    <Stack />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import UserInput from './components/UserInput.vue'
import Stack from './components/Stack.vue'

export default defineComponent({
  name: 'App',
  components: {
    UserInput,
    Stack,
  }
})
</script>

<style>
body {
  margin:0;
  padding:0;
}

*, *:before, *:after {
  box-sizing: border-box;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  padding: 1rem;
}
</style>
