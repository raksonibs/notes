## JavaScript Testing: Unit vs Functional vs Integration Tests
### Eric Elliott

- Contrary to popular intuition, maintaining a quality test suite can dramatically enhance developer productivity by catching errors immediately. Without them, end users encounter more bugs, which can lead to increased reliance on customer service, quality assurance teams, and bug reports.
- The cost of a bug that makes it into production is many times larger than the cost of a bug caught by an automated test suite. In other words, TDD has an overwhelmingly positive ROI.
- Unit tests ensure that individual components of the app work as expected. Assertions test the component API.
- Integration tests ensure that component collaborations work as expected. Assertions may test component API, UI, or side-effects (such as database I/O, logging, etc…)
- Functional tests ensure that the app works as expected from the user’s perspective. Assertions primarily test the user interface.
- During development, for developer feedback. Unit tests are particularly helpful here.
- In the staging environment, to detect problems and stop the deploy process if something goes wrong. Typically the full suite of all test types are run at this stage.
- In the production environment, a subset of production-safe functional tests known as smoke tests are run to ensure that none of the critical functionality was broken during the deploy process.
User experience tests (end user experience)
Developer API tests (developer experience)
Infrastructure tests (load tests, network integration tests, etc…)
asynchronous operations such as network and file I/O should be avoided in unit tests.
Since integration tests and functional tests very frequently rely on network connections and file I/O, they tend to significantly slow down the test run when there are lots of tests, which can stretch the run time from milliseconds into minutes. In the case of very large apps, a complete functional test run can take more than an hour.
Which component is under test?
What is the expected behavior?
What was the actual result?
What is the expected result?
How is the behavior reproduced?
If we were unit testing the route handler, our tests would stub the logger, and ignore the interactions with it, testing only whether or not the route responded appropriately to the faked request.
Functional tests are automated tests which ensure that your application does what it’s supposed to do from the point of view of the user. Functional tests feed input to the user interface, and make assertions about the output that ensure that the software responds the way it should.
- nightwatch is great
module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'Night Watch')
      .end();
  }
};
After you deploy a new release to production, it’s important to find out right away whether or not it’s working as expected in the production environment. You don’t want your users to find the bugs before you do
It’s important to maintain a suite of automated functional tests that act like smoke tests for your newly deployed releases. Test all the critical functionality in your app: The stuff that most users will encounter in a typical session.

Requirement gathering
Design
Implementation
Verification
Deployment
Maintenance

Continuous delivery is a development methodology that acknowledges that scope is uncovered as the project progresses, and encourages incremental improvements to software in short cycles that ensure that software can be released at any time without causing problems.

