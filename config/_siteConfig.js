/**
 * CMS Configuration
 * Alter 'netlify' in the import statment below to one of the following:
 * netlify
 */
import theCMS from '../cms/netlify/cms'

/**
 * General Site configurations
 */
export default {
  siteName: 'Cloud 4 Free',
  tagline: 'Aprenda o que pode ser feito com os recursos Free Tier/Always Free de diversos provedores de serviço em nuvem.',
  featureImage: '/uploads/home-hero.jpg',
  logo: '/faoncloudlogo.jpg', // 'logo-component', // or '/logo.svg' for regular image
  googleAnalytics: {
    on: true,
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  mainMenu: [
    {
      name: 'Sobre',
      link: '/about'
    },
    {
      name: 'Autores',
      link: '/authors'
    },
    {
      name: 'Categorias',
      link: '/categories'
    },
    {
      name: 'Github Repo',
      link: 'https://github.com/faonbr/faoncloud',
      target: '_blank'
    },
    {
      name: 'Versão Ingles',
      link: 'https://faoncloud.netlify.com/',
    }
  ],
  hero: {
    theme: 'light' // options: mist, light, dark
  },

  // Main Layout/Style
  layout: {
    width: 'contained', // Options: contained, full
    theme: 'one-column' // Options: one-column, sidebar-right, sidebar-left
  },

  // Card Layout
  cards: {
    imageDimensions: '2x1', // Options: 1x1, 5x4, 4x3, 3x2, 5x3, 16x9, 2x1, 3x1, 4x5, 3x4, 2x3, 3x5, 9x16
    theme: 'boxes' // Options: boxes, grid, image-grid
  },

  // Disqus
  disqus: {
    on: true,
    loadingStrategy: 'button', // Options: onload, lazy, button
    siteShortName: 'faon-cloud' // 'blog-danielkelly-io'
  },

  // Newsletter Subscribe
  newsletter: {
    on: false,
    heading: 'Subscribe to Our Newsletter',
    btnText: 'Subscribe',
    // Can be the form action on a mail chimp form, a hubspot form,
    // or any other url you want to post the form data to
    mailchimp: {
      on: true,
      formAction:
        'https://danielkelly.us3.list-manage.com/subscribe/post?u=d3c2e762b66a2353d0bc29bf3&amp;id=2abeaa06e0'
    },
    custom: {
      on: false,
      formAction: ''
    }
  },

  // Categories
  categories: {
    on: true,
    perPage: 8,
    imageDimensions: null, // See card.imageDimensions (can be unique for categories if set here)
    theme: null // See card.theme (can be unique for categories if set here)
  },

  // Posts
  posts: {
    on: true,
    theme: null, // See card.theme (can be unique for posts if set here)
    imageDimensions: null, // See card.imageDimensions (can be unique for posts if set here)
    displayAuthor: true,
    date: {
      display: true
    },
    perRow: 2,
    perPage: 5
  }
}

export const CMS = theCMS
