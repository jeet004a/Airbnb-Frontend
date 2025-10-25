import axios from 'axios'

export const findHotelById = async(id) => {
    try {
        const response = await axios.get(`http://localhost:3002/api/v1/hotel/hotel/${id}`)
        return response
    } catch (error) {
        console.log('something went wrong', error)
    }
}