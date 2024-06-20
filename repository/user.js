import {v4 as uuidv4} from 'uuid';

let users = [
    { id: 1, username: 'User 1', age: 20, hobbies: ['dsdsf', 's'] },
    { id: 2, username: 'User 2', age: 21, hobbies: ['dsfsdf', 'sdf'] },
  ];
  
  const getUserById = (userId) => {
    return users.find(p => p.id === userId);
  };
  
  const addUser = (user) => {
    const User = {
      id: uuidv4(),
      username: user.username,
      age: user.age,
      hobbies: user.hobbies
    }
    users.push(User);
    return User;
  };
  
  const updateUser = (userId, updatedUser) => {
    const userIndex = users.findIndex(p => p.id === userId);
  
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser, id: userId };
      return users[userIndex];
    } else {
      return null; // Indicate that the user was not found
    }
  };
  
  const deleteUser = (userId) => {
    const userIndex = users.findIndex(p => p.id === userId);
  
    if (userIndex !== -1) {
      return users.splice(userIndex, 1)[0];
    } else {
      return null; // Indicate that the user was not found
    }
  };
  
  export { users, getUserById, addUser, updateUser, deleteUser };
  