module.exports = {
  siteMetadata: {
    title: `Gatsby Headless Wordpress CMS Starter`,
    description: `My template for quickly starting up a headless WP Gatsby site with posts, pages, blog index, categories and plugins ready to go.`,
    author: `@ryanbott`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-image`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // Paste in your WP URL (without http:// or https://www.)
        // ex: baseUrl: `gatsby-blog.wordpress.com`,
        baseUrl: `YOUR-BLOG.wordpress.com`,
        protocol: `https`,
        // hostingWPCOM: true if using wordpress.com, otherwise set to false
        hostingWPCOM: true,
        useACF: true,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#212121`,
        theme_color: `#212121`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`
  ],
}
