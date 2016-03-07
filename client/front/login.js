Template.loginForm.events({
    'submit #loginForm': function(e) {
        e.preventDefault();
        let email = $("input[name='email']").val();
        let pwd = $("input[name='pwd']").val();
        Meteor.loginWithPassword(email, pwd, function(error) {
            if (error) {
               alert(`Det gick inte att logga in. Kontrollera dina användaruppgifter (${error})`); 
            } else {
                Router.go('ladda-upp');
            }
        })
    }
})

Template.header.helpers({
    loggedIn: ()=> !! Meteor.userId()
});

Template.header.events({
    'click #logout': function(){
        Meteor.logout();
        window.location = "/";
    }
})

Template.forgotForm.events({
    'submit #pwdForm': function(e) {
        e.preventDefault();
        let email = $("input[name='email']").val();
        Accounts.forgotPassword({email:email}, function(error) {
            if (error) {
                alert(`Någonting gick fel (${error})`); 
            } else {
                alert("En epost med information om hur du sätter ett nytt lösenord har skickats till "+ email);
                Router.go('logga-in');
            }
        })
    }
})

Template.competition.helpers({
    loggedIn: ()=> !!Meteor.user()
});