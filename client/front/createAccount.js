Template.accountForm.events({
    'submit #accountForm': function(e){
        e.preventDefault();
        Accounts.createUser({
           email: $("input[name='email']").val(),
           password: $("input[name='pwd']").val(),
           profile: {
               name: $("input[name='name']").val(),
               city: $("input[name='city']").val(),
               address: $("input[name='address']").val(),
               zip: $("input[name='zip']").val(),
               phone: $("input[name='phone']").val(),
               buys: 0,
               coupons: 0,
               sendCoupon: false
           }
        }, function(error) {
            if (error) {
                alert(`Det gick inte att skapa konto (${error})`);
            } else {
                Router.go("ladda-upp");    
            }
        });
    }
}
    
)