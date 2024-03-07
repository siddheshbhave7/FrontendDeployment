import Cookies from 'js-cookie'

export let getCookiesObject =()=>{

    const userCookie = Cookies.get('user');

    return userCookie ? JSON.parse(userCookie) : null;
}

export let getVehicleCookie=()=>{
    const vehicleCookie = Cookies.get('vehicle');
    return vehicleCookie ? JSON.parse(vehicleCookie) :null;
}

export let getBookingCookie=()=>{
    const bookingCookie = Cookies.get('booking');
    return bookingCookie ? JSON.parse(bookingCookie) :null;
}

export let getParkingCookie=()=>{
    const parkingCookie=Cookies.get('parking');
    return parkingCookie ? JSON.parse(parkingCookie):null;
}