export default class Lb4Query {
  static topics = (tag?: string) => {
    const obj: any = {
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
      },
      order: 'dateApproved DESC'
    }
    if (tag && tag.toLowerCase() != 'all') obj.where = { articleType: tag }
    return encodeURIComponent(JSON.stringify(obj))
  }
}
