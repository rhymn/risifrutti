Template.approve.helpers({
    receipt: () => Receipts.findOne({checked:false})
})

Template.approve.events({
    'click #approve': function() {
        var receiptId = $("#receiptId").val();
        var receipt = Receipts.findOne(receiptId);
        var buys = parseInt($("#buys").val());
        
        var totalBuys = receipt.user().profile.buys + buys;
        
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
        
        var sendCoupon = receipt.user().numberOfCouponsToSend() > 0;
        if(sendCoupon) {
            Meteor.users.update(receipt.user()._id, {
                $set: {
                    "profile.sendCoupon": true,
                }
            });
        }
    }
})