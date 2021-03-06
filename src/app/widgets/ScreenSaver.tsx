import * as React from 'react';
import { colors } from '../../data/themeOptions';
import { pageList } from '../../data/content/pages/pages';

interface IProps {
    isFirstRender: boolean
}

interface IState {
    isMounted: boolean
}

export class ScreenSaver extends React.Component<IProps, IState> {

    mountTimeout;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.mountTimeout = setTimeout(() => this.setState({ isMounted: true }), 0);
    }

    componentWillUnmount() {
        clearTimeout(this.mountTimeout);
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { isFirstRender } = this.props;

        const styles = {
            screenSaver: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: colors.wht,
                opacity: isMounted || isFirstRender ? 1 : 0,
                filter: isMounted || isFirstRender ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms",
                zIndex: 20
            },
            screenSaver__inner: {
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }
        } as any;
        return (
            <div style={styles.screenSaver}>
                <div style={styles.screenSaver__inner}>
                    <img style={{display: "inline-block", width: 300, height: "auto"}} src={pageList[0].imagePath}/>
                    <h2 style={{color: "red"}}>
                        A warning to anyone doing business with Suda Sampath of IndyDutch Solutions
                    </h2>
                </div>
            </div>
        );
    }
}
