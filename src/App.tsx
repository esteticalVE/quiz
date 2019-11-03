import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";
import {state} from './types/state'

type Tprops = {
  authLogin: () => void
  isAuthenticated: boolean
}

const App: React.FC<Tprops> = (props: Tprops) => {
  useEffect(() => {
    props.authLogin()
  })
  
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" exact component={QuizList} />
      <Redirect to="/"/>
    </Switch>
  )
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/"/>
      </Switch>
    )
  }
  return (
    <Layout >
      { routes }
    </Layout>
  );
}

const mapStateToProps = (state: state) => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    authLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
