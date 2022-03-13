export interface Item {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  time: number;
  score: number;
  title: string;
  url: string;
  type: string;
  text: string;
}

export type Comment = Item & { childComments: Comment[] };

export type CommentTree = Comment[];
