import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <>
    <StyledContainer>
  <Container>
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <div onClick={() => navigateHandler("Admin")}>
          <StyledPaper elevation={3}>
            <IconWrapper>
              <AccountCircle />
            </IconWrapper>
            <StyledTypography>Admin</StyledTypography>
            <Description>Login as an administrator to access the dashboard to manage app data.</Description>
          </StyledPaper>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StyledPaper elevation={3}>
          <div onClick={() => navigateHandler("Student")}>
            <IconWrapper>
              <School />
            </IconWrapper>
            <StyledTypography>Student</StyledTypography>
            <Description>Login as a student to explore course materials and assignments.</Description>
          </div>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StyledPaper elevation={3}>
          <div onClick={() => navigateHandler("Teacher")}>
            <IconWrapper>
              <Group />
            </IconWrapper>
            <StyledTypography>Teacher</StyledTypography>
            <Description>Login as a teacher to create assignments and track progress.</Description>
          </div>
        </StyledPaper>
      </Grid>
    </Grid>
  </Container>
  <StyledBackdrop open={loader}>
    <CircularProgressWrapper>
      <StyledCircularProgress size={24} />
      <LoaderText>Please Wait</LoaderText>
    </CircularProgressWrapper>
  </StyledBackdrop>
  <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
</StyledContainer>

    </>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: #f5f5f5;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  color: #333;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  svg {
    font-size: 3rem;
    color: #6c63ff;
  }
`;

const Description = styled.p`
  color: #555;
`;

const StyledBackdrop = styled(Backdrop)`
  && {
    background-color: rgba(255, 255, 255, 0.8);
    color: #333;
    z-index: 1500;
  }
`;

const CircularProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCircularProgress = styled(CircularProgress)`
  && {
    color: #6c63ff;
    margin-right: 10px;
  }
`;

const LoaderText = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;