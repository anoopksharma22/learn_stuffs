Vue.createApp({
  data() {
    return {
      goals: [],
      inputGoal: "",
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.inputGoal);
      this.inputGoal = "";
    },
  },
}).mount("#app");
