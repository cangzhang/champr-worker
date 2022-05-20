import { Hono } from 'hono';
import { StatusCode } from 'hono/dist/utils/http-status';

const app = new Hono();
const NPM_URL = `https://cdn.jsdelivr.net/npm`;

app.notFound((c) => {
  c.status(404);
  return c.text(`Sorry but that's all`);
});

app.get(`/npm/:path`, async c => {
  try {
    let path = decodeURIComponent(c.req.param(`path`));
    const r = await fetch(`${NPM_URL}${path}`);
    if (!r.ok) {
      c.status(r.status as StatusCode);
      return c.json({});
    }
    
    const data: any = await r.json();
    return c.json(data);
  } catch (e) {
    c.status(400);
    return c.json({error: true});
  }
});

app.fire();
