import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import Card from './Card';
import Spin from './Spin';
import {fetchData} from './api';


function App() {
  const [trainers,setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrainersFromApi = async () =>{
    setIsLoading(true);
    const data = await fetchData();
    setTrainers(data);
    setIsLoading(false);
  }

  const renderedData = trainers.map((trainer)=>{
    return <Card key={trainer.name} trainer={trainer}/>
  })
  
  useEffect(()=>{
      fetchTrainersFromApi();
  },[]);

  return (
    <div>
      <SearchBar />
      <div className="flex flex-wrap justify-center">
        {isLoading ? <Spin/> : ''}
        {renderedData}
      </div>
    </div>
  );
}

export default App