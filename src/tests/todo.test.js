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

const { User, Todo } = models;
const signupUrl = '/api/v1/users/signup';
const loginUrl = '/api/v1/users/login';
const verifyEmailUrl = '/api/v1/users/verifyEmail';
const todoUrl = '/api/v1/todos';
const exportUrl = '/api/v1/todos/export';

describe(' Todo related tests:', () => {
  beforeEach(async () => {
    await User.destroy({
      where: {},
      truncate: true
    });
    await Todo.destroy({
      where: {},
      truncate: true
    });
  });

  it('should Create a todo', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    const res = await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });

  it('should not Create an already existing todo', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    const res = await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    expect(res.status).to.be.equal(409);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });

  it('should not Create an invalid todo request', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    const res = await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.invalidTodo);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });

  it('should not Create a todo with invalid token', async () => {
    const res = await chai.request(app).post(todoUrl).set('Authorization', 'james').send(mockdata.createTodo);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });

  it('should not Create a todo with no token', async () => {
    const res = await chai.request(app).post(todoUrl).send(mockdata.createTodo);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });

  it('should retrieve all todos', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.anotherTodo);
    const res = await chai.request(app).get(todoUrl).set('Authorization', `Bearer ${token}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });

  it('should retrive a single todo', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    const todo = await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    const { id } = todo.body.data;
    const res = await chai.request(app).get(`${todoUrl}/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });

  it('should update a todo', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    const todo = await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    const { id } = todo.body.data;
    const res = await chai.request(app).patch(`${todoUrl}/${id}`).set('Authorization', `Bearer ${token}`).send(mockdata.updatedTodo);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });

  it('should update todos status', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    const res = await chai.request(app).patch(`${todoUrl}/status`).set('Authorization', `Bearer ${token}`).send(mockdata.changeStatus);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });

  it('should delete a todo', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    const todo = await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    const { id } = todo.body.data;
    const res = await chai.request(app).delete(`${todoUrl}/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).to.be.equal(204);
  });

  it('should delete all todos', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    const res = await chai.request(app).delete(`${todoUrl}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).to.be.equal(204);
  });

  it('should export the searched data to csv', async () => {
    await chai.request(app).post(signupUrl).send(mockdata.signupUser);
    await chai.request(app).get(`${verifyEmailUrl}/${mockdata.verifyEmailToken}`);
    const login = await chai.request(app).post(loginUrl).send(mockdata.loginUser);
    const { token } = login.body.data;
    await chai.request(app).post(todoUrl).set('Authorization', `Bearer ${token}`).send(mockdata.createTodo);
    await chai.request(app).get(exportUrl).set('Authorization', `Bearer ${token}`);
  });
});
