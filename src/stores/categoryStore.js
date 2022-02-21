import { makeAutoObservable, observable, action } from "mobx";
import instance from "./instance";

class CategoryStore {
  categories = [];

  constructor() {
    makeAutoObservable(this, {
      categories: observable,
      fetchCategories: action,
      createCategory: action,
    });
  }

  fetchCategories = async () => {
    try {
      const response = await instance.get("/categories");
      this.categories = response.data;
    } catch (error) {
      // console.log(error);
    }
  };

  createCategory = async (newCategory) => {
    try {
      const formData = new FormData();
      for (const key in newCategory) formData.append(key, newCategory[key]);
      const response = await instance.post("/categories", formData);
      this.categories.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };
}
const categoryStore = new CategoryStore();
categoryStore.fetchCategories();
export default categoryStore;
