export interface IDictionary<T> {
    [key: string]: T
}

export interface IParams {
    activePagePath?: string
}

export interface IPage {
    name: string
    path: string
    subHeading: string
    linkPath?: string
    imagePath?: string
    paragraphs?: string[]
}
