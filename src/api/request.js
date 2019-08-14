import { axiosInstance } from './config';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () =>{
  return axiosInstance.get('/personalized');
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingleListRequest = (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
}

export const getRecommendListDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
}

export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`);
}

export const getRankListDetailRequest = (id) => {
  return axiosInstance.get(`/top/list/?idx=${id}`);
}

export const getHotKeywordsRequest  =() =>{
  return axiosInstance.get(`/search/hot`);
}
export const getSuggestListRequest = (query) =>{
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
}
export const getResultSongsListRequest = (query) =>  {
  return axiosInstance.get(`/search?keywords=${query}`);
}
export const getSongDetailRequest = (id) => {
  return axiosInstance.get(`/song/detail?ids=${id}`)
}