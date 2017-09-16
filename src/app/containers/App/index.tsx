import Fonts from '../../widgets/Fonts';

const appConfig = require('../../../../config/main.js');

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { MobxAsyncConnect, asyncConnect } from 'mobx-async-connect';

class App extends React.Component<any, any> {

    componentDidMount() {
        Fonts();
    }

    public render() {
        return (
            <section>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                {this.props.children}
            </section>
        );
    }
}

export { App }
