/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('each has a URL that is defined and not empty', function() {
      for (var i=0; i<allFeeds.length; i++){
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });

    it('each has a name that is defined and not empty', function() {
      for (var i=0; i<allFeeds.length; i++){
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
      }
    });
  });

  /* Test suite for testing behavior of the feed menu. */
  describe('The menu', function(){
    /* Check if menu is hidden by making sure html has the right class.
     * Note that this doesn't make sure the menu is *actually* hidden, just
     * that it has the right class to be hidden.
     */
    it('should be hidden by default', function(){
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });

    /* Check that the correct class is added to the body element when the
     * menu icon is clicked. Trigger 2 clicks so we can see that the class
     * toggles on and off.
     */
    it('should toggle visibility when icon is clicked', function(){
      $('.menu-icon-link').trigger('click');
      expect(document.body.classList.contains('menu-hidden')).toBe(false);
      $('.menu-icon-link').trigger('click');
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  /* Test suite for testing that feed entries display correctly. */
  describe('Initial Entries', function(){
    /* Before each test, load the second feed in the array of feeds.
     * This is an asynchronous function call, so we need to use the done()
     * function.
     * @param {function} done
     */
    beforeEach(function(done){
      loadFeed(1, function(){
        done();
      });
    });

    /* Test that the feed entries load correctly and display something rather
     * than nothing. Do this by checking that there are 1 or more entries
     * based on the presense of elements with a class of '.entry'
     */
    it('should have at least one .entry element in the .feed container', function(done){
      expect($('.entry').length > 0).toBe(true);
      done();
    });

  });

  /* Test suite for testing that content changes when the feed changes.*/
  describe('New Feed Selection', function(){

    var firstEntry,
        secondEntry,
        feedURL;

    /* Since this is an asynchronous function call, use the done() function.
     * Load first one feed and then another, capturing the contents of the
     * first entry of each feed in a different variable so we can compare.
     * @param {function} done
     */
    beforeEach(function(done){
      loadFeed(0, function(){
        firstEntry = $('.entry').eq(0);
        done();
      });
      loadFeed(1, function(){
        secondEntry = $('.entry').eq(0);
        feedURL = allFeeds[1].url;
        done();
      })
    });

    /* Compare the contents of the first entry from the first feed with the
     * first entry from the second feed. These should be different since
     * they are from different feeds.
     */
    it('should replace content from the first feed when loading a new feed', function(done){
      expect(firstEntry).not.toBe(secondEntry);
      done();
    });

  });

  /* Extra tests for checking that summary text loads and displays correctly.
   * These tests won't pass until the app has been developed to include
   * additional features that will clean up and display summary text for
   * each entry.
   */
  describe('Summary Text', function(){
    var $firstParagraph;

    /* Load a feed asynchonously and capture the contents of the paragraph
     * from the first entry once it's ready.
     * @param {function} done
     */
    beforeEach(function(done){
      loadFeed(1, function(){
        $firstParagraphText = $('p', '.entry').first().text();
        done();
      });
    });

    /* Extra Test #1
     * To pass, the app must load and display teaser content for each entry
     */
    it('should display for each entry', function(done){
      expect($firstParagraphText.length > 0).toBe(true);
      done();
    });

    /* Extra Test #2
     * To pass, the app needs to load teaser content for each entry and
     * clean it up so it doesn't include HTML tags.
     */
    it('should display just text without html tags such as <p> or <a> or <em>', function(done){
      expect($firstParagraphText.length > 0).toBe(true);
      expect($firstParagraphText.indexOf('</p>') < 0).toBe(true);
      expect($firstParagraphText.indexOf('</a>') < 0).toBe(true);
      expect($firstParagraphText.indexOf('</em>') < 0).toBe(true);
      done();
    });

  });

}());
