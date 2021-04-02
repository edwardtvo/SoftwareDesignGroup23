let supertest = require("supertest");
let expect = require('chai').expect
let should = require('chai').should()


const assert = require('assert');
const user =  require('../server')

// This agent refers to PORT where program is runninng.

let client = supertest.agent("http://localhost:3000");

// UNIT test begin
describe("Check client/server connection",function(){

    // #1 should return home page
    it("should return home page",function(done){

        // calling home page api
        client
            .get("/")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                should.not.exist(res.body.error);
                done();
            });
    });

});