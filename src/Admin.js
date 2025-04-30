import React, { useEffect, useState } from 'react'
import { admincom, commentdelet, getallfeeds } from './service/Allapi';
import './admin.css'
import { Button, Card, Col, Container, Form, Image, Modal, Row, ToastContainer } from 'react-bootstrap';
import BASE_URL from './service/Baseurl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




function Admin() {

    const [feed, setfeed] = useState([])

    const [comment, setcomment] = useState({
        admin_replay: ''
    })

    const [dele,setdele]=useState(false)

    console.log(dele);
    

    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [id, setid] = useState(feed._id)

    const [filteredFeed, setFilteredFeed] = useState([]);
    const [selectedRating, setSelectedRating] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');

    const navigate = useNavigate()

    console.log(id);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 


    const totalPages = Math.ceil(feed.length / itemsPerPage);

  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = feed.slice(startIndex, endIndex);

    console.log(comment);


    const getfeedbck = async () => {

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
            const response = await getallfeeds(header)
            setfeed(response.data);

        }



        catch (err) {
            console.log(err);

        }
    }



    const replay = (e) => {
        let value = (e.target.value)
        let name = (e.target.name)

        setcomment({ ...comment, [name]: value })
    }




    const admincomment = async (e) => {
        e.preventDefault();

        try {
            const storedData = localStorage.getItem('active_user');
            const token = storedData ? JSON.parse(storedData) : null;

            if (!token?.token || token === '') {
                alert('Invalid access, please login');
                navigate('/login');
                return;
            }

         
            if (!comment.admin_replay || comment.admin_replay.trim() === '') {
                toast.warning("Admin comment can't be empty");
                return;
            }

            const commntdate = new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            const header = {
                Authorization: `Bearer ${token.token}`,
            };

            const data = {
                id, 
                replay: comment.admin_replay,
                date: commntdate
            };

            const response = await admincom(data, header);
            toast.success(response.statusText || "Comment sent successfully");
            window.location.reload();

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };




    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        const clickedItem = feed.find(item => item._id === id);
        if (clickedItem) {
            setSelectedItem(clickedItem);
            setShow(true);
        }
    };

    console.log(selectedItem);




    const handledelete = async (e) => {
        e.preventDefault()

        const storedData = localStorage.getItem('active_user');
        const token = storedData ? JSON.parse(storedData) : null;

        if (!token?.token || token === '') {
            alert('Invalid access, please login');
            navigate('/login');
            return;
        }

        const header = {
            Authorization: `Bearer ${token.token}`,
        };

        const data = {
            id: id
        }
        const response = await commentdelet(data, header)

        if (response.status == 200) {
            // toast.success("feedback Deleted Success fully")
         setdele(true)

         window.location.reload()
        }

        console.log(response);

        // window.location.reload()


    }

    useEffect(() => {
     
        getfeedbck();
    }, []);

    useEffect(() => {
       
        let updatedFeed = [...feed];

        if (selectedRating !== 'All') {
            updatedFeed = updatedFeed.filter(item => item.rating === parseInt(selectedRating));
        }

        updatedFeed.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setFilteredFeed(updatedFeed);
    }, [feed, selectedRating, sortOrder]);





    console.log(feed);




    return (
        <div >

            <div className="d-flex container-fluid justify-content-around align-items-center w-50 mb-3 mt-5">
                <div className='filter'>
                    <label>Filter by Rating: </label>
                    <Form.Select aria-label="Default select example" value={selectedRating} onChange={e => setSelectedRating(e.target.value)} className="ms-2">
                        <option>All</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                </div>

                <div className='date'>
                    <label>Sort by Date: </label>
                    <Form.Select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </Form.Select>
                </div>
            </div>


            <div className="testimonial-grid">
                {Array.isArray(filteredFeed) && filteredFeed.map((item) => (
                    <div key={item._id} onClick={() => {
                        setid(item._id);
                        handleShow(item._id);
                    }}>
                        <div className="card">
                            <div className="card-header">
                                <span className='options'>{item.options}</span>
                                <span className="rating">
                                    {item.rating} <i className="fa-star fa-solid" />
                                </span>
                            </div>
                            <p className="comment">"{item.comments}"</p>
                            <div className="user-name">{item.user}</div>
                            <div className="user-id">
                                {new Date(item.createdAt).toLocaleDateString('en-GB', {
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>




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

                            <div>
                                <div className='admins_repaly'>
                                    <Row className='w-100 mt-3 gx-2'>
                                        <Col xs={12} md={11}>
                                            <Form.Floating className="mb-3">
                                                <Form.Control
                                                    id="floatingInputCustom"
                                                    type="text"
                                                    placeholder="name@example.com"
                                                    name='admin_replay'
                                                    onChange={replay}
                                                />
                                                <label htmlFor="floatingInputCustom">Enter your reply</label>
                                            </Form.Floating>
                                        </Col>
                                        <Col xs={12} md={1} className="d-flex align-items-center">
                                            <Button className='sendicon mb-3' onClick={admincomment}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" className="bi bi-send " viewBox="0 0 16 16">
                                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                                                </svg>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>

                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handledelete}>Delete</Button>
                </Modal.Footer>
            </Modal>



            <ToastContainer position="top-center" theme="colored" />
        </div>


    )

}

export default Admin