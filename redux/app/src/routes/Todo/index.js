import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'todo',
  label: 'TodoList',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const todo = require('./components/TodoApp').default;
      //const todoReducer = require('./reducers').default;

      /*  Add the reducer to the store on key 'counter'  */
      //injectReducer(store, { key: 'todo', todoReducer })

      /*  Return getComponent   */
      cb(null, todo)

    /* Webpack named bundle   */
    }, 'todo')
  }
})
