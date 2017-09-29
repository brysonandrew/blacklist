import { toPath } from '../../helpers/toPath';
import { IDictionary, IPage } from '../../models/models';
import { sudaParagraphs } from './paragraphs/suda';

function Page(name, subHeading, imagePath?, linkPath?, paragraphs?) {
    this.name = name;
    this.subHeading = subHeading;
    this.imagePath = imagePath;
    this.linkPath = linkPath;
    this.paragraphs = paragraphs;
    this.path = toPath(this.name);
}

export const pageList: IPage[] = [
    new Page(
        "Suda Sampath",
        "The person pictured owes me a total of 432 USD.",
        "/images/Home/logo.jpg",
        null,
        sudaParagraphs
    ),
    new Page(
        "IndyDutch Solutions",
        "Associated business",
        "/images/Home/indydutch.png"
    ),
    new Page(
        "Sensy Touch",
        "Associated business",
        "/images/Home/sensytouch.png"
    ),
    new Page(
        "IPG Pharmaceuticals",
        "Associated business",
        "/images/Home/ipg.png"
    ),
    new Page(
        "Aqualux",
        "Associated business",
        "/images/Home/aqualux.png"
    ),
    new Page(
        "BIO Mast",
        "Associated business",
        "/images/Home/biomast.png"
    ),
    new Page(
        "Facebook",
        "Associated link",
        null,
        "https://www.facebook.com/suda.sampath"
    ),
    new Page(
        "LinkedIn",
        "Associated link",
        null,
        "https://www.linkedin.com/in/sudasampath"
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
