export interface IEmoji {
  name: string;
  icon: string;
  keywords: string[];
  title: string;
}

export interface ISignature {
  [key: string]: string;
}

export interface ICategory {
  id: string;
  emojis: string[];
}
