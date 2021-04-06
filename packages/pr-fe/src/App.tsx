import React from 'react';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Posts from './pages/Posts';
import Write from './pages/Write';
import Layout from './components/Layout';
import HeaderNav from './components/HeaderNav';
import DebugObserver from './components/DebugObserver';
import AppToast from './components/AppToast';
import Post from './pages/Post';

function App() {
  return (
    <>
      <DebugObserver />
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Switch>
          <Layout>
            <AppToast />
            <Route exact path={['/', '/post/:path']}>
              <Layout.Header>
                <HeaderNav />
              </Layout.Header>
              <Layout.Main>
                <Route exact path="/">
                  <Posts />
                </Route>
                <Route exact path="/post/:path">
                  <Post />
                </Route>
              </Layout.Main>
            </Route>
            <Route path="/new-post">
              <Write />
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
