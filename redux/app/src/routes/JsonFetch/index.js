import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'jsonfetch',
  label: 'JSON Fetch',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const JsonFetch = require('./containers/JsonFetchContainer').default;
      const reducer = require('./reducers').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'jsonfetch', reducer })

      /*  Return getComponent   */
      cb(null, JsonFetch)

    /* Webpack named bundle   */
    }, 'jsonfetch')
  }
})
