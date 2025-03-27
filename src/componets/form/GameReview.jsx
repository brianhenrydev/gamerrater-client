const GameReview = ({
  setIsModalOpen,
  reviewContent,
  handleReviewSubmit,
  setGameReview,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Create a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            className="border rounded-lg w-full p-2"
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
          <div className="flex justify-end mt-3">
            <button
              type="button"
              className="mr-2 border rounded-lg p-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border rounded-lg p-2 bg-blue-500 text-white"
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
