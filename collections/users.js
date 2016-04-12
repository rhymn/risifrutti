Meteor.users.helpers({
    numberOfCouponsToSend: function() {
        return Math.min(3, Math.floor(this.profile.buys / 25)) - this.profile.coupons;
    },
    unsentAndSentCoupons: function() {
        return Math.min(3, Math.floor(this.profile.buys / 25));
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
});

Info = new Meteor.Collection("info");



var computeCouponTotal = function() {
    var sum = 0;
    Meteor.users.find().fetch().forEach(u => {
        sum += u.unsentAndSentCoupons() || 0;
    })
    if (!Info.findOne()) {
        Info.insert({});     
    }
    Info.update(
        Info.findOne()._id,
        {
            $set: {
                "coupons": sum
            }
        }
    );
}

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
        });
        computeCouponTotal();
    },
    getUserCount: function() {
        return Meteor.users.find().count();
    },
    computeCouponTotal: function() {
        let actor = Meteor.users.findOne(this.userId);
        if (actor.profile.isAdmin){
            computeCouponTotal();    
        }
    }
})

if(Meteor.isServer) {
    Meteor.publish('info',function() {
        return Info.find();
    })
    Meteor.startup(computeCouponTotal);
}


if (Meteor.isClient) {
    Meteor.subscribe('info');
}