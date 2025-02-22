/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
const invitePrefix = `flagsmith${new Date().valueOf()}`;
const inviteEmail = `${invitePrefix}@restmail.net`;
const email = 'nightwatch@solidstategroup.com';
const password = 'str0ngp4ssw0rd!';
const url = `http://localhost:${process.env.PORT || 8080}`;
const append = `${new Date().valueOf()}`;
const helpers = require('./helpers');

const byId = helpers.byTestID;
let inviteLink;
module.exports = {
    '[Invite Tests] - Login': function (browser) {
        testHelpers.login(browser, url, email, password);
    },
    '[Invite Tests] - Create organisation': function (browser) {
        testHelpers.waitLoggedIn(browser);
        browser.url(`${url}/create`);
        browser.waitForElementVisible('#create-org-page');

        browser
            .waitAndSet('[name="orgName"]', `Bullet Train Org${append}`)
            .click('#create-org-btn')
            .waitForElementVisible('#project-select-page')
            .assert.containsText('#org-menu', `Bullet Train Org${append}`);
    },
    '[Invite Tests] - Create project': function (browser) {
        browser
            .waitForElementVisible('#create-first-project-btn')
            .click('#create-first-project-btn')
            .waitAndSet('[name="projectName"]', 'My Test Project')
            .click(byId('create-project-btn'));

        browser.waitForElementVisible('#features-page');
    },
    '[Invite Tests] - Invite user': function (browser) {
        browser.pause(200);
        browser.url(`${url}/organisation-settings`);
        browser.waitForElementVisible(byId('invite-link'))
            .getValue(byId('invite-link'), (result) => {
                inviteLink = result.value;
            });
    },
    '[Invite Tests] - Accept invite': function (browser) {
        browser.url(inviteLink)
            .pause(200) // Allows the dropdown to fade in
            .waitForElementVisible(byId('signup-btn'))
            .waitAndSet('[name="email"]', inviteEmail)
            .waitAndSet(byId('firstName'), 'Bullet') // visit the url
            .waitAndSet(byId('lastName'), 'Train')
            .waitAndSet(byId('email'), inviteEmail)
            .waitAndSet(byId('password'), password)
            .waitForElementVisible(byId('signup-btn'))
            .click(byId('signup-btn'));
        browser
            .useXpath()
            .waitForElementPresent(`//div[contains(@class, "org-nav")]//a[contains(text(),"${`Bullet Train Org${append}`}")]`);
    },
    '[Invite Tests] - Finish': function (browser) {
        browser
            .useCss();
        helpers.logout(browser);
    },
};
