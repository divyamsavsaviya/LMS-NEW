import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <h1>{currentUser.name}</h1>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
            <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
        </LogoutContainer>
    );
};

export default Logout;

const LogoutContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #f2f2f2;
  color: #333;
  z-index: 999; /* Ensure it appears above other content */
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
  color: #666;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #1976d2;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #bdbdbd;
`;
