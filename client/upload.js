

Template.upload.events({
    'change #fileInput': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                Receipts.insert({
                    userId: Meteor.userId(),
                    fileId: fileObj._id,
                    date: new Date(),
                    checked: false,
                    numberOfBuys: 0
                });
            });
        });
    }
})
var numOfBuys = function() {
    if (!Meteor.user()) {
        return 0;
    }
    return Meteor.user().profile.buys - Meteor.user().profile.coupons*25;
}

Template.upload.helpers({
    images: ()=> Images.find()
})
Template.upload.onRendered(function() {
    Tracker.autorun(function() {
        var height = numOfBuys()/25;
        if (height > 1) {
            height = 1;
        }
        var h = $("#ready-wrapper").height();
        $('#ready').css('height', h*height);
    }
    );
})

Template.receipts.helpers({
    receipts:() => Receipts.find({userId: Meteor.userId()},{sort: [['date','desc']]})
});

Template.profile.helpers({
    name: () => Meteor.user().profile.name,
    numOfBuys: numOfBuys
})