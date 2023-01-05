import TeamModel from '../database/models/TeamModel';

class TeamService {
  static async getAll(): Promise<TeamModel[]> {
    const teams = await TeamModel.findAll();

    return teams;
  }

  static async getById(id: string): Promise<TeamModel | null> {
    const team = await TeamModel.findByPk(id);

    return team;
  }
}

export default TeamService;
