import React from 'react';
import './App.css';
import { Button, Layout, Typography } from 'antd'
import { Pages } from './Pages';
import { Page } from './types/Page';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { SideMenuWithRouter } from './components/SideMenu/SideMenu';

const { Sider, Content, Header } = Layout
const {Title} = Typography
export const App: React.FC = () => {
  return (
      <Layout className='main' style={{height:'100%'}} key='layout-main'>
        <Router>        
          <Layout className='content' > 
          <Sider className='sider'>            
            <SideMenuWithRouter/>
          </Sider>           
            <Content id="content-main">
              <Switch>
                {Pages.map((page: Page) => {
                  return (
                    <Route
                      path={page.path}
                      component={page.component}
                      key={page.path}
                      exact
                    ></Route>
                  );
                })}
              </Switch>
            </Content>
          </Layout>
        </Router>
      </Layout>
  );
}
