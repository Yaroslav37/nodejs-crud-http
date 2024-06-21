const axios = require('axios');
const uuidv4 = require('uuid').v4;

// Define the base URL for the API
const API_URL = 'http://localhost:3000/api/users';

// Define a test user
const testUser = {
  id: "hui",
  username: 'Test User',
  age: 20,
  hobbies: ['Coding', 'Testing']
};

// Test getting all users
test('GET /api/users', async () => {
  const response = await axios.get(API_URL);
  expect(response.status).toBe(200);
  expect(response.data).toEqual([]);
});

// Test creating a new user
test('POST /api/users', async () => {
  const response = await axios.post(API_URL, testUser);
  expect(response.status).toBe(201);
  expect(response.data).toEqual({ ...testUser, id: response.data.id });
});

// Test getting the created user
test('GET /api/users/{userId}', async () => {
    const testUser2 = {
        id: "dfv",
        username: 'Test User',
        age: 20,
        hobbies: ['Coding', 'Testing']
      };
  const response1 = await axios.post(API_URL, testUser2);
  const response = await axios.get(`${API_URL}/${response1.data.id}`);
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ ...testUser2, id: response1.data.id });
});

// Test updating the created user
test("PUT /api/users/{userId}", async () => {
  const testUser3 = {
    id: "dfv",
    username: "Test User",
    age: 20,
    hobbies: ["Coding", "Testing"],
  };
  const response1 = await axios.post(API_URL, testUser3);
  const updatedUser = { ...response1.data, age: 21 };
  const response = await axios.put(`${API_URL}/${response1.data.id}`, updatedUser);
  expect(response.status).toBe(200);
  expect(response.data).toEqual(updatedUser);
});

// Test deleting the created user
test('DELETE /api/users/{userId}', async () => {
    const testUser3 = {
        id: "dfv",
        username: "Test User",
        age: 20,
        hobbies: ["Coding", "Testing"],
      };
      const response1 = await axios.post(API_URL, testUser3);
  const response = await axios.delete(`${API_URL}/${response1.data.id}`);
  expect(response.status).toBe(200);
  expect(response.data).toEqual({...testUser3, id: response1.data.id});
});

// Test getting the deleted user
test('GET /api/users/{userId}', async () => {
    try {
      const response = await axios.get(`${API_URL}/${testUser.id}`);
      // Если код дошел до этой точки, значит запрос завершился успешно, что не ожидается
      expect('Request to succeed').toBe('Expected request to fail');
    } catch (error) {
      // Если код дошел до этой точки, значит запрос завершился с ошибкой, что ожидается
      expect(error.response.status).toBe(404);
    }
  });