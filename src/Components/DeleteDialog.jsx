import {DialogActions, DialogContent, DialogContentText, DialogTitle, Button}
  from "@mui/material";
import {styled} from "@mui/material/styles";
import {del} from "aws-amplify/api";

const Content = styled(DialogContent)({
  display: 'flex',
  gap: '1rem',
});

export default function DeleteDialog({value, onClose, user}) {
  console.log(value)
  let rating, skill = '';
  if(value && value.length >= 3) {
    rating = Number(value[0]);
    skill = value.slice(2);
  }

  async function handleSubmit() {
    const key = `${rating}/${skill}`;
    try {
      const delOperation =  del({
        apiName: 'SkillsApi',
        path: `/${key}`,
        options: {
          headers: {
            Authorization: user.accessToken.toString()
          }
        }
      })
      const res = await delOperation.response;
      const data = await res.body.json();

      console.log(data)
      onClose();
    } catch (error) {
      console.log(error)
    }
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