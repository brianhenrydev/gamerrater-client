import { useEffect, useState } from "react";

const CategorySelect = ({ setGame }) => {
  const [categories, setCategories] = useState([
    { id: 1, label: "Error Fetching Data" },
  ]);
  useEffect(() => {
    fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
    })
      .then((res) => res.json())
      .then((cats) => setCategories(cats));
  }, []);
  return (
    <>
      <div className="w-full max-w-s mx-auto">
        <select
          onChange={({ target: { value: category } }) => {
            setGame((prev) => ({
              ...prev,
              categories: [parseInt(category)],
            }));
          }}
          className="block w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value={null}>Choose a Category</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CategorySelect;
