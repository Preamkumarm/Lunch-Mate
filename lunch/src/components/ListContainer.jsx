import { motion } from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import { useContext } from 'react';
import { Namecontext } from '../App';
import bg from '../assests/w5.jpg'
function ListContainer() {

  const {menuItems}=useContext(Namecontext)
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 2;


  console.log(menuItems)
  const scrollUp = () => {
  
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const scrollDown = () => {
    
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, menuItems.length - itemsPerPage)
    );
  };

  return (
    <div className="relative flex flex-col items-center   p-2">

      <button
        onClick={scrollUp}
        className="absolute -top-5 left-1/2  transform -translate-x-1/3 bg-blue-950 text-white p-2 rounded-full z-10"
      >
        <FaChevronUp size={20} />
      </button>

      <div className="grid grid-rows-2 h-full gap-12 w-96 ml-5 overflow-auto">
        {menuItems.slice(startIndex, startIndex + itemsPerPage).map((item) => (
          <div
          
            key={item.id}
            className="h-[220px] mt-8 w-245 md:min-w-[255px] backdrop-blur-xl border-none rounded-lg  py-0 cursor-pointer flex flex-col items-center "

          >
            <img src={bg} className='h-52 w-80 rounded-sm'/>
            <div className="w-40 flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.6 }}
                src={item.picture}
                alt="image"
                className="w-40 h-[100px] -mt-52 -ml-16 rounded-full"
              />
              
            </div>
            <div className="w-full -mt-40 flex -ml-32 flex-col gap-3 items-end justify-end">
              <p className=" text-ellipsis text-yellow-50 ml-4  font-bold  md:text-lg font-sans">
                {item.mealName}
              </p>
              <p className="mt-1 text-[#C5AB9D] font-bold text-xl">{item.day}</p>
              <div className="flex items-center gap-10">
                <p className="text-lg text-white font-semibold">
                  <span className="text-xl text-white">{item.mealPrice}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

 
      <button
        onClick={scrollDown}
        className="absolute top-full left-1/2 transform -translate-x-1/2 p-2 bg-blue-950 text-white rounded-full z-10"
      >
        <FaChevronDown size={20} />
      </button>
    </div>
  );
}

export default ListContainer;