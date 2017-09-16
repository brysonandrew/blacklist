import { toPath } from '../../helpers/toPath';
import { IDictionary, IPage } from '../../models/models';

function PortfolioProject(name, imagePath?) {
    this.name = name;
    this.imagePath = imagePath;
    this.path = toPath(this.name);
}

export const pageList: IPage[] = [
    new PortfolioProject(
        "Suda Sampath",
        "/images/Home/logo.jpg"

    ),
    new PortfolioProject(
        "IndyDutch Solutions",
        "/images/Home/indydutch.png"
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
