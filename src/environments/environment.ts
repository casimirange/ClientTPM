// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const url = 'http://localhost:8080';
const urls = 'https://acon-stats-server.herokuapp.com';
const url2 = 'https://server-bi.herokuapp.com/';
export const environment = {

  production: true,
  api_url: 'https://acon-stats-server.herokuapp.com/',
  DEPARTEMENT_URL: url + '/api/departements',
  LIGNE_URL: url + '/api/lignes',
  TECHNICIEN_URL: url + '/api/techniciens',
  OPERATEUR_URL: url + '/api/operateurs',
  MACHINE_URL: url + '/api/machines',
  PANNES_URL: url + '/api/pannes',
  ARRETS_URL: url + '/api/arrets',
  DASHBOARD_URL: url + '/api/dashboard',
  HEURES_URL: url + '/api/heures',

  USER_ROLE_URL: url + '/api/user',
  USERS_URL: url + '/crud_user',


  ROLES_URL: url + '/admin/role',
  ALPICAM_URL: url + '/admin/alpicam',
  RAPPORT_URL: url + '/admin/rapport',

  LOGIN_URL: url + '/api/auth/signin',
  SIGNUP_URL: url + '/api/auth/signup',
  URERS: url + '/api/auth',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
