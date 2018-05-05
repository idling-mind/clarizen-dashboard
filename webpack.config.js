module: {
  rules: [
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]   //  <=  Order is very important
    }
  ]
}