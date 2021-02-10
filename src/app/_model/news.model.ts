export interface News {
  id:string | null,
  title:string,
  description:string,
  imagePath: string|null;
  creator?:string |null
}
