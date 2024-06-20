import url from 'url';
import { sendResponse } from '../helper/http.js';
import { handleUserRoutes } from './userRoute.js';
import { CONTENT_TYPE_HTML, CONTENT_TYPE_JSON } from '../constant/common.js';

const handleRequest = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Delegate specific route handling to specialized modules
  if (parsedUrl.pathname == '/'){
    // Return HTML response for the home page
    sendResponse(res, 200, CONTENT_TYPE_HTML, `<b>Users <a href = '/api/users'>list</a> page</b>`);
  }else if (parsedUrl.pathname.startsWith('/api/users')) {
    handleUserRoutes(req, res, parsedUrl);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
  }
};

export { handleRequest };
