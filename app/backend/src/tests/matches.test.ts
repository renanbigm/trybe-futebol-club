import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import MatcheModel from '../database/models/MatcheModel';
import matcheMocks from './mocks/matcheMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjcyODYxNzIyLCJleHAiOjE2NzM0NjY1MjJ9.rHe7PJfUvfMdI0XQtXtAddSX_12_odnLzqVgv8hvao0'


describe('Tests in Matche routes', () => {

  describe('Tests in matches route, getAll', () => {
    let res: Response;
    
    it('retorna um array com todos as partidas', async () => {
      sinon.stub(MatcheModel, 'findAll').resolves(matcheMocks.allMatches as unknown as MatcheModel[]);
    
      res = await chai.request(app).get('/matches');

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(matcheMocks.allMatches)
    });
    it('se consegue alterar a chave inProgress de uma partida com sucesso', async () => {
      sinon.stub(MatcheModel, 'update').resolves([1]);
    
      res = await chai.request(app).patch('/matches/2/finish');

      expect(res).to.have.status(200);
      expect(res.body.message).to.deep.eq('Finished')
    });
    after(()=>{
      sinon.restore();
    })
  });
  describe('Tests in matches route, getAll with filter', () => {
    let res: Response;

    it('retorna um array com todos as partidas inProgress true', async () => {
      sinon.stub(MatcheModel, 'findAll').resolves(matcheMocks.inProgressMatches as unknown as MatcheModel[]);
    
      res = await chai.request(app).get('/matches/?inProgress=true');

      expect(res).to.have.status(200);
      expect(res.body).to.deep.eq(matcheMocks.inProgressMatches)
    });
    it('retorna um objeto com a nova partida criada', async () => {
      sinon.stub(MatcheModel, 'create').resolves(matcheMocks.newMatchRes as unknown as MatcheModel);
    
      res = await chai.request(app).post('/matches')
        .set('authorization', token)
        .send(matcheMocks.newMatchReq);

      expect(res).to.have.status(201);
      expect(res.body).to.deep.eq(matcheMocks.newMatchRes)
    });
    it('se consegue alterar as informações de uma partida com sucesso', async () => {
      sinon.stub(MatcheModel, 'update').resolves([1]);
    
      res = await chai.request(app).patch('/matches/10');

      expect(res).to.have.status(200);
      expect(res.body.message).to.deep.eq('Matche update with success')
    });
    after(()=>{
      sinon.restore();
    })
  });
});