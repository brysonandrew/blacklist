/** General Configurations Like PORT, HOST names and etc... */

var config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  karmaPort: 9876,

  // This part goes to React-Helmet for Head of our HTML
  app: {
    head: {
      title: 'for those doing business with Suda Sampath of Indydutch Solutions',
      titleTemplate: 'Warning | %s',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        { name: 'google-site-verification', content: 'vzMpqHKPQqGZC8FZL2KRg53M_ttiAeBckqzItRQFW34' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Warning for those doing business with Suda Sampath of Indydutch Solutions' },
      ]
    }
  }
};

module.exports = config;
