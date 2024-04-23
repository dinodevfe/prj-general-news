export const getCurrentFormattedDate = () => {
  const currentDate = new Date()

  const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

  const dayName = daysOfWeek[currentDate.getDay()]

  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1 // begin 0
  const year = currentDate.getFullYear()

  const formattedDate = `${dayName}, ${day}-${month}-${year}`

  return formattedDate
}
