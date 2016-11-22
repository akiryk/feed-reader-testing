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

    describe('The menu', function(){
       /* Check if menu is hidden by making sure the html has the right class.
        * Note that this doesn't make sure the menu is *actually* hidden — just
        * that it has the right class to be hidden.
        */
       it('should be hidden by default', function(){
          expect(document.body.classList.contains('menu-hidden')).toBe(true);
       });

        it('should toggle visibility when icon is clicked', function(){
          $('.menu-icon-link').trigger('click');
          expect(document.body.classList.contains('menu-hidden')).toBe(false);
          $('.menu-icon-link').trigger('click');
          expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function(){

      beforeEach(function(done){
        loadFeed(1, function(){
          done();
        });
      });

      it('should have at least one .entry element in the .feed container', function(done){
       expect($('.entry').length > 0).toBe(true);
       done();
      });

    });

    describe('New Feed Selection', function(){

      var firstEntry,
          secondEntry,
          feedURL;

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

      it('should replace content from the first feed when loading a new feed', function(done){
        expect(firstEntry).not.toBe(secondEntry);
        done();
      });

    });

    /* Extra tests for summary text
     * These tests won't pass until the app has been developed to include
     * additional features that will clean up and display summary text for
     * each entry.
     */
    describe('Summary Text', function(){
      var $firstParagraph;

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
