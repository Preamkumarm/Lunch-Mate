import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import OrderProgressBar from './OrderProgressBar';
import WeeklyOrdersProgressBar from './WeeklyOrdersProgressBar';
import Reports from './Reports';
import Modal from 'react-modal';
import { useContext } from 'react';
import { Namecontext } from '../App';
import axios from 'axios'



const Dashboard = () => {
  const {menuItems,setMenuItems}=useContext(Namecontext)

  

  const [selectedItems, setSelectedItems] = useState({
    Monday: menuItems[0],
    Tuesday: menuItems[1],
    Wednesday: menuItems[2],
    Thursday: menuItems[3],
    Friday: menuItems[4],
  });
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [newItem, setNewItem] = useState({ mealName: '', mealPrice: '', picture: '' });
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const[meals,setMeals]=useState([])

 
  const customerOrders = {
    Monday: ['Kavinaya', 'Madhan', 'Kishore', 'Pream'],
    Tuesday: ['Krithika', 'Abin', 'Dev', 'Ram', 'Neha', 'Alice', 'Poranima', 'Nive'],
    Wednesday: ['Krithika', 'Abin', 'Dev', 'Ram', 'Neha', 'Alice', 'Poranima', 'Nive', 'Alice', 'Bob', 'Charlie', 'Bob', 'Charlie', 'Dev', 'Ram'],
    Thursday: ['Alice', 'Kavinaya', 'Madhan', 'Kishore', 'Pream'],
    Friday: ['Bob', 'Charlie', 'Dev', 'Ram', 'Neha', 'Alice', 'Poranima', 'Nive', 'Alice'],
  };

  const orders = Object.values(customerOrders).map(orderList => orderList.length);
  const lastWeekOrders = [20, 18, 15, 10, 5];


  // useEffect(() => {
  //   axios.get("https://localhost:7206/Meal/GetAllMeal")
  //     .then(response => {
  //       const fetchedMeals = response.data;
  //       setMenuItems(fetchedMeals); // Assuming you want to set the global state as well
  //       setMeals(fetchedMeals); // Store fetched meals in local state
  //       console.log("Fetched meals:", fetchedMeals);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching meals:", error);
  //     });
  // }, [setMenuItems]);

  // Update the selected items for each day
  useEffect(() => {
    if (menuItems.length) {
      setSelectedItems(prevSelectedItems => {
        const updatedSelectedItems = { ...prevSelectedItems };
        Object.keys(updatedSelectedItems).forEach(day => {
          updatedSelectedItems[day] = menuItems.find(item => item.mealName === updatedSelectedItems[day]?.mealName) || null;
        });
        return updatedSelectedItems;
      });
    }
  }, [menuItems]);


  const openModal = (type) => {
    setModalType(type);
    console.log(type)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewItem({ mealName: '', mealPrice: '', picture: '', day:'' });
    setSelectedMenuItem('');
  };

// useEffect(()=>{
//      axios.get("https://localhost:7206/Meal/GetAllMeal")
//      .then(()=>{
//       if (newItem.mealName && newItem.mealPrice && newItem.picture) {
//         setMenuItems([...menuItems, newItem]);
//         closeModal();
//       }
//      })
// },[])
  const handleAddMenuItem = () => {
    axios.post("https://localhost:7206/Meal/Create/Meal",{
      mealName:newItem.mealName,
      mealPrice:newItem.mealPrice,
      userId:""
    }).then(()=>{
      if (newItem.mealName && newItem.mealPrice && newItem.picture) {
        setMenuItems([...menuItems, newItem]);
        closeModal();
      }
    })
    .catch(error=>{
      console.log("Error adding new item",error)
    })
    
  };

  const handleDeleteMenuItem = () => {
    axios.delete(`https://localhost:7206/meal/DeleteMeal/${encodeURIComponent(selectedMenuItem)}`)
    .then(response => {
      console.log("Meal deleted successfully:", response.data);

      // Update the menu items after deletion
      const updatedMenuItems = menuItems.filter(item => item.mealName !== selectedMenuItem);
      setMenuItems(updatedMenuItems);
  
      // Update selected items based on the new menu
      setSelectedItems(prevSelectedItems => {
        const updatedSelectedItems = { ...prevSelectedItems };
        Object.keys(updatedSelectedItems).forEach(day => {
          if (updatedSelectedItems[day]?.mealName === selectedMenuItem) {
            updatedSelectedItems[day] = updatedMenuItems[0] || null;
          }
        });
        return updatedSelectedItems;
      });
  
      closeModal();
    })
    .catch(error => {
      console.error("Error deleting meal:", error);
    });
};




  const handleUpdateDayMenu = (info) => {
    const selectedItem = menuItems.find(item => item.mealName === selectedMenuItem);
  
    if (selectedItem) {
      axios.put("https://localhost:7206/Meal/EditMeal/")
      .then(response => {
        console.log("meal updated successfully:", response.data);
        setSelectedItems(prevState => ({
          ...prevState,
          [selectedDay]: selectedItem,
        }));
        
        closeModal();
      })
      .catch(error => {
        console.error("meal is not update:", error);
      });
    } else {
      console.error("Selected item not found");
    }
  };
  return (
    <div className="dashboard" id="dashboard">
      <Navbar openReportModal={() => openModal('report')} id="navbar" />
      <div className="content" id="content">
        <div className="dashboard-grid" id="dashboard-grid">
          <div className="dashboard-box" id="order-progress-box">
            <h2>Order Progress</h2>
            <OrderProgressBar orders={orders} customerOrders={customerOrders} />
          </div>
          <div className="dashboard-box" id="weekly-orders-box">
            <h2>Previous Week</h2>
            <WeeklyOrdersProgressBar orders={lastWeekOrders} />
          </div>
        </div>

        <div className="menu-management-box" id="menu-management-box">
          <div className="menu-header" id="menu-header">
            <h2 id="menu-title">Menu Management</h2>
            <div className="menu-actions" id="menu-actions">
              <button className="action-button" id="add-button" onClick={() => openModal('add')}>Add</button>
              <button className="action-button" id="delete-button" onClick={() => openModal('delete')}>Delete</button>
              <button className="action-button" id="update-button" onClick={() => openModal('update')}>Update</button>
            </div>
          </div>
          <div className="menu-items" id="menu-items">
            {Object.keys(selectedItems).map((day) => (
              <div key={day} className="menu-item" id={`menu-item-${day}`}>
                <h3 id={`day-title-${day}`}>{day}</h3>
                {selectedItems[day] ? (
                  <>
                    <img src={selectedItems[day].picture} alt={selectedItems[day].mealName} className="product-image" id={`product-image-${day}`} />
                    <p id={`product-name-${day}`}>{selectedItems[day].mealName}</p>
                    <p id={`product-price-${day}`}>{selectedItems[day].mealPrice}</p>
                  </>
                ) : (
                  <p id={`no-item-selected-${day}`}>No item selected</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Add, Delete, Update actions */}
        <Modal
          isOpen={modalIsOpen && modalType !== 'report'}
          onRequestClose={closeModal}
          appElement={document.getElementById("root")}
          contentLabel={`${modalType} Menu Item`}
          className="menu-modal"
          overlayClassName="menu-modal-overlay"
          id={`${modalType}-modal`}
        >
          <button className="close-button-x" id="modal-close-button" onClick={closeModal}>×</button>

          {modalType === 'add' && (
            <>
              <h2 id="add-modal-title">Add New Menu Item</h2>
              <input 
                type="text" 
                placeholder="Name" 
                value={newItem.mealName} 
                onChange={(e) => setNewItem({ ...newItem, mealName: e.target.value })} 
                className="menu-input"
                id="add-item-name"
              />
              <input 
                type="text" 
                placeholder="Price" 
                value={newItem.mealPrice} 
                onChange={(e) => setNewItem({ ...newItem, mealPrice: e.target.value })} 
                className="menu-input"
                id="add-item-price"
              />
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewItem({ ...newItem, picture: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }} 
                className="menu-input"
                id="add-item-picture"
              />
              <button className="action-button" id="add-item-button" onClick={handleAddMenuItem}>Add Item</button>
            </>
          )}

          {modalType === 'delete' && (
            <>
              <h2 id="delete-modal-title">Delete Menu Item</h2>
              <select 
                value={selectedMenuItem} 
                onChange={(e) => setSelectedMenuItem(e.target.value)} 
                className="menu-select"
                id="delete-item-select"
              >
                <option value="" disabled>Select item to delete</option>
                {menuItems.map(item => (
                  <option key={item.name} value={item.mealName}>{item.mealName}</option>
                ))}
              </select>
              <button className="delete-button" id="delete-item-button" onClick={handleDeleteMenuItem}>Delete Item</button>
            </>
          )}

          {modalType === 'update' && (
            <>
              <h2 id="update-modal-title">Update Day Menu</h2>
              <select 
                value={selectedDay} 
                onChange={(e) => setSelectedDay(e.target.value)} 
                className="menu-select"
                id="update-day-select"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
              <select 
                value={selectedMenuItem} 
                onChange={(e) => setSelectedMenuItem(e.target.value)} 
                className="menu-select"
                id="update-item-select"
              >
                <option value="" disabled>Select item to update</option>
                {menuItems.map(item => (
                  <option key={item.name} value={item.mealName}>{item.mealName}</option>
                ))}
              </select>
              <button className="action-button" id="update-item-button" onClick={handleUpdateDayMenu}>Update Menu</button>
            </>
          )}
        </Modal>

        {/* Report Modal */}
        <Modal
          isOpen={modalIsOpen && modalType === 'report'}
          onRequestClose={closeModal}
          contentLabel="Customer Orders Report"
          className="report-modal"
          overlayClassName="report-modal-overlay"
          id="report-modal"
        >
          <button className="close-button-x" id="report-close-button" onClick={closeModal}>×</button>
          <Reports customerOrders={customerOrders} />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
