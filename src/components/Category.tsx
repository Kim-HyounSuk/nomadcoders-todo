import { useRecoilValue, useRecoilState } from "recoil";
import { categoriesState, categoryState } from "./atom";

const Category = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const categories = useRecoilValue(categoriesState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  return (
    <form>
      <select value={category} onInput={onInput}>
        {categories.map((category, idx) => (
          <option key={idx} value={category}>
            {category}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Category;
