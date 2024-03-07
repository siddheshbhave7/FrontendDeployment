import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import config from '../config'
// get the current signin status
import { useSelector, useDispatch } from 'react-redux'
import { signin } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const navigate=useNavigate();
  const [listings, setListings] = useState([])

  const dispatch = useDispatch()

  const signinStatus = useSelector((state) => state.authSlice.status)

  // load the homes as soon as the component gets loaded successfully
  useEffect(() => {
    // check if user is already logged in by reading the token from session storage
    if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
      // reading the information from sesssionstorage and manually signing in user
      const user = {
        token: sessionStorage['token'],
        name: sessionStorage['username'],
      }
      dispatch(signin(user))
    }

    loadHomes()
    
  }, [])

  // load all homes
  const loadHomes = () => {
    axios
      .get(config.serverURL + '/home/', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        console.log(result)
        if (result['status'] === 'success') {
          setListings(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }

  const toggleWishlistStatus = (status, id) => {
    if (status) {
      // add the home into the wishlist
      axios
        .post(
          config.serverURL + '/wishlist/' + id,
          // no need to add anything in the body
          {},
          {
            headers: { token: sessionStorage['token'] },
          }
        )
        .then((response) => {
          const result = response.data
          if (result['status'] === 'success') {
            toast.success('successfully added this home to your wishlist')
          } else {
            toast.error(result['error'])
          }
        })
    } else {
      // remove the home from wishlist
      // add the home into the wishlist
      axios
        .delete(config.serverURL + '/wishlist/' + id, {
          headers: { token: sessionStorage['token'] },
        })
        .then((response) => {
          const result = response.data
          if (result['status'] === 'success') {
            toast.success('successfully removed this home from your wishlist')
          } else {
            toast.error(result['error'])
          }
        })
    }
  }

  return (
    <div className='container'>
      <div style={{}} className='row'>
        {listings.map((listing) => {
          const imageUrl = config.serverURL + '/' + listing.image
          return (
            <div
              key={listing.id}
              className='col-3'
              style={{
                position: 'relative',
                padding: 20,
                display: 'inline-block',
                cursor: 'pointer',
              }}>
              {signinStatus && (
                <div
                  style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    right: 40,
                    top: 30,
                  }}>
                 
                </div>
              )}
              <img
                alt='home'
                style={{
                  height: 250,
                  width: '100%',
                  display: 'block',
                  borderRadius: 10,
                }}
                src={imageUrl}
              />
              <div style={{ marginTop: 20 }}>
                <h5 className='card-title'>{listing.title}</h5>
                <p>
                  {listing.tagline} <br />
                  Rs. {listing.rent} per night
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
