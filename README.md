# Project Overview

This project is a feed reader that loads an RSS feed, displays headlines, and provides links. The point is to learn to test with jasmine.

## Installation and Usage

To install, simply navigate to `your/directory/of/choice` and clone the git repo like so:

    git clone https://github.com/akiryk/feed-reader-testing.git

Then navigate to the feed-reader-testing directory and open index.html in your browser. You should see headlines from CSS Tricks. It's been tested on Chrome, Firefox, and Safari on a Mac. Several Jasmine tests will run and a few of them will fail. This is okay, since the project is designed according to test driven development methods. That is, it tests for a few things that the application doesn't currently do. Once the application has been developed further, those tests should pass.

## Tests

Tests are done using Jasmine in the `jasmine/spec/feedreader.js` file. The failing tests — called 'Summary Text' — are near the bottom, and test for the existence of teaser text for each of the feed headlines. The first test simply checks that the summary paragraph element has content and the second test checks that the content has been cleaned up so as not to display HTML tags, such as `<p>` or `<em>`. I included this test because I found that the summary content from CSS Tricks included such elements, and they make the content look confusing. Note that the code to remove such tags is commented out at line 71 in `js/app.js`
