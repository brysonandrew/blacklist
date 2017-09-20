import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Pages } from './Body/Pages/Pages';
import { browserHistory } from 'react-router';
import { toParams } from "../../../data/helpers/toParams";
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import HomeStore from '../../../mobx/stores/HomeStore';

interface IState {
    isMounted: boolean
}

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Home extends React.Component<IProps, IState> {

    activeTimeout;
    mountTimeout;
    home;
    isIdle = true;
    isFirstRender = true;

    @computed public get styles(): any {
        return {
            home: {
                position: "relative",
                overflow: "hidden",
                fontFamily: "'Encode Sans Expanded', 'arial', sans-serif"
            },
            home__pages: {
                opacity: this.state.isMounted ? 1 : 0,
                filter: this.state.isMounted ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms"
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

        window.removeEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.removeEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));

    }

    render(): JSX.Element {
        return (
            <div style={ this.styles.home }
                 ref={el => el ? (this.home = el) : null}>
                <div style={ this.styles.home__pages }>
                    <Pages/>
                </div>
            </div>
        );
    }
}
