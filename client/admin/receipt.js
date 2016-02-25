Template.receipt.helpers({
    receipt: () => Receipts.findOne({approved:false}),
});

Template.receipt.events({
    'click #approve': function() {
        Receipts.update(
            $('#receiptId').val(),
            {
                $set: {
                    approved:true
                }
            }
        );
    }
})