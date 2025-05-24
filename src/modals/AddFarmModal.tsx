import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Box,
  Button
} from "@mui/material";
import { useModalStore } from "../store/useModalStore";
import RequestCancelButton from "../components/RequestCancelButton";

interface FormField {
  label: string;
  type: string;
  name: keyof FormData;
  placeholder: string;
}

interface FormData {
  farmName: string;
  farmType: string;
  farmArea: string;
  address: string;
  city: string;
  mobileNo: string;
}

interface Errors {
  farmName?: string;
  farmType?: string;
  farmArea?: string;
  address?: string;
  city?: string;
  mobileNo?: string;
}

const AddFarmModal: React.FC = () => {
  const { activeModal, closeModal, submitForm, updateFormData, formData } = useModalStore();
  
  const [errors, setErrors] = useState<Errors>({});

  const validateInput = (name: keyof FormData, value: string): void => {
    let error = "";
    switch (name) {
      case "farmName":
        if (!value.trim()) error = "Farm name is required";
        break;
      case "farmArea":
        if (!/^\d+(\.\d{1,2})?$/.test(value)) error = "Enter a valid area (numbers only)";
        break;
      case "mobileNo":
        if (!/^\d{10}$/.test(value)) error = "Enter a valid 10-digit mobile number";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
    validateInput(name as keyof FormData, value);
  };

  const formFields: FormField[] = [
    { label: "Farm Name", name: "farmName", type: "text", placeholder: "Enter Farm Name" },
    { label: "Farm Type", name: "farmType", type: "text", placeholder: "Enter Farm Type" },
    { label: "Farm Area (acres)", name: "farmArea", type: "text", placeholder: "Enter Farm Area" },
    { label: "Address", name: "address", type: "text", placeholder: "Enter Address" },
    { label: "City", name: "city", type: "text", placeholder: "Enter City" },
    { label: "Mobile No", name: "mobileNo", type: "text", placeholder: "Enter Mobile No" },
  ];

  return (
    <Dialog open={activeModal === "addFarm"} onClose={closeModal} maxWidth="sm" fullWidth >
      <DialogTitle sx={{backgroundColor: 'var(--ternary-color)'}}>Add New Farm</DialogTitle>
      <DialogContent sx={{
      backgroundColor: "var(--ternary-color)",
      maxHeight: "90vh", // ✅ Limits height to avoid excessive growth
      overflowY: "auto", // ✅ Enables scrolling inside the modal content
      "&::-webkit-scrollbar": { width: "6px" }, // ✅ Thin scrollbar
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--secondary-color)",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "var(--secondary-color)",
      },
    }}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            backgroundColor: "var(--ternary-color)",
            padding: { xs: "20px", sm: "30px" },
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontFamily: "var(--font-family)",
              fontWeight: "400",
              mb: 3,
              fontSize: { xs: "var(--font-size-medium)", sm: "var(--font-size-large)" },
            }}
          >
            Register Farm
          </Typography>

          {formFields.map((field, index) => (
            <Grid container key={index} alignItems="center" spacing={2} mb={1}>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    fontFamily: "var(--font-family)",
                  }}
                >
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  variant="outlined"
                  multiline={field.name === "address"}
                  rows={field.name === "address" ? 3 : 1}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "none" },
                    },
                    "& .MuiInputBase-root": {
                      height: field.name === "address" ? "auto" : "42px",
                      padding: "0",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "10px 10px",
                    },
                    "& input::placeholder": {
                      fontSize: { xs: "12px", sm: "14px", md: "16px" },
                      color: "black",
                      fontFamily: "var(--font-family)",
                    },
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Box>
        <RequestCancelButton primaryText="Submit" secondaryText="Cancel" handlePrimaryAction={submitForm} handleSecondaryAction={closeModal}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddFarmModal;
