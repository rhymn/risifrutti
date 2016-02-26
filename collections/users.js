Meteor.users.helpers({

})

Meteor.users.allow({
    insert: function (userId, doc) {
        check(doc.profile, {
            name: String,
            address: String,
            city: String,
            zip: String,
            phone: String,
            buys: Number,
            coupons: Number,
            sendCoupon: Boolean
        });

        if (doc.profile.buys !== 0) {
            throw new Error();
        }
        if (doc.profile.coupons !== 0) {
            throw new Error();
        }

        if (doc.profile.sendCoupon !== false) {
            throw new Error();
        }
    },
    update: function(userId, doc, fieldNames, modifier) {
       
        if (Meteor.users.findOne(userId).profile.isAdmin !== true) {
            return false;
        }
        
        var allowedFields = ['profile.buys','profile.sendCoupon'];
        return fieldNames.every(
            (name)=> allowedFields.indexOf(name) !== -1
        );
    },
    remove: () => false
})