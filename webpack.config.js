const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = function () {
  if (process.env.BUILD_TARGET === 'package') {
    return {};
  }
  return {
    entry: {
      'site-mobile': ['./docs/site/mobile'],
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      disableHostCheck: true,
      overlay: {
        warnings: false,
        errors: true
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/rpcgateway': {
          target: 'http://127.0.0.1:8900',
          changeOrigin: true
        }
      }
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      }
    }
  };
};
