import {useState} from "react";
import {DialogActions, DialogContent, DialogTitle, TextField, Button, Rating, Typography, FormControl}
  from "@mui/material";
import {styled} from "@mui/material/styles";
import {API} from "aws-amplify";

const Content = styled(DialogContent)({
  display: 'flex',
  gap: '1rem',
});

export default function AddDialog({onClose}) {
  let [skill, setSkill] = useState('');
  let [rating, setRating] = useState(3);
  let [error, setError] = useState(false);

  function handleSubmit() {
    if (skill.length === 0) {
      setError(true);
      return;
    }
    if (rating === 0) {
      return;
    }
    API.post('SkillsApi', '', {
      body: {
        skill,
        rating,
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

  function handleSkill(event) {
    if (error) {
      setError(false);
    }
    setSkill(event.target.value);
  }

  function handleRating(event, newValue) {
    setRating(newValue);
  }

  return (
    <>
      <DialogTitle>Add Skill</DialogTitle>
      <Content>
        <TextField id="skill" label="Skill" variant="outlined" margin='normal'
          error={error} helperText={error ? 'Skill is required' : ''}
          value={skill} onChange={handleSkill}
        />
        <FormControl margin="normal">
          <Typography component="legend">Skill Rating</Typography>
          <Rating name="skill-rating" value={rating} onChange={handleRating}
            emptyLabelText="Rating must be between 1 and 5"
          />
        </FormControl>
      </Content>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </>
  )
}