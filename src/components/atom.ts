import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodoData {
  text: string;
  id: number;
  category: string;
}

const todosPersist = recoilPersist({
  key: "todos",
  storage: localStorage,
});

const categoriesPersist = recoilPersist({
  key: "categories",
  storage: localStorage,
});

export const todoState = atom<ITodoData[]>({
  key: "todo",
  default: [],
  effects_UNSTABLE: [todosPersist.persistAtom],
});

export const categoryState = atom({
  key: "category",
  default: "TODO",
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TODO", "DOING", "DONE"],
  effects: [categoriesPersist.persistAtom],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});

export const categorySelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    const categories = get(categoriesState);
    const category = get(categoryState);
    return categories.filter((value) => value !== category);
  },
});
