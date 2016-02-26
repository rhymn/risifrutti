Meteor.startup(function(){
    
    // Email settings
    Accounts.emailTemplates.from = "Risifrutti <hej@samlarisifrutti.se>";
    Accounts.emailTemplates.resetPassword.subject = function (user) {
        return "Återställ lösenord!";
    };
        
    Accounts.emailTemplates.resetPassword.text = function (user, url) {
        
        return "Hej " + user.profile.name + "!"
            + " Klicka på länken för att sätta ett nytt lösenord.\n\n"
            + " Vänliga hälsningar,\n"
            + " - Risifruttiteamet\n\n"
            + url;        
        
    };    
});
