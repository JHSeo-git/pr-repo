import React from 'react';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Posts from './pages/Posts';
import PostWrite from './pages/PostWrite';
import Layout from './components/Layout';
import HeaderNav from './components/HeaderNav';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Switch>
          <Layout>
            <Layout.Header>
              <HeaderNav />
            </Layout.Header>
            <Layout.Main>
              <Route exact path="/">
                <Posts />
              </Route>
              <Route path="/post/write">
                <PostWrite />
              </Route>
            </Layout.Main>
            <Redirect to="/" />
          </Layout>
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
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default App;
