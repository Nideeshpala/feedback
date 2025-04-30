import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './feedback.css'
import { Button, Image } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { loginContext } from './usercontext/Contextshare';
import { feedbackapi } from './service/Allapi';
import { data, useNavigate } from 'react-router-dom';


function Feedback_page() {

    const [hover, setHover] = useState(0)
    const [rating, setRating] = useState(0)
    const [image, setImage] = useState([])
    const [preview, setPreview] = useState([])
    const [feedback, setfeedback] = useState({
        options: '',
        comments: ''

    })
    const navigate=useNavigate()

    const [user,setUser]=useState('')

    const { loginData, setloginData } = useContext(loginContext)
    console.log(loginData);


    const feedbackbundle = (e) => {
        let name = (e.target.name)
        let value = (e.target.value)

        setfeedback({ ...feedback, [name]: value })


    }

    const handleImages = (e) => {
        setImage([...e.target.files]); // save all files
    };
    const handleRating = (value) => {
        setRating(value);
    };
    console.log(feedback);
    console.log(image);
    console.log(rating);

    useEffect(() => {
        if (image.length > 0) {
            const imageUrls = image.map((img) => URL.createObjectURL(img));
            setPreview(imageUrls);

           
            return () => {
                imageUrls.forEach(url => URL.revokeObjectURL(url));
            }
        }
    }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Retrieve user token from local storage
        const storedData = localStorage.getItem('active_user');
        const token = storedData ? JSON.parse(storedData) : null;

     
        
    
        // Check for valid login token
        if (!token?.token || token === '') {
            alert('Invalid access, please login');
            navigate('/');
            return;
        }
    
        // Set request header with Authorization token
        const header = {
            Authorization: `Bearer ${token.token}`
        };
    
        const { options, comments } = feedback;
    
        // Validate feedback input
        if (!options) {
            toast.warning('Please select one of the options');
            return;
        }
    
        if (!comments || comments.length < 5) {
            toast.warning('Please enter at least five characters');
            return;
        }
    
        // Prepare FormData for submission
        const formData = new FormData();
        formData.append('options', options);
        formData.append('comments', comments);
        formData.append('rating', rating);
    
        image.forEach((img) => {
            formData.append('image', img);
        });
    
        formData.append('user', user.name);
    
        try {
            const response = await feedbackapi(formData, header);
    
            if (response.status === 200) {
                console.log('Submitted data:', formData);
                toast.success(response.data);
                navigate('/userview');
            }
        } catch(error) {
            console.error('Feedback submission error:', error);
            toast.error('Failed to submit feedback');
        }
    };

     useEffect(() => {
            if (loginData) {
                setUser(loginData);
            }
        }, [loginData]);
    
    


    return (
        <div>

            <div className='feedbackpage container-fluid w-50 mt-5 mb-5'>
                <div className='heading'><h6>feedback section</h6></div>
                <div className='feedbackoptions'>
                    <Form.Select aria-label="Default select example" name='options' id="opt" onChange={feedbackbundle}>
                        <option value="">Select One</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="general">General Feedback</option>
                        <option value="compliment">Compliment</option>
                        <option value="complaint">Complaint</option>
                    </Form.Select>
                </div>

                <div className='feedbackimages'>
                    <Form.Group className="position-relative mb-3">
                        <Form.Label></Form.Label>
                        <Form.Control
                            type="file"
                            name="images"
                            multiple
                            onChange={handleImages}
                            accept="image/*"

                        />
                    </Form.Group>
                </div>

                <div className='image_preview'>

                    <div>
                        {preview?.map((src, index) => (
                            <Image src={src} key={index} alt={`preview-${index}`} style={{ width: '50px', height: '50px', margin: '10px', objectFit: 'cover', }} />

                        ))}


                    </div>

                </div>

                <div className='feedbackcomments'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label></Form.Label>
                            <Form.Control as="textarea" onChange={feedbackbundle} name='comments' placeholder='enter comments' rows={3} />
                        </Form.Group>
                    </Form>
                </div>

                <div className='starrating'>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => handleRating(star)}
                            style={{ color: star <= (hover || rating) ? 'gold' : 'gray', cursor: 'pointer', fontSize: '35px' }}
                        >
                            ★
                        </span>
                    ))}
                    <p>Your Rating: {rating}</p>
                </div>

                <div><Button className='btn btn-primary mt-3' onClick={handleSubmit}>Submit</Button></div>

            </div>
            <ToastContainer position="top-center" theme="colored" />
        </div>
    )
}

export default Feedback_page 