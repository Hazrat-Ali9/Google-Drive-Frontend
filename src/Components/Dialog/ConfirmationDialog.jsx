import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ConfirmationDialog({
  open,
  setOpen,
  onConfirm,
  message,
  title

}) {

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>
         {message}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => onConfirm()}
            className="mr-1"
          >
            <span>Delete</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

// Confirmtion Dialog