Template.sendcoupons.helpers({
    users: () => Meteor.users.find({ "profile.sendCoupon": true })
})

Template.sendcoupons.events({
    'click #resetCoupons': function() {
        if(confirm("vill du verkligen nollställa kupongerna? Åtgärden går inte att ångra. Kom ihåg att exportera som csv först.")) {
            Meteor.call('resetCoupons');    
        }
    }
})

Template.sendcoupons.onRendered(
    function () {
        $('#coupons').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'csv', 'excel'
            ],
            paging: false
        });
        Meteor.call('getUserCount', function(error, result) {
            $("#userCount").html(result);
        })
    }
);