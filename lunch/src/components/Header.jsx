import { motion } from 'framer-motion';
import Logo from "../assests/logo.png";
import Avatar from "../assests/avatar.png";
import ListContainer from './ListContainer';
import Food from './FoodContainer';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Namecontext } from '../App';

function Header()
{

  //  const data=useLocation()
  //  console.log(data)
  const {user}=useContext(Namecontext);
  //  console.log(user.username[0]);
  console.log(user);
  
  
    // console.log(data)
    return(<div className='relative '>
        <header className="h-14 w-full  z-50   p-1 px-10  md:px-16 lg:px-20 shadow-lg bg-zinc-200"
      style={{ boxShadow: '0 2px 6px 0 grey' }} >




<div className="ml-64  hidden md:flex w-full h-full items-center justify-between px-4 md:px-0 max-w-6xl mx-auto">
  

<div className='absolute flex gap-20 right-full ml-16 -left-3'>
<div className=' -mr-96 -mt-0 right-full content-center'>
      <img src={Logo} alt="logo" className="w-12 mr-96 -ml-7 "/>
      
       </div>
      
       <p className='ml-6 absolute text-blue-950 text-xl mt-2 font-bold font-sans uppercase'>Lunch </p>
       <p className='mt-2 ml-11  text-blue-950 text-xl font-bold font-sans'>MATE</p>
     
</div>

<p className='text-blue-950 ml-72 px-3 left-3/4 absolute text-xl font-sans font-bold'>{user.userName}</p>



       

        <div className="flex items-center gap-6">
      
            <div className="relative ml-80 left-full">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src={Avatar}
              alt="avatar"
              className="w-10 min-w-[40px] -mt-1 ml-48 h-6  min-h-[40px] rounded-full drop-shadow-md cursor-pointer"
            />
           <p></p>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-violet-50 shadow-xl rounded-lg flex-column  absolute  top-10 right-0"
              >
              </motion.div>
            
          </div>
        </div>


        </div>
        </header>
        <div className='h-full'>

       
          
        <div className='bg-white absolute w-auto ml-60 h-auto '>
        <Food/>
       
        </div>

        <div className="-ml-6 mt-5">
          
        <div
        
              className="ml-10 h-370 md:h-510 lg:h-600 items-center justify-center bg-blue-900 w-full
          md:w-510 rounded-2xl "
          style={{
            backdropFilter: 'blur(20px)',
            backgroundColor: '#d1d4e3', 
            backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))', 
            borderRadius: '12px',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px', 
            animation: 'pulse 5s infinite', 
          }}
            >
              
       <ListContainer/>
       </div>
       </div>
        {/* <MainContainer/> */}
      
        {/* <HomeContainer/> */}
        </div>
 
    </div>)
}
export default Header