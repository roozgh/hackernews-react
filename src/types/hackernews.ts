export interface Item {
  id: number;
  time: number;
  score: number;
  by: string;
  title: string;
  url: string;
  type: "story" | "comment";
}
