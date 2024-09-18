import { getMonthName } from "./getMonthName"

export const transformDate = (dateString: string) => { //2024-09-18T05:55:54.169Z
  const date = dateString.split('T')[0].split('-') //[2024, 09, 18]
  const time = dateString.split('T')[1].split('.')[0] //05:55:54
  
  return `${date[2]} ${getMonthName(+date[1])} ${time}`
}