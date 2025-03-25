const fetchData = () =>
  fetch("http://localhost:8000/games", {
    method: "GET",
    headers: {
      Authorization: "token 6b1e752dfcb7accf456cb13373af6804e4256c5d",
    },
  }).then((res) => res.json());

const App = () => {
  const data = use(fetchData());

  return (
    <>
      <div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => {}}>count is </button>
        </div>
      </div>
    </>
  );
};

export default App;
