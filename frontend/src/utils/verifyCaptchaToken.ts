import { NextRequest, NextResponse } from 'next/server';
import { baseEnv } from '../utils/environment';
import { APIResponse } from '../models/API';
import QueryString from 'query-string';
import http from './http';

const secret = process.env.RECAPTCHA_SECRET_KEY;

export const verifyCaptchaRequest = async (req: NextRequest) => {
    const request = await req.json();

    const { token } = request;
    if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 500 });
    }

    const endpoint: string = baseEnv(req.url).api.verifyToken;
    const model = {
        secret,
        response: token,
    };
    const response: APIResponse<any, null> = await http.post(
        endpoint,
        QueryString.stringify(model)
    );

    if (!response.data.succss) {
        return NextResponse.json({ error: response.data }, { status: 500 });
    }

    return NextResponse.json(response.data, { status: 200 });
};

export const verifyCaptchaToken = async (token: string) => {
    if (!token) {
        return 0;
    }

    const endpoint: string = baseEnv('').api.verifyToken;
    const model = {
        secret,
        response: token,
    };
    const response: APIResponse<any, null> = await http.post(
        endpoint,
        QueryString.stringify(model)
    );

    const captchaResponse = response.data;

    if (captchaResponse.success === false) {
        return 0;
    }

    return captchaResponse;
};
