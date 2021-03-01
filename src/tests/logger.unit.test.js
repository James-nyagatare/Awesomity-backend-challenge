import { expect } from 'chai';
import sinon from 'sinon';
import TodoController from '../controllers/todoController';
import UserController from '../controllers/userController';
import Response from '../helpers/sendResponse';
import Checks from '../middlewares/checks';

const sandbox = sinon.createSandbox();
describe('unit tests', () => {
  before(() => {
    sandbox.stub(Response, 'error').resolves('error');
  });

  after(() => {
    sandbox.restore();
  });
  it('should log an error on findOne method', async () => {
    const res = await TodoController.getOne({ params: { id: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on findall method', async () => {
    const res = await TodoController.getAll({ params: { id: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on update method', async () => {
    const res = await TodoController.update({ params: { id: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on delete method', async () => {
    const res = await TodoController.deleteTodo({ params: { id: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on create method', async () => {
    const res = await TodoController.create({ body: { title: 'u' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on export method', async () => {
    const res = await TodoController.exportTodos({ req: { user: { id: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on signup method', async () => {
    const res = await UserController.signup({ body: { email: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on signin method', async () => {
    const res = await UserController.signin({ body: { email: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on verify method', async () => {
    const res = await UserController.verifyEmail({ body: { email: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on forgotPassword method', async () => {
    const res = await UserController.forgotPassword({ body: { email: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on resetPassword method', async () => {
    const res = await UserController.resetPassword({ body: { password: 'uiy' } }, {});
    expect(res).to.be.equal('error');
  });
  it('should log an error on emailChecks method', async () => {
    const res = await Checks.emailChecks({ body: { email: 'uiyitttifeukfhyeefefwe859456457otef34t45t45ty84g545g458go45ghry' } }, {}, {});
    expect(res).to.be.equal('error');
  });
});
