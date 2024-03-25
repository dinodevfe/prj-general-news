import { INewsDTO } from '@/models'
import { faker } from '@faker-js/faker'

const initialData = (max: number = 100) => {
  const list: INewsDTO[] = []
  for (let index = 0; index < max; index++) {
    list.push({
      id: index.toString(),
      title: faker.lorem.lines(1),
      author: faker.person.fullName(),
      content: faker.lorem.paragraph(),
      createdDate: faker.date.anytime().toString(),
      sourceTitle: 'vnexpress',
      sourceUrl: 'http://newspaper.example.com/'
    })
  }
  return list
}

export const NewsListFake: INewsDTO[] = initialData()
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
