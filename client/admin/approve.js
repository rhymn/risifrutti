Template.approve.helpers({
    receipt: () => Receipts.findOne({checked:false})
})

Template.approve.events({
    'click #approve': function() {
        var receiptId = $("#receiptId").val();
        var receipt = Receipts.findOne(receiptId);
        var buys = parseInt($("#buys").val());
        
        var totalBuys = receipt.user().profile.buys + buys;
        var sendCoupon = (totalBuys - 25*receipt.user().profile.coupons) >= 0;
        Receipts.update(receiptId, {
            $set: {
                checked: true,
                numberOfBuys: buys,
            }
        });
        
        Meteor.users.update(receipt.user()._id, {
            $set: {
                "profile.buys": totalBuys,
            }
        });
        
        if(totalBuys > 25) {
            Meteor.users.update(receipt.user()._id, {
                $set: {
                    "profile.sendCoupon": true,
                }
            });
        }
    }
})