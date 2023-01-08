// import TeamModel from '../../database/models/TeamModel';
import MatcheModel from '../../database/models/MatcheModel';
import MatcheService from '../../services/MatcheService';
import ILeaderBoard from '../interfaces/ILeaderboard';
import IFullMatche from '../interfaces/IFullMatche';
import IResumeMatches from '../interfaces/IResumeMatches';
import TeamService from '../../services/TeamService';

class Leaderboard {
  static async getBoard() {
    const allMatches = await Leaderboard.getTeamsMatches();

    const sortLeaderboard = allMatches.sort((a: any, b: any) =>
      (
        b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
      ));

    return sortLeaderboard;
  }

  static async getTeamsMatches() {
    const allMatches = await MatcheService.getFilteredMatches(false) as unknown as IFullMatche[];
    const allTeams = await TeamService.getAll();
    const resume = allMatches.map((el: IFullMatche) => Leaderboard.matchesResume(el));

    const getTeamsResume = resume.map((matche) => Leaderboard.handleHomeTeams(matche, resume));

    const result = allTeams.map((el: any) =>
      getTeamsResume.find((target) => target.name === el.teamName));

    return result;
  }

  static handleHomeTeams(matche: any, resume: any) {
    const totalMatches = resume.filter((el: any) => matche.homeTeamName === el.homeTeamName);
    // || matche.homeTeamName === el.awayTeamName

    const stats = Leaderboard.buildLeaderboard(totalMatches, matche);

    const totalPoints = (stats.totalWins * 3) + stats.totalDraws;
    const teamData = {
      name: matche.homeTeamName,
      totalPoints,
      totalGames: totalMatches.length,
      totalVictories: stats.totalWins,
      totalDraws: stats.totalDraws,
      totalLosses: stats.totalLosses,
      goalsFavor: stats.goalsFavor,
      goalsOwn: stats.goalsOwn,
      goalsBalance: stats.goalsFavor - stats.goalsOwn,
      efficiency: ((totalPoints / (totalMatches.length * 3)) * 100).toFixed(2),
    };
    return teamData;
  }

  static buildLeaderboard(totalMatches: any, matche: any) {
    const teamStatus = { totalWins: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0, totalDraws: 0 };
    totalMatches.forEach((el: any) => {
      if (param === home) {
        if (matche.homeTeamName === el.homeTeamName) {
          teamStatus.goalsFavor += el.homeTeamGoals;
          teamStatus.goalsOwn += el.awayTeamGoals;
          if (el.result === 'homeWins') teamStatus.totalWins += 1;
          else if (el.result === 'awayWins') teamStatus.totalLosses += 1;
          else teamStatus.totalDraws += 1;
        } else if (matche.homeTeamName === el.awayTeamName) {
          teamStatus.goalsFavor += el.awayTeamGoals;
          teamStatus.goalsOwn += el.homeTeamGoals;
          if (el.result === 'awayWins') teamStatus.totalWins += 1;
          else if (el.result === 'homeWins') teamStatus.totalLosses += 1;
          else teamStatus.totalDraws += 1;
        }
      }
    });
    return teamStatus;
  }

  static matchesResume(el: IFullMatche): IResumeMatches {
    const resume = {
      matcheId: el.id,
      homeTeamId: el.homeTeam,
      homeTeamName: el.teamHome.teamName,
      awayTeamId: el.awayTeam,
      awayTeamName: el.teamAway.teamName,
      homeTeamGoals: el.homeTeamGoals,
      awayTeamGoals: el.awayTeamGoals,
      result: '',
    };
    if (el.homeTeamGoals > el.awayTeamGoals) {
      resume.result = 'homeWins';
    } else if (el.homeTeamGoals < el.awayTeamGoals) {
      resume.result = 'awayWins';
    } else {
      resume.result = 'draw';
    }
    return resume;
  }
}

export default Leaderboard;
