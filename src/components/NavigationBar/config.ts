import { NavigationKeys } from '@/models'

export interface INavigation {
  title: string
  pathname: NavigationKeys
  slug?: string
}

export const NavigationConfig: INavigation[] = [
  { title: 'Mới nhất', pathname: NavigationKeys.Home },
  { title: 'Khoa học', pathname: NavigationKeys.Topic, slug: 'khoa-hoc' },
  { title: 'Thể thao', pathname: NavigationKeys.Topic, slug: 'the-thao' },
  { title: 'Kinh doanh', pathname: NavigationKeys.Topic, slug: 'kinh-doanh' },
  { title: 'Góc nhìn', pathname: NavigationKeys.Topic, slug: 'goc-nhin' }
]

export const isCurrentNavigation = (pathname: string, item: INavigation) => {
  if (!item.slug) return pathname === item.pathname
  const list = pathname.split('/')
  const isMatchSlug = list.some((i) => i === item.slug)
  const isMatchPathname = list.some((i) => i === item.pathname.replace('/', ''))
  return isMatchPathname && isMatchSlug
}

export const getTitleTopic = (slug: string) => {
  const item = NavigationConfig.find((e) => e.pathname === NavigationKeys.Topic && e.slug === slug)
  return item ? item.title : ''
}
