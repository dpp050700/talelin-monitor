import axios from 'axios/dist/axios'

export function reportData(data) {
  axios
    .post('http://localhost:3333/monitor', {
      content: JSON.stringify(data)
    })
    .catch((e) => {})

  console.log(data)
}
