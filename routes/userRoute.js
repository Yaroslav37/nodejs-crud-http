import { CONTENT_TYPE_JSON } from '../constant/common.js';
import { 
  METHOD_GET, 
  METHOD_POST, 
  METHOD_PUT, 
  METHOD_DELETE 
} from '../constant/http.js';
import { 
  handleGet, 
  handlePost, 
  handlePut, 
  handleDelete 
} from '../handler/user.js';
import { sendResponse } from '../helper/http.js';

const handleUserRoutes = (req, res, parsedUrl) => {
  if (req.method === METHOD_GET) {
    handleGet(req, res, parsedUrl);
  } else if (req.method === METHOD_POST) {
    handlePost(req, res);
  } else if (req.method === METHOD_PUT) {
    handlePut(req, res, parsedUrl);
  } else if (req.method === METHOD_DELETE) {
    handleDelete(req, res, parsedUrl);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Method not allowed' });
  }
};

export { handleUserRoutes };
