import {NextRequest} from 'next/server';
import {sendEmail} from '../../../utils/sendEmail';

export const POST = async (req: NextRequest) => sendEmail(req);
