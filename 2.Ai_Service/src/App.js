import getMsg from "./openai_example";
import {useState, useEffect} from "react";

function App() {
    const [data,setData] = useState('');
    useEffect( () => {
        const handleStreamData = chunk => setData(prevData => prevData + chunk);
        const getData = async() => await getMsg('안녕?', handleStreamData);
        getData();
    }, []);
    return (
    <div className="App">
        <div>Ai Response: </div>
        <div>{data}</div>
    </div>
  );
}

export default App;
