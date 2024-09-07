import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './style.css';
import Header from './components/Header'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { createContext ,useState} from 'react';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import fullMealsImg from './assests/m1.png';
import varietyRiceComboImg from './assests/m2.png';
import parottaImg from './assests/m5.png';
import specialFoodImg from './assests/c3.png'
import biryaniImg from './assests/c7.png'
import "./pages/App1.css"
import axios from 'axios';

const Namecontext=createContext()
const App = () => {

  const [menuItems, setMenuItems] = useState([
    {id:1, mealName: 'Full Meals', mealPrice: '₹10', picture: fullMealsImg , orderDate: "2024-08-26",day:"Monday",quantity:0 },
    {id:2, mealName: 'Variety Rice Combo', mealPrice: '₹80', picture: varietyRiceComboImg, orderDate:"2024-08-27" ,day:"Tuesday",quantity:0 },
    {id:3, mealName: 'Parotta', mealPrice: '₹60', picture: parottaImg, orderDate:"2024-08-28",day:"Wednesday", quantity:0},
    {id:4, mealName: 'Special Food', mealPrice: '₹120', picture: specialFoodImg,orderDate:"2024-08-29",day:"Thursday", quantity:0 },
    {id:5, mealName: 'Biryani', mealPrice: '₹150', picture: biryaniImg,orderDate:"2024-08-30",day:"Friday", quantity:0 },
    {id:6, mealName: 'Full Meals', mealPrice: '₹10', picture: fullMealsImg , orderDate: "2024-08-19",day:"Monday",quantity:0 },
    {id:7, mealName: 'Variety Rice Combo', mealPrice: '₹80', picture: varietyRiceComboImg, orderDate:"2024-08-20" ,day:"Tuesday",quantity:0 },
    {id:8, mealName: 'Parotta', mealPrice: '₹60', picture: parottaImg, orderDate:"2024-08-23",day:"Wednesday", quantity:0},
    {id:9, mealName: 'Special Food', mealPrice: '₹120', picture: specialFoodImg,orderDate:"2024-08-22",day:"Thursday", quantity:0 },
    {id:10, mealName: 'Biryani', mealPrice: '₹150', picture: biryaniImg,orderDate:"2024-08-21",day:"Friday", quantity:0 },
    // { name: 'Noodles', price: '₹70', picture: noodlesImg },
    // { name: 'Fried Rice', price: '₹90', picture: friedRiceImg },
    // { name: 'Sandwich', price: '₹50', picture: sandwichImg },    
  ])
  
  const [user, setuser] = useState(
    {
      userId:"0",
      userName: "naf",
      password: "",
      emailId:"",
      confirmPassword:"",
      phoneNumber: "",
  }, );


  useEffect(()=>{
    const userId = sessionStorage.getItem("userId")

    console.log("userID", userId);

    if (userId !== null)
    {
      getUser(userId);
       

    }

  },[])

  const getUser = async (id) => {

    if (id > 0){
      const response = await axios.get(`https://localhost:7206/api/User/${id}`);
      setuser(response.data);
  
      console.log(response.data);
    }   

  }

  return (
    <div className="App">
      <Namecontext.Provider value={{menuItems,setMenuItems,user,setuser}}>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login user={user} setuser={setuser} />}></Route>
        <Route path="/signup" element={<Signup user={user} setuser={setuser} />}></Route>
        <Route path="/home" element={<Header/>}></Route>
    <Route path='/dashboard' element={<Dashboard />}></Route>  
      {/* <Route path='/home' element={<Header/>}></Route> */}
      </Routes>
      </BrowserRouter>
      </Namecontext.Provider>
    </div>
  );
};

export default App;
export {Namecontext}
