import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: '84fe16bcf422057627fedd1e57d21c03',
    language: 'ko-KR'
  }
});

export default instance;