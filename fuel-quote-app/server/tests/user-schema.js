let expect = require('chai').expect
let should = require('chai').should()
let mongoose = require('mongoose');

describe('Models', function() {
    let User;

    beforeEach(function(done) {
        mongoose.connect('mongodb+srv://sdgroup23username:sdgroup23pw@cluster0.4pi4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        mongoose.connection.once('connected', () => {
            mongoose.connection.db.dropDatabase();

            require('../models/user-schema').registerModels();
            // This is the right model because ^registerModels set it up for us.
            User = mongoose.model('user');
            done();
        });
    });

    afterEach(function(done) {
        mongoose.disconnect();
        done();
    });

    describe('Lifecycle', function() {

        it('should be able to retrieve by id from database', function(done) {
            let userid = '60552acdf6cd8196c6ad0269'
            User.find({_id: userid}, (err, userid) => {
                should.not.exist(err);
                should.exist(userid);
                done();
            })
        });

        it('should have a username and password', function(done) {
            let user = new User({
                username: "unitTestUser",
                password: "unitTestPassword"
            });
            user.save(done);
         });

         it('should have a username with length greater than 5 and less than 31', function(done) {
            let user = new User({
                username: "unitTestUser"
            });
            user.save(function(err) {
                expect(user.username).to.have.lengthOf.above(5).and.lengthOf.below(31);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });

         it('should not save without password', function(done) {
            let user = new User({
                username: "unitTestUser"
            });
            user.save(function(err) {
                expect(err).to.exist
                  .and.be.instanceof(Error);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });

         it('should have a password with length greater than 5 and less than 31', function(done) {
            let user = new User({
                username: "unitTestUser",
                password: "hellogreaterthan5andlessthan31"
            });
            user.save(function(err) {
                expect(user.password).to.have.lengthOf.above(5).and.lengthOf.below(31);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });

         it('should have a fullname with length greater than 1 and less than 101', function(done) {
            let user = new User({
                username: "unitTestUser",
                password: "hellogreaterthan5andlessthan31",
                //fullname: "V"
                fullname: "John Doe"
            });
            user.save(function(err) {
                expect(user.fullname).to.have.lengthOf.above(1).and.lengthOf.below(101);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });

         it('should have city of length greater than 1 and less than 101', function(done) {
            let user = new User({
                city: "Houston"
            });
            user.save(function(err) {
                expect(user.city).to.have.lengthOf.above(1).and.lengthOf.below(101);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });

         it('should have state initials of length 2', function(done) {
            let user = new User({
                state: "TX"
            });
            user.save(function(err) {
                expect(user.state).to.have.lengthOf(2);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });

         it('should have address1 with length greater than 1 and less than 201', function(done) {
            let user = new User({
                address1: "123 street"
            });
            user.save(function(err) {
                expect(user.address1).to.have.lengthOf.above(1).and.lengthOf.below(201);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });
         
         it('should have zipcode of length 5 to 7', function(done) {
            let user = new User({
                zipcode: "1234567"
            });
            user.save(function(err) {
                expect(user.zipcode).to.have.lengthOf.above(4).and.lengthOf.below(8);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });

         it('should have username, password, full_name, address1, city, state, and zip', function(done) {
            let user = new User({
                username: "unitTestUser",
                password: "thisisapassword",
                fullname: "John Doe",
                address1: "123 Street",
                city: "Houston",
                state: "TX",
                zipcode: "1234567"
            });
            user.save(function(err) {
                expect(user.username).to.have.lengthOf.above(5).and.lengthOf.below(31);
                expect(user.password).to.have.lengthOf.above(5).and.lengthOf.below(31);
                expect(user.fullname).to.have.lengthOf.above(1).and.lengthOf.below(101);
                expect(user.address1).to.have.lengthOf.above(1).and.lengthOf.below(201);
                expect(user.city).to.have.lengthOf.above(1).and.lengthOf.below(101);
                expect(user.state).to.have.lengthOf(2);
                expect(user.zipcode).to.have.lengthOf.above(4).and.lengthOf.below(8);
                  //.and.have.property('message', 'user validation failed');
                done();
              });
         });

        it('should not save invalid address', function(done) {
            let userid = '60552acdf6cd8196c6ad0269'
            User.find({_id: userid}, (err, user) => {
                should.not.exist(err);
                user.address1 = '??%'
                done();
            }
        )


    });

});

});
