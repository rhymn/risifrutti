Receipts = new Meteor.Collection("receipts");
Receipts.helpers({
    url: function() {
        if (Images.findOne(this.fileId)) 
            return Images.findOne(this.fileId).url()
        else 
            return "";
    },
    user: function() { 
        return Meteor.users.findOne(this.userId) 
    }
});

Receipts.allow({
    insert: (userId, doc)=> {  
        check(doc.userId, String);
        check(doc.fileId, String);
        check(doc.date, Date);
        check(doc.checked, Boolean);
        check(doc.numberOfBuys, Number);
        
        if (doc.numberOfBuys !== 0) {
            return false;
        }
        if (doc.checked !== false) {
            return false;
        }
        return true;
    },
    update: function(userId, doc, fieldNames, modifier) {
        if (Meteor.users.findOne(userId).profile.isAdmin !== true) {
            return false;
        }
        var allowedFields = ['checked','numberOfBuys'];
        return fieldNames.every(
            (name)=> allowedFields.indexOf(name) !== -1
        );
    },
    remove: ()=> false
})