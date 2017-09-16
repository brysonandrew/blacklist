import * as React from 'react';

interface IProps {
    scrollTop: number
}

export class ScrollSink extends React.Component<IProps, any> {

    scrollMethod = document[!!document.scrollingElement ? "scrollingElement" : !!document.documentElement ? "documentElement" : "body"].scrollTop;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.scrollTop !== this.props.scrollTop) {

            if (!!this.scrollMethod) {
                document[!!document.scrollingElement ? "scrollingElement" : !!document.documentElement ? "documentElement" : "body"].scrollTop = this.props.scrollTop;
            } else {
                window[!!window.scrollTo ? `scrollTo` : `scroll`](0, this.props.scrollTop);
            }
        }
    }
    render(): JSX.Element {
        return null;
    }
}
