<template>
    <div class='input'>
        <form v-on:submit.prevent='submit'>
            <input type="text" v-model="currentInputText" />
            <input type='checkbox' v-model='currentInputPriority' />
            <button type='submit'>Add</button>
        </form>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import {useStore} from '../store'

export default defineComponent({
    name: 'UserInput',
    setup() {
        const store = useStore()

        return {
            store
        }
    },
    data() {
        return {
            currentInputText: "",
            currentInputPriority: false,
        };
    },
    methods: {
        submit() {
            this.store.addToStack({
                name: this.currentInputText,
                priority: this.currentInputPriority,
                timer: Date.now(),
            });

            this.currentInputText = '';
            this.currentInputPriority = false;
        }
    }
})
</script>

<style>
    form {
        display: flex;
        justify-content: flex-end;
    }

    .input form > input, .input form > button {
        width: 33%;
        margin:1px;
        padding: 0.75rem 1rem;
        max-height: 2.5rem;
        border: 0;
        z-index:1;
    }

    .input form > input[type=checkbox] {
        width: auto;
    }

    .input form > button {
        width: 30%;
        margin-left: 1rem;
    }
</style>