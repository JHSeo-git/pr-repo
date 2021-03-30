import React from 'react';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Posts from './pages/Posts';
import PostWrite from './pages/PostWrite';
import Layout from './components/Layout';
import HeaderNav from './components/HeaderNav';
import NewPostHeader from './components/NewPostHeader';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Layout>
              <Layout.Header>
                <HeaderNav />
              </Layout.Header>
              <Layout.Main>
                <Posts />
              </Layout.Main>
            </Layout>
          </Route>
          <Route path="/new-post">
            <Layout>
              <Layout.Header>
                <NewPostHeader />
              </Layout.Header>
              <Layout.Main>
                <PostWrite />
              </Layout.Main>
            </Layout>
          </Route>
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
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default App;
