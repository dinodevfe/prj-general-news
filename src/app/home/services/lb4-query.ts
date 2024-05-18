export default class Lb4Query {
  static all = () => {
    const obj = {
      fields: {
        id: true,
        articleId: true,
        title: true,
        description: true,
        author: true,
        patch: true,
        imageUrl: true,
        imageUrlOrigin: true,
        sourceTitle: true,
        sourceUrl: true,
        dateApproved: true,
        dateRawCrawled: true,
        status: true,
        type: true
      }
    }
    return encodeURIComponent(JSON.stringify(obj))
  }
}
