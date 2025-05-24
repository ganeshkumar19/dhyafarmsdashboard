import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useModalStore } from "../store/useModalStore";

const ConfigureButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { openModal } = useModalStore(); // Zustand store for handling modals

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu items with corresponding modal identifiers
  const menuItems = [
    { id: 1, label: "Add Farm", modal: "addFarm" },
    { id: 2, label: "Add Manual Data", modal: "addManualData" },
    { id: 3, label: "Configure Farm", modal: "configureFarm" },
    { id: 4, label: "Purchase Device", modal: "purchaseDevice" },
    { id: 5, label: "Raise Ticket", modal: "raiseTicket" },
  ];

  // Handle menu click to open corresponding modal
  const handleMenuClick = (modalType: string) => {
    openModal(modalType); // Open the correct modal using Zustand store
    handleClose(); // Close the menu after clicking
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ color: "var(--secondary-color)" }}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuItems.map((menu) => (
          <MenuItem
            key={menu.id}
            onClick={() => handleMenuClick(menu.modal)}
            sx={{ fontFamily: "var(--font-family)" }}
          >
            {menu.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ConfigureButton;
