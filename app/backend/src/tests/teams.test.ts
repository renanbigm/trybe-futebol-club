import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import allTeams from './mocks/teamsMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests in teams route, get', () => {
  let res: Response;
  
  it('retorna um array com todos os times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(allTeams as TeamModel[]);
  
    res = await chai.request(app).get('/teams');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.eq(allTeams)
  });
  it('retorna um único time pelo Id', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(allTeams[5] as TeamModel);
  
    res = await chai.request(app).get('/teams/5');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.eq(allTeams[5])
  });
  after(()=>{
    sinon.restore();
  })
});

  describe('', () => {
    let res: Response;

    it('Se retorna erro passando um Id inválido', async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(null);
    
      res = await chai.request(app).get('/teams/88');

      expect(res).to.have.status(404);
      expect(res.body.message).to.be.eq('There is no team with such id!');
    });
});