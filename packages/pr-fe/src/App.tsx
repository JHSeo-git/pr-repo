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
import ScrollToTop from './components/Layout/ScrollToTop';
import AppInfo from './components/AppInfo';
import { fontFamily } from './lib/styles/typography';

function App() {
  return (
    <>
      <DebugObserver />
      <Global styles={globalStyle} />
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Layout>
            <AppToast />
            <Route exact path={['/', '/post/:path']}>
              <Layout.Header>
                <HeaderNav />
              </Layout.Header>
              <Layout.Main>
                <Switch>
                  <Route exact path="/">
                    <Posts />
                  </Route>
                  <Route path="/post/:path">
                    <Post />
                  </Route>
                </Switch>
              </Layout.Main>
              <Layout.Footer>
                <AppInfo />
              </Layout.Footer>
            </Route>
            <Route path="/write/:pathslug?">
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
    ${fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default App;
