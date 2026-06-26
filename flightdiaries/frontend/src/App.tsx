import { useState } from 'react';
import { useEffect } from 'react';
import type{DiaryEntry , NewDiaryEntry} from '../src/types'
import axios from 'axios';
function App() {
  const [diaries , setDiaries]=useState<DiaryEntry[]>([]);
  const [date , setDate]=useState('');
  const [visibility , setVisibility ]=useState('');
  const [weather , setWeather]=useState('');
  const [comment , setComment]=useState('');
  const [notification , setNotification]=useState('');
  const Notification =()=><p style={{ color: 'red' }}>{notification}</p>
  useEffect(()=>{
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(res=>{
      setDiaries(res.data);
    })
  },[])
  const diaryEntryCreation=async(event :React.SyntheticEvent)=>{
    event.preventDefault();
    const entryToAdd={  
      "id":diaries.length+1,
      "date":date,
      "weather":weather,
      "visibility":visibility,
      "comment":comment,
    };
    try{
      const response =await axios.post<NewDiaryEntry>('http://localhost:3000/api/diaries' , entryToAdd)
      setDiaries(diaries.concat(entryToAdd));
      setComment('');
      setDate('');
      setVisibility('');
      setWeather('');
    }
    catch(error){
      if(axios.isAxiosError(error)){
        let message='';
        error.response?.data.error.map(e=>{
          message+=e.path[0] + ' '+e.message+'...';
        })
        setNotification(message);
         console.log(error.response?.data.error); 
         setTimeout(()=>setNotification(''),5000);
      }
      else console.log(error);
    }
  };
  return (
    <>
    <h2>Add New Entry</h2>
    <Notification/>
    <div>
     <form onSubmit={diaryEntryCreation}>
  <div>
    <label>date </label>
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </div>

  <div>
    <label>visibility </label>

    <label>
      great
      <input type="radio" name="visibility" value="great" checked={visibility === 'great'}
        onChange={(e) => setVisibility(e.target.value)}
      />
    </label>
    <label>
      good
      <input type="radio" name="visibility" value="good"
        checked={visibility === 'good'}
        onChange={(e) => setVisibility(e.target.value)}
      />
    </label>

    <label>
      ok
      <input type="radio" name="visibility" value="ok"
        checked={visibility === 'ok'}
        onChange={(e) => setVisibility(e.target.value)}
      />
    </label>

    <label>
      poor
      <input type="radio" name="visibility" value="poor"
        checked={visibility === 'poor'}
        onChange={(e) => setVisibility(e.target.value)}
      />
    </label>
  </div>

  <div>
    <label>weather </label>

    <label>
      sunny
      <input type="radio" name="weather" value="sunny"
        checked={weather === 'sunny'}
        onChange={(e) => setWeather(e.target.value)}
      />
    </label>
    <label>
      rainy
      <input type="radio" name="weather" value="rainy"
        checked={weather === 'rainy'}
        onChange={(e) => setWeather(e.target.value)}
      />
    </label>

    <label>
      cloudy
      <input type="radio" name="weather" value="cloudy"
        checked={weather === 'cloudy'}
        onChange={(e) => setWeather(e.target.value)}
      />
    </label>

    <label>
      stormy
      <input type="radio" name="weather" value="stormy"
        checked={weather === 'stormy'}
        onChange={(e) => setWeather(e.target.value)}
      />
    </label>
    <label>
      windy
      <input type="radio" name="weather" value="windy" checked={weather === 'windy'}
        onChange={(e) => setWeather(e.target.value)}
      />
    </label>
  </div>

  <div>
    <label>comment </label>
    <input value={comment} onChange={(e) => setComment(e.target.value)}/>
  </div>

  <button type="submit">add</button>
</form>
    </div>
    <h2>Diary Entries</h2>
    <ul>
    {diaries.map((entry)=><li key={entry.id}>{entry.date} <p>{entry.weather} {entry.visibility}</p></li>
    )}
    </ul>
    </>
  )
}

export default App
