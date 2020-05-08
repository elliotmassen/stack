import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      participants: [],
      stack: [],
    },
    mutations: {
      ADD_PARTICIPANT(state, newParticipant) {
        state.participants.push(newParticipant);
      },
      ADD_STACK_ITEM(state, newStackItem, index = null) {
        if (index === null) {
          state.stack.push(newStackItem);
        } else {
          state.participants.splice(index, 0, newStackItem);
        }
      },
      REMOVE_FROM_STACK(state, stackItem) {
        let index = state.stack.indexOf(stackItem);
        state.stack.splice(index, 1);
      }
    },
    actions: {
      addToStack({ state, getters, commit }, newStackItem) {
        let participant;
  
        if (getters.participantNamesLowerCase.includes(newStackItem.name.toLowerCase())) {
          let index = getters.participantNamesLowerCase.indexOf(newStackItem.name.toLowerCase());
          participant = state.participants[index];
          participant.priority = newStackItem.priority;
          participant.count++;
        } else {
          participant = {
            name: newStackItem.name,
            priority: newStackItem.priority,
            count: 1,
          };
          commit('ADD_PARTICIPANT', participant);
        }
  
        commit('ADD_STACK_ITEM', {
          timer: newStackItem.timer,
          participant,
        })
      }
    },
    getters: {
        participantNames(state) {
          return state.participants.map(participant => participant.name);
        },
        participantNamesLowerCase(state) {
          return state.participants.map(participant => participant.name.toLowerCase());
        },
    },
  });