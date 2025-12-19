
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Skill {
  name: string;
  value: number;
}
