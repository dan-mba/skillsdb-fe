import {useState} from "react";
import {DialogActions, DialogContent, DialogTitle, TextField, Button, Rating, Typography, FormControl}
  from "@mui/material";
import {styled} from "@mui/material/styles";
import {put} from "aws-amplify/api";

const Content = styled(DialogContent)({
  display: 'flex',
  gap: '1rem',
});

export default function EditDialog({value, onClose}) {
  let skill = '';
  let oldRating = 1;
  if (value && value.length > 3) {
    oldRating = Number(value[0]);
    skill = value.slice(2);
  }
  let [rating, setRating] = useState(oldRating);

  function handleSubmit() {
    if (rating === oldRating) {
      onClose();
    }
    if (rating === 0) {
      return;
    }
    put('SkillsApi', '', {
      body: {
        skill,
        oldrating: oldRating,
        newrating: rating,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        onClose();
      })
      .catch(error => console.log(error));
  }

  function handleRating(event, newValue) {
    setRating(newValue);
  }

  return (
    <>
      <DialogTitle>Update Skill Rating</DialogTitle>
      <Content>
        <TextField id="skill" label="Skill" variant="outlined" margin='normal' value={skill} disabled/>
        <FormControl margin="normal">
          <Typography component="legend">Skill Rating</Typography>
          <Rating name="skill-rating" value={rating} onChange={handleRating}
            emptyLabelText="Rating must be between 1 and 5"
          />
        </FormControl>
      </Content>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </>
  )
}