import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Body = () => {
    const userInfo=useSelector(state=>state.user)
    const [hotel, setHotel] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate=useNavigate()
    // console.log('hello user',userInfo)

    useEffect(()=>{
        const fetchHotel=async(page,limit)=>{
            try {
                const response=await axios(`http://localhost:3002/api/v1/hotel/record?page=${0}&limit=${5}`)
                console.log(response.data.record)
                setHotel(response.data.record)
            } catch (error) {
                console.error('Error fetching hotel:', err);
                setError('Something went wrong while fetching hotel');
            }finally{
                setLoading(false)
            }
        }

        fetchHotel()
    },[])    


    if (loading) {
        return <div className="loading" >Loading property...</div>;
    }


    //Below is handle if you want to open the Hotel in same page
    // const handleHotelClick = (hotelId) => {
    //     navigate(`/hotel/${hotelId}`);
    // };

    //Below is handle open separate Window
    const handleHotelClick = (hotelId) => {
        window.open(`/hotel/${hotelId}`, '_blank');
    };

  return (
    <div>
        <main>
        
        <section className="categories">
            <div className="category active">
                <div className="category-icon"><i className="fas fa-igloo"></i></div>
                <div className="category-name">Cabins</div>
            </div>
            <div className="category">
                <div className="category-icon"><i className="fas fa-umbrella-beach"></i></div>
                <div className="category-name">Beach</div>
            </div>
            <div className="category">
                <div className="category-icon"><i className="fas fa-mountain"></i></div>
                <div className="category-name">Amazing views</div>
            </div>
            <div className="category">
                <div className="category-icon"><i className="fas fa-house"></i></div>
                <div className="category-name">Tiny homes</div>
            </div>
            <div className="category">
                <div className="category-icon"><i className="fas fa-swimming-pool"></i></div>
                <div className="category-name">Amazing pools</div>
            </div>
            <div className="category">
                <div className="category-icon"><i className="fas fa-campground"></i></div>
                <div className="category-name">Camping</div>
            </div>
            <div className="category">
                <div className="category-icon"><i className="fas fa-gem"></i></div>
                <div className="category-name">Luxury</div>
            </div>
            <div className="category">
                <div className="category-icon"><i className="fas fa-skiing"></i></div>
                <div className="category-name">Skiing</div>
            </div>
            <div className="category">
                <div className="category-icon"><i className="fas fa-tree"></i></div>
                <div className="category-name">National parks</div>
            </div>
        </section>

        
        <section className="listings">
            
            {/* <div className="listing-card">
                <div className="listing-image">
                    <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhYmlufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="Mountain cabin" />
                    <div className="wishlist-icon"><i className="far fa-heart"></i></div>
                </div>
                <div className="listing-details">
                    <div className="listing-location">Cabin in Big Bear Lake, California</div>
                    <div className="listing-distance">500 miles away</div>
                    <div className="listing-dates">Nov 12-17</div>
                    <div className="listing-price"><span className="price">$329</span> night</div>
                </div>
            </div>

            
            <div className="listing-card">
                <div className="listing-image">
                    <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="Beach house" />
                    <div className="wishlist-icon"><i className="far fa-heart"></i></div>
                </div>
                <div className="listing-details">
                    <div className="listing-location">Beach House in Malibu, California</div>
                    <div className="listing-distance">82 miles away</div>
                    <div className="listing-dates">Dec 1-8</div>
                    <div className="listing-price"><span className="price">$785</span> night</div>
                </div>
            </div>

            
            <div className="listing-card">
                <div className="listing-image">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" alt="Modern house" />
                    <div className="wishlist-icon"><i className="far fa-heart"></i></div>
                </div>
                <div className="listing-details">
                    <div className="listing-location">Modern Home in Palm Springs, California</div>
                    <div className="listing-distance">120 miles away</div>
                    <div className="listing-dates">Oct 28 - Nov 2</div>
                    <div className="listing-price"><span className="price">$420</span> night</div>
                </div>
            </div>

            
            <div className="listing-card">
                <div className="listing-image">
                    <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="Castle" />
                    <div className="wishlist-icon"><i className="far fa-heart"></i></div>
                </div>
                <div className="listing-details">
                    <div className="listing-location">Castle in Sedona, Arizona</div>
                    <div className="listing-distance">425 miles away</div>
                    <div className="listing-dates">Nov 5-10</div>
                    <div className="listing-price"><span className="price">$1,245</span> night</div>
                </div>
            </div>

            
            <div className="listing-card">
                <div className="listing-image">
                    <img src="https://images.unsplash.com/photo-1595877244574-e90ce41ce089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFmcmljYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="Safari tent" />
                    <div className="wishlist-icon"><i className="far fa-heart"></i></div>
                </div>
                <div className="listing-details">
                    <div className="listing-location">Safari Tent in Serengeti, Tanzania</div>
                    <div className="listing-distance">9,245 miles away</div>
                    <div className="listing-dates">Jan 15-22</div>
                    <div className="listing-price"><span className="price">$560</span> night</div>
                </div>
            </div> */}

            
            {/* <div className="listing-card">
                <div className="listing-image">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" alt="Boutique hotel" />
                    <div className="wishlist-icon"><i className="far fa-heart"></i></div>
                </div>
                <div className="listing-details">
                    <div className="listing-location">Boutique Hotel in Paris, France</div>
                    <div className="listing-distance">5,633 miles away</div>
                    <div className="listing-dates">Dec 10-15</div>
                    <div className="listing-price"><span className="price">$320</span> night</div>
                </div>
            </div> */}


            {hotel && hotel.map((item,index)=>(
                <div key={item?.id || index} className="listing-card" onClick={() => handleHotelClick(item?.id)}>
                    <div className="listing-image">
                        <img src={item?.images[0]} alt="Boutique hotel" />
                        <div className="wishlist-icon"><i className="far fa-heart"></i></div>
                    </div>
                    <div className="listing-details">
                        <div className="listing-location">{item?.address}, {item?.country}</div>
                        <div className="listing-distance">{item?.type} - {item?.reviews} Reviews</div>
                        <div className="listing-dates">★ {item?.rating}</div>
                        <div className="listing-price"><span className="price">${item?.price}</span> night</div>
                    </div>
                </div>
            ))}

        </section>
    </main>
    </div>
  )
}

export default Body