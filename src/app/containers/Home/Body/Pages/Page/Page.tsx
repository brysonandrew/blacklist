import * as React from 'react';
import { browserHistory } from 'react-router';
import { IPage } from "../../../../../../data/models/models";
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../../../../mobx/stores/HomeStore';

interface IProps {
    index: number
    page: IPage
    store?: HomeStore<string>
    offsetTop?: number
}

interface IState {
    isHovered?: boolean
    isHeadingHovered?: boolean
    isProjectExtended?: boolean
    posY?: number
    isImagesLoading?: boolean
}

@inject('store')
@observer
export class Page extends React.Component<IProps, IState> {

    animationFrameId;
    timeoutId;

    @computed public get styles(): any {
        const { width } = this.props.store;

        return {
            page: {
                position: "relative",
                width: "calc(100% - 40px)",
                padding: "0 20px",
                zIndex: 0,
                cursor: "pointer"
            },
            page__heading: {
                fontSize: width < 500 ? 44 : 62
            },
            page__headingSub: {
                fontSize: width < 500 ? 22 : 28,
                color: "red"
            },
            page__paragraph: {
                fontSize: width < 500 ? 14 : 20
            }
        };
    }

    @computed public get isActive(): any {
        const { page, index } = this.props;
        const { savedParams } = this.props.store;
        return page.path === savedParams.get("activePagePath")
            || (!savedParams.get("activePagePath") && index === 0);
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isHeadingHovered: false,
            isProjectExtended: false,
            isImagesLoading: false,
            posY: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        cancelAnimationFrame(this.animationFrameId);
    }

    handleClick = () => {
        const { page } = this.props;
        const { onAnimationStart } = this.props.store;

        const path = `/${page.path}`;
        browserHistory.push(path);
        onAnimationStart();
    };

    render(): JSX.Element {
        const { page } = this.props;
        return (
            <section style={ this.styles.page }
                onClick={this.handleClick}>
                <h2 style={this.styles.page__heading}>
                    {page.name}
                </h2>
                {page.imagePath
                    ?   <div>
                            <img alt={page.name} src={page.imagePath}/>
                        </div>
                    :   null}
                {page.linkPath
                    ?   <div>
                            <a href={page.linkPath} target={"_blank"}>
                                {page.linkPath}
                            </a>
                        </div>
                    :   null}
                <h3 style={this.styles.page__headingSub}>
                    {page.subHeading}
                </h3>
                {page.paragraphs
                    ?   <div>
                        {page.paragraphs.map((paragraph, i) =>
                            <p key={`paragraph-${i}`}
                               style={this.styles.page__paragraph}>
                                {paragraph}
                            </p>)}
                        </div>
                    :   null}
            </section>
        );
    }
}
