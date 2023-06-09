import INewMatche from '../entities/interfaces/INewMatche';
import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';
import HttpException from '../utils/HttpExecption';
import IFullMatche from '../entities/interfaces/IFullMatche';

type Goals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
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

  static async getFilteredMatches(filter: boolean): Promise<MatcheModel[] | IFullMatche[]> {
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
    if (matche.homeTeam === matche.awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }

    const teamHome = await TeamModel.findByPk(matche.homeTeam);
    const awayTeam = await TeamModel.findByPk(matche.awayTeam);
    if (!teamHome || !awayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    const saveMatche = await MatcheModel.create({
      homeTeam: matche.homeTeam,
      homeTeamGoals: matche.homeTeamGoals,
      awayTeam: matche.awayTeam,
      awayTeamGoals: matche.awayTeamGoals,
      inProgress: true,
    });

    return saveMatche;
  }

  static async finishMatche(id: string) {
    const matche = await MatcheModel.findOne({ where: { id } });
    if (!matche) {
      throw new HttpException(404, 'There is no matche with such id!');
    }

    await MatcheModel.update(
      { inProgress: false },
      { where: { id } },
    );

    return { status: 200, message: 'Finished' };
  }

  static async updateMatche(id: string, body: Goals) {
    await MatcheModel.update(
      { homeTeamGoals: body.homeTeamGoals,
        awayTeamGoals: body.awayTeamGoals,
      },
      { where: { id } },
    );
  }
}

export default MatcheService;
