import * as React from 'react';
import { PagesInner } from './PagesInner';
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../../../mobx/stores/HomeStore';

interface IProps {
    store?: HomeStore<string>
}

interface IState {
}

@inject('store')
@observer
export class Pages extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        const { savedParams, onAnimationStart } = this.props.store;

        if (!!savedParams.get("activePagePath")) {
            onAnimationStart();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render(): JSX.Element {

        return (
            <div style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                textAlign: "center"
            }}>
                <PagesInner/>
            </div>
        );
    }
}
