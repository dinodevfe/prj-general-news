import { IArticleDTO } from '@/models'
import { faker } from '@faker-js/faker'

const Tags = ['tin-tuc', 'the-thao', 'tai-chinh', 'goc-nhin']

const getRandomValueFromArray = (data: string[], defaultValue?: string) => {
  if (data.length === 0) return defaultValue ?? ''
  const randomIndex = Math.floor(Math.random() * data.length)
  return data[randomIndex]
}

export const createOne = (index: number): IArticleDTO => ({
  id: index.toString(),
  title: faker.lorem.lines(1),
  author: faker.person.fullName(),
  content: faker.lorem.paragraphs(10, '<br/>\n'),
  imageUrl: faker.image.url(),
  createdDate: faker.date.recent().toString(),
  sourceTitle: 'vnexpress',
  sourceUrl: 'http://newspaper.example.com/',
  tag: getRandomValueFromArray(Tags, Tags[0])
})

const initialData = (max: number = 100) => {
  let carouselCount = 18
  let hotNews = 9
  const list: IArticleDTO[] = []
  for (let index = 0; index < max; index++) {
    const temp = createOne(index)
    if (carouselCount > 0) {
      temp.type = 'carousel'
      carouselCount -= 1
    } else if (hotNews > 0) {
      temp.type = 'hot'
      hotNews -= 1
    }
    list.push(temp)
  }
  return list
}

export const NewsListFake: IArticleDTO[] = initialData()
// [
//   {
//     id: 'Id 0',
//     title: 'Title 0',
//     content: 'Content 0',
//     author: 'Author 0',
//     createdDate: '',
//     sourceTitle: 'vnexpress',
//     sourceUrl: 'https://vnexpress.net/'
//   }
// ]
