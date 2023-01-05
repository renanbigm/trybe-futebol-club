import MatcheModel from '../database/models/MatcheModel';

class MatcheService {
  static async getAll(): Promise<MatcheModel[]> {
    const allMatches = await MatcheModel.findAll();

    return allMatches;
  }

  static async getFilteredMatches(filter: boolean): Promise<MatcheModel[]> {
    const filteredMatches = await MatcheModel.findAll({ where: { inProgress: filter } });

    return filteredMatches;
  }
}

export default MatcheService;
