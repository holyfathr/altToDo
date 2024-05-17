import { styled } from "@mui/system";
import { Container, Typography, TextField, Button } from "@mui/material";

export const StyledContainer = styled(Container)({
    display: 'grid',
    justifyContent: 'center',
    marginTop: '200px',
  });
  
  export const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
  });
  
  export const StyledTitle = styled(Typography)({
    display: 'flex',
    justifyContent: 'center',
    color: '#4482fc',
    fontSize: '50px',
  });
  
  export const StyledTextField = styled(TextField)({
    width: '350px',
    height: '40px',
    marginBottom: '30px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: '1px solid #4482fc',
    boxSizing: 'border-box',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '20px',
  });
  
  export const StyledButton = styled(Button)({
    margin: '0 auto',
    width: '170px',
    height: '40px',
    borderRadius: '13px',
    backgroundColor: '#4482fc',
    color: '#ffffff',
    fontSize: '20px',
  });