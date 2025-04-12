export interface Post {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string; 
    date: string;
    author: {
      name: string;
      avatar: string;
    }
  }