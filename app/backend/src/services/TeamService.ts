import HttpException from '../utils/HttpExecption';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  static async getAll(): Promise<TeamModel[]> {
    const teams = await TeamModel.findAll();

    return teams;
  }

  static async getById(id: string): Promise<TeamModel | null> {
    const team = await TeamModel.findByPk(id);
    if (!team) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    return team;
  }
}

export default TeamService;
