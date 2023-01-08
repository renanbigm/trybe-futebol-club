import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import leaderboardMocks from './mocks/leaderboardMocks';

import { Response } from 'superagent';
import MatcheModel from '../database/models/MatcheModel';
import matcheMocks from './mocks/matcheMocks';
import teamsMock from './mocks/teamsMock';
import IFullMatche from '../entities/interfaces/IFullMatche';
import { Model } from 'sequelize';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests in leaderboard route, get', () => {
  let res: Response;

  beforeEach(() => {
    sinon.stub(MatcheModel, 'findAll').resolves(matcheMocks.matcheLeaderbord as IFullMatche[]);

  });
  
  afterEach(() => {
    (MatcheModel.findAll as sinon.SinonStub).restore();
  });
  it ('se a rota leaderboard retorna todas as partidas', async () => {
    
    res = await chai.request(app).get('/leaderboard/');

    expect(res).to.have.status(200);
  });
  it ('se a rota leaderboard retorna todas as partidas de times home', async () => {
    
    res = await chai.request(app).get('/leaderboard/home');

    expect(res).to.have.status(200);
  });
  it ('se a rota leaderboard retorna todas as partidas de times away', async () => {
    
    res = await chai.request(app).get('/leaderboard/away');

    expect(res).to.have.status(200);
  });
});