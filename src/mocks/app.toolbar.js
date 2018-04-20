export const APP_TOOLBAR = [
  {
    items: [
      {
        html: '<i class="mdi mdi-menu"></i>',
        url: '#',
        options: {'data-toggle': 'sidebar', 'data-target': '#sidebar'}
      }
    ]
  },
  {
    options: {'class': 'toolbar__group_title'},
    items: [
      {
        text: 'Welcome to Your Vue.js App'
      }
    ]
  },
  {
    items: [
      {
        html: '<i class="mdi mdi-help-circle"></i>', 'url': '#'
      }
    ]
  }
]
