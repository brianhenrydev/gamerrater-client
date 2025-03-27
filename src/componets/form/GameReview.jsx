const GameReview = ({
  setIsModalOpen,
  reviewContent,
  handleReviewSubmit,
  setGameReview,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            className="border rounded-lg w-full p-3 mb-4"
            rows="4"
            defaultValue={reviewContent}
            onChange={({ target: { value: textContent } }) => {
              setGameReview((prev) => ({
                ...prev,
                content: textContent,
              }));
            }}
            placeholder="Write your review here..."
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameReview;
