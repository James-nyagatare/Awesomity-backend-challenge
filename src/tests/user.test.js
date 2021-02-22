import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockdata from './mockdata';
import models from '../database/models';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const {
  it, describe
} = mocha;
const { User } = models;

const signupUrl = '/api/v1/users/signup';
const loginUrl = '/api/v1/users/login';
const verifyEmailUrl = '/api/v1/users/verifyEmail';
const forgotPasswordUrl = '/api/v1/users/forgotPassword';
const resetPasswordURL = '/api/v1/users/resetPassword';

describe('User related tests:', () => {
  beforeEach(async () => {
    await User.destroy({
      where: {},
      truncate: true
    });
  });

  it('should signup a user', async () => {
    const res = await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });

  it('should not signup a user who already exists', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    const res = await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    expect(res.status).to.be.equal(409);
  });

  it('should not signup a user with invalid request', async () => {
    const res = await chai.request(app).post(signupUrl).send(mockdata.signupUserInvalid);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });

  it('should verify the email', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    const res = await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
  });

  it('should login a user', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const res = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });

  it('should not login a user with invalid credentials', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const res = await chai.request(app).post(loginUrl).send(mockdata.invalidLogin);
    expect(res.status).to.equal(401);
  });

  it('should  send a reset link to user email', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const res = await chai.request(app).post(forgotPasswordUrl).send(mockdata.resetEmail);
    expect(res.status).to.be.equal(200);
  });

  it('should  reset password of the user', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const res = await chai.request(app).patch(`${resetPasswordURL}/${mockdata.resetToken}`).send(mockdata.resetPassword);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
  });
});
