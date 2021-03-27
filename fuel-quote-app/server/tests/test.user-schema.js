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

/*
        it('should not save invalid address', function(done) {
            let userid = '60552acdf6cd8196c6ad0269'
            User.find({_id: userid}, (err, user) => {
                should.not.exist(err);
                user.address1 = '??%'
            }
        )


    });*/

});

});
