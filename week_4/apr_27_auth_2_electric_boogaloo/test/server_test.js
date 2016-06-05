const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
const server = require(__dirname + '/../_server');
const Bear = require(__dirname + '/../models/bear');
const User = require(__dirname + '/../models/user');
process.env.APP_SECRET = 'testscret';

process.on('exit', () => {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase();
  }
});

describe('bear server', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/bears_app_test', done);
  });

  before((done) => {
    var user = new User({username: 'test', password: 'test'});
    user.save((err, data) => {
      if (err) throw err;
      this.user = data;
      data.generateToken((err, token) => {
        if (err) throw err;
        this.token = token;
        done();
      });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });

  it('should Build-A-Bear', (done) => {
    request('localhost:' + port)
    .post('/api/bears')
    .set('token', this.token)
    .send({name: 'Ranger Rick', variety: 'Racoon', fishPreference: 'mustache-filtered microbrews'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Ranger Rick');
      expect(res.body.variety).to.eql('Racoon');
      expect(res.body.fishPreference).to.eql('mustache-filtered microbrews');
      done();
    })
  });

  describe('routes that need a bear in the DB: ', () => {
    beforeEach((done) => {
      var newBear = new Bear({name: 'testbear', variety: 'testing', fishPreference: 'the one true cod', wranglerId: this.user._id});
      newBear.save((err, data) => {
        this.bear = data;
        done();
      });
    });

    afterEach((done) => {
      this.bear.remove((err) => {
        done();
      })
    });

    it('should change the Bear\'s identity on a PUT request', (done) => {
      request('localhost:' + port)
      .put('/api/bears/' + this.bear._id)
      .send({name: 'John Cena', variety: 'rasslin\' bear', fishPreference: 'Chilean sea bass with a side of chairs' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('wow such update');
        done();
      });
    });


    it('should turn the bear into a nice rug when Gene murders it with a DELETE request', (done) => {
      request('localhost:' + port)
      .delete('/api/bears/' + this.bear._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('ding dong the bear is dead');
        done();
      });
    });
  });

  describe('the GET method', () => {
    it('should get all the bears', (done) => {
      var token = this.token;
      request('localhost:' + port)
      .get('/api/bears')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
  });
});
