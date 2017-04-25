/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      tasks: [
        {text: "Wash the cah", priority: 3, length: 20, infoVisible: false, taskComplete: false}, 
        {text: "Clean dah kitchen", priority: 2, length: 10, infoVisible: false, taskComplete: false}, 
        {text: "Laundry", priority: 4, length: 60, infoVisible: false, taskComplete: false}
      ],
      newTaskText: "",
      newTaskPriority: "",
      newTaskLength: "",
      numCompleteTasks: 0,
      numIncompleteTasks: 3
    },
    methods: {
      addTask: function() {
        if (this.newTaskText != "" && this.newTaskPriority != "" && this.newTaskLength != "") {
          this.tasks.push({text: this.newTaskText, priority: this.newTaskPriority, length: this.newTaskLength, infoVisible: false, taskComplete: false});
          this.newTaskText = "";
          this.newTaskPriority = "";
          this.newTaskLength = "";
          this.numIncompleteTasks += 1;
        } else {
          console.log("task inputs can't be empty");
          document.querySelector("#error").style["display"] = "inline";
          setTimeout(function() {
            document.querySelector("#error").style["display"] = "none";
          }, 1500);
        }
      },
      toggleTaskComplete: function(inputTask) {
        console.log("toggling this task...", inputTask.text, inputTask.taskComplete);
        inputTask.taskComplete = !inputTask.taskComplete;
        if (inputTask.taskComplete == true) {
          this.numCompleteTasks += 1;
          this.numIncompleteTasks -= 1;
        } else {
          this.numIncompleteTasks += 1;
          this.numCompleteTasks -= 1;
        }
      },
      showInfo: function(inputTask) {
        inputTask.infoVisible = !inputTask.infoVisible;
      },
      deleteAllComplete: function() {
        var indexes = [];
        for (var i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].taskComplete == true) {
            console.log(this.tasks[i], " a completed task");
            indexes.push(i);
          }
        }
        if (indexes.length == 0) {
          console.log("there are no complete tasks");
          document.querySelector("#errorDeleteAll").style["display"] = "inline";
          setTimeout(function() {
            document.querySelector("#errorDeleteAll").style["display"] = "none";
          }, 1500);
        } else {
          for (var j = 0; j < indexes.length; j++) {
            console.log(indexes);
            this.tasks.splice((indexes[j] - j), 1);
          }
          this.numCompleteTasks = 0;
        }
      }
    }
  });
});