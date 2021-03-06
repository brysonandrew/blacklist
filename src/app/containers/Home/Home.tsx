import * as React from 'react';
import HomeStore from '../../../mobx/stores/HomeStore';
import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'react-router';
import { toParams } from "../../../data/helpers/toParams";
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { Pages } from './Body/Pages/Pages';

interface IState {
    isMounted?: boolean
}

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Home extends React.Component<IProps, IState> {

    activeTimeout;
    home;
    isIdle = true;
    isFirstRender = true;
    timerId: any;

    @computed public get styles(): any {
        return {
            home: {
                position: "relative",
                opacity: this.state.isMounted ? 1 : 0,
                textAlign: "center",
                width: "100%",
                transition: "opacity 200ms"
            }
        };
    }

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        const { onResizeViewport, onLocationListen, onLoad } = this.props.store;
        this.isFirstRender = false;
        // reset window pos
        window.scroll(0, 0);

        const history = createHistory();
// initial save params
        onLoad(toParams(history.location.pathname));
// listen to future params
        browserHistory.listen( location =>  {

            onLocationListen(
                toParams(location.pathname)
            );

        });

        this.timerId = setTimeout(() => this.setState({
            isMounted: true
        }), 500);

        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    componentWillUnmount() {
        const { onResizeViewport } = this.props.store;

        if (!!this.activeTimeout) {
            clearTimeout(this.activeTimeout);
            this.activeTimeout = false;
        }

        clearTimeout(this.timerId);

        window.removeEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.removeEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));

    }

    render(): JSX.Element {
        return (
            <div style={ this.styles.home }
                 ref={el => el ? (this.home = el) : null}>
                <h1>Suda Sampath of IndyDutch Solutions</h1>
                <Pages/>
            </div>
        );
    }
}
