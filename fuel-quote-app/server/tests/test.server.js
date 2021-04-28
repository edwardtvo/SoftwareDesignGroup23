let supertest = require("supertest");
//let expect = require('chai').expect
let should = require('chai').should()


// UNIT test begin
describe("server/client connections",function(){

    let server;
    beforeEach(function (done) {
        server = require('../server.js');
        setTimeout(done,1700)
    });
    afterEach(function (done) {
        server.close(setTimeout(done,1700));
    });

    // #1 should connect to user collection
    it('responds to /users/', function(done) {
        supertest(server)
            .get('/users')
            .expect(200, done);
    })

    // #2 should connect to history collection
    it('responds to /users/history', function(done) {
        supertest(server)
            .get('/users/history')
            .expect(200, done);
    })

    // #3 should show error if route does not exist
    it('responds 404 to anything else', function(done) {
        supertest(server)
            .get('/foo/bar')
            .expect(404, done);
    })

    // #4 should return home page
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

    // #5 should create a new user
    it("creates a new user", function(done){
        const new_user = {
            username: "UnitTestUser",
            password: "un1tT3ST"
        }
        supertest(server)
            .post('/users/create')
            .send(new_user)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
            return done();
        });
    });

    // #6 should give error if user exists
    it("should not create user if username is taken", function(done){
        const existing_user = {
            username: "UnitTestUser",
            password: "un1tT3ST"
        }
        supertest(server)
            .post('/users/create')
            .send(existing_user)
            .expect(500, done);
    });

    // #7 should authenticate user if user exists
    it("authenticates user if user exists", function(done){
        const auth_user = {
            username: "UnitTestUser",
            password: "un1tT3ST"
        }
        supertest(server)
            .post('/users/authenticate')
            .send(auth_user)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });

    // #8 should fail authentication if username does not exist
    it("fails authentication if username does not exist", function(done){
        const auth_user = {
            username: "MadeUpUser",
            password: "un1tT3ST"
        }
        supertest(server)
            .post('/users/authenticate')
            .send(auth_user)
            .expect(601, done);
    });

    // #9 should fail authentication if password incorrect
    it("fails authentication if password incorrect", function(done){
        const auth_user = {
            username: "UnitTestUser",
            password: "wr0ngPWD"
        }
        supertest(server)
            .post('/users/authenticate')
            .send(auth_user)
            .expect(401, done);
    });

    // #10 should find user if username exists
    it("finds user if username exists", function(done){
        const curr_user = {
            username: "UnitTestUser"
        }
        supertest(server)
            .post('/users/current_user')
            .send(curr_user)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });

    // #11 should not find user if username does not exist
    it("does not find user if username does not exist", function(done){
        const curr_user = {
            username: "MadeUpUser"
        }
        supertest(server)
            .post('/users/current_user')
            .send(curr_user)
            .expect(600, done);
    });

    // #12 should not find user if no user logged in
    it("does not find user if no user logged in", function(done){
        const curr_user = {
            username: ""
        }
        supertest(server)
            .post('/users/current_user')
            .send(curr_user)
            .expect(404, done);
    });

    // #13 should update user info
    it("updates user info", function(done){
        const update_user = {
            cookie_username: "UnitTestUser",
            username: "UnitTestUser",
            fullname: "Unit Tester",
            address1: "666 Street St",
            address2: "AB",
            city: "Houston",
            state: "TX",
            zip: "77777"
        }
        supertest(server)
            .post('/users/update')
            .send(update_user)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });

    // #14 should not update user info if validation fails
    it("does not update user info if document validation fails", function(done){
        const update_user = {
            cookie_username: "UnitTestUser",
            username: "UnitTestUser",
            fullname: "U",
            address1: "6",
            address2: "AB",
            city: "Houston",
            state: "T",
            zip: "0"
        }
        supertest(server)
            .post('/users/update')
            .send(update_user)
            .expect(500, done);
    });

    // #15 should find user quote history
    it("finds user quote history", function(done){
        const curr_user = {
            username: "UnitTestUser"
        }
        supertest(server)
            .post('/users/history')
            .send(curr_user)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });

    // #16 should not find user quote history if user does not exist
    it("does not find user quote history if user does not exist", function(done){
        const curr_user = {
            username: "MadeUpUser"
        }
        supertest(server)
            .post('/users/history')
            .send(curr_user)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.data.should.equal("")
                return done();
            });
    });

    // #17 should add quote to user's quote history
    it("adds quote to users quote history", function(done){
        const user_quote = {
            username: "UnitTestUser",
            gallons_requested: 100,
            delivery_address: "666 Street St",
            delivery_date: "2021-03-30T03:43:09.750Z",
            price_per_gallon: "1.75",
            amount_due: "175.00"
        }
        supertest(server)
            .post('/users/quoteupdate')
            .send(user_quote)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });

});