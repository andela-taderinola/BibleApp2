'use strict';

describe('BibleApp Controllers', function() {
  describe('searchController', function() {

    var scope;
    var controller;
    var httpGet;

    beforeEach(module('BibleApp'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        scope = $rootScope.$new();
        httpGet = $httpBackend;
        controller = $controller('searchController', {$scope:scope});
        httpGet.expectGET('../../app/data/searchJacob.json').respond({text: "Jacob"});
    })); //end beforeEach inject

    it('should return an object', function() {
      expect(typeof scope.searchResult).toBeUndefined();
      httpGet.flush();
      expect(typeof scope.searchResult).toEqual('Object');
    });  //end of 'it should return an object'

    it('should return an object with property text: "Jacob"', function() {
      httpGet.flush();
      expect(scope.searchResult.text).toEqual('Jacob');
    }); //end of second it
  }); // end searchController

  describe('openController', function() {

    var scope;
    var controller;
    var httpGet;

    beforeEach(module('BibleApp'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        scope = $rootScope.$new();
        httpGet = $httpBackend;
        controller = $controller('searchController', {$scope:scope});
        httpGet.expectGET('../../app/data/john17.json').respond({passage: "John 17"});
    })); //end beforeEach inject

    it('should return an object', function() {
      expect(typeof scope.response).toBeUndefined();
      httpGet.flush();
      expect(typeof scope.searchResult).toEqual('Object');
    });  //end of 'it should return an object'

    it('should return an object with property passage: "John 17"', function() {
      httpGet.flush();
      expect(scope.response.passage).toEqual('John 17');
    }); //end of second it
  }); // end openController
}); //end BibleApp Controllers