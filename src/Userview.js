import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BASE_URL from './service/Baseurl';
import { getuserfeeds } from './service/Allapi';
import './userview.css'




function Userview() {

    const [feed, setfeed] = useState([])





    const [id, setid] = useState(feed._id)

    const navigate = useNavigate()

    const [show, setShow] = useState(false);
        const [selectedItem, setSelectedItem] = useState(null);









    const Userfeed = async () => {
        try {
            const storedData = localStorage.getItem('active_user');
            const token = JSON.parse(storedData);

            if (!storedData && !token?.token || token === '') {
                alert('Invalid access please login');
                navigate('/login');
                return;
            }



            const header = {
                Authorization: `Bearer ${token.token}`,
            };

            const response = await getuserfeeds(header);
            setfeed(response.data);
        } catch (err) {
            console.log('Error fetching user feed:', err);
        }
    };


    useEffect(() => {
        Userfeed()

    }, [])

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        const clickedItem = feed.find(item => item._id === id);
        if (clickedItem) {
            setSelectedItem(clickedItem);
            setShow(true);
        }
    };

    return (
        <div>

            <div className="testimonial-grid ">
                {feed.map((item) => (
                    <div key={item._id} onClick={() => setid(item._id)}>
                        <div className="card" key={item._id} onClick={() => handleShow(item._id)}>
                            <div className="card-header">
                                <span className='options'>{item.options}</span>
                                <span className="rating">

                                    {item.rating} <i className="fa-star fa-solid" />
                                </span>
                            </div>
                            <p className="comment">"{item.comments}"</p>
                            <div className="user-name">{item.user}</div>
                            <div className="user-id"> {new Date(item.createdAt).toLocaleDateString('en-GB', {
                                month: 'short',
                                year: 'numeric'
                            })}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to={'/feedback'}> <Button>Add Feedback</Button></Link>



            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Feedback Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedItem && (
                        <div>
                            {/* Image (optional placeholder) */}
                            <div className="text-center mb-3">
                                {selectedItem.image.map((imgPath, idx) => {
                                    const fullUrl = `${BASE_URL}/${imgPath}`;
                                    return (
                                        <img
                                            key={idx}
                                            src={fullUrl}
                                            alt="feedback"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    );
                                })}
                            </div>

                            {/* Details */}
                            <p><strong>Option:</strong> {selectedItem.options}</p>
                            <p><strong>Rating:</strong> {selectedItem.rating} ⭐</p>
                            <p><strong>Comment:</strong> "{selectedItem.comments}"</p>
                            <p><strong>User:</strong> {selectedItem.user}</p>
                            <p><strong>Date:</strong> {new Date(selectedItem.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}</p>


                            <hr />
                           

                            {/* Admin Replies if available */}
                            {Array.isArray(selectedItem.admin_replay) && selectedItem.admin_replay.length > 0 && (
                                <div className="mt-3">
                                    <h6>Admin Replies:</h6>
                                    <div className='adminreplay'>
                                        {selectedItem.admin_replay.map((reply, idx) => (
                                            <div key={idx} className=" mb-2 p-2 border rounded bg-light">
                                                <p className="mb-1"><strong>Reply:</strong> {reply.replay}</p>
                                                <small className="text-muted"><strong>Date:</strong> {new Date(reply.date).toLocaleDateString('en-GB')}</small>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    )}
                </Modal.Body>


            </Modal>

            <ToastContainer position="top-center" theme="colored" />
        </div>
    )
}

export default Userview