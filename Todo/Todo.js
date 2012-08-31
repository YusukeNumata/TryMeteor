List = new Meteor.Collection("list");

// クライアント側で実行
if (Meteor.is_client) {
 // Templateのlist処理
 Template.todo.list = function() {
  console.log("client");
  console.log(List.find({}, {sort: {todo: 1}}));
  return List.find({}, {sort: {todo: 1}});
 };
}

// サーバー側で実行
if (Meteor.is_server) {
  Meteor.startup(function () {
    console.log(List.find().count());
    if (List.find().count() === 0) {
     console.log("server");
     var todos = ["Todo"];
     for (var i=0; i<todos.length; i++) {
      List.insert({todo: todos[i]});
     }
    } else {
      console.log("server else");
      //List.insert({todo: "todoa"});
    }
  });
}
