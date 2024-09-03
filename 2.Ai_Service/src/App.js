import getMsg from "./openai_example.js";

function App() {
    const msg = getMsg('반갑습니다').then(res => console.log(res));
    return (
    <div className="App">
      12
    </div>
  );
}

export default App;
