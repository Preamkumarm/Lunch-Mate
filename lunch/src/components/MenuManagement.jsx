// // // import React, { useState } from 'react';

// // // const MenuManagement = ({ menuItems, onReplace, onDelete }) => {
// // //   const [selectedIndex, setSelectedIndex] = useState(null);
// // //   const [action, setAction] = useState(''); // Track the selected action
// // //   const [name, setName] = useState('');
// // //   const [price, setPrice] = useState('');
// // //   const [picture, setPicture] = useState(null);

// // //   const handleSelectItem = (e) => {
// // //     const index = parseInt(e.target.value, 10); // Convert to integer
// // //     setSelectedIndex(index);
// // //     setName(menuItems[index]?.name || '');
// // //     setPrice(menuItems[index]?.price || '');
// // //     setPicture(menuItems[index]?.picture || null);
// // //     setAction(''); // Reset action on food selection
// // //   };

// // //   const handleActionChange = (e) => {
// // //     setAction(e.target.value);
// // //   };

// // //   const handleImageUpload = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setPicture(reader.result);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   const handleReplace = () => {
// // //     if (selectedIndex !== null && name && price && picture) {
// // //       const newItem = { name, price, picture };
// // //       onReplace(selectedIndex, newItem);
// // //       resetForm();
// // //     }
// // //   };

// // //   const handleDelete = () => {
// // //     if (selectedIndex !== null) {
// // //       onDelete(selectedIndex);
// // //       resetForm();
// // //     }
// // //   };

// // //   const resetForm = () => {
// // //     setSelectedIndex(null);
// // //     setName('');
// // //     setPrice('');
// // //     setPicture(null);
// // //     setAction('');
// // //   };

// // //   return (
// // //     <div className="menu-management">
// // //       <select 
// // //         className="menu-select" 
// // //         value={selectedIndex !== null ? selectedIndex : ''} 
// // //         onChange={handleSelectItem}
// // //       >
// // //         <option value="" disabled>Choose Food</option>
// // //         {menuItems.map((item, index) => (
// // //           <option key={index} value={index}>
// // //             {item.name}
// // //           </option>
// // //         ))}
// // //       </select>

// // //       {selectedIndex !== null && (
// // //         <select className="action-select" value={action} onChange={handleActionChange}>
// // //           <option value="" disabled>Choose Action</option>
// // //           <option value="edit">Edit</option>
// // //           <option value="delete">Delete</option>
// // //           <option value="replace">Replace</option>
// // //         </select>
// // //       )}

// // //       {action === 'edit' && (
// // //         <>
// // //           <input 
// // //             type="text" 
// // //             placeholder="New Name" 
// // //             value={name} 
// // //             onChange={(e) => setName(e.target.value)} 
// // //             className="menu-input" 
// // //           />
// // //           <input 
// // //             type="text" 
// // //             placeholder="New Price" 
// // //             value={price} 
// // //             onChange={(e) => setPrice(e.target.value)} 
// // //             className="menu-input" 
// // //           />
// // //           <input 
// // //             type="file" 
// // //             accept="image/*" 
// // //             onChange={handleImageUpload} 
// // //             className="menu-input" 
// // //           />
// // //           <button className="action-button" onClick={handleReplace}>
// // //             Save Changes
// // //           </button>
// // //         </>
// // //       )}

// // //       {action === 'delete' && (
// // //         <button className="action-button delete-button" onClick={handleDelete}>
// // //           Delete
// // //         </button>
// // //       )}

// // //       {action === 'replace' && (
// // //         <>
// // //           <input 
// // //             type="text" 
// // //             placeholder="New Name" 
// // //             value={name} 
// // //             onChange={(e) => setName(e.target.value)} 
// // //             className="menu-input" 
// // //           />
// // //           <input 
// // //             type="text" 
// // //             placeholder="New Price" 
// // //             value={price} 
// // //             onChange={(e) => setPrice(e.target.value)} 
// // //             className="menu-input" 
// // //           />
// // //           <input 
// // //             type="file" 
// // //             accept="image/*" 
// // //             onChange={handleImageUpload} 
// // //             className="menu-input" 
// // //           />
// // //           <button className="action-button" onClick={handleReplace}>
// // //             Replace
// // //           </button>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default MenuManagement;

// import React, { useState } from 'react';
// import Navbar from './Navbar';
// import OrderProgressBar from './OrderProgressBar';
// import WeeklyOrdersProgressBar from './WeeklyOrdersProgressBar';
// import Reports from './Reports';
// import Modal from 'react-modal';
// import { useContext } from 'react';
// import { Namecontext } from '../App';
// import axios from 'axios'



// const Dashboard = () => {
//   const {menuItems,setMenuItems}=useContext(Namecontext)

  

