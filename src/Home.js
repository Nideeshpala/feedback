import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'


function Home() {


  const navigate = useNavigate()

  const handleclick = () => {
    navigate("/login");
  }
  return (
    <div>
      <div className='home'>
  <div className='head'>
    <h2>Your opinion matters! We'd love to hear your thoughts and suggestions.</h2>
    <p>Please share how we can make your experience even better!</p>
  </div>
  <div className='feedback-section'>
    <Button onClick={handleclick} variant="primary" size="lg" className="feedback-button">
      Share Feedback
    </Button>
  </div>
</div>





    </div>
  )
}

export default Home