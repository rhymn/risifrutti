Template.view_user.events({
    "click #go": () => Meteor.subscribe("user", $('#email').val())
})


Template.view_user.helpers({
    receipts: ()=> Receipts.find()
})