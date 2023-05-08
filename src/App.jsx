import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setusers] = useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res=>res.json())
    .then(data=>setusers(data))
  },[])
  console.log("show user",users)
  const handlesubmit =(event)=>{
    event.preventDefault();
    const form= event.target;
    const name=form.name.value;
    const email=form.email.value;
    const user={ name, email }
    console.log(user);
    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)

    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const newUser=[...users, data]
      setusers(newUser)
      form.reset();
    })
  }

  return (
    <>
      <h3>User Mangement System: {users.length}</h3>
      <form onSubmit={handlesubmit}>
        <input type="text" name='name' id='' placeholder='name' /><br></br>
        <input type="email" name='email' id='' placeholder='email' /><br></br>
        <input type="submit" name='submit' id='' value="submit"/><br></br>
      </form>
      {
        users.map(u=><p key={u.user_id}>{u.user_id}:{u.name}:{u.email}</p>)
      }
    </>
  )
}

export default App
