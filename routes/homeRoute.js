import { CONTENT_TYPE_JSON } from '../constant/common';
import { handleGet, handlePost, handlePut, handleDelete } from '../handler/user'

const handleUserRoutes = (req, res, parsedUrl) => {
  if (req.method === 'GET') {
    handleGet(req, res, parsedUrl);
  } else if (req.method === 'POST') {
    handlePost(req, res);
  } else if (req.method === 'PUT') {
    handlePut(req, res, parsedUrl);
  } else if (req.method === 'DELETE') {
    handleDelete(req, res, parsedUrl);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Method not allowed' });
  }
};

export { handleUserRoutes };
