import INewMatche from '../entities/interfaces/INewMatche';
import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';

class MatcheService {
  static async getAll(): Promise<MatcheModel[]> {
    const allMatches = await MatcheModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome' },
        { model: TeamModel, as: 'teamAway' },
      ],
    });

    return allMatches;
  }

  static async getFilteredMatches(filter: boolean): Promise<MatcheModel[]> {
    const filteredMatches = await MatcheModel.findAll({
      where: { inProgress: filter },
      include: [
        { model: TeamModel, as: 'teamHome' },
        { model: TeamModel, as: 'teamAway' },
      ],
    });

    return filteredMatches;
  }

  static async saveMatche(matche: INewMatche): Promise<MatcheModel> {
    const saveMatche = await MatcheModel.create({
      homeTeam: matche.homeTeam,
      homeTeamGoals: matche.homeTeamGoals,
      awayTeam: matche.awayTeam,
      awayTeamGoals: matche.awayTeamGoals,
      inProgress: true,
    });

    return saveMatche;
  }
}

export default MatcheService;
