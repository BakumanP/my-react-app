const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';
const envConfig = {
  modules: isTest && 'auto',
};
module.exports = {
  presets: [['@babel/preset-env', envConfig], '@babel/preset-typescript', '@babel/preset-react'],
  plugins: [],
};
