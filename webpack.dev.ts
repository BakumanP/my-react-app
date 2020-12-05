import os from 'os';
import merge from 'webpack-merge';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import common, { BUILD_RESOURCE_NAME, isWindows, PUBLIC_PATH } from './webpack.common';
// import mockServer from './mockServer/index';

const args = require('minimist')(process.argv);

// Configs
const ENABLE_MOCK_SERVER: boolean = args['mock'];

// Network
const exportPort = Number(process.env.PORT) || 8686;
const ips = os.networkInterfaces();
const availableIpv4 = Object.values(ips)
  .map(item => item!.filter(addr => addr.family === 'IPv4' && !addr.internal)) // 只输出外网地址
  .reduce((acc, item) => acc.concat(item), [])
  .map(item => item.address);

const devServer = {
  disableHostCheck: true,
  historyApiFallback: {
    rewrites: [{ from: new RegExp(`^${PUBLIC_PATH}(?!${BUILD_RESOURCE_NAME})`), to: PUBLIC_PATH }],
  },
  hot: true,
  compress: true,
  quiet: true,
  overlay: true,
  host: availableIpv4[0] || (isWindows ? '127.0.0.1' : '0.0.0.0'),
  port: exportPort,
  // before: ENABLE_MOCK_SERVER ? mockServer : undefined,
  // proxy: {
  //   [`${PUBLIC_PATH}api`]: {
  //     target: 'http://dev-vivo-db.cr-nielsen.com/', // dev
  //     // target: 'http://180.169.94.52:8086',
  //     // target: 'http://vivo-db.cr-nielsen.com/', // prod, 临时连接做测试, 后期需要改回dev.
  //     // target: 'http://10.227.48.98:8080/', // jinku的本机
  //     // target: 'http://10.227.97.83:8080/', // 后端开发
  //     secure: false,
  //     changeOrigin: true,
  //   },
  // },
};

export default merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer,
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Server is running: http://${devServer.host}:${devServer.port}${PUBLIC_PATH}`],
      },
      clearConsole: true,
    }),
  ],
});
