import axios from 'axios/dist/axios'
// import axios from 'axios'

export function reportData(data) {
  axios
    .post('http://localhost:3333/monitor', {
      data: {
        content: JSON.stringify(data)
      }
    })
    .catch((e) => {})
  // const img = new Image()
  // img.src = ``
  console.log(data)
}
