// Importing necessary modules and functions from other files
import { 
    users, 
    getUserById, 
    addUser, 
    updateUser, 
    deleteUser 
} from '../repository/user.js';
import { sendResponse } from '../helper/http.js';
import { CONTENT_TYPE_JSON } from '../constant/common.js';

// Handling GET requests to retrieve user information
const handleGet = (req, res, parsedUrl) => {
  // Check if the path is the user list endpoint
  if (parsedUrl.path === '/api/users') {
    // Send a response with the list of users
    sendResponse(res, 200, CONTENT_TYPE_JSON, users);
  } else if (parsedUrl.path.startsWith("/api/users")) {
    // Extract the user ID from either path or query parameters
    const userId = parsedUrl.query.id || parseInt(parsedUrl.path.split('/').pop());
    // Get the user by ID
    const user = getUserById(userId);

    if (user) {
      // If the user is found, send a response with the user details
      sendResponse(res, 200, CONTENT_TYPE_JSON, user);
    } else {
      // If the user is not found, send a 404 error response
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
    }
  } else {
    // If the endpoint is not recognized, send a 404 error response
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
  }
};

// Handling POST requests to add new users
const handlePost = (req, res) => {
  let requestBody = '';

  // Collecting data from the request body
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  // Processing data when the request ends
  req.on('end', () => {
    try {
      // Parsing the JSON data from the request body
      const user = JSON.parse(requestBody);
      // Adding the new user to the data store
      const newUser = addUser(user);
      // Sending a response with the newly added user details
      sendResponse(res, 201, CONTENT_TYPE_JSON, newUser);
    } catch (error) {
      // Handling errors related to invalid JSON format
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Invalid JSON format' });
    }
  });
};

// Handling PUT requests to update existing users
const handlePut = (req, res, parsedUrl) => {
  let requestBody = '';

  // Collecting data from the request body
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  // Processing data when the request ends
  req.on('end', () => {
    try {
      // Parsing the JSON data from the request body
      const updatedUser = JSON.parse(requestBody);
      // Extracting the user ID from the request URL
      const userId = parseInt(parsedUrl.path.split('/').pop());
      // Updating the user in the data store
      const updatedUserInfo = updateUser(userId, updatedUser);

      if (updatedUserInfo) {
        // If the user is updated successfully, send a response with the updated user details
        sendResponse(res, 200, CONTENT_TYPE_JSON, updatedUserInfo);
      } else {
        // If the user is not found, send a 404 error response
        sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
      }
    } catch (error) {
      // Handling errors related to invalid JSON format
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Invalid JSON format' });
    }
  });
};

// Handling DELETE requests to remove users
const handleDelete = (req, res, parsedUrl) => {
  // Extracting the user ID from the request URL
  const userId = parseInt(parsedUrl.path.split('/').pop());
  // Deleting the user from the data store
  const deletedUser = deleteUser(userId);

  if (deletedUser) {
    // If the user is deleted successfully, send a response with the deleted user details
    sendResponse(res, 200, CONTENT_TYPE_JSON, deletedUser);
  } else {
    // If the user is not found, send a 404 error response
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
  }
};

// Exporting the functions to be used in other parts of the application
export { handleGet, handlePost, handlePut, handleDelete };
