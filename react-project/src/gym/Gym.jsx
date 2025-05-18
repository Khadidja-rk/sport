import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProgram from './AddProgram';
import AddCoach from './AddCoach';
import EditCoach from './EditCoach';
import EditProgram from './EditProgram';

function Gym() {
const [liste,setListe]= useState([]);
const [coaches,setCoaches]= useState([]);
const [coach,setCoach] = useState({name:'',phone:'',salary:0});
const [days,setDays]= useState([]);

const Week =[
'sunday','monday','tuesday','wednesday','thursday','friday','saturday'
]
const fetchData = () => {
  axios.get('http://127.0.0.1:8000/api/gym')
    .then((response) => {
      setDays(response.data['days']);
      setListe(response.data['data']);
      setCoaches(response.data['coaches']);
    }).catch(err => console.log(err));
};
useEffect(() => {
  fetchData();
}, []);





const deleteCoach=(id)=>{
console.log(id);

axios.post('http://127.0.0.1:8000/api/gym/coach/delete',{id:id}).then((response)=>{
console.log(response.data);
 fetchData();

}).catch((err)=>{console.log(err);
})

}

const deleteProgram=(id)=>{
console.log(id);

axios.post('http://127.0.0.1:8000/api/gym/delete',{id:id}).then((response)=>{
console.log(response.data);
 fetchData();
}).catch((err)=>{console.log(err);
})
}
  return (
<div>
    <div >
    <div style={{display:'flex', flexDirection:'row', backgroundSize:'cover',backgroundImage:"url('/rose2.jpeg') ",borderRadius:'15px',height:'fit-content', padding:'30px',margin:'20px'}}>
<div>
<AddProgram Week={Week} coaches={coaches} fetchData={fetchData}/>
{Week.map((elem, i) => {
  const sessionsForDay = liste.filter(ele => ele.day === elem);

 
  const sessionsByCoach = {};
  sessionsForDay.forEach(session => {
    const coachName = session.coach.name;
    if (!sessionsByCoach[coachName]) {
      sessionsByCoach[coachName] = [];
    }
    sessionsByCoach[coachName].push(session);
  });

  return (
    <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 300px' }}>
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',transform:'tranlsateY(-50%)',left:'90px',
              borderRadius:'50%', width:'25px', height:'25px',backgroundColor:'white'}}> </div>
                <h2 style={{ color: 'black' }}>{elem.charAt(0).toUpperCase() + elem.slice(1,3).toLowerCase()}</h2>
  
</div>  
      <div style={{ borderLeft: '7px white solid', paddingLeft: '10px' }}>
     <div style={{ backgroundColor:'white',opacity:'0.8',fontFamily:'serif',fontSize:'15px',margin:'15px',padding:'15px', borderRadius:'15px'}}>
        {sessionsForDay.length > 0 ? (
        
          Object.entries(sessionsByCoach).map(([coachName, sessions], idx) => (
            <div key={idx} style={{ marginBottom: '0px' , display:'flex', flexDirection:'column',}}>
              <div>{coachName}<br/></div>
              {sessions.map((s, i) => (
             <div style={{display:'flex', flexDirection:'row'}}>
                <div key={i} style={{ marginLeft: '20px' }}>
                  [ {s.start_time} - {s.end_time} ] ({s.session_price}Da)
                </div>
                <EditProgram Week={Week} fetchData={fetchData} coaches={coaches} ele={s}/>
             
                <IconButton size='small' onClick={()=>{deleteProgram(s.id)}} ><DeleteIcon fontSize='small'/></IconButton>             
</div>
              ))}
            </div>
          ))
        ) : (
          <div style={{ color: 'red', marginLeft: '20px' }}>No session for today</div>
        )}
      </div>
    </div>
</div>
  );
})}


</div>
<div>



<div style={{margin:'20px'}}>
<h1> Liste Of Coaches</h1>
<div >
<div  style={{borderRadius:'15px',fontWeight:'bolder', width:'fit-conent',padding:'10px',margin:'20px',backgroundColor:'#eee',display:'grid', gridTemplateColumns:'200px 200px 100px 60px',gap:'100px'}}>

<div>Coach Name</div>
<div>Coach Phone</div>
<div>Coach Salary</div>
</div>
{coaches.length>0?(
coaches.map((ele,index)=>(
<div key={index} style={{borderRadius:'15px', width:'fit-conent',padding:'10px',margin:'20px',paddingRight:'20px',backgroundColor:'#eee',display:'grid', gridTemplateColumns:'200px 200px 90px 60px',gap:'100px'}}>

{ele.name} 
<div>{ele.phone}</div>
<div> {ele.salary} </div>
<div style={{display:'flex', flexDirection:'row'}}>
<IconButton>
<DeleteIcon  onClick={()=>{deleteCoach(ele.id)}}/>
</IconButton>
 <EditCoach fetchData={fetchData} ele={ ele}  />

</div>
</div>
))
):''}   
</div> 
</div>
<AddCoach fetchData={fetchData}/>
</div>
</div>
   </div>

</div>
  )
}

export default Gym