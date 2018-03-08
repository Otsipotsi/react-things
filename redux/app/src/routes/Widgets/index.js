import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'widgets',
  label: 'Widgets',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const JsonFetch = require('./containers/WidgetsContainer').default;
      const reducer = require('./reducers').default;

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'weatherapi', reducer })

      /*  Return getComponent   */
      cb(null, JsonFetch)

    /* Webpack named bundle   */
    }, 'widgetsCollection')
  }
})