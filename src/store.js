import { defineStore } from 'pinia'

export const useStore = defineStore('index', {
    state: () => ({
      participants: [],
      stack: [],
    }),
    getters: {
      participantNames(state) {
        return state.participants.map(participant => participant.name);
      },
      participantNamesLowerCase(state) {
        return state.participants.map(participant => participant.name.toLowerCase());
      },
    },
    actions: {
      ADD_PARTICIPANT(newParticipant) {
        this.participants.push(newParticipant);
      },
      ADD_STACK_ITEM(newStackItem, index = null) {
        if (index === null) {
          this.stack.push(newStackItem);
        } else {
          this.participants.splice(index, 0, newStackItem);
        }
      },
      REMOVE_FROM_STACK(stackItem) {
        let index = this.stack.indexOf(stackItem);
        this.stack.splice(index, 1);
      },
      addToStack(newStackItem) {
        let participant;

        if (this.participantNamesLowerCase.includes(newStackItem.name.toLowerCase())) {
          let index = this.participantNamesLowerCase.indexOf(newStackItem.name.toLowerCase());
          participant = this.participants[index];
          participant.priority = newStackItem.priority;
          participant.count++;
        } else {
          participant = {
            name: newStackItem.name,
            priority: newStackItem.priority,
            count: 1,
          };
          this.ADD_PARTICIPANT(participant);
        }

        this.ADD_STACK_ITEM({
          timer: newStackItem.timer,
          participant,
        })
      }
    }
});