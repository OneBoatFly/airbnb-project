import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './SpotDetails.css';

import AddSpotImages from './AddSpotImages';
import SpotReviews from '../Reviews/SpotReviews';
import SpotReviewsModal from '../Reviews/SpotReviewsModal';
import AddReview from '../Reviews/AddReview';
import RatingNumReview from '../Reviews/RatingNumReview';
import CreateBooking from '../Bookings/CreateBooking';
import { Modal } from '../../context/Modal';

import * as spotsActions from '../../store/spots';
import * as spotReviewsActions from '../../store/spotReviews';

export default function SpotDetails() {
    console.log('Spot Details Compoment')
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotDetails);
    console.log('spot', spot)
    const spotReviews = useSelector(state => state.spotReviews.spotAllReviews);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showAddReviewForm, setShowAddReviewForm] = useState(false);
    const [showAddImageForm, setShowAddImageForm] = useState(false);

    const {spotId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotsActions.getOneSpot(spotId));
        dispatch(spotReviewsActions.getSpotReviews(spotId));
    }, [dispatch]);

  return (
    <div className='single-spot-wrapper'>
        {spot &&
            <div className='single-spot-sub-wrapper'>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <h3>{spot.name}</h3>
                    <div style={{display:'flex', alignItems:'center', columnGap:'8px'}}>
                        <div className='review-modify-buttons' style={{ marginTop: '10px' }} >
                            <button className='modify-buttons' onClick={() => setShowAddReviewForm(true)} >
                                <i className="fa-solid fa-plus" style={{ marginRight: '7px' }}></i>
                                <span>Add a review</span>
                            </button>
                        </div>
                        {spot.ownerId === sessionUser.id &&
                            <div className='review-modify-buttons' style={{ marginTop: '10px' }} >
                                <button className='modify-buttons' onClick={() => setShowAddImageForm(true)} >
                                    <i className="fa-solid fa-plus" style={{ marginRight: '7px' }}></i>
                                    <span>Add images</span>
                                </button>
                            </div>  
                        }
                    </div>
                </div>
                <div className='title-div-wrapper'>
                    <RatingNumReview spot={spot} setShowReviewModal={setShowReviewModal} />
                </div>

                <div className='pictures-div-wrapper'>
                    <div className='pictures-big'>
                        <div className='image-div'>
                            {spot.SpotImages[0] ? 
                                <img src={`${spot.SpotImages[0].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>
                            }
                        </div>
                    </div>
                    <div className='pictures-small'>
                        <div className='image-div'>
                            {spot.SpotImages[1] ? <img src={`${spot.SpotImages[1].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                        </div>
                        <div className='image-div'>
                            {spot.SpotImages[2] ? <img src={`${spot.SpotImages[2].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                        </div>
                        <div className='image-div'>
                            {spot.SpotImages[3] ? <img src={`${spot.SpotImages[3].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                        </div>
                        <div className='image-div'>
                            {spot.SpotImages[4] ? <img src={`${spot.SpotImages[4].url}`} alt='room'></img> : <div className='no-image-div'>No Image</div>}
                        </div>
                    </div>
                </div>

                <div className='info-booking-wrapper'>
                    <div className='spot-info-wrapper'>
                        <div className='hostName'>{spot.Owner && <h4>Hosted by {spot.Owner.firstName}</h4>}</div>
                        <div className='info-detail-wrapper'>
                            <div>
                                <img className='aircover-img' src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' alt='aircover'></img>
                            </div>
                            <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        </div>
                        <div className='info-detail-wrapper'>
                            <p>{spot.description}</p>
                        </div>
                        <div className='info-detail-wrapper'>
                            <h4>5 nights in {spot.city}</h4>
                            <div className='date-calendar-wrapper'>placeholder for date and calendar
                                <span>placeholder for dates</span>
                                <div>
                                    placeholder for calendar
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='booking-form-wrapper'>
                        <div className='booking-form-sub-wrapper'>
                            <div className='booking-form'>
                                  <CreateBooking spot={spot} setShowReviewModal={setShowReviewModal} />
                            </div>
                            <div>
                                <p>
                                    Good price.Your dates are $392 less than the avg. nightly rate over the last 3 months.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='reviews-wrapper'>
                    <div className='reviews-sub-wrapper'>
                        <h4>
                            <RatingNumReview spot={spot} />
                        </h4>
                    </div>
                    <SpotReviews spotReviews={spotReviews}/>
                </div>
            </div>          
        }
        {showReviewModal && (
            <Modal onClose={() => setShowReviewModal(false)} >
                <SpotReviewsModal setShowReviewModal={setShowReviewModal} />
            </Modal>
        )}
        {showAddReviewForm &&
            <Modal onClose={() => setShowAddReviewForm(false)}>
                <AddReview setShowAddReviewForm={setShowAddReviewForm} spotId={spotId} />
            </Modal>
        }
        {showAddImageForm &&
            <Modal onClose={() => setShowAddImageForm(false)}>
                <AddSpotImages setShowAddImageForm={setShowAddImageForm} spotId={spotId} />
            </Modal>
        }
    </div>
  )
}
