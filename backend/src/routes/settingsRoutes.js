import { Router } from 'express';
import { getSiteSettings, saveSiteSettings } from '../controllers/settingsController.js';

const router = Router();

router.get('/', getSiteSettings);
router.post('/', saveSiteSettings);

export default router;
