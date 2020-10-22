// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const url = 'http://localhost:8080';
const urls = 'https://acon-stats-server.herokuapp.com';
export const environment = {

  production: false,
  api_url: 'https://acon-stats-server.herokuapp.com/',
  DEPARTEMENT_URL: urls + '/api/departements',
  LIGNE_URL: urls + '/api/lignes',
  TECHNICIEN_URL: urls + '/api/techniciens',
  OPERATEUR_URL: urls + '/api/operateurs',
  MACHINE_URL: urls + '/api/machines',
  PANNES_URL: urls + '/api/pannes',
  ARRETS_URL: urls + '/api/arrets',
  DASHBOARD_URL: urls + '/api/dashboard',
  HEURES_URL: urls + '/api/heures',

  USER_ROLE_URL: urls + '/api/user',
  USERS_URL: urls + '/crud_user',


  ROLES_URL: urls + '/admin/role',
  ALPICAM_URL: urls + '/admin/alpicam',
  RAPPORT_URL: urls + '/admin/rapport',

  LOGIN_URL: urls + '/api/auth/signin',
  SIGNUP_URL: urls + '/api/auth/signup',
  URERS: urls + '/api/auth',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
