import React, { useState, useReducer, createContext } from "react";
import TodoList from "./todoList";
import CreateTodo from "./CreateTodo";
import {useResource} from 'react-request-hook';
import appReducer from "./reducer";
import UserBar from "./userBar";
import StateContext from "./context";
function App() {

  const [ state, dispatch ] = useReducer(appReducer, { user: '', todos: [] });
  const [ posts, getPosts ] = useResource(() => ({url: '/todos',method: 'get'}))
    useEffect(getPosts, [])
    useEffect(() => {if (posts && posts.data) {dispatch({ type: 'FETCH_POSTS', todos: posts.data })}}, [posts])
    useEffect(() => {if (state.user) {document.title = `${state.user}’s Blog`} else {document.title = 'Blog'}}, [state.user])
  return (
    <div>
      <ThemeContext.Provider value = {{primary: 'blue'}}>
        <Header text ="Welcome to the blog"/> </ThemeContext.Provider>
      <UserBar user={state.user} dispatch={dispatch}/>
      {state.user && <CreateTodo dispatch={dispatch} />}
      {state.user && <TodoList todos={state.todos} dispatch={dispatch} />}
    </div> 
  )
}
export const ThemeContext = createContext({primary:'green'});
export default App;
