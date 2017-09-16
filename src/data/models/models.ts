export interface IDictionary<T> {
    [key: string]: T
}

export interface IParams {
    activePagePath?: string
}

export interface IPage {
    name: string
    subHeading: string
    imagePath: string
    paragraphs: string[]
    path: string
}
