<template>
  <div class='stack'>
      <StackItem v-for='stackItem in stack' :key='stackItem.id' :item='stackItem' />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import { useStore } from '../store';
import StackItem from './StackItem'

export default defineComponent({
    // eslint-disable-next-line
    name: 'Stack',
    components: {
        StackItem
    },
    setup() {
        const store = useStore()

        return {
            store
        }
    },
    computed: {
        stack() {
            return this.store.stack;
        }
    }
})
</script>

<style>
    .stack {
        margin-top:1rem;
    }
</style>