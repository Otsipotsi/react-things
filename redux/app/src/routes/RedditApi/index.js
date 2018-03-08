import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'redditapi',
  label: 'Reddit API',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Reddit = require('./containers/RedditContainer').default

      /*  Add the reducer to the store on key 'counter'  */
      //injectReducer(store, { key: 'redditapi', reducer })

      /*  Return getComponent   */
      cb(null, Reddit)

    /* Webpack named bundle   */
    }, 'redditapi')
  }
})
