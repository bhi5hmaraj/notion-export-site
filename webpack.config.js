const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (path.extname(file) === '.html') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = getHtmlFiles(path.resolve(__dirname, 'src'));

module.exports = {
  entry: {
    auth: './src/auth-check.js',
    login: './src/login.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      }, 
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
  },
  plugins: [
    ...htmlFiles.map(htmlFile => {
      const filename = path.relative(path.join(__dirname, 'src'), htmlFile);
      const chunks = filename === 'index.html' ? ['login', 'common'] : ['auth', 'common'];
      return new HtmlWebpackPlugin({
        template: htmlFile,
        filename: filename,
        chunks: chunks,
        inject: 'body',
        minify: false
      });
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'src',
          to: 'dist',
          globOptions: {
            ignore: ['**/*.js', '**/*.html'],
          },
        },
      ],
    }),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  }
};