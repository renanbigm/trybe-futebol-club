import MatcheService from '../../services/MatcheService';
import IFullMatche from '../interfaces/IFullMatche';
import IResumeMatches from '../interfaces/IResumeMatches';
import TeamService from '../../services/TeamService';

class Leaderboard {
  static async getBoard(path: string) {
    const allMatches = await Leaderboard.getTeamsMatches(path);

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

  static async getTeamsMatches(path: string) {
    const allMatches = await MatcheService.getFilteredMatches(false) as unknown as IFullMatche[];
    const allTeams = await TeamService.getAll();
    const resume = allMatches.map((el: IFullMatche) => Leaderboard.matchesResume(el));

    const getTeamsResume = resume.map((matche) =>
      Leaderboard.buildLeaderboard(matche, resume, path));

    const result = allTeams.map((el: any) =>
      getTeamsResume.find((target) => target.name === el.teamName));

    return result;
  }

  static pathHandler(matche: any, resume: any, path: string) {
    if (path) {
      return Leaderboard.getTeamsInfo(resume, matche, path);
    }
    const teamMatches = resume.filter((el: any) => matche.homeTeamName === el.homeTeamName
      || matche.homeTeamName === el.awayTeamName);

    return Leaderboard.buildAll(matche, teamMatches);
  }

  static buildLeaderboard(matche: any, resume: any, path: string) {
    const stats = Leaderboard.pathHandler(matche, resume, path);

    const totalPoints = (stats.totalWins * 3) + stats.totalDraws;
    const teamData = {
      name: stats.name,
      totalPoints,
      totalGames: stats.totalGames,
      totalVictories: stats.totalWins,
      totalDraws: stats.totalDraws,
      totalLosses: stats.totalLosses,
      goalsFavor: stats.goalsFavor,
      goalsOwn: stats.goalsOwn,
      goalsBalance: stats.goalsFavor - stats.goalsOwn,
      efficiency: ((totalPoints / (stats.totalGames * 3)) * 100).toFixed(2),
    };
    return teamData;
  }

  static getTeamsInfo(resume: any, matche: any, path: any) {
    const pathe = path.slice(1);
    const enemy = pathe === 'home' ? 'away' : 'home';

    const teamMatches = resume.filter((el: any) =>
      matche[`${pathe}TeamName`] === el[`${pathe}TeamName`]);

    const teamStatus = Leaderboard.handleStatus(teamMatches.length);
    teamMatches.forEach((el: any) => {
      teamStatus.name = matche[`${pathe}TeamName`];

      if (matche[`${pathe}TeamName`] === el[`${pathe}TeamName`]) {
        teamStatus.goalsFavor += el[`${pathe}TeamGoals`];
        teamStatus.goalsOwn += el[`${enemy}TeamGoals`];

        if (el.result === `${pathe}Wins`) teamStatus.totalWins += 1;
        else if (el.result === `${enemy}Wins`) teamStatus.totalLosses += 1;
        else teamStatus.totalDraws += 1;
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

  // static buildAway(resume: any, matche: any) {
  //   const teamMatches = resume.filter((el: any) => matche.awayTeamName === el.awayTeamName);
  //   const teamStatus = Leaderboard.handleStatus(teamMatches.length);

  //   teamMatches.forEach((el: any) => {
  //     teamStatus.name = matche.awayTeamName;

  //     if (matche.awayTeamName === el.awayTeamName) {
  //       teamStatus.goalsFavor += el.awayTeamGoals;
  //       teamStatus.goalsOwn += el.homeTeamGoals;
  //       if (el.result === 'awayWins') teamStatus.totalWins += 1;
  //       else if (el.result === 'homeWins') teamStatus.totalLosses += 1;
  //       else teamStatus.totalDraws += 1;
  //     }
  //   });
  //   return teamStatus;
  // }

  static buildAll(matche: any, teamMatche: any) {
    const teamStatus = Leaderboard.handleStatus(teamMatche.length);
    teamMatche.forEach((el: any) => {
      teamStatus.name = matche.homeTeamName;
      if (matche.homeTeamName === el.homeTeamName) {
        teamStatus.goalsFavor += el.homeTeamGoals;
        teamStatus.goalsOwn += el.awayTeamGoals;
        if (el.result === 'homeWins') teamStatus.totalWins += 1;
        else if (el.result === 'draw') teamStatus.totalDraws += 1;
        else teamStatus.totalLosses += 1;
      } else if (matche.homeTeamName === el.awayTeamName) {
        teamStatus.goalsFavor += el.awayTeamGoals;
        teamStatus.goalsOwn += el.homeTeamGoals;
        if (el.result === 'awayWins') teamStatus.totalWins += 1;
        else if (el.result === 'draw') teamStatus.totalDraws += 1;
        else teamStatus.totalLosses += 1;
      }
    });
    return teamStatus;
  }

  static handleStatus(totalGames: number) {
    const teamStatus = {
      name: '',
      totalWins: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      totalDraws: 0,
      totalGames,
    };

    return teamStatus;
  }
}

export default Leaderboard;

// fazer um reduce do array de todos os times e um filter em um array de todas as partidas,
// juntando no filter todas as partidas q tem o nome do time no Curr e salvando no acc.
// vai gerar um [][]. Depois fazer um map onde cada elemento é um array de todas as partidas do time
