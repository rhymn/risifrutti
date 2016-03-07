Meteor.users.helpers({
    numberOfCouponsToSend: function() {
        return Math.min(3, Math.floor(this.profile.buys / 25)) - this.profile.coupons;
    }
});



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

        var allowedFields = ['profile.buys','profile.sendCoupon','profile.coupons'];
        return _.keys(modifier['$set']).every(
            (name)=> allowedFields.indexOf(name) !== -1
        );
    },
    remove: () => false
})

Meteor.methods({
    resetCoupons: function() {
        let users = Meteor.users.find({ "profile.sendCoupon": true }).fetch();
        users.forEach(function(user) {
            Meteor.users.update(
                user._id, 
                {
                    $set: {
                        "profile.coupons": user.profile.coupons + user.numberOfCouponsToSend(),
                        "profile.sendCoupon":false
                    }
                }
            )
        })
    },
    getUserCount: function() {
        return Meteor.users.find().count();
    }
})