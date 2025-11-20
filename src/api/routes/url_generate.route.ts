import { Router } from "express";
import { createURL, deleteURL, getSingleURLById, getURLsByUserId, updateURL } from "../controllers/url_generate.controller";

const router = Router();

// create new url route
router.post('/', createURL);

// get single by id url route
router.get('/:urlId', getSingleURLById);

// get urls by userId route
router.get('/:userId/getmyurls', getURLsByUserId);

// update url route
router.put('/:urlId', updateURL);

// delete url route
router.delete('/:urlId', deleteURL);

export default router;