<template>
    <div class='input'>
        <form v-on:submit.prevent='submit'>
            <vue-autosuggest
                v-model='currentInputText'
                :suggestions='filteredParticipantNames'
                :input-props='{id:"autosuggest__input", placeholder:"Name"}'
                @selected='selectHandler'
            >  
                <template slot-scope='{suggestion}'>
                    <span class='my-suggestion-item'>{{suggestion.item.name}}</span>
                </template>
            </vue-autosuggest>
            <input type='checkbox' v-model='currentInputPriority' />
            <button type='submit'>Add</button>
        </form>
    </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';

export default {
    name: 'UserInput',
    components: {
        VueAutosuggest
    },
    computed: {
        filteredParticipantNames() {
            let data = [];
            if (this.currentInputText.trim() !== '') {
                data = this.$store.state.participants.filter(participant => participant.name.toLowerCase().startsWith(this.currentInputText.trim().toLowerCase()));
            }

            return [{ data }];
        }
    },
    data: function () {
        return {
            currentInputText: "",
            currentInputPriority: false,
        };
    },
    methods: {
        selectHandler(selection) {
            if (!selection) {
                return;
            }

            this.currentInputText = selection.item.name;
            this.currentInputPriority = selection.item.priority;
            this.submit();
        },
        submit() {
            this.$store.dispatch('addToStack', {
                name: this.currentInputText,
                priority: this.currentInputPriority,
                timer: Date.now(),
            });

            this.currentInputText = '';
            this.currentInputPriority = false;
        }
    }
}
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

    #autosuggest__input {
        width:100%;
        border: 1px solid #888;
        padding: 0.75rem 1rem;
    }

    .input {
        position: relative;
    }

    #autosuggest {
        position: absolute;
        background: #fff;
    }

    ul {
        width: 100%;
        color: rgba(30, 39, 46,1.0);
        list-style: none;
        margin: 0;
        padding: 0;
        box-shadow: rgba(136, 136, 136, 0.5) 0px 2px 1px 0px;
    }

    li {
        margin: 0;
        padding: 0.75rem 0 0.75rem 0.75rem;
        display: flex;
        align-items: center;
        border-top: 0.5px solid rgba(136, 136, 136, 0.25);
    }

    li:first-child {
        border-top:0;
    }

    li:hover {
        cursor: pointer;
    }

    .autosuggest-container {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    #autosuggest {
        width: 100%;
        display: block;
    }

    .autosuggest__results-item--highlighted {
        background-color: rgba(51, 217, 178,0.2);
    }
</style>