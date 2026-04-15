import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
} from "@mui/material";

export interface FormDialogProps {
  open: boolean;
  title: string;
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  onClose: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface FormField {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  value?: any;
}

export const FormDialog: React.FC<FormDialogProps> = ({
  open,
  title,
  fields,
  onSubmit,
  onClose,
  isLoading = false,
  error,
}) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    const initialData: Record<string, any> = {};
    fields.forEach(field => {
      initialData[field.name] = field.value || "";
    });
    setFormData(initialData);
  }, [fields, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {fields.map(field => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type || "text"}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              multiline={field.multiline}
              rows={field.rows}
              fullWidth
              disabled={isLoading}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
