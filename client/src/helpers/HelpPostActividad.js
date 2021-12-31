import axios from 'axios';

export const HelpPostActividad = (URL,obj) => {
  return axios
    .post(URL,obj)
    .then((result) => result)
    .then((response) => {
      return response
    })
}