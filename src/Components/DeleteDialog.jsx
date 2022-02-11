import {DialogActions, DialogContent, DialogContentText, DialogTitle, Button}
  from "@mui/material";
import {styled} from "@mui/material/styles";
import {API} from "aws-amplify";

const Content = styled(DialogContent)({
  display: 'flex',
  gap: '1rem',
});

export default function DeleteDialog({value, onClose}) {
  let rating, skill = '';
  if(value && value.length > 3) {
    rating = Number(value[0]);
    skill = value.slice(2);
  }

  function handleSubmit() {
    API.del('SkillsApi', '', {
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

  return (
    <>
      <DialogTitle>Delete Skill</DialogTitle>
      <Content>
        <DialogContentText>
          {`Are you sure you want to delete the ${skill} skill?`}
        </DialogContentText>
      </Content>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Delete</Button>
      </DialogActions>
    </>
  )
}