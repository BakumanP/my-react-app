const envConfig = {
  modules: isTest && 'auto',
};
module.exports = {
	presets: [['@babel/preset-env', envConfig], '@babel/preset-typescript', '@babel/preset-react'],
	plugins: []
}