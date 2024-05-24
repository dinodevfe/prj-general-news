export const formatTimeAgo = (value?: string): string => {
  if (!value) return 'Unknown'

  let date = value
  if (!date.endsWith('Z')) date += 'Z'

  const targetDate = new Date(date)
  if (isNaN(targetDate.getTime())) return 'Unknown'

  const now: Date = new Date()
  const timeDifference: number = now.getTime() - targetDate.getTime()

  const seconds: number = Math.floor(Math.abs(timeDifference) / 1000)
  const minutes: number = Math.floor(seconds / 60)
  const hours: number = Math.floor(minutes / 60)
  const days: number = Math.floor(hours / 24)

  if (seconds < 0) {
    return `${seconds} | 0 seconds ago`
  } else if (seconds < 60) {
    return `${seconds} seconds ago`
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else if (days < 30) {
    return `${days} days ago`
  } else {
    const formattedDate: string = `${targetDate.getDate()}/${targetDate.getMonth() + 1}/${targetDate.getFullYear()}`
    return `on ${formattedDate}`
  }
}
