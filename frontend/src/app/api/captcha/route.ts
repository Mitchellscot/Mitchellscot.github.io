import {verifyCaptchaRequest} from '../../../utils/verifyCaptchaToken';
import {NextRequest} from 'next/server';

export const POST = async (req: NextRequest) => verifyCaptchaRequest(req);
