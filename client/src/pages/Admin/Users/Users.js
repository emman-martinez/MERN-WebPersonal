import React, { useEffect, useState } from 'react';
import { getUsersActive } from '../../../api/user';
import { ListUsers } from '../../../components/Admin/Users/ListUsers/ListUsers';
import { ACCESS_TOKEN } from '../../../utils/constants';

export const Users = () => {

  const [reloadUsers, setReloadUsers] = useState(false);
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const allUsers = async() => {
      const activeUsers = await getUsersActive(token, true);
      setUsersActive(activeUsers.users);
      const inactiveUsers = await getUsersActive(token, false);
      setUsersInactive(inactiveUsers.users);
    };
    allUsers();
    setReloadUsers(false);
  }, [token, reloadUsers]);
  
    return (
        <div className='users'>
          <ListUsers
            setReloadUsers={ setReloadUsers } 
            usersActive={ usersActive }
            usersInactive={ usersInactive }
          />  
        </div>
    );
};
