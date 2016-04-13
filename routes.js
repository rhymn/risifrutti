Router.route("/skapa-konto", function() {
    this.render("createAccount");
});

Router.route("/logga-in", function() {
    this.render("login");
});

Router.route("/glomt-losenord", function() {
    this.render("forgot-password");
});

Router.route("/", function() {
    this.render("front");
});

Router.route("/ladda-upp", function() {
    Meteor.subscribe("myReceipts");
    this.render("profile");
});

Router.route("/godkann" , {
    subscriptions: () => Meteor.subscribe('approve'),
    action: function() {
        if (this.ready()) {
            this.render('approve');
        } else {
            this.render('loading');
        }
    }
});

Router.route("/skicka-kuponger" , {
    subscriptions: () => Meteor.subscribe('usersWithCoupons'),
    action: function() {
        if (this.ready()) {
            this.render('sendcoupons');
        } else {
            this.render('loading');
        }
    }
});

Router.route("/admin/user", function() {
    this.render("view_user");
});

Router.route("/fragor-och-svar", function() {
    this.render('faq');
})

Router.route("/dubbla-postnummer", {
    subscriptions: () => Meteor.subscribe('doubleZips'),
    action: function() {
        if (this.ready()) {
            this.render('doubleZips');
        } else {
            this.render('loading');
        }
    }
});