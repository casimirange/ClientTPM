const url = 'https://acon-stats-server.herokuapp.com';
export const environment = {
  production: true,
  api_url: 'https://acon-stats-server.herokuapp.com',
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
