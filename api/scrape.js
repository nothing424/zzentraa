// =============================================
// ZENTRA — api/scrape.js
// OtakuDesu scraper via api.rifkyshre.biz.id
// =============================================

const SCRAPE_API = 'https://api.rifkyshre.biz.id';
const ROUTE      = '/scrape/otakudesu';

// Cache in-memory
const _cache = new Map();
const TTL    = 10 * 60 * 1000; // 10 menit

function _getCache(k) {
  const e = _cache.get(k);
  if (!e) return null;
  if (Date.now() - e.t > TTL) { _cache.delete(k); return null; }
  return e.d;
}
function _setCache(k, d) { _cache.set(k, { d, t: Date.now() }); return d; }

// ── CORE — sama persis dengan rifkyshre snippet ──
async function otakudesu(input) {
  let payload;
  if (typeof input === 'string') {
    payload = /^https?:\/\/otakudesu\./i.test(input)
      ? { url: input }
      : { query: input };
  } else {
    payload = input;
  }

  const cacheKey = JSON.stringify(payload);
  const cached = _getCache(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`${SCRAPE_API}${ROUTE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await res.json();

    if (!body?.status) {
      return {
        Status: false,
        Code: body?.code ?? res.status,
        Input: input,
        Result: null,
        Error: body?.error ?? 'Unknown error',
      };
    }

    const result = {
      Status: true,
      Code: body.code,
      Input: input,
      Result: body.data,
    };

    _setCache(cacheKey, result);
    return result;

  } catch (e) {
    return {
      Status: false,
      Code: 500,
      Input: input,
      Result: null,
      Error: e.message ?? String(e),
    };
  }
}

// ── SHORTHAND HELPERS (dipakai app.js) ────────
window.Scrape = {
  // otakudesu("naruto") — search
  call: otakudesu,

  async search(q)              { return otakudesu(q); },
  async home()                 { return otakudesu({ mode: 'home' }); },
  async ongoing(page = 1)      { return otakudesu({ mode: 'ongoing', page }); },
  async completed(page = 1)    { return otakudesu({ mode: 'completed', page }); },
  async schedule()             { return otakudesu({ mode: 'schedule' }); },
  async genres()               { return otakudesu({ mode: 'genres' }); },
  async genre(slug, page = 1)  { return otakudesu({ mode: 'genre', slug, page }); },
  async list()                 { return otakudesu({ mode: 'list' }); },
  async detail(url)            { return otakudesu({ url }); },
  async episode(url)           { return otakudesu({ url }); },
};
