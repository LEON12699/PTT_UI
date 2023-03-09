// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  resetPasswordVerify: path(ROOTS_AUTH, '/reset-password-verify/:token')
};

export const PATH_PAGE = {
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
  },
  attraction: {
    root: path(ROOTS_DASHBOARD, '/attraction'),
    newAttraction: path(ROOTS_DASHBOARD, '/attraction/new'),
    list: path(ROOTS_DASHBOARD, '/attraction/list'),
    edit: path(ROOTS_DASHBOARD, '/attraction/:id/edit')
  }
};

