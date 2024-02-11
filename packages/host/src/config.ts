const MAIN_PATH = 'http://localhost:3000/proxy';

const config = {
  routes: {
    user: `${MAIN_PATH}/common/user`,
    auth: `${MAIN_PATH}/auth/login`,
  },
};

export default config;
