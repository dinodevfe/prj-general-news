interface IArticleContentBase {
  text: string
  type?: 'text' | 'img'
}

interface IArticleContentText extends IArticleContentBase {
  type: 'text'
}

interface IArticleContentImage extends IArticleContentBase {
  type: 'img'
  sub: string
}

export type TArticleContent = IArticleContentText | IArticleContentImage
