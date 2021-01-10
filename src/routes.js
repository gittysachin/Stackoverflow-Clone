import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withPageTitle from './services/withPageTitle';

import PageContainer from './components/PageContainer/PageContainer.component';
import HomePage from './pages/HomePage/HomePage.component';
import Login from './pages/Login/Login.component';
import UserPage from './pages/UserPage/UserPage.component';
import NotFound from './pages/NotFound/NotFound.component';

const HomePageComponent = withPageTitle({
    component: PageContainer({ component: HomePage }),
    title: 'CLONE Stack Overflow - Where Developers Learn, Share, & Build Careers'
});

const LoginComponent = withPageTitle({
    component: Login,
    title: 'Log In - CLONE Stack Overflow'
});

const NotFoundComponent = withPageTitle({
    component: NotFound,
    title: 'Error 404'
});

const UserPageComponent = PageContainer({ component: UserPage });

const Routes = () => {
    return <Switch>
        <Route exact path='/' component={HomePageComponent} />
        <Route exact path='/login' component={LoginComponent} />
        <Route exact path='/users/:id' component={UserPageComponent} />
        <Route path='*' component={NotFoundComponent} />
    </Switch>
}

export default Routes;