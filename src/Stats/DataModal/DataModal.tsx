import React from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { ApiLeaderboard } from "../apiType";
import { useAdventOfCodeJson } from "../AdventOfCodeContext";
import { DataObject } from "@mui/icons-material";

const verifiedJSONData = (jsonData: string) => {
  try {
    JSON.parse(jsonData);
    return true;
  } catch (e) {
    return false;
  }
};

const DataModal: React.FunctionComponent = () => {
  const [jsonData, setJsonData] = React.useState("");
  const [error, setError] = React.useState("");

  const { setLeaderboard, leaderboard } = useAdventOfCodeJson();
  const [open, setOpen] = React.useState(!leaderboard);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setJsonData(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = () => {
    if (verifiedJSONData(jsonData)) {
      setLeaderboard(JSON.parse(jsonData) as ApiLeaderboard);
      setOpen(false);
    } else {
      setError("Invalid JSON");
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        startIcon={<DataObject />}
        sx={{ borderRadius: 0 }}
      >
        Import JSON
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Paste JSON</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText sx={{ wordBreak: "break-word" }}>
              {
                "https://adventofcode.com/2023/leaderboard/private/view/{id}.json"
              }
            </DialogContentText>
            <TextField
              value={jsonData}
              onChange={handleChange}
              label={"JSON"}
              multiline
              rows={10}
              error={!!error}
              helperText={error}
              fullWidth
              margin="normal"
            ></TextField>
            <Button onClick={onSubmit} color="primary" fullWidth>
              LOAD
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataModal;
