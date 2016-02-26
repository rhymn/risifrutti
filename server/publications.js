Meteor.publish('unapprovedReceipts',function() { 
    return Receipts.find({approved:false});
});


Meteor.smartPublish('myReceipts', function() {
    this.addDependency(
        'receipts', 'fileId', function(receipt) {
            return Images.find(receipt.fileId);
        }
    );
    return [
        Receipts.find({userId: this.userId}),
    ];
})


Meteor.smartPublish('approve', function() {
    this.addDependency(
        'receipts', 'fileId', function(receipt) {
            return Images.find(receipt.fileId);
        }
    );
    this.addDependency(
        'receipts', 'userId', function(receipt) {
            return Meteor.users.find(receipt.userId);
        }
    );
    return [
        Receipts.find({checked: false} , {limit:1})
    ];
})

Meteor.publish('usersWithCoupons', function() {
    return Meteor.users.find({"profile.sendCoupon":true});
})

Meteor.publish('doubleZips', function() {
    var users = Meteor.users.find({}).fetch();
    var usersWithNonUniqueZips = _.chain(users)
    .uniq(
        false,
        a => a.profile.zip.replace(" ","")
    )
    .pluck('_id')
    .value();
    return Meteor.users.find({
        _id: {
            $in: usersWithNonUniqueZips
        }
    });
});