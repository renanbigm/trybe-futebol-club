// import HttpException from '../../utils/HttpExecption';
// import TeamService from '../../services/TeamService';

// class ValidateTeams {
//   static async verifyIds(homeTeam: number, awayTeam: number) {
//     if (homeTeam === awayTeam) {
//       throw new HttpException(422, 'It is not possible to create a match with two equal teams');
//     }
//     await TeamService.getById(homeTeam);
//     await TeamService.getById(awayTeam);
//   }
// }

// export default ValidateTeams;
