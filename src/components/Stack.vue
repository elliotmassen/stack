<template>
  <div class='stack'>
      <StackItem v-for='stackItem in stack' :key='stackItem.id' :item='stackItem' />
  </div>
</template>

<script>
import StackItem from './StackItem'

export default {
    // eslint-disable-next-line
    name: 'Stack',
    components: {
        StackItem
    },
    computed: {
        stack() {
            return this.$store.state.stack;
        }
    }
}
</script>

<style>
    .stack {
        margin-top:1rem;
    }
</style>