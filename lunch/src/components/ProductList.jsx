// import React from 'react';

// const ProductList = ({ selectedItems, menuItems, onSelectItem }) => {
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

//   return (
//     <div className="product-list">
//       {days.map((day) => (
//         <div key={day} className="product-item">
//           <h3>{day}</h3>
//           <img src={selectedItems[day].picture} alt={selectedItems[day].name} className="product-image" />
//           <p>{selectedItems[day].name}</p>
//           <p>{selectedItems[day].price}</p>
//           <select 
//             onChange={(e) => onSelectItem(day, e.target.value)} 
//             className="menu-select"
//           >
//             <option value="" disabled selected>Choose Food</option>
//             {menuItems.map((item, index) => (
//               <option key={index} value={index}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
