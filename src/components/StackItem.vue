<template>
    <div class='stack__item'>
        <button v-on:click='remove'>Remove</button>
        <div class='stack__item__name'>{{ item.participant.name }} <span class='stack__item__name__count'>{{ item.participant.count }}</span></div>
        <div class='stack__item__priority'>{{ item.participant.priority ? '!' : '' }}</div>
        <div class='stack__item__time'>{{ timeSince }}</div>
    </div>
</template>

<script>
import prettyMilliseconds from 'pretty-ms';

export default {
    name: 'StackItem',
    props: [
        'item'
    ],
    data: function() {
      return {
          currentTime: Date.now(),
      };  
    },
    created: function() {
        setInterval(() => {
            this.currentTime = Date.now();
        }, 1000);
    },
    computed: {
        timeSince() {
            return prettyMilliseconds(this.currentTime - this.item.timer, {
                colonNotation: true,
                unitCount: 2,
                secondsDecimalDigits: 0,
            });
        }
    },
    methods: {
        remove() {
            this.$store.commit('REMOVE_FROM_STACK', this.item);
        }
    }
}
</script>

<style>
    .stack__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top:-1px;
        border-top: 1px solid rgba(136, 136, 136, 0.5);
        padding: 0.75rem 1rem;
    }

    .stack__item:first-child {
        margin-top:0px;
        border-top: 0;
    }

    .stack__item__name__count {
        font-size:0.75em;
        vertical-align: sub;
    }

    .stack__item__priority {
        color: #ff0000;
    }
</style>