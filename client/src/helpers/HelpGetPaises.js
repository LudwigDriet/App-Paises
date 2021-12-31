import axios from 'axios';

export const HelpGetPaises = (URL) => {
  return axios
    .get(URL)
    .then((result) => result)
    .then((response) => {
      return response
    })
}