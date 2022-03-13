import Axios from "axios";
import { Item } from "../types/hackernews";

const axios = Axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0/",
});

axios.interceptors.response.use(
  ({ data }) => data,
  (error) => Promise.reject(error)
);

export const getTopStoryIDs = (): Promise<number[]> => {
  return axios.get("topstories.json");
};

export const getItem = (itemID: number): Promise<Item> => {
  return axios.get(`item/${itemID}.json`);
};

export const getItemsDetails = async (storyIDs: number[]) => {
  return Promise.all(storyIDs.map(getItem));
};
