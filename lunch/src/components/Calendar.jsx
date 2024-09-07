import React, { useState, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  LinearProgress,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { Namecontext } from "../App";
import axios from "axios";

const CalendarContainer = styled("div")({
  padding: "10px",
  marginTop: "0px",
  width: "70%",
  height: "90%",
  position: "relative",
  marginLeft: "350px",
  background: "#d1d4e3",
  borderRadius: "15px",
  boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)",
  },
});

const StyledEvent = styled("div")({
  backgroundColor: "#091644",
  color: "white",
  fontWeight: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "100%",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const Calendar = () => {
  const { menuItems, setMenuItems, user } = useContext(Namecontext);
  const [open, setOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [orderStatus, setOrderStatus] = useState({});
  const [isOrdering, setIsOrdering] = useState(false);

  const handleClose = () => setOpen(false);

  const handleShow = (info) => {
    setSelectedEvent(info.event);
    setFoodDetails({
      mealName: info.event.extendedProps.mealName,
      picture: info.event.extendedProps.picture,
      mealPrice: info.event.extendedProps.mealPrice,
      quantity: info.event.extendedProps.quantity,
      orderDate: info.event.extendedProps.orderDate,
    });
    setOpen(true);
  };

  useEffect(() => {
    if (selectedEvent) {
      const checkOrder = () => {
        axios
          .get(`https://localhost:7206/api/Order/GetOrder/${user.userId}`)
          .then((response) => {
            const orders = response.data;
            const hasOrder = orders.some(
              (order) =>
                order.mealName === selectedEvent.extendedProps.mealName &&
                order.orderDate === selectedEvent.extendedProps.orderDate
            );
            setOrderStatus((prevStatus) => ({
              ...prevStatus,
              [selectedEvent.extendedProps.orderDate]: hasOrder,
            }));
          })
          .catch((error) => {
            console.error("Error fetching order data:", error);
          });
      };

      checkOrder();
    }
  }, [selectedEvent, user.userId]);

  const handleOrder = () => {
    setIsOrdering(true);
    const payload = {
      mealName: selectedEvent.extendedProps.mealName,
      quantity: selectedEvent.extendedProps.quantity,
      userId: user.userId,
      orderDate: selectedEvent.extendedProps.orderDate,
    };

    axios
      .post("https://localhost:7206/api/Order/OrderCreated", payload)
      .then((response) => {
        console.log(response.data);
        setMenuItems(
          menuItems.map((item) =>
            item.mealName === selectedEvent.extendedProps.mealName &&
            item.orderDate === selectedEvent.extendedProps.orderDate
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        setFoodDetails((prevDetails) => ({
          ...prevDetails,
          quantity: prevDetails.quantity + 1,
        }));
        setOrderStatus((prevStatus) => ({
          ...prevStatus,
          [selectedEvent.extendedProps.orderDate]: true,
        }));
        handleClose();
      })
      .catch((error) => {
        console.log("Order cannot be placed:", error);
      })
      .finally(() => {
        setIsOrdering(false);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://localhost:7206/api/Order/DeleteOrder/${user.userId}/${selectedEvent.extendedProps.orderDate}`
      )
      .then((response) => {
        console.log("Deleted Successfully", response.data);
        if (foodDetails.quantity > 0) {
          setMenuItems(
            menuItems.map((item) =>
              item.mealName === selectedEvent.extendedProps.mealName &&
              item.orderDate === selectedEvent.extendedProps.orderDate
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          );

          setFoodDetails((prevDetails) => ({
            ...prevDetails,
            quantity: prevDetails.quantity - 1,
          }));
        }
        setOrderStatus((prevStatus) => ({
          ...prevStatus,
          [selectedEvent.extendedProps.orderDate]: false,
        }));
        setIsOrdering(false);
      })
      .catch((error) => {
        console.log("Order failed to delete", error);
        setIsOrdering(false);
      });
  };

  const progressBarColor =
    foodDetails.quantity > 5
      ? foodDetails.quantity > 14
        ? "green"
        : "orange"
      : "red";

  // Get the start and end dates of the current week
  const startOfWeek = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const start = new Date(now);
    start.setDate(now.getDate() - dayOfWeek);
    return start;
  }, []);

  const endOfWeek = useMemo(() => {
    const start = new Date(startOfWeek);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  }, [startOfWeek]);

  const getStartOfNextWeek = () => {
    const start = new Date();
    start.setDate(start.getDate() + (7 - start.getDay()));
    const end = new Date(start)
    end.setDate(start.getDate()+5)
    return {start,end};
  };
  // Filter menuItems to include only those from the current week
  const filteredMenuItems = useMemo(() => {
    console.log(menuItems);
    const {start,end} = getStartOfNextWeek()
    console.log(start,end);

    return menuItems.filter(item => {
      const orderDate = new Date(item.orderDate);
      console.log(orderDate,start.toDateString(),end.toDateString(),orderDate >= start);
      
      return orderDate >= start;
    });
  }, [menuItems, startOfWeek, endOfWeek]);
  console.log(filteredMenuItems);
  
  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={filteredMenuItems.map((item) => ({
          ...item,
          start: item.orderDate,
        }))}
        eventClick={handleShow}
        eventContent={(eventInfo) => (
          <StyledEvent>{eventInfo.event.extendedProps.mealName}</StyledEvent>
        )}
        contentHeight="auto"
        dayMaxEventRows={true}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Zoom}
        keepMounted
        style={{
          width: "30%",
          height: "50%",
          marginLeft: "30%",
          top: "15%",
        }}
      >
        <DialogTitle
          style={{ position: "sticky", position: "absolute", height: "20px" }}
        >
          {foodDetails.mealName}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d1d4e3" }}>
          <img
            src={foodDetails.picture}
            alt={foodDetails.mealName}
            style={{ width: "30%", height: "30%", marginTop: "15%" }}
          />
          <Typography variant="h6" style={{ fontSize: "20px" }}>
            Price: {foodDetails.mealPrice}
          </Typography>
          <Typography variant="subtitle1">
            Quantity Ordered: {foodDetails.quantity}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(foodDetails.quantity / 30) * 100}
            style={{
              marginTop: 16,
              backgroundColor: "#e0e0e0",
              height: 10,
              borderRadius: 5,
            }}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: progressBarColor,
                transition: "background-color 0.3s, width 0.3s",
              },
            }}
          />
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#d1d4e3" }}>
          <Button
            variant="contained"
            onClick={handleOrder}
            disabled={isOrdering || orderStatus[foodDetails.orderDate]}
          >
            {isOrdering
              ? "Ordering..."
              : orderStatus[foodDetails.orderDate]
              ? "Ordered"
              : "Order Now"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            style={{ borderColor: "#091644", color: "#091644" }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={isOrdering || !orderStatus[foodDetails.orderDate]}
          >
            {isOrdering ? "Deleting..." : "Cancel Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </CalendarContainer>
  );
};

export default Calendar;
