import { useEffect, useState } from 'react';
import './App.css';

import Card from './Card';
import Spin from './Spin';
import {fetchData} from './api';
import TrainerDashboards from './TrainerDashboards';


function App() {
  const [trainers,setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trainer, setTrainer] = useState(null); 

  const fetchTrainersFromApi = async () =>{
    setIsLoading(true);
    const data = await fetchData();
    setTrainers(data);
    setIsLoading(false);
  }

  const selectTrainer = (trainer) => {
    setTrainer(trainer);
  }

  const renderedData = trainers.map((trainer)=>{
    return <Card key={trainer.name} onSelectTrainer={selectTrainer} trainer={trainer}/>
  })
  
  useEffect(()=>{
      fetchTrainersFromApi();
  },[]);

  return (
    <div>
    
      {trainer ? '' : 
      <div className={`flex flex-wrap justify-center ${trainer ? 'invisible' : ''}`}>
        {isLoading ? <Spin/> : ''}
        {renderedData}
      </div>
    }
      {trainer ? 
      <div className={`relative justify-center ${trainer ? '' : 'invisible'}`}>
        <TrainerDashboards key={trainer?.name} trainer={trainer} onCloseDashboard={setTrainer}/>
      </div> 
      : ''}
    </div>
  );
}

export default App