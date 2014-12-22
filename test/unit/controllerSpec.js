'use strict';

describe('bibleAppControllers', function() {
  describe('bibleController', function() {

    var scope;
    var controller;
    var httpGet;

    beforeEach(module('bibleApp'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      scope = $rootScope.$new();
      httpGet = $httpBackend;
      controller = $controller('bibleController', {$scope:scope});
      httpGet.expectGET('http://api.biblia.com/v1/bible/search/DARBY.js?key=517d06fdbe90e270534625197ed15845&query=try&sort=passage').respond({hitCount: 4});
    })); //end beforeEach inject

    it('should return an object', function() {
      expect(scope.searchResponse).toBeUndefined();
      httpGet.flush();
      expect(typeof scope.searchResponse).toEqual('object');
    });  //end of 'it should return an object'

    it('should return an object with property text: "Jacob"', function() {
      httpGet.flush();
      expect(scope.searchResponse.text).toEqual(4);
    }); //end of second it
    
  }); // end searchController

  // describe('openController', function() {

  //   var scope;
  //   var controller;
  //   var httpGet;

  //   beforeEach(module('BibleApp'));

  //   beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
  //     scope = $rootScope.$new();
  //     httpGet = $httpBackend;
  //     controller = $controller('openController', {$scope:scope});
  //     httpGet.expectGET('app/data/john17.json').respond({passage: "John 17"});
  //   })); //end beforeEach inject

  //   it('should return JSON data', function() {
  //     expect(scope.response).toBeUndefined();
  //     httpGet.flush();
  //     expect(scope.response).toBeDefined();
  //   });  //end of 'it should return an object'

  //   it('should return an object with property passage: "John 17"', function() {
  //     httpGet.flush();
  //     expect(scope.response.passage).toEqual('John 17');
  //   }); //end of second it

  // }); // end openController
}); //end BibleApp Controllers