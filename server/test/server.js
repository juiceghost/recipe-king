const request = require('request')
const expect    = require("chai").expect;

describe("Recipe King API", function() {
    describe("Get random recipes", function() {
     // specification random recipes
     const url = "http://localhost:5000/randomRecipes?number=10"
     it("returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
     });
     it("response body has property 'recipes'", function(done) {
        request(url, function(error, response, body) {
            //expect(response).be.a('object')
            expect(JSON.parse(response.body))
                .to.have.property('recipes')
            //expect('Content-Type', /json/);
            done();
          });
     });
    });
  
    describe("Get recipe details", function() {
     // specification for recipe details
     const url = "http://localhost:5000/recipe/636552"
     it("returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });
    it("response body has property 'title'", function(done) {
        request(url, function(error, response, body) {
            //expect(response).be.a('object')
            expect(JSON.parse(response.body))
                .to.have.property('title')
            //expect('Content-Type', /json/);
            done();
          });
    });
    });
});