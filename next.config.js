require('dotenv').config();

module.exports = {
    async rewrites() {
      return [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap',
        },
        {
          source:'/google37f97ca63317a5b8.html',
          destination:'/api/googlehtml'
        }
      ]
    },
  }