let supertest = require("supertest");
//let expect = require('chai').expect
let should = require('chai').should()

// UNIT test begin
describe("server/client connections",function(){
    let server;
    beforeEach(function (done) {
        server = require('../server.js');
        setTimeout(done,1000)
    });
    afterEach(function (done) {
        server.close(setTimeout(done,1000));
    });

    // #1 should show established connection
    it('responds to /', function(done) {
        supertest(server)
            .get('/')
            .expect(200, done);
    })

    // #2 should connect to user collection
    it('responds to /users', function(done) {
        supertest(server)
            .get('/users')
            .expect(200, done);
    })

    // #3 should connect to history collection
    it('responds to /history', function(done) {
        supertest(server)
            .get('/history')
            .expect(200, done);
    })

    // #4 should show error if route does not exist
    it('responds 404 to anything else', function(done) {
        supertest(server)
            .get('/foo/bar')
            .expect(404, done);
    })

    // #5 should return home page
    it("should return client home page",function(done){
        // This agent refers to PORT where client program is runninng.
        let client = supertest.agent("http://localhost:3000");
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