const request = require('request')
const expect    = require("chai").expect;

/*
    API:et ska ta emot en query-parameter som heter cache
    
    om query param cache sätts till true vid requestet
    skall API:et skicka cachade responses
    Annars ska API:t skicka fräscha responses

    Huruvida vårt API har skickat cachat eller fräsch response måste
    framgå ifrån responset
    API:t skall lägga en property i responset:
    {..., cache: true } om responset är cachat, annars {..., cache: false}

    Ovan DONE när det gäller randomrecipes
    Behövs läggas till för recipedetail, tester först, red, green, refactor
    klienttester är också kvar
*/

describe("Recipe King API", function() {
    describe("Get fresh random recipes", function() {
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
        it("response body has property 'cache' and that its value is false", function(done) {
            request(url, function(error, response, body) {
                //expect(response).be.a('object')
                expect(JSON.parse(response.body))
                    .to.have.property('cache', false)
                //expect('Content-Type', /json/);
                done();
                });
            });
    });
    describe("Get cached random recipes", function() {
        // specification random recipes
        const url = "http://localhost:5000/randomRecipes?number=10&cache=true"
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
           it("response body has property 'cache' and that its value is true", function(done) {
            request(url, function(error, response, body) {
                //expect(response).be.a('object')
                expect(JSON.parse(response.body))
                    .to.have.property('cache', true)
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