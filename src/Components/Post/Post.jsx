import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';



const Post = (props) => {
  
  const [token, setToken] = useState('')
  const [post, setPost] = useState('')
  const [id, setId] = useState('')
 




  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    setId(user.id)
    setToken(user.token)
  },[token])
  
 
  const handleForm = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }  
    axios.post('http://localhost:3030/api/posts', {body: post, author: id}, config)
    .catch(res => {
      if(res.response.data.status == 401){
      props.refresh()
      localStorage.removeItem("user")
    } else {
      console.log(res);
    }})   
   }

  



  
  

 return(
 <div>

  <Form onSubmit={(e)=>{
    e.preventDefault()
    handleForm() }}>
   <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
               <Form.Label>¿Qué estás pensando?</Form.Label>
              <Form.Control 
                 as="textarea"
                 rows={3}
                 name='post'  
                 required
                 onChange={(e)=> setPost(e.target.value)}/>
              <Form.Control type='hidden' disabled='on' value={id}/>
   </Form.Group>
            <Button type='submit' variant="success" onClick={props.refresh}>Publicar
          </Button>
   </Form>  




 </div>
 )
}

export { Post }