//   const [selectedItems, setSelectedItems] = useState({
//     Monday: menuItems[0],
//     Tuesday: menuItems[1],
//     Wednesday: menuItems[2],
//     Thursday: menuItems[3],
//     Friday: menuItems[4],
//   });
  
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [modalType, setModalType] = useState(null);
//   const [newItem, setNewItem] = useState({ MealName: '', MealPrice: '', picture: '' });
//   const [selectedDay, setSelectedDay] = useState('Monday');
//   const [selectedMenuItem, setSelectedMenuItem] = useState('');

 
//   const customerOrders = {
//     Monday: ['Kavinaya', 'Madhan', 'Kishore', 'Pream'],
//     Tuesday: ['Krithika', 'Abin', 'Dev', 'Ram', 'Neha', 'Alice', 'Poranima', 'Nive'],
//     Wednesday: ['Krithika', 'Abin', 'Dev', 'Ram', 'Neha', 'Alice', 'Poranima', 'Nive', 'Alice', 'Bob', 'Charlie', 'Bob', 'Charlie', 'Dev', 'Ram'],
//     Thursday: ['Alice', 'Kavinaya', 'Madhan', 'Kishore', 'Pream'],
//     Friday: ['Bob', 'Charlie', 'Dev', 'Ram', 'Neha', 'Alice', 'Poranima', 'Nive', 'Alice'],
//   };

//   const orders = Object.values(customerOrders).map(orderList => orderList.length);
//   const lastWeekOrders = [20, 18, 15, 10, 5];

//   const openModal = (type) => {
//     setModalType(type);
//     console.log(type)
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setNewItem({ MealName: '', MealPrice: '', picture: '' });
//     setSelectedMenuItem('');
//   };

//   const handleAddMenuItem = () => {
//     if (newItem.MealName && newItem.MealPrice && newItem.picture) {
//       const payload = {
//         title: newItem.MealName,
//         price: newItem.MealPrice,
//         picture: newItem.picture,
//       };
  
//       axios.post('https://localhost:7206/Meal/Create/Meal', payload, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(response => {
        
//         if (response.status === 200 || response.status === 201) {
//           console.log(response)
//           setMenuItems([...menuItems, newItem]);
//           closeModal();
//         } else {
//           console.error("Failed to add new item", response);
//         }
//       })
//       .catch(error => {
//         console.error("Error adding new item:", error);
//       });
//     } else {
//       alert("Please fill in all fields.");
//     }
//   };

//   const handleDeleteMenuItem = () => {
//     if (!selectedMenuItem) return;
  
  
//     axios
//       // .delete('http://localhost:5286/Meal/Meal', {
//       //   data: { title: selectedMenuItem },
//       // })
//       .then((response) => {
//         if (response.status === 200) {
//           // Remove item from the UI
//           const updatedMenuItems = menuItems.filter(
//             (item) => item.MealName !== selectedMenuItem
//           );
//           setMenuItems(updatedMenuItems);
  
//           setSelectedItems((prevSelectedItems) => {
//             const updatedSelectedItems = { ...prevSelectedItems };
//             Object.keys(updatedSelectedItems).forEach((day) => {
//               if (updatedSelectedItems[day].MealName === selectedMenuItem) {
//                 updatedSelectedItems[day] = updatedMenuItems[0] || null;
//               }
//             });
//             return updatedSelectedItems;
//           });
  
//           // Close modal after successful deletion
//           closeModal();
//         } else {
//           console.error('Failed to delete the item from the server');
//         }
//       })
//       .catch((error) => {
//         console.error('Error deleting the item:', error);
//       });
//   };
//   const handleUpdateDayMenu = (info) => {
//     const selectedItem = menuItems.find(item => item.MealName === selectedMenuItem);
//     setSelectedItems(prevState => ({
//       ...prevState,
//       [selectedDay]: selectedItem,
//     }));
//     closeModal();
//   };

//   return (
//     <div className="dashboard" id="dashboard">
//       <Navbar openReportModal={() => openModal('report')} id="navbar" />
//       <div className="content" id="content">
//         <div className="dashboard-grid" id="dashboard-grid">
//           <div className="dashboard-box" id="order-progress-box">
//             <h2>Order Progress</h2>
//             <OrderProgressBar orders={orders} customerOrders={customerOrders} />
//           </div>
//           <div className="dashboard-box" id="weekly-orders-box">
//             <h2>Previous Week</h2>
//             <WeeklyOrdersProgressBar orders={lastWeekOrders} />
//           </div>
//         </div>

