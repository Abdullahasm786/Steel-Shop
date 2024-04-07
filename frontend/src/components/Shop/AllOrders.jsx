import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import * as XLSX from "xlsx";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const [showDownloadAnimation, setShowDownloadAnimation] = useState(false);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      const exchangeRate = 75; // Assuming 1 US dollar = 75 Indian rupees
      const totalPriceInRupees = exchangeRate * item.totalPrice;
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "₹ " + totalPriceInRupees,
        status: item.status,
      });
    });

  const handleDownload = () => {
    alert("The Report Has Been Generating , Please wait for few Minutes !");
    // Logic for downloading the data goes here
    setShowDownloadAnimation(true);
    // Convert data to Excel format
    const worksheet = XLSX.utils.json_to_sheet(row);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
      // Add message to Excel file
  const message = "Thanks for downloading!";
  const messageSheet = XLSX.utils.aoa_to_sheet([[message]]);
  XLSX.utils.book_append_sheet(workbook, messageSheet, "Message");
    // Save Excel file
    XLSX.writeFile(workbook, "orders.xlsx");
    // Simulate animation timeout, you can replace it with your actual animation logic
    setTimeout(() => {
      setShowDownloadAnimation(false);
    }, 2000); // Adjust the duration as needed
  };

  return (
    <>
     <Button
  variant="contained"
  color="primary"
  onClick={handleDownload}
  style={{ position: "fixed", top: 82, right: 30, zIndex: 9999 }}
>
  Download
</Button>

      {showDownloadAnimation && (
        <div className="download-animation">
          <div className="animation-circle"></div>
          <div className="animation-circle"></div>
          <div className="animation-circle"></div>
          <div className="animation-circle"></div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllOrders;
