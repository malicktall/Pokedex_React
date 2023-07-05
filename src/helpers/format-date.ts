
const formatDate = (date: Date = new Date()) => {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }

export default formatDate;