//         <div className="menu-management-box" id="menu-management-box">
//           <div className="menu-header" id="menu-header">
//             <h2 id="menu-title">Menu Management</h2>
//             <div className="menu-actions" id="menu-actions">
//               <button className="action-button" id="add-button" onClick={() => openModal('add')}>Add</button>
//               <button className="action-button" id="delete-button" onClick={() => openModal('delete')}>Delete</button>
//               <button className="action-button" id="update-button" onClick={() => openModal('update')}>Update</button>
//             </div>
//           </div>
//           <div className="menu-items" id="menu-items">
//             {Object.keys(selectedItems).map((day) => (
//               <div key={day} className="menu-item" id={`menu-item-${day}`}>
//                 <h3 id={`day-title-${day}`}>{day}</h3>
//                 {selectedItems[day] ? (
//                   <>
//                     <img src={selectedItems[day].picture} alt={selectedItems[day].name} className="product-image" id={`product-image-${day}`} />
//                     <p id={`product-name-${day}`}>{selectedItems[day].title}</p>
//                     <p id={`product-price-${day}`}>{selectedItems[day].price}</p>
//                   </>
//                 ) : (
//                   <p id={`no-item-selected-${day}`}>No item selected</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Modal for Add, Delete, Update actions */}
//         <Modal
//           isOpen={modalIsOpen && modalType !== 'report'}
//           onRequestClose={closeModal}
//           contentLabel={`${modalType} Menu Item`}
//           className="menu-modal"
//           overlayClassName="menu-modal-overlay"
//           id={`${modalType}-modal`}
//         >
//           <button className="close-button-x" id="modal-close-button" onClick={closeModal}>×</button>

//           {modalType === 'add' && (
//             <>
//               <h2 id="add-modal-title">Add New Menu Item</h2>
//               <input 
//                 type="text" 
//                 placeholder="Name" 
//                 value={newItem.title} 
//                 onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} 
//                 className="menu-input"
//                 id="add-item-name"
//               />
//               <input 
//                 type="text" 
//                 placeholder="Price" 
//                 value={newItem.price} 
//                 onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} 
//                 className="menu-input"
//                 id="add-item-price"
//               />
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     const reader = new FileReader();
//                     reader.onloadend = () => {
//                       setNewItem({ ...newItem, picture: reader.result });
//                     };
//                     reader.readAsDataURL(file);
//                   }
//                 }} 
//                 className="menu-input"
//                 id="add-item-picture"
//               />
//               <button className="action-button" id="add-item-button" onClick={handleAddMenuItem}>Add Item</button>
//             </>
//           )}

//           {modalType === 'delete' && (
//             <>
//               <h2 id="delete-modal-title">Delete Menu Item</h2>
//               <select 
//                 value={selectedMenuItem} 
//                 onChange={(e) => setSelectedMenuItem(e.target.value)} 
//                 className="menu-select"
//                 id="delete-item-select"
//               >
//                 <option value="" disabled>Select item to delete</option>
//                 {menuItems.map(item => (
//                   <option key={item.name} value={item.title}>{item.title}</option>
//                 ))}
//               </select>
//               <button className="delete-button" id="delete-item-button" onClick={handleDeleteMenuItem}>Delete Item</button>
//             </>
//           )}

//           {modalType === 'update' && (
//             <>
//               <h2 id="update-modal-title">Update Day Menu</h2>
//               <select 
//                 value={selectedDay} 
//                 onChange={(e) => setSelectedDay(e.target.value)} 
//                 className="menu-select"
//                 id="update-day-select"
//               >
//                 <option value="Monday">Monday</option>
//                 <option value="Tuesday">Tuesday</option>
//                 <option value="Wednesday">Wednesday</option>
//                 <option value="Thursday">Thursday</option>
//                 <option value="Friday">Friday</option>
//               </select>
//               <select 
//                 value={selectedMenuItem} 
//                 onChange={(e) => setSelectedMenuItem(e.target.value)} 
//                 className="menu-select"
//                 id="update-item-select"
//               >
//                 <option value="" disabled>Select item to update</option>
//                 {menuItems.map(item => (
//                   <option key={item.name} value={item.title}>{item.title}</option>
//                 ))}
//               </select>
//               <button className="action-button" id="update-item-button" onClick={handleUpdateDayMenu}>Update Menu</button>
//             </>
//           )}
//         </Modal>

//         {/* Report Modal */}
//         <Modal
//           isOpen={modalIsOpen && modalType === 'report'}
//           onRequestClose={closeModal}
//           contentLabel="Customer Orders Report"
//           className="report-modal"
//           overlayClassName="report-modal-overlay"
//           id="report-modal"
//         >
//           <button className="close-button-x" id="report-close-button" onClick={closeModal}>×</button>
//           <Reports customerOrders={customerOrders} />
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
