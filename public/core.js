var nodeTodo = angular.module("nodeTodo", []).config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
    }
}]);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.todos = [];
  $scope.optionToShow = 'ALL';
  $scope.todosInOption = [];

  // when landing on the page, get all todos and show them
  $http
    .get("http://localhost:4000/api/todos")
    .success(function(data) {
      $scope.todos = data;
        showTodos($scope.optionToShow);
    })
    .error(function(data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("http://localhost:4000/api/todos", $scope.formData)
      .success(function(data) {
        document.getElementById("newTodo").value = "";
        $scope.todos = data;
        showTodos($scope.optionToShow);
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function(todo) {
      console.log(todo);
      $http({ method: 'PATCH', url: 'http://localhost:4000/api/todos', data: todo})
        .success(function(data) {
          $scope.todos = data;
            showTodos($scope.optionToShow);
        })
        .error(function(data) {
          console.log("Error: " + data);
        });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("http://localhost:4000/api/todos/" + id)
      .success(function(data) {
        $scope.todos = data;
          showTodos($scope.optionToShow);
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  const showTodos = (option) => {
        if (option === 'ALL') {
          $scope.todosInOption = $scope.todos;
      } else if (option === 'TODO') {
          $scope.todosInOption = $scope.todos.filter((todo) => { return !todo.done });
          console.log($scope.todos);
      } else if (option === 'DONE') {
          $scope.todosInOption = $scope.todos.filter((todo) => { return todo.done });
      }
      $scope.optionToShow = option;
      $scope.$apply();
  }

  document.getElementById('btn1').addEventListener('click', () => { showTodos('ALL'); })
  document.getElementById('btn2').addEventListener('click', () => { showTodos('TODO'); })
  document.getElementById('btn3').addEventListener('click', () => { showTodos('DONE'); })
}
