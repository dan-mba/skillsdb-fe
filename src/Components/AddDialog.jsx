import {useState} from "react";
import {DialogActions, DialogContent, DialogTitle, TextField, Button, Rating, Typography, FormControl}
  from "@mui/material";
import {styled} from "@mui/material/styles";
import {post} from "aws-amplify/api";

const Content = styled(DialogContent)({
  display: 'flex',
  gap: '1rem',
});

export default function AddDialog({onClose, user}) {
  let [skill, setSkill] = useState('');
  let [rating, setRating] = useState(3);
  let [error, setError] = useState(false);

  async function handleSubmit() {
    if (skill.length === 0) {
      setError(true);
      return;
    }
    if (rating === 0) {
      return;
    }
    try {
      const postOperation =  post({
        apiName: 'SkillsApi',
        path: '',
        options: {
          body: {
            skill,
            rating,
          },
          headers: {
            Authorization: user.accessToken.toString()
          }
        }
      })
      const res = await postOperation.response;
      const data = await res.body.json();

      console.log(data)
      onClose();
    } catch (error) {
      console.log(error)
    }
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