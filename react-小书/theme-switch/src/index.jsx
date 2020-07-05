import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import Post from './App';
import * as serviceWorker from './serviceWorker';
import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';

function createStore (reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
      state = reducer(state, action)
      listeners.forEach((listener) => listener())
    }
    dispatch({}) // 初始化 state
    return { getState, dispatch, subscribe }
  }
  
  const themeReducer = (state, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
        return { ...state, themeColor: action.themeColor }
      default:
        return state
    }
  }
  
  const store = createStore(themeReducer)

class Index extends Component { 
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext () {
        return { store };
    }
    render() { 
        return ( 
        <div>
            <Header />
            <Content /> 
        </div>
        );
    }
} 

ReactDOM.render(
  <Index />, 
//   <Post />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
