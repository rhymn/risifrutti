Meteor.startup(function(){
    
    // Email settings
    Accounts.emailTemplates.from = "Risifrutti <hej@samlarisifrutti.se>";
    Accounts.emailTemplates.resetPassword.subject = function (user) {
        return "Återställ lösenord!";
    };
        
    /*
        Accounts.emailTemplates.resetPassword.text = function (user, url) {
            
            // Can we tell meteor about hashbangs?
            var url = getProperUrl(url);        

            // user.profile could contain "invited by"...

            return "Hej " + user.profile.firstname + " och välkommen till ePsy!\n\n"
                + " Klicka på länken för att verifiera din e-post och sätta ett lösenord.\n\n"
                + " Vänliga hälsningar.\n"
                + " - Teamet bakom ePsy.\n\n"
                + url;        
            
        };
    */
    
});
