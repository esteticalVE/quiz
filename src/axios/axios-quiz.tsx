import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-ts-quiz.firebaseio.com/'
})