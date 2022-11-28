var Ue = Object.defineProperty;
var Oe = (e, t, s) => t in e ? Ue(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var L = (e, t, s) => (Oe(e, typeof t != "symbol" ? t + "" : t, s), s);
const Be = "https://stage.redoc.cledeploy.com".replace(
  /\/+$/,
  ""
);
class ge {
  constructor(t = {}) {
    this.configuration = t;
  }
  set config(t) {
    this.configuration = t;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : Be;
  }
  get fetchApi() {
    return this.configuration.fetchApi;
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || _e;
  }
  get username() {
    return this.configuration.username;
  }
  get password() {
    return this.configuration.password;
  }
  get apiKey() {
    const t = this.configuration.apiKey;
    if (t)
      return typeof t == "function" ? t : () => t;
  }
  get accessToken() {
    const t = this.configuration.accessToken;
    if (t)
      return typeof t == "function" ? t : async () => t;
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
}
const pe = new ge();
class te {
  constructor(t = pe) {
    L(this, "middleware");
    L(this, "fetchApi", async (t, s) => {
      let i = { url: t, init: s };
      for (const n of this.middleware)
        n.pre && (i = await n.pre({
          fetch: this.fetchApi,
          ...i
        }) || i);
      let r;
      try {
        r = await (this.configuration.fetchApi || fetch)(
          i.url,
          i.init
        );
      } catch (n) {
        for (const o of this.middleware)
          o.onError && (r = await o.onError({
            fetch: this.fetchApi,
            url: i.url,
            init: i.init,
            error: n,
            response: r ? r.clone() : void 0
          }) || r);
        if (r === void 0)
          throw n instanceof Error ? new He(
            n,
            "The request failed and the interceptors did not return an alternative response"
          ) : n;
      }
      for (const n of this.middleware)
        n.post && (r = await n.post({
          fetch: this.fetchApi,
          url: i.url,
          init: i.init,
          response: r.clone()
        }) || r);
      return r;
    });
    this.configuration = t, this.middleware = t.middleware;
  }
  withMiddleware(...t) {
    const s = this.clone();
    return s.middleware = s.middleware.concat(...t), s;
  }
  withPreMiddleware(...t) {
    const s = t.map((i) => ({ pre: i }));
    return this.withMiddleware(...s);
  }
  withPostMiddleware(...t) {
    const s = t.map((i) => ({ post: i }));
    return this.withMiddleware(...s);
  }
  async request(t, s) {
    const { url: i, init: r } = await this.createFetchParams(
      t,
      s
    ), n = await this.fetchApi(i, r);
    if (n.status >= 200 && n.status < 300)
      return n;
    throw new Ne(n, "Response returned an error code");
  }
  async createFetchParams(t, s) {
    let i = this.configuration.basePath + t.path;
    t.query !== void 0 && Object.keys(t.query).length !== 0 && (i += "?" + this.configuration.queryParamsStringify(t.query));
    const r = Object.assign(
      {},
      this.configuration.headers,
      t.headers
    );
    Object.keys(r).forEach(
      (l) => r[l] === void 0 ? delete r[l] : {}
    );
    const n = typeof s == "function" ? s : async () => s, o = {
      method: t.method,
      headers: r,
      body: t.body,
      credentials: this.configuration.credentials
    }, c = {
      ...o,
      ...await n({
        init: o,
        context: t
      })
    }, d = {
      ...c,
      body: Me(c.body) || c.body instanceof URLSearchParams || qe(c.body) ? c.body : JSON.stringify(c.body)
    };
    return { url: i, init: d };
  }
  clone() {
    const t = this.constructor, s = new t(this.configuration);
    return s.middleware = this.middleware.slice(), s;
  }
}
function qe(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function Me(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
class Ne extends Error {
  constructor(s, i) {
    super(i);
    L(this, "name", "ResponseError");
    this.response = s;
  }
}
class He extends Error {
  constructor(s, i) {
    super(i);
    L(this, "name", "FetchError");
    this.cause = s;
  }
}
class T extends Error {
  constructor(s, i) {
    super(i);
    L(this, "name", "RequiredError");
    this.field = s;
  }
}
const Ut = {
  csv: ",",
  ssv: " ",
  tsv: "	",
  pipes: "|"
};
function _e(e, t = "") {
  return Object.keys(e).map((s) => fe(s, e[s], t)).filter((s) => s.length > 0).join("&");
}
function fe(e, t, s = "") {
  const i = s + (s.length ? `[${e}]` : e);
  if (t instanceof Array) {
    const r = t.map((n) => encodeURIComponent(String(n))).join(`&${encodeURIComponent(i)}=`);
    return `${encodeURIComponent(i)}=${r}`;
  }
  if (t instanceof Set) {
    const r = Array.from(t);
    return fe(e, r, s);
  }
  return t instanceof Date ? `${encodeURIComponent(i)}=${encodeURIComponent(
    t.toISOString()
  )}` : t instanceof Object ? _e(t, i) : `${encodeURIComponent(i)}=${encodeURIComponent(
    String(t)
  )}`;
}
function Ot(e) {
  for (const t of e)
    if (t.contentType === "multipart/form-data")
      return !0;
  return !1;
}
class N {
  constructor(t, s = (i) => i) {
    this.raw = t, this.transformer = s;
  }
  async value() {
    return this.transformer(await this.raw.json());
  }
}
class U {
  constructor(t) {
    this.raw = t;
  }
  async value() {
  }
}
class Bt {
  constructor(t) {
    this.raw = t;
  }
  async value() {
    return await this.raw.blob();
  }
}
class qt {
  constructor(t) {
    this.raw = t;
  }
  async value() {
    return await this.raw.text();
  }
}
class Mt extends te {
  async adminCartItemDeleteRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminCartItemDelete."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "DELETE",
        headers: r,
        query: i
      },
      s
    );
    return new U(n);
  }
  async adminCartItemDelete(t, s) {
    await this.adminCartItemDeleteRaw(t, s);
  }
  async adminCartItemGetRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminCartItemGet."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new N(n);
  }
  async adminCartItemGet(t, s) {
    return await (await this.adminCartItemGetRaw(
      t,
      s
    )).value();
  }
  async adminCartItemListRaw(t, s) {
    const i = {};
    t.userId !== void 0 && (i.UserId = t.userId), t.platform !== void 0 && (i.Platform = t.platform), t.seller !== void 0 && (i.Seller = t.seller), t.usItemId !== void 0 && (i.UsItemId = t.usItemId), t.pageSize !== void 0 && (i.PageSize = t.pageSize), t.dir !== void 0 && (i.Dir = t.dir), t.pageToken !== void 0 && (i.PageToken = t.pageToken), t.includedProperties && (i.IncludedProperties = t.includedProperties);
    const r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem",
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new N(n);
  }
  async adminCartItemList(t = {}, s) {
    return await (await this.adminCartItemListRaw(
      t,
      s
    )).value();
  }
  async adminCartItemPatchRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminCartItemPatch."
      );
    if (t.cartItemPatch === null || t.cartItemPatch === void 0)
      throw new T(
        "cartItemPatch",
        "Required parameter requestParameters.cartItemPatch was null or undefined when calling adminCartItemPatch."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PATCH",
        headers: r,
        query: i,
        body: t.cartItemPatch
      },
      s
    );
    return new U(n);
  }
  async adminCartItemPatch(t, s) {
    await this.adminCartItemPatchRaw(t, s);
  }
  async adminCartItemPostRaw(t, s) {
    if (t.cartItemBodyAdmin === null || t.cartItemBodyAdmin === void 0)
      throw new T(
        "cartItemBodyAdmin",
        "Required parameter requestParameters.cartItemBodyAdmin was null or undefined when calling adminCartItemPost."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem",
        method: "POST",
        headers: r,
        query: i,
        body: t.cartItemBodyAdmin
      },
      s
    );
    return new N(n);
  }
  async adminCartItemPost(t, s) {
    return await (await this.adminCartItemPostRaw(
      t,
      s
    )).value();
  }
  async adminCartItemPutRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminCartItemPut."
      );
    if (t.cartItemBody === null || t.cartItemBody === void 0)
      throw new T(
        "cartItemBody",
        "Required parameter requestParameters.cartItemBody was null or undefined when calling adminCartItemPut."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PUT",
        headers: r,
        query: i,
        body: t.cartItemBody
      },
      s
    );
    return new U(n);
  }
  async adminCartItemPut(t, s) {
    await this.adminCartItemPutRaw(t, s);
  }
}
class Nt extends te {
  async cartItemDeleteRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemDelete."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "DELETE",
        headers: r,
        query: i
      },
      s
    );
    return new U(n);
  }
  async cartItemDelete(t, s) {
    await this.cartItemDeleteRaw(t, s);
  }
  async cartItemGetRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemGet."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new N(n);
  }
  async cartItemGet(t, s) {
    return await (await this.cartItemGetRaw(
      t,
      s
    )).value();
  }
  async cartItemListRaw(t, s) {
    const i = {};
    t.platform !== void 0 && (i.Platform = t.platform), t.seller !== void 0 && (i.Seller = t.seller), t.usItemId !== void 0 && (i.UsItemId = t.usItemId), t.pageSize !== void 0 && (i.PageSize = t.pageSize), t.dir !== void 0 && (i.Dir = t.dir), t.pageToken !== void 0 && (i.PageToken = t.pageToken), t.includedProperties && (i.IncludedProperties = t.includedProperties);
    const r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem",
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new N(n);
  }
  async cartItemList(t = {}, s) {
    return await (await this.cartItemListRaw(
      t,
      s
    )).value();
  }
  async cartItemPatchRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemPatch."
      );
    if (t.cartItemPatch === null || t.cartItemPatch === void 0)
      throw new T(
        "cartItemPatch",
        "Required parameter requestParameters.cartItemPatch was null or undefined when calling cartItemPatch."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PATCH",
        headers: r,
        query: i,
        body: t.cartItemPatch
      },
      s
    );
    return new U(n);
  }
  async cartItemPatch(t, s) {
    await this.cartItemPatchRaw(t, s);
  }
  async cartItemPostRaw(t, s) {
    if (t.cartItemBody === null || t.cartItemBody === void 0)
      throw new T(
        "cartItemBody",
        "Required parameter requestParameters.cartItemBody was null or undefined when calling cartItemPost."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem",
        method: "POST",
        headers: r,
        query: i,
        body: t.cartItemBody
      },
      s
    );
    return new N(n);
  }
  async cartItemPost(t, s) {
    return await (await this.cartItemPostRaw(
      t,
      s
    )).value();
  }
  async cartItemPutRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemPut."
      );
    if (t.cartItemBody === null || t.cartItemBody === void 0)
      throw new T(
        "cartItemBody",
        "Required parameter requestParameters.cartItemBody was null or undefined when calling cartItemPut."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PUT",
        headers: r,
        query: i,
        body: t.cartItemBody
      },
      s
    );
    return new U(n);
  }
  async cartItemPut(t, s) {
    await this.cartItemPutRaw(t, s);
  }
}
class Ht extends te {
  async offerDeleteRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerDelete."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "DELETE",
        headers: r,
        query: i
      },
      s
    );
    return new U(n);
  }
  async offerDelete(t, s) {
    await this.offerDeleteRaw(t, s);
  }
  async offerGetRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerGet."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new N(n);
  }
  async offerGet(t, s) {
    return await (await this.offerGetRaw(
      t,
      s
    )).value();
  }
  async offerListRaw(t, s) {
    const i = {};
    t.name !== void 0 && (i.Name = t.name), t.groupId !== void 0 && (i.GroupId = t.groupId), t.pageSize !== void 0 && (i.PageSize = t.pageSize), t.dir !== void 0 && (i.Dir = t.dir), t.pageToken !== void 0 && (i.PageToken = t.pageToken), t.includedProperties && (i.IncludedProperties = t.includedProperties);
    const r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer",
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new N(n);
  }
  async offerList(t = {}, s) {
    return await (await this.offerListRaw(
      t,
      s
    )).value();
  }
  async offerPatchRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerPatch."
      );
    if (t.offerPatch === null || t.offerPatch === void 0)
      throw new T(
        "offerPatch",
        "Required parameter requestParameters.offerPatch was null or undefined when calling offerPatch."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PATCH",
        headers: r,
        query: i,
        body: t.offerPatch
      },
      s
    );
    return new U(n);
  }
  async offerPatch(t, s) {
    await this.offerPatchRaw(t, s);
  }
  async offerPostRaw(t, s) {
    if (t.offerPost === null || t.offerPost === void 0)
      throw new T(
        "offerPost",
        "Required parameter requestParameters.offerPost was null or undefined when calling offerPost."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer",
        method: "POST",
        headers: r,
        query: i,
        body: t.offerPost
      },
      s
    );
    return new U(n);
  }
  async offerPost(t, s) {
    await this.offerPostRaw(t, s);
  }
  async offerPutRaw(t, s) {
    if (t.id === null || t.id === void 0)
      throw new T(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerPut."
      );
    if (t.offerPost === null || t.offerPost === void 0)
      throw new T(
        "offerPost",
        "Required parameter requestParameters.offerPost was null or undefined when calling offerPut."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PUT",
        headers: r,
        query: i,
        body: t.offerPost
      },
      s
    );
    return new U(n);
  }
  async offerPut(t, s) {
    await this.offerPutRaw(t, s);
  }
}
const jt = {
  Desc: "Desc",
  Asc: "Asc"
}, Lt = {
  Walmart: "Walmart",
  Shopify: "Shopify",
  Target: "Target",
  Farfetch: "Farfetch",
  Adidas: "Adidas",
  Michaels: "Michaels",
  Fanatics: "Fanatics",
  Pandora: "Pandora",
  Carters: "Carters",
  Justice: "Justice",
  Nordstrom: "Nordstrom",
  Macys: "Macys",
  Ulta: "Ulta",
  Sephora: "Sephora",
  Kohls: "Kohls",
  Bestbuy: "Bestbuy",
  NetAPorter: "NetAPorter",
  BedBathAndBeyond: "BedBathAndBeyond",
  Gap: "Gap",
  HomeDepot: "HomeDepot",
  Lowes: "Lowes",
  GapFactory: "GapFactory",
  Patagonia: "Patagonia",
  DicksSportingGoods: "DicksSportingGoods",
  PetSmart: "PetSmart",
  ShopDisney: "ShopDisney",
  Elfcosmetics: "Elfcosmetics",
  Shift4Shop: "Shift4Shop",
  DallasCowboys: "DallasCowboys",
  AtHome: "AtHome",
  VictoriasSecret: "VictoriasSecret",
  Nike: "Nike",
  Amazon: "Amazon",
  AthomeMedline: "AthomeMedline",
  CombatCorner: "CombatCorner",
  Explorecuisine: "Explorecuisine",
  Huel: "Huel",
  BestbuyCanada: "BestbuyCanada",
  BigCommerce: "BigCommerce",
  DallasGolf: "DallasGolf",
  GrandvinWineMerchants: "GrandvinWineMerchants",
  Yamaha: "Yamaha",
  BlissWorld: "BlissWorld",
  Fromuthpickleball: "Fromuthpickleball",
  TrueValue: "TrueValue",
  Qvc: "Qvc",
  Coravin: "Coravin",
  RoomsToGo: "RoomsToGo",
  Nfm: "Nfm",
  Gnc: "Gnc",
  Honest: "Honest",
  Abercrombie: "Abercrombie",
  HamiltonBeach: "HamiltonBeach",
  SharkClean: "SharkClean",
  NinjaKitchen: "NinjaKitchen",
  Ikea: "Ikea",
  Clinique: "Clinique",
  Levi: "Levi",
  DripDrop: "DripDrop",
  Complex: "Complex",
  Gymshark: "Gymshark",
  Bikini: "Bikini",
  TomFord: "TomFord",
  Solerebels: "Solerebels",
  EsteeLauder: "EsteeLauder",
  SeraLabsHealth: "SeraLabsHealth",
  BigStar: "BigStar",
  Kendrascott: "Kendrascott",
  Philosophy: "Philosophy",
  HugoBoss: "HugoBoss",
  Jomalone: "Jomalone",
  Hanes: "Hanes",
  Champion: "Champion",
  Bali: "Bali",
  HudaBeauty: "HudaBeauty",
  Highlights: "Highlights",
  Lushusa: "Lushusa",
  ClarinsUsa: "ClarinsUsa",
  Sonomacutrer: "Sonomacutrer",
  Lancome: "Lancome",
  Chiccousa: "Chiccousa",
  WorldMarket: "WorldMarket",
  Michaelkors: "Michaelkors",
  Bic: "Bic",
  InstantBrands: "InstantBrands",
  ReserveBar: "ReserveBar",
  VibeBodyCare: "VibeBodyCare",
  ShopTy: "ShopTy",
  LesliesPool: "LesliesPool",
  Lululemon: "Lululemon",
  WestElm: "WestElm",
  Lids: "Lids",
  GardenOfLife: "GardenOfLife",
  Taylormadegolf: "Taylormadegolf",
  Flightscope: "Flightscope",
  NewBalance: "NewBalance",
  PotteryBarn: "PotteryBarn",
  PotteryBarnKids: "PotteryBarnKids",
  PotteryBarnTeen: "PotteryBarnTeen",
  WilliamsSonoma: "WilliamsSonoma",
  MarkAndGraham: "MarkAndGraham",
  Underarmour: "Underarmour",
  UvaBookStores: "UvaBookStores",
  Bose: "Bose",
  BattleSports: "BattleSports",
  Jcpenney: "Jcpenney",
  Etsy: "Etsy",
  LacrosseUnlimited: "LacrosseUnlimited",
  Staples: "Staples",
  Academy: "Academy",
  Champssports: "Champssports",
  Usopenshop: "Usopenshop",
  HalfPriceBooks: "HalfPriceBooks",
  BathAndBodyWorks: "BathAndBodyWorks",
  Ralphlauren: "Ralphlauren",
  CampingWorld: "CampingWorld",
  Sportsdirect: "Sportsdirect",
  Anastasiabeverlyhills: "Anastasiabeverlyhills",
  Chanel: "Chanel",
  Yeti: "Yeti",
  Crayola: "Crayola",
  Vans: "Vans",
  Lacoste: "Lacoste",
  PoshMark: "PoshMark",
  FloorAndDecor: "FloorAndDecor",
  Overstock: "Overstock",
  Bloomingdales: "Bloomingdales",
  AmericanEagle: "AmericanEagle",
  Tradesy: "Tradesy",
  AceHardware: "AceHardware",
  Fossil: "Fossil",
  Guess: "Guess",
  ChildrenIsPlace: "ChildrenIsPlace",
  Cabelas: "Cabelas",
  ChineseLaundry: "ChineseLaundry",
  JanieAndJack: "JanieAndJack",
  Backcountry: "Backcountry",
  Forever21: "Forever21",
  Tyler: "Tyler",
  ShopifyApp: "ShopifyApp",
  WooCommerceApp: "WooCommerceApp",
  BigCommerceApp: "BigCommerceApp",
  MagentoApp: "MagentoApp",
  SquareSpaceApp: "SquareSpaceApp",
  WixApp: "WixApp",
  PrestaShopApp: "PrestaShopApp",
  ShopwareApp: "ShopwareApp"
}, Dt = {
  Default: "Default",
  Dropdown: "Dropdown",
  Radio: "Radio",
  CustomInput: "CustomInput"
}, Wt = {
  Default: "Default",
  Name: "Name",
  Swatch: "Swatch",
  Color: "Color"
};
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function je(e) {
  var t = e.default;
  if (typeof t == "function") {
    var s = function() {
      return t.apply(this, arguments);
    };
    s.prototype = t.prototype;
  } else
    s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var r = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(s, i, r.get ? r : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), s;
}
function Le(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var oe = { exports: {} };
const De = {}, We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: De
}, Symbol.toStringTag, { value: "Module" })), Fe = /* @__PURE__ */ je(We);
var ae;
function $() {
  return ae || (ae = 1, function(e, t) {
    (function(s, i) {
      e.exports = i();
    })(H, function() {
      var s = s || function(i, r) {
        var n;
        if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof H < "u" && H.crypto && (n = H.crypto), !n && typeof Le == "function")
          try {
            n = Fe;
          } catch {
          }
        var o = function() {
          if (n) {
            if (typeof n.getRandomValues == "function")
              try {
                return n.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof n.randomBytes == "function")
              try {
                return n.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, c = Object.create || function() {
          function a() {
          }
          return function(h) {
            var _;
            return a.prototype = h, _ = new a(), a.prototype = null, _;
          };
        }(), d = {}, l = d.lib = {}, p = l.Base = function() {
          return {
            extend: function(a) {
              var h = c(this);
              return a && h.mixIn(a), (!h.hasOwnProperty("init") || this.init === h.init) && (h.init = function() {
                h.$super.init.apply(this, arguments);
              }), h.init.prototype = h, h.$super = this, h;
            },
            create: function() {
              var a = this.extend();
              return a.init.apply(a, arguments), a;
            },
            init: function() {
            },
            mixIn: function(a) {
              for (var h in a)
                a.hasOwnProperty(h) && (this[h] = a[h]);
              a.hasOwnProperty("toString") && (this.toString = a.toString);
            },
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), g = l.WordArray = p.extend({
          init: function(a, h) {
            a = this.words = a || [], h != r ? this.sigBytes = h : this.sigBytes = a.length * 4;
          },
          toString: function(a) {
            return (a || w).stringify(this);
          },
          concat: function(a) {
            var h = this.words, _ = a.words, m = this.sigBytes, v = a.sigBytes;
            if (this.clamp(), m % 4)
              for (var k = 0; k < v; k++) {
                var C = _[k >>> 2] >>> 24 - k % 4 * 8 & 255;
                h[m + k >>> 2] |= C << 24 - (m + k) % 4 * 8;
              }
            else
              for (var R = 0; R < v; R += 4)
                h[m + R >>> 2] = _[R >>> 2];
            return this.sigBytes += v, this;
          },
          clamp: function() {
            var a = this.words, h = this.sigBytes;
            a[h >>> 2] &= 4294967295 << 32 - h % 4 * 8, a.length = i.ceil(h / 4);
          },
          clone: function() {
            var a = p.clone.call(this);
            return a.words = this.words.slice(0), a;
          },
          random: function(a) {
            for (var h = [], _ = 0; _ < a; _ += 4)
              h.push(o());
            return new g.init(h, a);
          }
        }), S = d.enc = {}, w = S.Hex = {
          stringify: function(a) {
            for (var h = a.words, _ = a.sigBytes, m = [], v = 0; v < _; v++) {
              var k = h[v >>> 2] >>> 24 - v % 4 * 8 & 255;
              m.push((k >>> 4).toString(16)), m.push((k & 15).toString(16));
            }
            return m.join("");
          },
          parse: function(a) {
            for (var h = a.length, _ = [], m = 0; m < h; m += 2)
              _[m >>> 3] |= parseInt(a.substr(m, 2), 16) << 24 - m % 8 * 4;
            return new g.init(_, h / 2);
          }
        }, b = S.Latin1 = {
          stringify: function(a) {
            for (var h = a.words, _ = a.sigBytes, m = [], v = 0; v < _; v++) {
              var k = h[v >>> 2] >>> 24 - v % 4 * 8 & 255;
              m.push(String.fromCharCode(k));
            }
            return m.join("");
          },
          parse: function(a) {
            for (var h = a.length, _ = [], m = 0; m < h; m++)
              _[m >>> 2] |= (a.charCodeAt(m) & 255) << 24 - m % 4 * 8;
            return new g.init(_, h);
          }
        }, u = S.Utf8 = {
          stringify: function(a) {
            try {
              return decodeURIComponent(escape(b.stringify(a)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function(a) {
            return b.parse(unescape(encodeURIComponent(a)));
          }
        }, y = l.BufferedBlockAlgorithm = p.extend({
          reset: function() {
            this._data = new g.init(), this._nDataBytes = 0;
          },
          _append: function(a) {
            typeof a == "string" && (a = u.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
          },
          _process: function(a) {
            var h, _ = this._data, m = _.words, v = _.sigBytes, k = this.blockSize, C = k * 4, R = v / C;
            a ? R = i.ceil(R) : R = i.max((R | 0) - this._minBufferSize, 0);
            var B = R * k, E = i.min(B * 4, v);
            if (B) {
              for (var q = 0; q < B; q += k)
                this._doProcessBlock(m, q);
              h = m.splice(0, B), _.sigBytes -= E;
            }
            return new g.init(h, E);
          },
          clone: function() {
            var a = p.clone.call(this);
            return a._data = this._data.clone(), a;
          },
          _minBufferSize: 0
        });
        l.Hasher = y.extend({
          cfg: p.extend(),
          init: function(a) {
            this.cfg = this.cfg.extend(a), this.reset();
          },
          reset: function() {
            y.reset.call(this), this._doReset();
          },
          update: function(a) {
            return this._append(a), this._process(), this;
          },
          finalize: function(a) {
            a && this._append(a);
            var h = this._doFinalize();
            return h;
          },
          blockSize: 16,
          _createHelper: function(a) {
            return function(h, _) {
              return new a.init(_).finalize(h);
            };
          },
          _createHmacHelper: function(a) {
            return function(h, _) {
              return new I.HMAC.init(a, _).finalize(h);
            };
          }
        });
        var I = d.algo = {};
        return d;
      }(Math);
      return s;
    });
  }(oe)), oe.exports;
}
var ze = $(), we = { exports: {} };
(function(e, t) {
  (function(s, i) {
    e.exports = i($());
  })(H, function(s) {
    return function(i) {
      var r = s, n = r.lib, o = n.WordArray, c = n.Hasher, d = r.algo, l = [], p = [];
      (function() {
        function w(I) {
          for (var a = i.sqrt(I), h = 2; h <= a; h++)
            if (!(I % h))
              return !1;
          return !0;
        }
        function b(I) {
          return (I - (I | 0)) * 4294967296 | 0;
        }
        for (var u = 2, y = 0; y < 64; )
          w(u) && (y < 8 && (l[y] = b(i.pow(u, 1 / 2))), p[y] = b(i.pow(u, 1 / 3)), y++), u++;
      })();
      var g = [], S = d.SHA256 = c.extend({
        _doReset: function() {
          this._hash = new o.init(l.slice(0));
        },
        _doProcessBlock: function(w, b) {
          for (var u = this._hash.words, y = u[0], I = u[1], a = u[2], h = u[3], _ = u[4], m = u[5], v = u[6], k = u[7], C = 0; C < 64; C++) {
            if (C < 16)
              g[C] = w[b + C] | 0;
            else {
              var R = g[C - 15], B = (R << 25 | R >>> 7) ^ (R << 14 | R >>> 18) ^ R >>> 3, E = g[C - 2], q = (E << 15 | E >>> 17) ^ (E << 13 | E >>> 19) ^ E >>> 10;
              g[C] = B + g[C - 7] + q + g[C - 16];
            }
            var G = _ & m ^ ~_ & v, J = y & I ^ y & a ^ I & a, K = (y << 30 | y >>> 2) ^ (y << 19 | y >>> 13) ^ (y << 10 | y >>> 22), Ae = (_ << 26 | _ >>> 6) ^ (_ << 21 | _ >>> 11) ^ (_ << 7 | _ >>> 25), ne = k + Ae + G + p[C] + g[C], xe = K + J;
            k = v, v = m, m = _, _ = h + ne | 0, h = a, a = I, I = y, y = ne + xe | 0;
          }
          u[0] = u[0] + y | 0, u[1] = u[1] + I | 0, u[2] = u[2] + a | 0, u[3] = u[3] + h | 0, u[4] = u[4] + _ | 0, u[5] = u[5] + m | 0, u[6] = u[6] + v | 0, u[7] = u[7] + k | 0;
        },
        _doFinalize: function() {
          var w = this._data, b = w.words, u = this._nDataBytes * 8, y = w.sigBytes * 8;
          return b[y >>> 5] |= 128 << 24 - y % 32, b[(y + 64 >>> 9 << 4) + 14] = i.floor(u / 4294967296), b[(y + 64 >>> 9 << 4) + 15] = u, w.sigBytes = b.length * 4, this._process(), this._hash;
        },
        clone: function() {
          var w = c.clone.call(this);
          return w._hash = this._hash.clone(), w;
        }
      });
      r.SHA256 = c._createHelper(S), r.HmacSHA256 = c._createHmacHelper(S);
    }(Math), s.SHA256;
  });
})(we);
const $e = we.exports;
var me = { exports: {} };
(function(e, t) {
  (function(s, i) {
    e.exports = i($());
  })(H, function(s) {
    return function() {
      var i = s, r = i.lib, n = r.WordArray, o = i.enc;
      o.Base64 = {
        stringify: function(d) {
          var l = d.words, p = d.sigBytes, g = this._map;
          d.clamp();
          for (var S = [], w = 0; w < p; w += 3)
            for (var b = l[w >>> 2] >>> 24 - w % 4 * 8 & 255, u = l[w + 1 >>> 2] >>> 24 - (w + 1) % 4 * 8 & 255, y = l[w + 2 >>> 2] >>> 24 - (w + 2) % 4 * 8 & 255, I = b << 16 | u << 8 | y, a = 0; a < 4 && w + a * 0.75 < p; a++)
              S.push(g.charAt(I >>> 6 * (3 - a) & 63));
          var h = g.charAt(64);
          if (h)
            for (; S.length % 4; )
              S.push(h);
          return S.join("");
        },
        parse: function(d) {
          var l = d.length, p = this._map, g = this._reverseMap;
          if (!g) {
            g = this._reverseMap = [];
            for (var S = 0; S < p.length; S++)
              g[p.charCodeAt(S)] = S;
          }
          var w = p.charAt(64);
          if (w) {
            var b = d.indexOf(w);
            b !== -1 && (l = b);
          }
          return c(d, l, g);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
      function c(d, l, p) {
        for (var g = [], S = 0, w = 0; w < l; w++)
          if (w % 4) {
            var b = p[d.charCodeAt(w - 1)] << w % 4 * 2, u = p[d.charCodeAt(w)] >>> 6 - w % 4 * 2, y = b | u;
            g[S >>> 2] |= y << 24 - S % 4 * 8, S++;
          }
        return n.create(g, S);
      }
    }(), s.enc.Base64;
  });
})(me);
const ce = me.exports;
var ye = { exports: {} };
(function(e, t) {
  (function(s, i) {
    e.exports = i($());
  })(H, function(s) {
    return s.enc.Utf8;
  });
})(ye);
const Ge = ye.exports;
function Q(e) {
  this.message = e;
}
Q.prototype = new Error(), Q.prototype.name = "InvalidCharacterError";
var de = typeof window < "u" && window.atob && window.atob.bind(window) || function(e) {
  var t = String(e).replace(/=+$/, "");
  if (t.length % 4 == 1)
    throw new Q("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var s, i, r = 0, n = 0, o = ""; i = t.charAt(n++); ~i && (s = r % 4 ? 64 * s + i : i, r++ % 4) ? o += String.fromCharCode(255 & s >> (-2 * r & 6)) : 0)
    i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);
  return o;
};
function Je(e) {
  var t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return function(s) {
      return decodeURIComponent(de(s).replace(/(.)/g, function(i, r) {
        var n = r.charCodeAt(0).toString(16).toUpperCase();
        return n.length < 2 && (n = "0" + n), "%" + n;
      }));
    }(t);
  } catch {
    return de(t);
  }
}
function F(e) {
  this.message = e;
}
function Ke(e, t) {
  if (typeof e != "string")
    throw new F("Invalid token specified");
  var s = (t = t || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse(Je(e.split(".")[s]));
  } catch (i) {
    throw new F("Invalid token specified: " + i.message);
  }
}
F.prototype = new Error(), F.prototype.name = "InvalidTokenError";
var Ve = {
  debug: () => {
  },
  info: () => {
  },
  warn: () => {
  },
  error: () => {
  }
}, A, x, z = /* @__PURE__ */ ((e) => (e[e.NONE = 0] = "NONE", e[e.ERROR = 1] = "ERROR", e[e.WARN = 2] = "WARN", e[e.INFO = 3] = "INFO", e[e.DEBUG = 4] = "DEBUG", e))(z || {});
((e) => {
  function t() {
    A = 3, x = Ve;
  }
  e.reset = t;
  function s(r) {
    if (!(0 <= r && r <= 4))
      throw new Error("Invalid log level");
    A = r;
  }
  e.setLevel = s;
  function i(r) {
    x = r;
  }
  e.setLogger = i;
})(z || (z = {}));
var f = class {
  constructor(e) {
    this._name = e;
  }
  debug(...e) {
    A >= 4 && x.debug(f._format(this._name, this._method), ...e);
  }
  info(...e) {
    A >= 3 && x.info(f._format(this._name, this._method), ...e);
  }
  warn(...e) {
    A >= 2 && x.warn(f._format(this._name, this._method), ...e);
  }
  error(...e) {
    A >= 1 && x.error(f._format(this._name, this._method), ...e);
  }
  throw(e) {
    throw this.error(e), e;
  }
  create(e) {
    const t = Object.create(this);
    return t._method = e, t.debug("begin"), t;
  }
  static createStatic(e, t) {
    const s = new f(`${e}.${t}`);
    return s.debug("begin"), s;
  }
  static _format(e, t) {
    const s = `[${e}]`;
    return t ? `${s} ${t}:` : s;
  }
  static debug(e, ...t) {
    A >= 4 && x.debug(f._format(e), ...t);
  }
  static info(e, ...t) {
    A >= 3 && x.info(f._format(e), ...t);
  }
  static warn(e, ...t) {
    A >= 2 && x.warn(f._format(e), ...t);
  }
  static error(e, ...t) {
    A >= 1 && x.error(f._format(e), ...t);
  }
};
z.reset();
var Qe = "10000000-1000-4000-8000-100000000000", O = class {
  static _randomWord() {
    return ze.lib.WordArray.random(1).words[0];
  }
  static generateUUIDv4() {
    return Qe.replace(
      /[018]/g,
      (e) => (+e ^ O._randomWord() & 15 >> +e / 4).toString(16)
    ).replace(/-/g, "");
  }
  static generateCodeVerifier() {
    return O.generateUUIDv4() + O.generateUUIDv4() + O.generateUUIDv4();
  }
  static generateCodeChallenge(e) {
    try {
      const t = $e(e);
      return ce.stringify(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch (t) {
      throw f.error("CryptoUtils.generateCodeChallenge", t), t;
    }
  }
  static generateBasicAuth(e, t) {
    const s = Ge.parse([e, t].join(":"));
    return ce.stringify(s);
  }
}, M = class {
  constructor(e) {
    this._name = e, this._logger = new f(`Event('${this._name}')`), this._callbacks = [];
  }
  addHandler(e) {
    return this._callbacks.push(e), () => this.removeHandler(e);
  }
  removeHandler(e) {
    const t = this._callbacks.lastIndexOf(e);
    t >= 0 && this._callbacks.splice(t, 1);
  }
  raise(...e) {
    this._logger.debug("raise:", ...e);
    for (const t of this._callbacks)
      t(...e);
  }
}, Y = class {
  static decode(e) {
    try {
      return Ke(e);
    } catch (t) {
      throw f.error("JwtUtils.decode", t), t;
    }
  }
}, he = class {
  static center({ ...e }) {
    var t;
    return e.width == null && (e.width = (t = [800, 720, 600, 480].find((s) => s <= window.outerWidth / 1.618)) != null ? t : 360), e.left != null || (e.left = Math.max(0, Math.round(window.screenX + (window.outerWidth - e.width) / 2))), e.height != null && (e.top != null || (e.top = Math.max(0, Math.round(window.screenY + (window.outerHeight - e.height) / 2)))), e;
  }
  static serialize(e) {
    return Object.entries(e).filter(([, t]) => t != null).map(([t, s]) => `${t}=${typeof s != "boolean" ? s : s ? "yes" : "no"}`).join(",");
  }
}, P = class extends M {
  constructor() {
    super(...arguments), this._logger = new f(`Timer('${this._name}')`), this._timerHandle = null, this._expiration = 0, this._callback = () => {
      const e = this._expiration - P.getEpochTime();
      this._logger.debug("timer completes in", e), this._expiration <= P.getEpochTime() && (this.cancel(), super.raise());
    };
  }
  static getEpochTime() {
    return Math.floor(Date.now() / 1e3);
  }
  init(e) {
    const t = this._logger.create("init");
    e = Math.max(Math.floor(e), 1);
    const s = P.getEpochTime() + e;
    if (this.expiration === s && this._timerHandle) {
      t.debug("skipping since already initialized for expiration at", this.expiration);
      return;
    }
    this.cancel(), t.debug("using duration", e), this._expiration = s;
    const i = Math.min(e, 5);
    this._timerHandle = setInterval(this._callback, i * 1e3);
  }
  get expiration() {
    return this._expiration;
  }
  cancel() {
    this._logger.create("cancel"), this._timerHandle && (clearInterval(this._timerHandle), this._timerHandle = null);
  }
}, X = class {
  static readParams(e, t = "query") {
    if (!e)
      throw new TypeError("Invalid URL");
    const s = new URL(e, window.location.origin)[t === "fragment" ? "hash" : "search"];
    return new URLSearchParams(s.slice(1));
  }
}, j = class extends Error {
  constructor(e, t) {
    var s, i, r;
    if (super(e.error_description || e.error || ""), this.form = t, this.name = "ErrorResponse", !e.error)
      throw f.error("ErrorResponse", "No error passed"), new Error("No error passed");
    this.error = e.error, this.error_description = (s = e.error_description) != null ? s : null, this.error_uri = (i = e.error_uri) != null ? i : null, this.state = e.userState, this.session_state = (r = e.session_state) != null ? r : null;
  }
}, se = class extends Error {
  constructor(e) {
    super(e), this.name = "ErrorTimeout";
  }
}, Ye = class {
  constructor(e) {
    this._logger = new f("AccessTokenEvents"), this._expiringTimer = new P("Access token expiring"), this._expiredTimer = new P("Access token expired"), this._expiringNotificationTimeInSeconds = e.expiringNotificationTimeInSeconds;
  }
  load(e) {
    const t = this._logger.create("load");
    if (e.access_token && e.expires_in !== void 0) {
      const s = e.expires_in;
      if (t.debug("access token present, remaining duration:", s), s > 0) {
        let r = s - this._expiringNotificationTimeInSeconds;
        r <= 0 && (r = 1), t.debug("registering expiring timer, raising in", r, "seconds"), this._expiringTimer.init(r);
      } else
        t.debug("canceling existing expiring timer because we're past expiration."), this._expiringTimer.cancel();
      const i = s + 1;
      t.debug("registering expired timer, raising in", i, "seconds"), this._expiredTimer.init(i);
    } else
      this._expiringTimer.cancel(), this._expiredTimer.cancel();
  }
  unload() {
    this._logger.debug("unload: canceling existing access token timers"), this._expiringTimer.cancel(), this._expiredTimer.cancel();
  }
  addAccessTokenExpiring(e) {
    return this._expiringTimer.addHandler(e);
  }
  removeAccessTokenExpiring(e) {
    this._expiringTimer.removeHandler(e);
  }
  addAccessTokenExpired(e) {
    return this._expiredTimer.addHandler(e);
  }
  removeAccessTokenExpired(e) {
    this._expiredTimer.removeHandler(e);
  }
}, Xe = class {
  constructor(e, t, s, i, r) {
    this._callback = e, this._client_id = t, this._intervalInSeconds = i, this._stopOnError = r, this._logger = new f("CheckSessionIFrame"), this._timer = null, this._session_state = null, this._message = (o) => {
      o.origin === this._frame_origin && o.source === this._frame.contentWindow && (o.data === "error" ? (this._logger.error("error message from check session op iframe"), this._stopOnError && this.stop()) : o.data === "changed" ? (this._logger.debug("changed message from check session op iframe"), this.stop(), this._callback()) : this._logger.debug(o.data + " message from check session op iframe"));
    };
    const n = new URL(s);
    this._frame_origin = n.origin, this._frame = window.document.createElement("iframe"), this._frame.style.visibility = "hidden", this._frame.style.position = "fixed", this._frame.style.left = "-1000px", this._frame.style.top = "0", this._frame.width = "0", this._frame.height = "0", this._frame.src = n.href;
  }
  load() {
    return new Promise((e) => {
      this._frame.onload = () => {
        e();
      }, window.document.body.appendChild(this._frame), window.addEventListener("message", this._message, !1);
    });
  }
  start(e) {
    if (this._session_state === e)
      return;
    this._logger.create("start"), this.stop(), this._session_state = e;
    const t = () => {
      !this._frame.contentWindow || !this._session_state || this._frame.contentWindow.postMessage(this._client_id + " " + this._session_state, this._frame_origin);
    };
    t(), this._timer = setInterval(t, this._intervalInSeconds * 1e3);
  }
  stop() {
    this._logger.create("stop"), this._session_state = null, this._timer && (clearInterval(this._timer), this._timer = null);
  }
}, Se = class {
  constructor() {
    this._logger = new f("InMemoryWebStorage"), this._data = {};
  }
  clear() {
    this._logger.create("clear"), this._data = {};
  }
  getItem(e) {
    return this._logger.create(`getItem('${e}')`), this._data[e];
  }
  setItem(e, t) {
    this._logger.create(`setItem('${e}')`), this._data[e] = t;
  }
  removeItem(e) {
    this._logger.create(`removeItem('${e}')`), delete this._data[e];
  }
  get length() {
    return Object.getOwnPropertyNames(this._data).length;
  }
  key(e) {
    return Object.getOwnPropertyNames(this._data)[e];
  }
}, ie = class {
  constructor(e = [], t = null) {
    this._jwtHandler = t, this._logger = new f("JsonService"), this._contentTypes = [], this._contentTypes.push(...e, "application/json"), t && this._contentTypes.push("application/jwt");
  }
  async fetchWithTimeout(e, t = {}) {
    const { timeoutInSeconds: s, ...i } = t;
    if (!s)
      return await fetch(e, i);
    const r = new AbortController(), n = setTimeout(() => r.abort(), s * 1e3);
    try {
      return await fetch(e, {
        ...t,
        signal: r.signal
      });
    } catch (o) {
      throw o instanceof DOMException && o.name === "AbortError" ? new se("Network timed out") : o;
    } finally {
      clearTimeout(n);
    }
  }
  async getJson(e, {
    token: t,
    credentials: s
  } = {}) {
    const i = this._logger.create("getJson"), r = {
      Accept: this._contentTypes.join(", ")
    };
    t && (i.debug("token passed, setting Authorization header"), r.Authorization = "Bearer " + t);
    let n;
    try {
      i.debug("url:", e), n = await this.fetchWithTimeout(e, { method: "GET", headers: r, credentials: s });
    } catch (d) {
      throw i.error("Network Error"), d;
    }
    i.debug("HTTP response received, status", n.status);
    const o = n.headers.get("Content-Type");
    if (o && !this._contentTypes.find((d) => o.startsWith(d)) && i.throw(new Error(`Invalid response Content-Type: ${o != null ? o : "undefined"}, from URL: ${e}`)), n.ok && this._jwtHandler && (o == null ? void 0 : o.startsWith("application/jwt")))
      return await this._jwtHandler(await n.text());
    let c;
    try {
      c = await n.json();
    } catch (d) {
      throw i.error("Error parsing JSON response", d), n.ok ? d : new Error(`${n.statusText} (${n.status})`);
    }
    if (!n.ok)
      throw i.error("Error from server:", c), c.error ? new j(c) : new Error(`${n.statusText} (${n.status}): ${JSON.stringify(c)}`);
    return c;
  }
  async postForm(e, {
    body: t,
    basicAuth: s,
    timeoutInSeconds: i,
    initCredentials: r
  }) {
    const n = this._logger.create("postForm"), o = {
      Accept: this._contentTypes.join(", "),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    s !== void 0 && (o.Authorization = "Basic " + s);
    let c;
    try {
      n.debug("url:", e), c = await this.fetchWithTimeout(e, { method: "POST", headers: o, body: t, timeoutInSeconds: i, credentials: r });
    } catch (g) {
      throw n.error("Network error"), g;
    }
    n.debug("HTTP response received, status", c.status);
    const d = c.headers.get("Content-Type");
    if (d && !this._contentTypes.find((g) => d.startsWith(g)))
      throw new Error(`Invalid response Content-Type: ${d != null ? d : "undefined"}, from URL: ${e}`);
    const l = await c.text();
    let p = {};
    if (l)
      try {
        p = JSON.parse(l);
      } catch (g) {
        throw n.error("Error parsing JSON response", g), c.ok ? g : new Error(`${c.statusText} (${c.status})`);
      }
    if (!c.ok)
      throw n.error("Error from server:", p), p.error ? new j(p, t) : new Error(`${c.statusText} (${c.status}): ${JSON.stringify(p)}`);
    return p;
  }
}, Ze = class {
  constructor(e) {
    this._settings = e, this._logger = new f("MetadataService"), this._jsonService = new ie(["application/jwk-set+json"]), this._signingKeys = null, this._metadata = null, this._metadataUrl = this._settings.metadataUrl, this._settings.signingKeys && (this._logger.debug("using signingKeys from settings"), this._signingKeys = this._settings.signingKeys), this._settings.metadata && (this._logger.debug("using metadata from settings"), this._metadata = this._settings.metadata), this._settings.fetchRequestCredentials && (this._logger.debug("using fetchRequestCredentials from settings"), this._fetchRequestCredentials = this._settings.fetchRequestCredentials);
  }
  resetSigningKeys() {
    this._signingKeys = null;
  }
  async getMetadata() {
    const e = this._logger.create("getMetadata");
    if (this._metadata)
      return e.debug("using cached values"), this._metadata;
    if (!this._metadataUrl)
      throw e.throw(new Error("No authority or metadataUrl configured on settings")), null;
    e.debug("getting metadata from", this._metadataUrl);
    const t = await this._jsonService.getJson(this._metadataUrl, { credentials: this._fetchRequestCredentials });
    return e.debug("merging remote JSON with seed metadata"), this._metadata = Object.assign({}, this._settings.metadataSeed, t), this._metadata;
  }
  getIssuer() {
    return this._getMetadataProperty("issuer");
  }
  getAuthorizationEndpoint() {
    return this._getMetadataProperty("authorization_endpoint");
  }
  getUserInfoEndpoint() {
    return this._getMetadataProperty("userinfo_endpoint");
  }
  getTokenEndpoint(e = !0) {
    return this._getMetadataProperty("token_endpoint", e);
  }
  getCheckSessionIframe() {
    return this._getMetadataProperty("check_session_iframe", !0);
  }
  getEndSessionEndpoint() {
    return this._getMetadataProperty("end_session_endpoint", !0);
  }
  getRevocationEndpoint(e = !0) {
    return this._getMetadataProperty("revocation_endpoint", e);
  }
  getKeysEndpoint(e = !0) {
    return this._getMetadataProperty("jwks_uri", e);
  }
  async _getMetadataProperty(e, t = !1) {
    const s = this._logger.create(`_getMetadataProperty('${e}')`), i = await this.getMetadata();
    if (s.debug("resolved"), i[e] === void 0) {
      if (t === !0) {
        s.warn("Metadata does not contain optional property");
        return;
      }
      s.throw(new Error("Metadata does not contain property " + e));
    }
    return i[e];
  }
  async getSigningKeys() {
    const e = this._logger.create("getSigningKeys");
    if (this._signingKeys)
      return e.debug("returning signingKeys from cache"), this._signingKeys;
    const t = await this.getKeysEndpoint(!1);
    e.debug("got jwks_uri", t);
    const s = await this._jsonService.getJson(t);
    if (e.debug("got key set", s), !Array.isArray(s.keys))
      throw e.throw(new Error("Missing keys on keyset")), null;
    return this._signingKeys = s.keys, this._signingKeys;
  }
}, ve = class {
  constructor({
    prefix: e = "oidc.",
    store: t = localStorage
  } = {}) {
    this._logger = new f("WebStorageStateStore"), this._store = t, this._prefix = e;
  }
  async set(e, t) {
    this._logger.create(`set('${e}')`), e = this._prefix + e, await this._store.setItem(e, t);
  }
  async get(e) {
    return this._logger.create(`get('${e}')`), e = this._prefix + e, await this._store.getItem(e);
  }
  async remove(e) {
    this._logger.create(`remove('${e}')`), e = this._prefix + e;
    const t = await this._store.getItem(e);
    return await this._store.removeItem(e), t;
  }
  async getAllKeys() {
    this._logger.create("getAllKeys");
    const e = await this._store.length, t = [];
    for (let s = 0; s < e; s++) {
      const i = await this._store.key(s);
      i && i.indexOf(this._prefix) === 0 && t.push(i.substr(this._prefix.length));
    }
    return t;
  }
}, et = "code", tt = "openid", st = "client_secret_post", it = "query", rt = 60 * 15, nt = 60 * 5, be = class {
  constructor({
    authority: e,
    metadataUrl: t,
    metadata: s,
    signingKeys: i,
    metadataSeed: r,
    client_id: n,
    client_secret: o,
    response_type: c = et,
    scope: d = tt,
    redirect_uri: l,
    post_logout_redirect_uri: p,
    client_authentication: g = st,
    prompt: S,
    display: w,
    max_age: b,
    ui_locales: u,
    acr_values: y,
    resource: I,
    response_mode: a = it,
    filterProtocolClaims: h = !0,
    loadUserInfo: _ = !1,
    staleStateAgeInSeconds: m = rt,
    clockSkewInSeconds: v = nt,
    userInfoJwtIssuer: k = "OP",
    mergeClaims: C = !1,
    stateStore: R,
    refreshTokenCredentials: B,
    revokeTokenAdditionalContentTypes: E,
    fetchRequestCredentials: q,
    extraQueryParams: G = {},
    extraTokenParams: J = {}
  }) {
    if (this.authority = e, t ? this.metadataUrl = t : (this.metadataUrl = e, e && (this.metadataUrl.endsWith("/") || (this.metadataUrl += "/"), this.metadataUrl += ".well-known/openid-configuration")), this.metadata = s, this.metadataSeed = r, this.signingKeys = i, this.client_id = n, this.client_secret = o, this.response_type = c, this.scope = d, this.redirect_uri = l, this.post_logout_redirect_uri = p, this.client_authentication = g, this.prompt = S, this.display = w, this.max_age = b, this.ui_locales = u, this.acr_values = y, this.resource = I, this.response_mode = a, this.filterProtocolClaims = !!h, this.loadUserInfo = !!_, this.staleStateAgeInSeconds = m, this.clockSkewInSeconds = v, this.userInfoJwtIssuer = k, this.mergeClaims = !!C, this.revokeTokenAdditionalContentTypes = E, q && B && console.warn("Both fetchRequestCredentials and refreshTokenCredentials is set. Only fetchRequestCredentials will be used."), this.fetchRequestCredentials = q || B || "same-origin", R)
      this.stateStore = R;
    else {
      const K = typeof window < "u" ? window.localStorage : new Se();
      this.stateStore = new ve({ store: K });
    }
    this.extraQueryParams = G, this.extraTokenParams = J;
  }
}, ot = class {
  constructor(e, t) {
    this._settings = e, this._metadataService = t, this._logger = new f("UserInfoService"), this._getClaimsFromJwt = async (s) => {
      const i = this._logger.create("_getClaimsFromJwt");
      try {
        const r = Y.decode(s);
        return i.debug("JWT decoding successful"), r;
      } catch (r) {
        throw i.error("Error parsing JWT response"), r;
      }
    }, this._jsonService = new ie(void 0, this._getClaimsFromJwt);
  }
  async getClaims(e) {
    const t = this._logger.create("getClaims");
    e || this._logger.throw(new Error("No token passed"));
    const s = await this._metadataService.getUserInfoEndpoint();
    t.debug("got userinfo url", s);
    const i = await this._jsonService.getJson(s, {
      token: e,
      credentials: this._settings.fetchRequestCredentials
    });
    return t.debug("got claims", i), i;
  }
}, ke = class {
  constructor(e, t) {
    this._settings = e, this._metadataService = t, this._logger = new f("TokenClient"), this._jsonService = new ie(this._settings.revokeTokenAdditionalContentTypes);
  }
  async exchangeCode({
    grant_type: e = "authorization_code",
    redirect_uri: t = this._settings.redirect_uri,
    client_id: s = this._settings.client_id,
    client_secret: i = this._settings.client_secret,
    ...r
  }) {
    const n = this._logger.create("exchangeCode");
    s || n.throw(new Error("A client_id is required")), t || n.throw(new Error("A redirect_uri is required")), r.code || n.throw(new Error("A code is required")), r.code_verifier || n.throw(new Error("A code_verifier is required"));
    const o = new URLSearchParams({ grant_type: e, redirect_uri: t });
    for (const [p, g] of Object.entries(r))
      g != null && o.set(p, g);
    let c;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!i)
          throw n.throw(new Error("A client_secret is required")), null;
        c = O.generateBasicAuth(s, i);
        break;
      case "client_secret_post":
        o.append("client_id", s), i && o.append("client_secret", i);
        break;
    }
    const d = await this._metadataService.getTokenEndpoint(!1);
    n.debug("got token endpoint");
    const l = await this._jsonService.postForm(d, { body: o, basicAuth: c, initCredentials: this._settings.fetchRequestCredentials });
    return n.debug("got response"), l;
  }
  async exchangeCredentials({
    grant_type: e = "password",
    client_id: t = this._settings.client_id,
    client_secret: s = this._settings.client_secret,
    scope: i = this._settings.scope,
    username: r,
    password: n
  }) {
    const o = this._logger.create("exchangeCredentials");
    t || o.throw(new Error("A client_id is required"));
    const c = new URLSearchParams({ grant_type: e, username: r, password: n, scope: i });
    let d;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!s)
          throw o.throw(new Error("A client_secret is required")), null;
        d = O.generateBasicAuth(t, s);
        break;
      case "client_secret_post":
        c.append("client_id", t), s && c.append("client_secret", s);
        break;
    }
    const l = await this._metadataService.getTokenEndpoint(!1);
    o.debug("got token endpoint");
    const p = await this._jsonService.postForm(l, { body: c, basicAuth: d, initCredentials: this._settings.fetchRequestCredentials });
    return o.debug("got response"), p;
  }
  async exchangeRefreshToken({
    grant_type: e = "refresh_token",
    client_id: t = this._settings.client_id,
    client_secret: s = this._settings.client_secret,
    timeoutInSeconds: i,
    ...r
  }) {
    const n = this._logger.create("exchangeRefreshToken");
    t || n.throw(new Error("A client_id is required")), r.refresh_token || n.throw(new Error("A refresh_token is required"));
    const o = new URLSearchParams({ grant_type: e });
    for (const [p, g] of Object.entries(r))
      g != null && o.set(p, g);
    let c;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!s)
          throw n.throw(new Error("A client_secret is required")), null;
        c = O.generateBasicAuth(t, s);
        break;
      case "client_secret_post":
        o.append("client_id", t), s && o.append("client_secret", s);
        break;
    }
    const d = await this._metadataService.getTokenEndpoint(!1);
    n.debug("got token endpoint");
    const l = await this._jsonService.postForm(d, { body: o, basicAuth: c, timeoutInSeconds: i, initCredentials: this._settings.fetchRequestCredentials });
    return n.debug("got response"), l;
  }
  async revoke(e) {
    var t;
    const s = this._logger.create("revoke");
    e.token || s.throw(new Error("A token is required"));
    const i = await this._metadataService.getRevocationEndpoint(!1);
    s.debug(`got revocation endpoint, revoking ${(t = e.token_type_hint) != null ? t : "default token type"}`);
    const r = new URLSearchParams();
    for (const [n, o] of Object.entries(e))
      o != null && r.set(n, o);
    r.set("client_id", this._settings.client_id), this._settings.client_secret && r.set("client_secret", this._settings.client_secret), await this._jsonService.postForm(i, { body: r }), s.debug("got response");
  }
}, at = [
  "iss",
  "aud",
  "exp",
  "nbf",
  "iat",
  "jti",
  "auth_time",
  "nonce",
  "acr",
  "amr",
  "azp",
  "at_hash"
], ct = class {
  constructor(e, t) {
    this._settings = e, this._metadataService = t, this._logger = new f("ResponseValidator"), this._userInfoService = new ot(this._settings, this._metadataService), this._tokenClient = new ke(this._settings, this._metadataService);
  }
  async validateSigninResponse(e, t) {
    const s = this._logger.create("validateSigninResponse");
    this._processSigninState(e, t), s.debug("state processed"), await this._processCode(e, t), s.debug("code processed"), e.isOpenId && this._validateIdTokenAttributes(e), s.debug("tokens validated"), await this._processClaims(e, t == null ? void 0 : t.skipUserInfo, e.isOpenId), s.debug("claims processed");
  }
  async validateCredentialsResponse(e, t) {
    const s = this._logger.create("validateCredentialsResponse");
    e.isOpenId && this._validateIdTokenAttributes(e), s.debug("tokens validated"), await this._processClaims(e, t, e.isOpenId), s.debug("claims processed");
  }
  async validateRefreshResponse(e, t) {
    const s = this._logger.create("validateRefreshResponse");
    e.userState = t.data, e.session_state != null || (e.session_state = t.session_state), e.scope != null || (e.scope = t.scope), e.isOpenId && !!e.id_token && (this._validateIdTokenAttributes(e, t.id_token), s.debug("ID Token validated")), e.id_token || (e.id_token = t.id_token, e.profile = t.profile);
    const i = e.isOpenId && !!e.id_token;
    await this._processClaims(e, !1, i), s.debug("claims processed");
  }
  validateSignoutResponse(e, t) {
    const s = this._logger.create("validateSignoutResponse");
    if (t.id !== e.state && s.throw(new Error("State does not match")), s.debug("state validated"), e.userState = t.data, e.error)
      throw s.warn("Response was error", e.error), new j(e);
  }
  _processSigninState(e, t) {
    const s = this._logger.create("_processSigninState");
    if (t.id !== e.state && s.throw(new Error("State does not match")), t.client_id || s.throw(new Error("No client_id on state")), t.authority || s.throw(new Error("No authority on state")), this._settings.authority !== t.authority && s.throw(new Error("authority mismatch on settings vs. signin state")), this._settings.client_id && this._settings.client_id !== t.client_id && s.throw(new Error("client_id mismatch on settings vs. signin state")), s.debug("state validated"), e.userState = t.data, e.scope != null || (e.scope = t.scope), e.error)
      throw s.warn("Response was error", e.error), new j(e);
    t.code_verifier && !e.code && s.throw(new Error("Expected code in response")), !t.code_verifier && e.code && s.throw(new Error("Unexpected code in response"));
  }
  async _processClaims(e, t = !1, s = !0) {
    const i = this._logger.create("_processClaims");
    if (e.profile = this._filterProtocolClaims(e.profile), t || !this._settings.loadUserInfo || !e.access_token) {
      i.debug("not loading user info");
      return;
    }
    i.debug("loading user info");
    const r = await this._userInfoService.getClaims(e.access_token);
    i.debug("user info claims received from user info endpoint"), s && r.sub !== e.profile.sub && i.throw(new Error("subject from UserInfo response does not match subject in ID Token")), e.profile = this._mergeClaims(e.profile, this._filterProtocolClaims(r)), i.debug("user info claims received, updated profile:", e.profile);
  }
  _mergeClaims(e, t) {
    const s = { ...e };
    for (const [i, r] of Object.entries(t))
      for (const n of Array.isArray(r) ? r : [r]) {
        const o = s[i];
        o ? Array.isArray(o) ? o.includes(n) || o.push(n) : s[i] !== n && (typeof n == "object" && this._settings.mergeClaims ? s[i] = this._mergeClaims(o, n) : s[i] = [o, n]) : s[i] = n;
      }
    return s;
  }
  _filterProtocolClaims(e) {
    const t = { ...e };
    if (this._settings.filterProtocolClaims)
      for (const s of at)
        delete t[s];
    return t;
  }
  async _processCode(e, t) {
    const s = this._logger.create("_processCode");
    if (e.code) {
      s.debug("Validating code");
      const i = await this._tokenClient.exchangeCode({
        client_id: t.client_id,
        client_secret: t.client_secret,
        code: e.code,
        redirect_uri: t.redirect_uri,
        code_verifier: t.code_verifier,
        ...t.extraTokenParams
      });
      Object.assign(e, i);
    } else
      s.debug("No code to process");
  }
  _validateIdTokenAttributes(e, t) {
    var s;
    const i = this._logger.create("_validateIdTokenAttributes");
    i.debug("decoding ID Token JWT");
    const r = Y.decode((s = e.id_token) != null ? s : "");
    if (r.sub || i.throw(new Error("ID Token is missing a subject claim")), t) {
      const n = Y.decode(t);
      n.sub !== r.sub && i.throw(new Error("sub in id_token does not match current sub")), n.auth_time && n.auth_time !== r.auth_time && i.throw(new Error("auth_time in id_token does not match original auth_time")), n.azp && n.azp !== r.azp && i.throw(new Error("azp in id_token does not match original azp")), !n.azp && r.azp && i.throw(new Error("azp not in id_token, but present in original id_token"));
    }
    e.profile = r;
  }
}, D = class {
  constructor(e) {
    this.id = e.id || O.generateUUIDv4(), this.data = e.data, e.created && e.created > 0 ? this.created = e.created : this.created = P.getEpochTime(), this.request_type = e.request_type;
  }
  toStorageString() {
    return new f("State").create("toStorageString"), JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type
    });
  }
  static fromStorageString(e) {
    return f.createStatic("State", "fromStorageString"), new D(JSON.parse(e));
  }
  static async clearStaleState(e, t) {
    const s = f.createStatic("State", "clearStaleState"), i = P.getEpochTime() - t, r = await e.getAllKeys();
    s.debug("got keys", r);
    for (let n = 0; n < r.length; n++) {
      const o = r[n], c = await e.get(o);
      let d = !1;
      if (c)
        try {
          const l = D.fromStorageString(c);
          s.debug("got item from key:", o, l.created), l.created <= i && (d = !0);
        } catch (l) {
          s.error("Error parsing state for key:", o, l), d = !0;
        }
      else
        s.debug("no item in storage for key:", o), d = !0;
      d && (s.debug("removed item for key:", o), e.remove(o));
    }
  }
}, re = class extends D {
  constructor(e) {
    super(e), e.code_verifier === !0 ? this.code_verifier = O.generateCodeVerifier() : e.code_verifier && (this.code_verifier = e.code_verifier), this.code_verifier && (this.code_challenge = O.generateCodeChallenge(this.code_verifier)), this.authority = e.authority, this.client_id = e.client_id, this.redirect_uri = e.redirect_uri, this.scope = e.scope, this.client_secret = e.client_secret, this.extraTokenParams = e.extraTokenParams, this.response_mode = e.response_mode, this.skipUserInfo = e.skipUserInfo;
  }
  toStorageString() {
    return new f("SigninState").create("toStorageString"), JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type,
      code_verifier: this.code_verifier,
      authority: this.authority,
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      scope: this.scope,
      client_secret: this.client_secret,
      extraTokenParams: this.extraTokenParams,
      response_mode: this.response_mode,
      skipUserInfo: this.skipUserInfo
    });
  }
  static fromStorageString(e) {
    f.createStatic("SigninState", "fromStorageString");
    const t = JSON.parse(e);
    return new re(t);
  }
}, dt = class {
  constructor({
    url: e,
    authority: t,
    client_id: s,
    redirect_uri: i,
    response_type: r,
    scope: n,
    state_data: o,
    response_mode: c,
    request_type: d,
    client_secret: l,
    nonce: p,
    skipUserInfo: g,
    extraQueryParams: S,
    extraTokenParams: w,
    ...b
  }) {
    if (this._logger = new f("SigninRequest"), !e)
      throw this._logger.error("ctor: No url passed"), new Error("url");
    if (!s)
      throw this._logger.error("ctor: No client_id passed"), new Error("client_id");
    if (!i)
      throw this._logger.error("ctor: No redirect_uri passed"), new Error("redirect_uri");
    if (!r)
      throw this._logger.error("ctor: No response_type passed"), new Error("response_type");
    if (!n)
      throw this._logger.error("ctor: No scope passed"), new Error("scope");
    if (!t)
      throw this._logger.error("ctor: No authority passed"), new Error("authority");
    this.state = new re({
      data: o,
      request_type: d,
      code_verifier: !0,
      client_id: s,
      authority: t,
      redirect_uri: i,
      response_mode: c,
      client_secret: l,
      scope: n,
      extraTokenParams: w,
      skipUserInfo: g
    });
    const u = new URL(e);
    u.searchParams.append("client_id", s), u.searchParams.append("redirect_uri", i), u.searchParams.append("response_type", r), u.searchParams.append("scope", n), p && u.searchParams.append("nonce", p), u.searchParams.append("state", this.state.id), this.state.code_challenge && (u.searchParams.append("code_challenge", this.state.code_challenge), u.searchParams.append("code_challenge_method", "S256"));
    for (const [y, I] of Object.entries({ response_mode: c, ...b, ...S }))
      I != null && u.searchParams.append(y, I.toString());
    this.url = u.href;
  }
}, ht = "openid", V = class {
  constructor(e) {
    this.access_token = "", this.token_type = "", this.profile = {}, this.state = e.get("state"), this.session_state = e.get("session_state"), this.error = e.get("error"), this.error_description = e.get("error_description"), this.error_uri = e.get("error_uri"), this.code = e.get("code");
  }
  get expires_in() {
    if (this.expires_at !== void 0)
      return this.expires_at - P.getEpochTime();
  }
  set expires_in(e) {
    typeof e == "string" && (e = Number(e)), e !== void 0 && e >= 0 && (this.expires_at = Math.floor(e) + P.getEpochTime());
  }
  get isOpenId() {
    var e;
    return ((e = this.scope) == null ? void 0 : e.split(" ").includes(ht)) || !!this.id_token;
  }
}, lt = class {
  constructor({
    url: e,
    state_data: t,
    id_token_hint: s,
    post_logout_redirect_uri: i,
    extraQueryParams: r,
    request_type: n
  }) {
    if (this._logger = new f("SignoutRequest"), !e)
      throw this._logger.error("ctor: No url passed"), new Error("url");
    const o = new URL(e);
    s && o.searchParams.append("id_token_hint", s), i && (o.searchParams.append("post_logout_redirect_uri", i), t && (this.state = new D({ data: t, request_type: n }), o.searchParams.append("state", this.state.id)));
    for (const [c, d] of Object.entries({ ...r }))
      d != null && o.searchParams.append(c, d.toString());
    this.url = o.href;
  }
}, ut = class {
  constructor(e) {
    this.state = e.get("state"), this.error = e.get("error"), this.error_description = e.get("error_description"), this.error_uri = e.get("error_uri");
  }
}, gt = class {
  constructor(e) {
    this._logger = new f("OidcClient"), this.settings = new be(e), this.metadataService = new Ze(this.settings), this._validator = new ct(this.settings, this.metadataService), this._tokenClient = new ke(this.settings, this.metadataService);
  }
  async createSigninRequest({
    state: e,
    request: t,
    request_uri: s,
    request_type: i,
    id_token_hint: r,
    login_hint: n,
    skipUserInfo: o,
    nonce: c,
    response_type: d = this.settings.response_type,
    scope: l = this.settings.scope,
    redirect_uri: p = this.settings.redirect_uri,
    prompt: g = this.settings.prompt,
    display: S = this.settings.display,
    max_age: w = this.settings.max_age,
    ui_locales: b = this.settings.ui_locales,
    acr_values: u = this.settings.acr_values,
    resource: y = this.settings.resource,
    response_mode: I = this.settings.response_mode,
    extraQueryParams: a = this.settings.extraQueryParams,
    extraTokenParams: h = this.settings.extraTokenParams
  }) {
    const _ = this._logger.create("createSigninRequest");
    if (d !== "code")
      throw new Error("Only the Authorization Code flow (with PKCE) is supported");
    const m = await this.metadataService.getAuthorizationEndpoint();
    _.debug("Received authorization endpoint", m);
    const v = new dt({
      url: m,
      authority: this.settings.authority,
      client_id: this.settings.client_id,
      redirect_uri: p,
      response_type: d,
      scope: l,
      state_data: e,
      prompt: g,
      display: S,
      max_age: w,
      ui_locales: b,
      id_token_hint: r,
      login_hint: n,
      acr_values: u,
      resource: y,
      request: t,
      request_uri: s,
      extraQueryParams: a,
      extraTokenParams: h,
      request_type: i,
      response_mode: I,
      client_secret: this.settings.client_secret,
      skipUserInfo: o,
      nonce: c
    });
    await this.clearStaleState();
    const k = v.state;
    return await this.settings.stateStore.set(k.id, k.toStorageString()), v;
  }
  async readSigninResponseState(e, t = !1) {
    const s = this._logger.create("readSigninResponseState"), i = new V(X.readParams(e, this.settings.response_mode));
    if (!i.state)
      throw s.throw(new Error("No state in response")), null;
    const r = await this.settings.stateStore[t ? "remove" : "get"](i.state);
    if (!r)
      throw s.throw(new Error("No matching state found in storage")), null;
    return { state: re.fromStorageString(r), response: i };
  }
  async processSigninResponse(e) {
    const t = this._logger.create("processSigninResponse"), { state: s, response: i } = await this.readSigninResponseState(e, !0);
    return t.debug("received state from storage; validating response"), await this._validator.validateSigninResponse(i, s), i;
  }
  async processResourceOwnerPasswordCredentials({
    username: e,
    password: t,
    skipUserInfo: s = !1
  }) {
    const i = await this._tokenClient.exchangeCredentials({ username: e, password: t }), r = new V(new URLSearchParams());
    return Object.assign(r, i), await this._validator.validateCredentialsResponse(r, s), r;
  }
  async useRefreshToken({
    state: e,
    timeoutInSeconds: t
  }) {
    const s = this._logger.create("useRefreshToken"), i = await this._tokenClient.exchangeRefreshToken({
      refresh_token: e.refresh_token,
      scope: e.scope,
      timeoutInSeconds: t
    }), r = new V(new URLSearchParams());
    return Object.assign(r, i), s.debug("validating response", r), await this._validator.validateRefreshResponse(r, e), r;
  }
  async createSignoutRequest({
    state: e,
    id_token_hint: t,
    request_type: s,
    post_logout_redirect_uri: i = this.settings.post_logout_redirect_uri,
    extraQueryParams: r = this.settings.extraQueryParams
  } = {}) {
    const n = this._logger.create("createSignoutRequest"), o = await this.metadataService.getEndSessionEndpoint();
    if (!o)
      throw n.throw(new Error("No end session endpoint")), null;
    n.debug("Received end session endpoint", o);
    const c = new lt({
      url: o,
      id_token_hint: t,
      post_logout_redirect_uri: i,
      state_data: e,
      extraQueryParams: r,
      request_type: s
    });
    await this.clearStaleState();
    const d = c.state;
    return d && (n.debug("Signout request has state to persist"), await this.settings.stateStore.set(d.id, d.toStorageString())), c;
  }
  async readSignoutResponseState(e, t = !1) {
    const s = this._logger.create("readSignoutResponseState"), i = new ut(X.readParams(e, this.settings.response_mode));
    if (!i.state) {
      if (s.debug("No state in response"), i.error)
        throw s.warn("Response was error:", i.error), new j(i);
      return { state: void 0, response: i };
    }
    const r = await this.settings.stateStore[t ? "remove" : "get"](i.state);
    if (!r)
      throw s.throw(new Error("No matching state found in storage")), null;
    return { state: D.fromStorageString(r), response: i };
  }
  async processSignoutResponse(e) {
    const t = this._logger.create("processSignoutResponse"), { state: s, response: i } = await this.readSignoutResponseState(e, !0);
    return s ? (t.debug("Received state from storage; validating response"), this._validator.validateSignoutResponse(i, s)) : t.debug("No state from storage; skipping response validation"), i;
  }
  clearStaleState() {
    return this._logger.create("clearStaleState"), D.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
  }
  async revokeToken(e, t) {
    return this._logger.create("revokeToken"), await this._tokenClient.revoke({
      token: e,
      token_type_hint: t
    });
  }
}, pt = class {
  constructor(e) {
    this._userManager = e, this._logger = new f("SessionMonitor"), this._start = async (t) => {
      const s = t.session_state;
      if (!s)
        return;
      const i = this._logger.create("_start");
      if (t.profile ? (this._sub = t.profile.sub, this._sid = t.profile.sid, i.debug("session_state", s, ", sub", this._sub)) : (this._sub = void 0, this._sid = void 0, i.debug("session_state", s, ", anonymous user")), this._checkSessionIFrame) {
        this._checkSessionIFrame.start(s);
        return;
      }
      try {
        const r = await this._userManager.metadataService.getCheckSessionIframe();
        if (r) {
          i.debug("initializing check session iframe");
          const n = this._userManager.settings.client_id, o = this._userManager.settings.checkSessionIntervalInSeconds, c = this._userManager.settings.stopCheckSessionOnError, d = new Xe(this._callback, n, r, o, c);
          await d.load(), this._checkSessionIFrame = d, d.start(s);
        } else
          i.warn("no check session iframe found in the metadata");
      } catch (r) {
        i.error("Error from getCheckSessionIframe:", r instanceof Error ? r.message : r);
      }
    }, this._stop = () => {
      const t = this._logger.create("_stop");
      if (this._sub = void 0, this._sid = void 0, this._checkSessionIFrame && this._checkSessionIFrame.stop(), this._userManager.settings.monitorAnonymousSession) {
        const s = setInterval(async () => {
          clearInterval(s);
          try {
            const i = await this._userManager.querySessionStatus();
            if (i) {
              const r = {
                session_state: i.session_state,
                profile: i.sub && i.sid ? {
                  sub: i.sub,
                  sid: i.sid
                } : null
              };
              this._start(r);
            }
          } catch (i) {
            t.error("error from querySessionStatus", i instanceof Error ? i.message : i);
          }
        }, 1e3);
      }
    }, this._callback = async () => {
      const t = this._logger.create("_callback");
      try {
        const s = await this._userManager.querySessionStatus();
        let i = !0;
        s && this._checkSessionIFrame ? s.sub === this._sub ? (i = !1, this._checkSessionIFrame.start(s.session_state), s.sid === this._sid ? t.debug("same sub still logged in at OP, restarting check session iframe; session_state", s.session_state) : (t.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state", s.session_state), this._userManager.events._raiseUserSessionChanged())) : t.debug("different subject signed into OP", s.sub) : t.debug("subject no longer signed into OP"), i ? this._sub ? this._userManager.events._raiseUserSignedOut() : this._userManager.events._raiseUserSignedIn() : t.debug("no change in session detected, no event to raise");
      } catch (s) {
        this._sub && (t.debug("Error calling queryCurrentSigninSession; raising signed out event", s), this._userManager.events._raiseUserSignedOut());
      }
    }, e || this._logger.throw(new Error("No user manager passed")), this._userManager.events.addUserLoaded(this._start), this._userManager.events.addUserUnloaded(this._stop), this._init().catch((t) => {
      this._logger.error(t);
    });
  }
  async _init() {
    this._logger.create("_init");
    const e = await this._userManager.getUser();
    if (e)
      this._start(e);
    else if (this._userManager.settings.monitorAnonymousSession) {
      const t = await this._userManager.querySessionStatus();
      if (t) {
        const s = {
          session_state: t.session_state,
          profile: t.sub && t.sid ? {
            sub: t.sub,
            sid: t.sid
          } : null
        };
        this._start(s);
      }
    }
  }
}, W = class {
  constructor(e) {
    var t;
    this.id_token = e.id_token, this.session_state = (t = e.session_state) != null ? t : null, this.access_token = e.access_token, this.refresh_token = e.refresh_token, this.token_type = e.token_type, this.scope = e.scope, this.profile = e.profile, this.expires_at = e.expires_at, this.state = e.userState;
  }
  get expires_in() {
    if (this.expires_at !== void 0)
      return this.expires_at - P.getEpochTime();
  }
  set expires_in(e) {
    e !== void 0 && (this.expires_at = Math.floor(e) + P.getEpochTime());
  }
  get expired() {
    const e = this.expires_in;
    if (e !== void 0)
      return e <= 0;
  }
  get scopes() {
    var e, t;
    return (t = (e = this.scope) == null ? void 0 : e.split(" ")) != null ? t : [];
  }
  toStorageString() {
    return new f("User").create("toStorageString"), JSON.stringify({
      id_token: this.id_token,
      session_state: this.session_state,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      token_type: this.token_type,
      scope: this.scope,
      profile: this.profile,
      expires_at: this.expires_at
    });
  }
  static fromStorageString(e) {
    return f.createStatic("User", "fromStorageString"), new W(JSON.parse(e));
  }
}, le = "oidc-client", Ie = class {
  constructor() {
    this._abort = new M("Window navigation aborted"), this._disposeHandlers = /* @__PURE__ */ new Set(), this._window = null;
  }
  async navigate(e) {
    const t = this._logger.create("navigate");
    if (!this._window)
      throw new Error("Attempted to navigate on a disposed window");
    t.debug("setting URL in window"), this._window.location.replace(e.url);
    const { url: s, keepOpen: i } = await new Promise((r, n) => {
      const o = (c) => {
        var d;
        const l = c.data, p = (d = e.scriptOrigin) != null ? d : window.location.origin;
        if (!(c.origin !== p || (l == null ? void 0 : l.source) !== le)) {
          try {
            const g = X.readParams(l.url, e.response_mode).get("state");
            if (g || t.warn("no state found in response url"), c.source !== this._window && g !== e.state)
              return;
          } catch {
            this._dispose(), n(new Error("Invalid response from window"));
          }
          r(l);
        }
      };
      window.addEventListener("message", o, !1), this._disposeHandlers.add(() => window.removeEventListener("message", o, !1)), this._disposeHandlers.add(this._abort.addHandler((c) => {
        this._dispose(), n(c);
      }));
    });
    return t.debug("got response from window"), this._dispose(), i || this.close(), { url: s };
  }
  _dispose() {
    this._logger.create("_dispose");
    for (const e of this._disposeHandlers)
      e();
    this._disposeHandlers.clear();
  }
  static _notifyParent(e, t, s = !1, i = window.location.origin) {
    e.postMessage({
      source: le,
      url: t,
      keepOpen: s
    }, i);
  }
}, Te = {
  location: !1,
  toolbar: !1,
  height: 640
}, Ce = "_blank", _t = 60, ft = 2, Re = 10, wt = class extends be {
  constructor(e) {
    const {
      popup_redirect_uri: t = e.redirect_uri,
      popup_post_logout_redirect_uri: s = e.post_logout_redirect_uri,
      popupWindowFeatures: i = Te,
      popupWindowTarget: r = Ce,
      redirectMethod: n = "assign",
      redirectTarget: o = "self",
      iframeNotifyParentOrigin: c = e.iframeNotifyParentOrigin,
      iframeScriptOrigin: d = e.iframeScriptOrigin,
      silent_redirect_uri: l = e.redirect_uri,
      silentRequestTimeoutInSeconds: p = Re,
      automaticSilentRenew: g = !0,
      validateSubOnSilentRenew: S = !0,
      includeIdTokenInSilentRenew: w = !1,
      monitorSession: b = !1,
      monitorAnonymousSession: u = !1,
      checkSessionIntervalInSeconds: y = ft,
      query_status_response_type: I = "code",
      stopCheckSessionOnError: a = !0,
      revokeTokenTypes: h = ["access_token", "refresh_token"],
      revokeTokensOnSignout: _ = !1,
      includeIdTokenInSilentSignout: m = !1,
      accessTokenExpiringNotificationTimeInSeconds: v = _t,
      userStore: k
    } = e;
    if (super(e), this.popup_redirect_uri = t, this.popup_post_logout_redirect_uri = s, this.popupWindowFeatures = i, this.popupWindowTarget = r, this.redirectMethod = n, this.redirectTarget = o, this.iframeNotifyParentOrigin = c, this.iframeScriptOrigin = d, this.silent_redirect_uri = l, this.silentRequestTimeoutInSeconds = p, this.automaticSilentRenew = g, this.validateSubOnSilentRenew = S, this.includeIdTokenInSilentRenew = w, this.monitorSession = b, this.monitorAnonymousSession = u, this.checkSessionIntervalInSeconds = y, this.stopCheckSessionOnError = a, this.query_status_response_type = I, this.revokeTokenTypes = h, this.revokeTokensOnSignout = _, this.includeIdTokenInSilentSignout = m, this.accessTokenExpiringNotificationTimeInSeconds = v, k)
      this.userStore = k;
    else {
      const C = typeof window < "u" ? window.sessionStorage : new Se();
      this.userStore = new ve({ store: C });
    }
  }
}, Z = class extends Ie {
  constructor({
    silentRequestTimeoutInSeconds: e = Re
  }) {
    super(), this._logger = new f("IFrameWindow"), this._timeoutInSeconds = e, this._frame = Z.createHiddenIframe(), this._window = this._frame.contentWindow;
  }
  static createHiddenIframe() {
    const e = window.document.createElement("iframe");
    return e.style.visibility = "hidden", e.style.position = "fixed", e.style.left = "-1000px", e.style.top = "0", e.width = "0", e.height = "0", e.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms"), window.document.body.appendChild(e), e;
  }
  async navigate(e) {
    this._logger.debug("navigate: Using timeout of:", this._timeoutInSeconds);
    const t = setTimeout(() => this._abort.raise(new se("IFrame timed out without a response")), this._timeoutInSeconds * 1e3);
    return this._disposeHandlers.add(() => clearTimeout(t)), await super.navigate(e);
  }
  close() {
    var e;
    this._frame && (this._frame.parentNode && (this._frame.addEventListener("load", (t) => {
      var s;
      const i = t.target;
      (s = i.parentNode) == null || s.removeChild(i), this._abort.raise(new Error("IFrame removed from DOM"));
    }, !0), (e = this._frame.contentWindow) == null || e.location.replace("about:blank")), this._frame = null), this._window = null;
  }
  static notifyParent(e, t) {
    return super._notifyParent(window.parent, e, !1, t);
  }
}, mt = class {
  constructor(e) {
    this._settings = e, this._logger = new f("IFrameNavigator");
  }
  async prepare({
    silentRequestTimeoutInSeconds: e = this._settings.silentRequestTimeoutInSeconds
  }) {
    return new Z({ silentRequestTimeoutInSeconds: e });
  }
  async callback(e) {
    this._logger.create("callback"), Z.notifyParent(e, this._settings.iframeNotifyParentOrigin);
  }
}, yt = 500, ue = class extends Ie {
  constructor({
    popupWindowTarget: e = Ce,
    popupWindowFeatures: t = {}
  }) {
    super(), this._logger = new f("PopupWindow");
    const s = he.center({ ...Te, ...t });
    this._window = window.open(void 0, e, he.serialize(s));
  }
  async navigate(e) {
    var t;
    (t = this._window) == null || t.focus();
    const s = setInterval(() => {
      (!this._window || this._window.closed) && this._abort.raise(new Error("Popup closed by user"));
    }, yt);
    return this._disposeHandlers.add(() => clearInterval(s)), await super.navigate(e);
  }
  close() {
    this._window && (this._window.closed || (this._window.close(), this._abort.raise(new Error("Popup closed")))), this._window = null;
  }
  static notifyOpener(e, t) {
    if (!window.opener)
      throw new Error("No window.opener. Can't complete notification.");
    return super._notifyParent(window.opener, e, t);
  }
}, St = class {
  constructor(e) {
    this._settings = e, this._logger = new f("PopupNavigator");
  }
  async prepare({
    popupWindowFeatures: e = this._settings.popupWindowFeatures,
    popupWindowTarget: t = this._settings.popupWindowTarget
  }) {
    return new ue({ popupWindowFeatures: e, popupWindowTarget: t });
  }
  async callback(e, t = !1) {
    this._logger.create("callback"), ue.notifyOpener(e, t);
  }
}, vt = class {
  constructor(e) {
    this._settings = e, this._logger = new f("RedirectNavigator");
  }
  async prepare({
    redirectMethod: e = this._settings.redirectMethod,
    redirectTarget: t = this._settings.redirectTarget
  }) {
    var s;
    this._logger.create("prepare");
    let i = window.self;
    t === "top" && (i = (s = window.top) != null ? s : window.self);
    const r = i.location[e].bind(i.location);
    let n;
    return {
      navigate: async (o) => {
        this._logger.create("navigate");
        const c = new Promise((d, l) => {
          n = l;
        });
        return r(o.url), await c;
      },
      close: () => {
        this._logger.create("close"), n == null || n(new Error("Redirect aborted")), i.stop();
      }
    };
  }
}, bt = class extends Ye {
  constructor(e) {
    super({ expiringNotificationTimeInSeconds: e.accessTokenExpiringNotificationTimeInSeconds }), this._logger = new f("UserManagerEvents"), this._userLoaded = new M("User loaded"), this._userUnloaded = new M("User unloaded"), this._silentRenewError = new M("Silent renew error"), this._userSignedIn = new M("User signed in"), this._userSignedOut = new M("User signed out"), this._userSessionChanged = new M("User session changed");
  }
  load(e, t = !0) {
    super.load(e), t && this._userLoaded.raise(e);
  }
  unload() {
    super.unload(), this._userUnloaded.raise();
  }
  addUserLoaded(e) {
    return this._userLoaded.addHandler(e);
  }
  removeUserLoaded(e) {
    return this._userLoaded.removeHandler(e);
  }
  addUserUnloaded(e) {
    return this._userUnloaded.addHandler(e);
  }
  removeUserUnloaded(e) {
    return this._userUnloaded.removeHandler(e);
  }
  addSilentRenewError(e) {
    return this._silentRenewError.addHandler(e);
  }
  removeSilentRenewError(e) {
    return this._silentRenewError.removeHandler(e);
  }
  _raiseSilentRenewError(e) {
    this._silentRenewError.raise(e);
  }
  addUserSignedIn(e) {
    return this._userSignedIn.addHandler(e);
  }
  removeUserSignedIn(e) {
    this._userSignedIn.removeHandler(e);
  }
  _raiseUserSignedIn() {
    this._userSignedIn.raise();
  }
  addUserSignedOut(e) {
    return this._userSignedOut.addHandler(e);
  }
  removeUserSignedOut(e) {
    this._userSignedOut.removeHandler(e);
  }
  _raiseUserSignedOut() {
    this._userSignedOut.raise();
  }
  addUserSessionChanged(e) {
    return this._userSessionChanged.addHandler(e);
  }
  removeUserSessionChanged(e) {
    this._userSessionChanged.removeHandler(e);
  }
  _raiseUserSessionChanged() {
    this._userSessionChanged.raise();
  }
}, kt = class {
  constructor(e) {
    this._userManager = e, this._logger = new f("SilentRenewService"), this._isStarted = !1, this._retryTimer = new P("Retry Silent Renew"), this._tokenExpiring = async () => {
      const t = this._logger.create("_tokenExpiring");
      try {
        await this._userManager.signinSilent(), t.debug("silent token renewal successful");
      } catch (s) {
        if (s instanceof se) {
          t.warn("ErrorTimeout from signinSilent:", s, "retry in 5s"), this._retryTimer.init(5);
          return;
        }
        t.error("Error from signinSilent:", s), this._userManager.events._raiseSilentRenewError(s);
      }
    };
  }
  async start() {
    const e = this._logger.create("start");
    if (!this._isStarted) {
      this._isStarted = !0, this._userManager.events.addAccessTokenExpiring(this._tokenExpiring), this._retryTimer.addHandler(this._tokenExpiring);
      try {
        await this._userManager.getUser();
      } catch (t) {
        e.error("getUser error", t);
      }
    }
  }
  stop() {
    this._isStarted && (this._retryTimer.cancel(), this._retryTimer.removeHandler(this._tokenExpiring), this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring), this._isStarted = !1);
  }
}, It = class {
  constructor(e) {
    this.refresh_token = e.refresh_token, this.id_token = e.id_token, this.session_state = e.session_state, this.scope = e.scope, this.profile = e.profile, this.data = e.state;
  }
}, Tt = class {
  constructor(e) {
    this._logger = new f("UserManager"), this.settings = new wt(e), this._client = new gt(e), this._redirectNavigator = new vt(this.settings), this._popupNavigator = new St(this.settings), this._iframeNavigator = new mt(this.settings), this._events = new bt(this.settings), this._silentRenewService = new kt(this), this.settings.automaticSilentRenew && this.startSilentRenew(), this._sessionMonitor = null, this.settings.monitorSession && (this._sessionMonitor = new pt(this));
  }
  get events() {
    return this._events;
  }
  get metadataService() {
    return this._client.metadataService;
  }
  async getUser() {
    const e = this._logger.create("getUser"), t = await this._loadUser();
    return t ? (e.info("user loaded"), this._events.load(t, !1), t) : (e.info("user not found in storage"), null);
  }
  async removeUser() {
    const e = this._logger.create("removeUser");
    await this.storeUser(null), e.info("user removed from storage"), this._events.unload();
  }
  async signinRedirect(e = {}) {
    this._logger.create("signinRedirect");
    const {
      redirectMethod: t,
      ...s
    } = e, i = await this._redirectNavigator.prepare({ redirectMethod: t });
    await this._signinStart({
      request_type: "si:r",
      ...s
    }, i);
  }
  async signinRedirectCallback(e = window.location.href) {
    const t = this._logger.create("signinRedirectCallback"), s = await this._signinEnd(e);
    return s.profile && s.profile.sub ? t.info("success, signed in subject", s.profile.sub) : t.info("no subject"), s;
  }
  async signinResourceOwnerCredentials({
    username: e,
    password: t,
    skipUserInfo: s = !1
  }) {
    const i = this._logger.create("signinResourceOwnerCredential"), r = await this._client.processResourceOwnerPasswordCredentials({ username: e, password: t, skipUserInfo: s });
    i.debug("got signin response");
    const n = await this._buildUser(r);
    return n.profile && n.profile.sub ? i.info("success, signed in subject", n.profile.sub) : i.info("no subject"), n;
  }
  async signinPopup(e = {}) {
    const t = this._logger.create("signinPopup"), {
      popupWindowFeatures: s,
      popupWindowTarget: i,
      ...r
    } = e, n = this.settings.popup_redirect_uri;
    n || t.throw(new Error("No popup_redirect_uri configured"));
    const o = await this._popupNavigator.prepare({ popupWindowFeatures: s, popupWindowTarget: i }), c = await this._signin({
      request_type: "si:p",
      redirect_uri: n,
      display: "popup",
      ...r
    }, o);
    return c && (c.profile && c.profile.sub ? t.info("success, signed in subject", c.profile.sub) : t.info("no subject")), c;
  }
  async signinPopupCallback(e = window.location.href, t = !1) {
    const s = this._logger.create("signinPopupCallback");
    await this._popupNavigator.callback(e, t), s.info("success");
  }
  async signinSilent(e = {}) {
    var t;
    const s = this._logger.create("signinSilent"), {
      silentRequestTimeoutInSeconds: i,
      ...r
    } = e;
    let n = await this._loadUser();
    if (n != null && n.refresh_token) {
      s.debug("using refresh token");
      const l = new It(n);
      return await this._useRefreshToken(l);
    }
    const o = this.settings.silent_redirect_uri;
    o || s.throw(new Error("No silent_redirect_uri configured"));
    let c;
    n && this.settings.validateSubOnSilentRenew && (s.debug("subject prior to silent renew:", n.profile.sub), c = n.profile.sub);
    const d = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: i });
    return n = await this._signin({
      request_type: "si:s",
      redirect_uri: o,
      prompt: "none",
      id_token_hint: this.settings.includeIdTokenInSilentRenew ? n == null ? void 0 : n.id_token : void 0,
      ...r
    }, d, c), n && ((t = n.profile) != null && t.sub ? s.info("success, signed in subject", n.profile.sub) : s.info("no subject")), n;
  }
  async _useRefreshToken(e) {
    const t = await this._client.useRefreshToken({
      state: e,
      timeoutInSeconds: this.settings.silentRequestTimeoutInSeconds
    }), s = new W({ ...e, ...t });
    return await this.storeUser(s), this._events.load(s), s;
  }
  async signinSilentCallback(e = window.location.href) {
    const t = this._logger.create("signinSilentCallback");
    await this._iframeNavigator.callback(e), t.info("success");
  }
  async signinCallback(e = window.location.href) {
    const { state: t } = await this._client.readSigninResponseState(e);
    switch (t.request_type) {
      case "si:r":
        return await this.signinRedirectCallback(e);
      case "si:p":
        return await this.signinPopupCallback(e);
      case "si:s":
        return await this.signinSilentCallback(e);
      default:
        throw new Error("invalid response_type in state");
    }
  }
  async signoutCallback(e = window.location.href, t = !1) {
    const { state: s } = await this._client.readSignoutResponseState(e);
    if (s)
      switch (s.request_type) {
        case "so:r":
          await this.signoutRedirectCallback(e);
          break;
        case "so:p":
          await this.signoutPopupCallback(e, t);
          break;
        case "so:s":
          await this.signoutSilentCallback(e);
          break;
        default:
          throw new Error("invalid response_type in state");
      }
  }
  async querySessionStatus(e = {}) {
    const t = this._logger.create("querySessionStatus"), {
      silentRequestTimeoutInSeconds: s,
      ...i
    } = e, r = this.settings.silent_redirect_uri;
    r || t.throw(new Error("No silent_redirect_uri configured"));
    const n = await this._loadUser(), o = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: s }), c = await this._signinStart({
      request_type: "si:s",
      redirect_uri: r,
      prompt: "none",
      id_token_hint: this.settings.includeIdTokenInSilentRenew ? n == null ? void 0 : n.id_token : void 0,
      response_type: this.settings.query_status_response_type,
      scope: "openid",
      skipUserInfo: !0,
      ...i
    }, o);
    try {
      const d = await this._client.processSigninResponse(c.url);
      return t.debug("got signin response"), d.session_state && d.profile.sub ? (t.info("success for subject", d.profile.sub), {
        session_state: d.session_state,
        sub: d.profile.sub,
        sid: d.profile.sid
      }) : (t.info("success, user not authenticated"), null);
    } catch (d) {
      if (this.settings.monitorAnonymousSession && d instanceof j)
        switch (d.error) {
          case "login_required":
          case "consent_required":
          case "interaction_required":
          case "account_selection_required":
            return t.info("success for anonymous user"), {
              session_state: d.session_state
            };
        }
      throw d;
    }
  }
  async _signin(e, t, s) {
    const i = await this._signinStart(e, t);
    return await this._signinEnd(i.url, s);
  }
  async _signinStart(e, t) {
    const s = this._logger.create("_signinStart");
    try {
      const i = await this._client.createSigninRequest(e);
      return s.debug("got signin request"), await t.navigate({
        url: i.url,
        state: i.state.id,
        response_mode: i.state.response_mode,
        scriptOrigin: this.settings.iframeScriptOrigin
      });
    } catch (i) {
      throw s.debug("error after preparing navigator, closing navigator window"), t.close(), i;
    }
  }
  async _signinEnd(e, t) {
    const s = this._logger.create("_signinEnd"), i = await this._client.processSigninResponse(e);
    return s.debug("got signin response"), await this._buildUser(i, t);
  }
  async _buildUser(e, t) {
    const s = this._logger.create("_buildUser"), i = new W(e);
    if (t) {
      if (t !== i.profile.sub)
        throw s.debug("current user does not match user returned from signin. sub from signin:", i.profile.sub), new j({ ...e, error: "login_required" });
      s.debug("current user matches user returned from signin");
    }
    return await this.storeUser(i), s.debug("user stored"), this._events.load(i), i;
  }
  async signoutRedirect(e = {}) {
    const t = this._logger.create("signoutRedirect"), {
      redirectMethod: s,
      ...i
    } = e, r = await this._redirectNavigator.prepare({ redirectMethod: s });
    await this._signoutStart({
      request_type: "so:r",
      post_logout_redirect_uri: this.settings.post_logout_redirect_uri,
      ...i
    }, r), t.info("success");
  }
  async signoutRedirectCallback(e = window.location.href) {
    const t = this._logger.create("signoutRedirectCallback"), s = await this._signoutEnd(e);
    return t.info("success"), s;
  }
  async signoutPopup(e = {}) {
    const t = this._logger.create("signoutPopup"), {
      popupWindowFeatures: s,
      popupWindowTarget: i,
      ...r
    } = e, n = this.settings.popup_post_logout_redirect_uri, o = await this._popupNavigator.prepare({ popupWindowFeatures: s, popupWindowTarget: i });
    await this._signout({
      request_type: "so:p",
      post_logout_redirect_uri: n,
      state: n == null ? void 0 : {},
      ...r
    }, o), t.info("success");
  }
  async signoutPopupCallback(e = window.location.href, t = !1) {
    const s = this._logger.create("signoutPopupCallback");
    await this._popupNavigator.callback(e, t), s.info("success");
  }
  async _signout(e, t) {
    const s = await this._signoutStart(e, t);
    return await this._signoutEnd(s.url);
  }
  async _signoutStart(e = {}, t) {
    var s;
    const i = this._logger.create("_signoutStart");
    try {
      const r = await this._loadUser();
      i.debug("loaded current user from storage"), this.settings.revokeTokensOnSignout && await this._revokeInternal(r);
      const n = e.id_token_hint || r && r.id_token;
      n && (i.debug("setting id_token_hint in signout request"), e.id_token_hint = n), await this.removeUser(), i.debug("user removed, creating signout request");
      const o = await this._client.createSignoutRequest(e);
      return i.debug("got signout request"), await t.navigate({
        url: o.url,
        state: (s = o.state) == null ? void 0 : s.id
      });
    } catch (r) {
      throw i.debug("error after preparing navigator, closing navigator window"), t.close(), r;
    }
  }
  async _signoutEnd(e) {
    const t = this._logger.create("_signoutEnd"), s = await this._client.processSignoutResponse(e);
    return t.debug("got signout response"), s;
  }
  async signoutSilent(e = {}) {
    var t;
    const s = this._logger.create("signoutSilent"), {
      silentRequestTimeoutInSeconds: i,
      ...r
    } = e, n = this.settings.includeIdTokenInSilentSignout ? (t = await this._loadUser()) == null ? void 0 : t.id_token : void 0, o = this.settings.popup_post_logout_redirect_uri, c = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: i });
    await this._signout({
      request_type: "so:s",
      post_logout_redirect_uri: o,
      id_token_hint: n,
      ...r
    }, c), s.info("success");
  }
  async signoutSilentCallback(e = window.location.href) {
    const t = this._logger.create("signoutSilentCallback");
    await this._iframeNavigator.callback(e), t.info("success");
  }
  async revokeTokens(e) {
    const t = await this._loadUser();
    await this._revokeInternal(t, e);
  }
  async _revokeInternal(e, t = this.settings.revokeTokenTypes) {
    const s = this._logger.create("_revokeInternal");
    if (!e)
      return;
    const i = t.filter((r) => typeof e[r] == "string");
    if (!i.length) {
      s.debug("no need to revoke due to no token(s)");
      return;
    }
    for (const r of i)
      await this._client.revokeToken(
        e[r],
        r
      ), s.info(`${r} revoked successfully`), r !== "access_token" && (e[r] = null);
    await this.storeUser(e), s.debug("user stored"), this._events.load(e);
  }
  startSilentRenew() {
    this._logger.create("startSilentRenew"), this._silentRenewService.start();
  }
  stopSilentRenew() {
    this._silentRenewService.stop();
  }
  get _userStoreKey() {
    return `user:${this.settings.authority}:${this.settings.client_id}`;
  }
  async _loadUser() {
    const e = this._logger.create("_loadUser"), t = await this.settings.userStore.get(this._userStoreKey);
    return t ? (e.debug("user storageString loaded"), W.fromStorageString(t)) : (e.debug("no user storageString"), null);
  }
  async storeUser(e) {
    const t = this._logger.create("storeUser");
    if (e) {
      t.debug("storing user");
      const s = e.toStorageString();
      await this.settings.userStore.set(this._userStoreKey, s);
    } else
      this._logger.debug("removing user"), await this.settings.userStore.remove(this._userStoreKey);
  }
  async clearStaleState() {
    await this._client.clearStaleState();
  }
}, Ct = "2.2.0", Ft = Ct;
const ee = (e, t) => (e || (e = []), t || (t = []), Array.isArray(e) || (e = e.split(" ")), Array.isArray(t) || (t = t.split(" ")), e.concat(t).filter((s, i, r) => r.indexOf(s) === i).join(" ").trim()), Rt = "https://stage.identity.multicartshop.com", Pt = "https://identity.multicartshop.com", Et = "Multicart.TypeScript.Client";
class Pe {
  constructor(t = {}) {
    this.configuration = t;
  }
  set config(t) {
    this.configuration = t;
  }
  get sandbox() {
    return !!this.configuration.sandbox;
  }
  get basePath() {
    return this.configuration.basePath || this.sandbox ? Rt : Pt;
  }
  get client_id() {
    return this.configuration.client_id || Et;
  }
  get redirect_uri() {
    return this.configuration.redirect_uri || (window == null ? void 0 : window.location.origin) + "/login";
  }
  get logout_redirect_uri() {
    return this.configuration.logout_redirect_uri || (window == null ? void 0 : window.location.origin) + "/logout";
  }
  get client_secret() {
    return this.configuration.client_secret;
  }
  get scopes() {
    return this.configuration.scopes;
  }
}
const Ee = new Pe();
class At extends Tt {
  constructor(t = Ee) {
    const s = {
      authority: t.basePath,
      loadUserInfo: !0,
      client_id: t.client_id,
      redirect_uri: t.redirect_uri,
      post_logout_redirect_uri: t.logout_redirect_uri,
      client_secret: t.client_secret,
      scope: ee(t.scopes)
    };
    super(s), this.configuration = t;
  }
  async signinClientCredentials({
    scopes: t
  } = {}) {
    var s;
    const i = this._logger.create("signinClientCredentials"), r = await this.metadataService.getTokenEndpoint().catch((l) => i.error(l));
    if (!r)
      throw new Error("Token endpoint not be empty");
    const {
      client_id: n,
      client_secret: o,
      scope: c
    } = this.settings, d = ee(c, t);
    if (!o)
      throw new Error("No client_secret configured");
    try {
      const l = await (await fetch(r, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: n,
          client_secret: o,
          scope: d
        }).toString(),
        mode: "cors"
      })).json(), p = new W(l);
      return p.expires_at = Math.floor(Date.now() / 1e3) + ((s = l.expires_in) != null ? s : 0), await this.storeUser(p), i.debug("user stored"), this._events.load(p), p;
    } catch (l) {
      throw i.error("Login failed", l), new Error("Login failed");
    }
  }
}
const zt = ({
  oauthConfig: e,
  clientConfig: t
} = {}) => {
  if (Ee.config = new Pe(
    Object.assign(
      {
        ...e
      },
      { scopes: ee(e == null ? void 0 : e.scopes, ["multicart.api"]) }
    )
  ), !(t != null && t.accessToken)) {
    const s = new At(), i = async () => {
      const r = await s.getUser() || await s.signinSilent() || await s.signinPopup();
      return r ? `Bearer ${r == null ? void 0 : r.access_token}` : "";
    };
    t ? t.accessToken = i : t = { accessToken: i };
  }
  pe.config = new ge(t);
};
export {
  Ye as AccessTokenEvents,
  Mt as AdminCartItemApi,
  Be as BASE_PATH,
  te as BaseAPI,
  Bt as BlobApiResponse,
  Ut as COLLECTION_FORMATS,
  Nt as CartItemApi,
  Xe as CheckSessionIFrame,
  ge as Configuration,
  pe as DefaultConfig,
  Ee as DefaultMulticartOAuthConfig,
  jt as EnPageDirection,
  Lt as EnPlatformType,
  j as ErrorResponse,
  se as ErrorTimeout,
  He as FetchError,
  Se as InMemoryWebStorage,
  N as JSONApiResponse,
  z as Log,
  f as Logger,
  Pt as MULTICART_AUTH_PROD_PATH,
  Rt as MULTICART_AUTH_SANDBOX_PATH,
  Et as MULTICART_CLIENT_ID,
  Ze as MetadataService,
  At as MulticartOAuthClient,
  Pe as MulticartOAuthConfiguration,
  Ht as OfferApi,
  gt as OidcClient,
  be as OidcClientSettingsStore,
  T as RequiredError,
  Ne as ResponseError,
  pt as SessionMonitor,
  V as SigninResponse,
  re as SigninState,
  ut as SignoutResponse,
  D as State,
  qt as TextApiResponse,
  W as User,
  Tt as UserManager,
  wt as UserManagerSettingsStore,
  Dt as VariantCategoryDisplayType,
  Wt as VariantDisplayType,
  Ft as Version,
  U as VoidApiResponse,
  ve as WebStorageStateStore,
  Ot as canConsumeForm,
  zt as initializeMulticartApiClient,
  ee as mergeScopes,
  _e as querystring
};
//# sourceMappingURL=multicartshop-client.mjs.map
