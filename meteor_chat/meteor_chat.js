Comments = new Meteor.Collection("comments");


if (Meteor.is_client) {
  function current_room() {
    return Session.get("current_room") || Template.rooms.rooms[0].name;
  }
  
  Template.rooms.selected = function() {
    return current_room() == this.name ? "selected" : ""
  }

  Template.rooms.rooms = [
    {name: "rooma", display: "部屋A"},
    {name: "roomb", display: "部屋B"}];

  Template.rooms.events = {
    'click a' : function(evt) {
      Session.set("current_room", $(evt.target).data("name"));
    }
  };

  Template.input.events = {
    'click input#submit, keyup input#text' : function(evt) {

      if(evt.type == "keyup" && evt.which != 13) return;

      var name = $("input#name").val();
      var text = $("input#text").val();

      if(name == "" || text == "") return;

      Session.set("name", name);

      Comments.insert({ room: current_room(), name: name, text: text, date: new Date().getTime() });
      $("input#text").val("");
      $("input#text").focus();
    }
  };

  Template.comments.comments = function() {
    var comments = Comments.find({room: current_room()}, {sort: {date: -1}}).fetch();
    return comments.slice(0,20);
  }

  Template.comment.data = function() {
    return new Date(this.date).format("yyyy/mm/dd HH:MM:ss");
  }
}

