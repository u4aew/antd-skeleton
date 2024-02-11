const isProduction = process.env.NODE_ENV === 'production';

const MAIN_PATH = isProduction
  ? 'https://crud.fancy-app.site/proxy'
  : 'http://localhost:3000/proxy';

const config = {
  routes: {
    user: `${MAIN_PATH}/common/user`,
    auth: `${MAIN_PATH}/auth/login`,
  },
};

export default config;
