import Fonts from '../../widgets/Fonts';

const appConfig = require('../../../../config/main.js');

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { MobxAsyncConnect, asyncConnect } from 'mobx-async-connect';

class App extends React.Component<any, any> {

    sectionStyle = {
        fontFamily: "'Encode Sans Expanded', 'arial', sans-serif"
    };

    componentDidMount() {
        Fonts();
    }

    public render() {
        return (
            <section style={this.sectionStyle}>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                {this.props.children}
            </section>
        );
    }
}

export { App }
