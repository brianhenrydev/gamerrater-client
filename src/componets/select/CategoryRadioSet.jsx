import { useEffect, useState } from "react";

const CategoryRadioSet = ({ setGame, game }) => {
  const [categories, setCategories] = useState([
    { id: 1, label: "Error Fetching Data" },
  ]);
  const [selectedCategories, setSelectedCategories] = useState(game.categories);

  useEffect(() => {
    fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
    })
      .then((res) => res.json())
      .then((cats) => setCategories(cats));
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  useEffect(() => {
    setGame((prev) => ({
      ...prev,
      categories: selectedCategories,
    }));
  }, [selectedCategories, setGame]);

  return (
    <div>
      <h3 className="text-lg font-medium">Select Categories:</h3>
      <div className="w-full max-w-s mx-auto flex flex-row flex-wrap justify-evenly border border-gray-300 rounded-sm p-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-start mb-2 w-1/2 md:w-1/3 lg:w-1/4"
          >
            <input
              type="checkbox"
              id={`category-${c.id}`}
              value={c.id}
              onChange={() => handleCategoryChange(c.id)}
              checked={selectedCategories.includes(c.id)}
              className="mr-2"
            />
            <label htmlFor={`category-${c.id}`} className="text-gray-700">
              {c.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRadioSet;
