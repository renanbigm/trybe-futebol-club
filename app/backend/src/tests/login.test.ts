import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';
import { user, token } from './mocks/userMock';

import { Response } from 'superagent';
import UserService from '../services/UserService';
import Token from '../entities/classes/Token';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests in login route, get', () => {
  let res: Response;

  // it('Se retorna erro quando o token é inválido', async () => {
  //   sinon.stub(UserModel, 'findOne').resolves({ role: 'user' } as UserModel);
  //   sinon.stub(Token, 'validate').resolves('user@user.com');

  //   res = await chai.request(app)
  //     .get('/login/validate')
  //     .set('authorization', 'token')
    
  //   expect(res).to.have.status(401);

  //   (UserModel.findByPk as sinon.SinonStub).restore();
  //   (Token.validate as sinon.SinonStub).restore();
  // });
  
  it('Testa se o token é validado e retorna o perfil correspondente', async () => {
    sinon.stub(UserModel, 'findOne').resolves({ role: 'user' } as UserModel);
    sinon.stub(Token, 'validate').resolves('user@user.com');
    
    res = await chai.request(app)
      .get('/login/validate')
      .set('authorization', token)

      expect(res).to.have.status(200);
      expect(res.body.role).to.be.eq('user');
      expect(res.body).to.haveOwnProperty('role');

      (UserModel.findOne as sinon.SinonStub).restore();
      (Token.validate as sinon.SinonStub).restore();
  });
});

describe('testa rota login, post', () => {
  let res: Response;

  it('Se retorna erro 400 quando não passa o email', async () => {
    sinon.stub(UserModel, "findOne").resolves(user as UserModel);

    res = await chai.request(app)
      .post('/login')
      .send({
        password: 'secret_user'
      })

    expect(res).to.have.status(400);
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('Se retorna erro 400 quando não passa senha', async () => {
    sinon.stub(UserModel, "findOne").resolves(user as UserModel);

    res = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com'
      })

    expect(res).to.have.status(400);
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('Se retorna erro quando passa o email incorreto', async () => {
    sinon.stub(UserModel, "findOne").resolves(null);

    res = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user'
      })

    expect(res).to.have.status(401);
    expect(res.body.message).to.be.eq("Incorrect email or password");

    (UserModel.findOne as sinon.SinonStub).restore(); 
  });
  it('Se retorna erro quando passa uma senha incorreta', async () => {
    sinon.stub(UserModel, "findOne").resolves(null);

    res = await chai.request(app)
      .post('/login')
      .send({
        email: 'paulim@oloko.chains',
        password: 'secret_user'
      })

    expect(res).to.have.status(401);
    expect(res.body.message).to.be.eq("Incorrect email or password");

    (UserModel.findOne as sinon.SinonStub).restore(); 
  });
  it('Testa se passar um email e senha corretos, recebe o status 200 e um token', async () => {
    sinon.stub(UserModel, "findOne").resolves(user as UserModel);
    sinon.stub(Token, 'create').resolves(token);

    res = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user'
      })

    expect(res.status).to.equal(200);
    expect(res.body).to.haveOwnProperty('token');

    (UserModel.findOne as sinon.SinonStub).restore();
    (Token.create as sinon.SinonStub).restore();
  });
});
