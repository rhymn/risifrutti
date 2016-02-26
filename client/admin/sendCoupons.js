Template.sendcoupons.helpers({
    users: () => Meteor.users.find({"profile.sendCoupon": true})
})

Template.sendcoupons.events({
    'click .sendCouponBtn': function(event) {
        var userId = event.target.dataset.userId;
        var user = Meteor.users.findOne(userId);
        var sendCoupon = (user.profile.buys - (Meteor.user().profile.coupons + 1)*25) >= 0
        Meteor.users.update(userId, {
            $set: {
                "profile.coupons": user.profile.coupons + 1,
                "profile.sendCoupon": sendCoupon
            }
        });
    }
})