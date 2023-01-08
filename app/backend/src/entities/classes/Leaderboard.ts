// import TeamModel from '../../database/models/TeamModel';
import MatcheModel from '../../database/models/MatcheModel';
import MatcheService from '../../services/MatcheService';
import ILeaderBoard from '../interfaces/ILeaderboard';
import IFullMatche from '../interfaces/IFullMatche';
import IResumeMatches from '../interfaces/IResumeMatches';

class Leaderboard {
  static async getBoard() {
    const allMatches = await Leaderboard.getTeamsMatches();

    // const result = allMatches.reduce((acc, curr) => {
    //   console.log(acc);
    //   curr.map((el) => acc.push({
    //     id: el.homeTeam,
    //     name: el.teamHome.teamName,
    //     goalsFavor: el.homeTeamGoals,
    //     goalsOwn: el.awayTeamGoals,
    //   }));
    //   // console.log(curr);
    //   return acc.push(curr);
    // }, []);
    return allMatches;
  }

  static async getTeamsMatches() {
    const allMatches = await MatcheService.getFilteredMatches(false) as unknown as IFullMatche[];
    const resume = allMatches.map((el: IFullMatche) => Leaderboard.matchesResume(el));
    console.log(resume);

    const getTeamsResume = resume.map((matche) => {
      console.log(matche.homeTeamName);
      const homeTeams = Leaderboard.handleHomeTeams(matche, resume);
      return homeTeams;
    });

    const teamsResume: any = [...getTeamsResume];

    return teamsResume;
  }

  //     "matcheId": 1,
  //     "homeTeamId": 16,
  //     "homeTeamname": "São Paulo",
  //     "awayTeamId": 8,
  //     "awayTeamname": "Grêmio",
  //     "goalsFavor": 3,
  //     "goalsOwn": 1,
  //     "result": "homeWins"
  //   },

  static handleHomeTeams(matche: any, resume: any) {
    const totalMatches = resume.filter((el: any) => matche.homeTeamName === el.homeTeamName
      || matche.homeTeamName === el.awayTeamName);

    // console.log('totalTeamsMatches: ', totalMatches.length, 'resumes: ', matche.homeTeamName);
    const stats = Leaderboard.buildLeaderboard(totalMatches, matche);
    // console.log(matche.homeTeamName, stats);
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
      if (matche.homeTeamName === el.homeTeamName) {
        teamStatus.goalsFavor += el.homeTeamGoals;
        teamStatus.goalsOwn += el.awayTeamGoals;
        if (el.result === 'homeWins') teamStatus.totalWins += 1;
        else if (el.result === 'draw') teamStatus.totalDraws += 1;
        else teamStatus.totalLosses += 1;
      } else if (matche.homeTeamName === el.awayTeamName) {
        teamStatus.goalsFavor += el.awayTeamGoals;
        teamStatus.goalsOwn += el.homeTeamGoals;
        if (el.result === 'homeWins') teamStatus.totalWins += 1;
        else if (el.result === 'draw') teamStatus.totalDraws += 1;
        else teamStatus.totalLosses += 1;
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

// name, totalPoints, totalGames, totalVictories, totalDraws,
// totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency
// [
//   {
//     "id": 1,
//     "homeTeam": 16,
//     "homeTeamGoals": 3,
//     "awayTeam": 8,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "teamHome": {
//       "id": 16,
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "id": 8,
//       "teamName": "Grêmio"
//     }
//   },
// ]
// {

// // if (match.homeTeam === curr) {
//   acc.push({
//     name: match.teamHome.teamName,
//     totalPoints: 1,
//     totalGames: 1,
//     totalVictories: 1,
//     totalDraws: 1,
//     totalLosses: 1,
//     goalsFavor: 1,
//     goalsOwn: 1,
//     goalsBalance: 1,
//     efficiency: '1',
//   });
// }
