<template>
  <div id="app">
    <UserInput />
    <Stack />
  </div>
</template>

<script>
import UserInput from './components/UserInput'
import Stack from './components/Stack'

export default {
  name: 'App',
  components: {
    UserInput,
    Stack,
  }
}
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
