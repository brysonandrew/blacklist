import { toPath } from '../../helpers/toPath';
import { IDictionary, IPage } from '../../models/models';
import { sudaParagraphs } from './paragraphs/suda';
import { indyDutchParagraphs } from './paragraphs/indydutch';

function PortfolioProject(name, imagePath, paragraphs) {
    this.name = name;
    this.imagePath = imagePath;
    this.paragraphs = paragraphs;
    this.path = toPath(this.name);
}

export const pageList: IPage[] = [
    new PortfolioProject(
        "Suda Sampath",
        "/images/Home/logo.jpg",
        sudaParagraphs
    ),
    new PortfolioProject(
        "IndyDutch Solutions",
        "/images/Home/indydutch.png",
        indyDutchParagraphs
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
