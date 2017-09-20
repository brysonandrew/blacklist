import * as React from 'react';
import { browserHistory } from 'react-router';
import { IDictionary } from "../../../../../data/models/models";
import { Page } from "./Page/Page";
import { pageList } from '../../../../../data/content/pages/pages';
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../../../mobx/stores/HomeStore';
import { computed } from 'mobx';

interface IProps {
    store?: HomeStore<string>
}

interface IState {
}

@inject('store')
@observer
export class Pages extends React.Component<IProps, IState> {

    @computed public get projectOffsetList(): number[] {
        return pageList.map((project, i) => i * this.props.store.height);
    }

    @computed public get projectOffsets(): IDictionary<number> {
        return this.projectOffsetList.reduce((acc, curr, i) => {
            acc[pageList[i].path] = curr;
            return acc;
        }, {});
    }

    @computed public get activePagePath(): string {
        const { savedParams } = this.props.store;

        return !!savedParams.get("activePagePath")
            ?   savedParams.get("activePagePath")
            :   pageList[0].path;
    }

    @computed public get styles(): any {
        return {
            pagesInner: {
                display: "inline-block",
                width: "100%",
                background: "#eeeeee",
            },
            pagesInner__page: {
                position: "relative",
                height: this.props.store.height,
            }
        };
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        this.changeProjectPathOnScroll();
    };

    changeProjectPathOnScroll = () => {
        const { savedParams } = this.props.store;

        const approachingProjectBuffer = 100;
        const PagesInnerScrolledPastOffsets = this.projectOffsetList.filter(offset => (offset - approachingProjectBuffer) < window.scrollY);

        const currentIndex = PagesInnerScrolledPastOffsets.length > 0
                                ?   PagesInnerScrolledPastOffsets.length - 1
                                :   -1;

        if (currentIndex > -1 && pageList[currentIndex].path !== savedParams.get("activePagePath")) {
            const nextPath = `/${pageList[currentIndex].path}`;
            browserHistory.push(nextPath);
        }
    };

    render(): JSX.Element {

        return (
            <div style={ this.styles.pagesInner }>
                {pageList.map((page, i) =>
                    <div key={`page-${i}`}
                         style={ this.styles.pagesInner__page }>
                        <Page
                            index={i}
                            page={page}
                        />
                    </div>)}
            </div>
        );
    }
}
