import { NextPageContext } from 'next';
import Router from 'next/router';

export async function myGet(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie;

    const res = await fetch(url, {
        headers: {
            cookie: cookie!,
        },
    });
    const data = await res.json();

    if (res.status === 401 && !ctx.req) {
        Router.replace('/login');
        return {};
    }
    if (res.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            location: 'http://localhost:3000/login',
        });
        ctx.res?.end();
        return;
    }
    return data;
}
