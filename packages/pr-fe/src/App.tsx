import React from 'react';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Posts from './pages/Posts';
import PostWrite from './pages/PostWrite';
import Layout from './components/Layout';
import HeaderNav from './components/HeaderNav';
import NewPostHeader from './components/WritePostHeader';
import DebugObserver from './components/DebugObserver';
import AppToast from './components/AppToast';

function App() {
  return (
    <>
      <DebugObserver />
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Switch>
          <Layout>
            <AppToast />
            <Route exact path="/">
              <Layout.Header>
                <HeaderNav />
              </Layout.Header>
              <Layout.Main>
                <Posts />
              </Layout.Main>
            </Route>
            <Route path="/new-post">
              <Layout.Header>
                <NewPostHeader />
              </Layout.Header>
              <Layout.Main>
                <PostWrite />
              </Layout.Main>
            </Route>
          </Layout>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

const globalStyle = css`
  html {
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }

  html,
  body,
  #root {
    height: 100%;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: 'Ubuntu', Ubuntu, Roboto, 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default App;
