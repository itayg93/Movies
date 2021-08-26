import { create } from "apisauce";

const clientApi = create({
  baseURL: "https://api.themoviedb.org",
});

export default clientApi;
