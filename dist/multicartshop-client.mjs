var xe = Object.defineProperty;
var Oe = (t, e, s) => e in t ? xe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var L = (t, e, s) => (Oe(t, typeof e != "symbol" ? e + "" : e, s), s);
const Be = "https://stage.redoc.cledeploy.com".replace(
  /\/+$/,
  ""
);
class ge {
  constructor(e = {}) {
    this.configuration = e;
  }
  set config(e) {
    this.configuration = e;
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
    const e = this.configuration.apiKey;
    if (e)
      return typeof e == "function" ? e : () => e;
  }
  get accessToken() {
    const e = this.configuration.accessToken;
    if (e)
      return typeof e == "function" ? e : async () => e;
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
}
const pe = new ge();
class $ {
  constructor(e = pe) {
    L(this, "middleware");
    L(this, "fetchApi", async (e, s) => {
      let i = { url: e, init: s };
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
    this.configuration = e, this.middleware = e.middleware;
  }
  withMiddleware(...e) {
    const s = this.clone();
    return s.middleware = s.middleware.concat(...e), s;
  }
  withPreMiddleware(...e) {
    const s = e.map((i) => ({ pre: i }));
    return this.withMiddleware(...s);
  }
  withPostMiddleware(...e) {
    const s = e.map((i) => ({ post: i }));
    return this.withMiddleware(...s);
  }
  async request(e, s) {
    const { url: i, init: r } = await this.createFetchParams(
      e,
      s
    ), n = await this.fetchApi(i, r);
    if (n.status >= 200 && n.status < 300)
      return n;
    throw new Ne(n, "Response returned an error code");
  }
  async createFetchParams(e, s) {
    let i = this.configuration.basePath + e.path;
    e.query !== void 0 && Object.keys(e.query).length !== 0 && (i += "?" + this.configuration.queryParamsStringify(e.query));
    const r = Object.assign(
      {},
      this.configuration.headers,
      e.headers
    );
    Object.keys(r).forEach(
      (u) => r[u] === void 0 ? delete r[u] : {}
    );
    const n = typeof s == "function" ? s : async () => s, o = {
      method: e.method,
      headers: r,
      body: e.body,
      credentials: this.configuration.credentials
    }, c = {
      ...o,
      ...await n({
        init: o,
        context: e
      })
    }, d = {
      ...c,
      body: Me(c.body) || c.body instanceof URLSearchParams || qe(c.body) ? c.body : JSON.stringify(c.body)
    };
    return { url: i, init: d };
  }
  clone() {
    const e = this.constructor, s = new e(this.configuration);
    return s.middleware = this.middleware.slice(), s;
  }
}
function qe(t) {
  return typeof Blob < "u" && t instanceof Blob;
}
function Me(t) {
  return typeof FormData < "u" && t instanceof FormData;
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
class I extends Error {
  constructor(s, i) {
    super(i);
    L(this, "name", "RequiredError");
    this.field = s;
  }
}
const xt = {
  csv: ",",
  ssv: " ",
  tsv: "	",
  pipes: "|"
};
function _e(t, e = "") {
  return Object.keys(t).map((s) => fe(s, t[s], e)).filter((s) => s.length > 0).join("&");
}
function fe(t, e, s = "") {
  const i = s + (s.length ? `[${t}]` : t);
  if (e instanceof Array) {
    const r = e.map((n) => encodeURIComponent(String(n))).join(`&${encodeURIComponent(i)}=`);
    return `${encodeURIComponent(i)}=${r}`;
  }
  if (e instanceof Set) {
    const r = Array.from(e);
    return fe(t, r, s);
  }
  return e instanceof Date ? `${encodeURIComponent(i)}=${encodeURIComponent(
    e.toISOString()
  )}` : e instanceof Object ? _e(e, i) : `${encodeURIComponent(i)}=${encodeURIComponent(
    String(e)
  )}`;
}
function Ot(t) {
  for (const e of t)
    if (e.contentType === "multipart/form-data")
      return !0;
  return !1;
}
class P {
  constructor(e, s = (i) => i) {
    this.raw = e, this.transformer = s;
  }
  async value() {
    return this.transformer(await this.raw.json());
  }
}
class q {
  constructor(e) {
    this.raw = e;
  }
  async value() {
  }
}
class Bt {
  constructor(e) {
    this.raw = e;
  }
  async value() {
    return await this.raw.blob();
  }
}
class qt {
  constructor(e) {
    this.raw = e;
  }
  async value() {
    return await this.raw.text();
  }
}
class Mt extends $ {
  async adminCartItemDeleteRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminCartItemDelete."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "DELETE",
        headers: r,
        query: i
      },
      s
    );
    return new q(n);
  }
  async adminCartItemDelete(e, s) {
    await this.adminCartItemDeleteRaw(e, s);
  }
  async adminCartItemGetRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminCartItemGet."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new P(n);
  }
  async adminCartItemGet(e, s) {
    return await (await this.adminCartItemGetRaw(
      e,
      s
    )).value();
  }
  async adminCartItemListRaw(e, s) {
    const i = {};
    e.platform !== void 0 && (i.Platform = e.platform), e.seller !== void 0 && (i.Seller = e.seller), e.usItemId !== void 0 && (i.UsItemId = e.usItemId), e.userId !== void 0 && (i.UserId = e.userId), e.pageSize !== void 0 && (i.PageSize = e.pageSize), e.dir !== void 0 && (i.Dir = e.dir), e.pageToken !== void 0 && (i.PageToken = e.pageToken), e.includedProperties && (i.IncludedProperties = e.includedProperties);
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
    return new P(n);
  }
  async adminCartItemList(e = {}, s) {
    return await (await this.adminCartItemListRaw(
      e,
      s
    )).value();
  }
  async adminCartItemPatchRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminCartItemPatch."
      );
    if (e.cartItemPatch === null || e.cartItemPatch === void 0)
      throw new I(
        "cartItemPatch",
        "Required parameter requestParameters.cartItemPatch was null or undefined when calling adminCartItemPatch."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "PATCH",
        headers: r,
        query: i,
        body: e.cartItemPatch
      },
      s
    );
    return new q(n);
  }
  async adminCartItemPatch(e, s) {
    await this.adminCartItemPatchRaw(e, s);
  }
  async adminCartItemPostRaw(e, s) {
    if (e.cartItemBodyAdmin === null || e.cartItemBodyAdmin === void 0)
      throw new I(
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
        body: e.cartItemBodyAdmin
      },
      s
    );
    return new P(n);
  }
  async adminCartItemPost(e, s) {
    return await (await this.adminCartItemPostRaw(
      e,
      s
    )).value();
  }
  async adminCartItemPutRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminCartItemPut."
      );
    if (e.cartItemBody === null || e.cartItemBody === void 0)
      throw new I(
        "cartItemBody",
        "Required parameter requestParameters.cartItemBody was null or undefined when calling adminCartItemPut."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "PUT",
        headers: r,
        query: i,
        body: e.cartItemBody
      },
      s
    );
    return new q(n);
  }
  async adminCartItemPut(e, s) {
    await this.adminCartItemPutRaw(e, s);
  }
}
class Nt extends $ {
  async cartItemDeleteRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemDelete."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "DELETE",
        headers: r,
        query: i
      },
      s
    );
    return new q(n);
  }
  async cartItemDelete(e, s) {
    await this.cartItemDeleteRaw(e, s);
  }
  async cartItemGetRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemGet."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new P(n);
  }
  async cartItemGet(e, s) {
    return await (await this.cartItemGetRaw(
      e,
      s
    )).value();
  }
  async cartItemGetWithSyncRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemGetWithSync."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}/sync".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new P(n);
  }
  async cartItemGetWithSync(e, s) {
    return await (await this.cartItemGetWithSyncRaw(
      e,
      s
    )).value();
  }
  async cartItemListRaw(e, s) {
    const i = {};
    e.platform !== void 0 && (i.Platform = e.platform), e.seller !== void 0 && (i.Seller = e.seller), e.usItemId !== void 0 && (i.UsItemId = e.usItemId), e.userId !== void 0 && (i.UserId = e.userId), e.pageSize !== void 0 && (i.PageSize = e.pageSize), e.dir !== void 0 && (i.Dir = e.dir), e.pageToken !== void 0 && (i.PageToken = e.pageToken), e.includedProperties && (i.IncludedProperties = e.includedProperties);
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
    return new P(n);
  }
  async cartItemList(e = {}, s) {
    return await (await this.cartItemListRaw(
      e,
      s
    )).value();
  }
  async cartItemPatchRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemPatch."
      );
    if (e.cartItemPatch === null || e.cartItemPatch === void 0)
      throw new I(
        "cartItemPatch",
        "Required parameter requestParameters.cartItemPatch was null or undefined when calling cartItemPatch."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "PATCH",
        headers: r,
        query: i,
        body: e.cartItemPatch
      },
      s
    );
    return new q(n);
  }
  async cartItemPatch(e, s) {
    await this.cartItemPatchRaw(e, s);
  }
  async cartItemPostRaw(e, s) {
    if (e.cartItemBody === null || e.cartItemBody === void 0)
      throw new I(
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
        body: e.cartItemBody
      },
      s
    );
    return new P(n);
  }
  async cartItemPost(e, s) {
    return await (await this.cartItemPostRaw(
      e,
      s
    )).value();
  }
  async cartItemPutRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemPut."
      );
    if (e.cartItemBody === null || e.cartItemBody === void 0)
      throw new I(
        "cartItemBody",
        "Required parameter requestParameters.cartItemBody was null or undefined when calling cartItemPut."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "PUT",
        headers: r,
        query: i,
        body: e.cartItemBody
      },
      s
    );
    return new q(n);
  }
  async cartItemPut(e, s) {
    await this.cartItemPutRaw(e, s);
  }
}
class Ht extends $ {
  async offerDeleteRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerDelete."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "DELETE",
        headers: r,
        query: i
      },
      s
    );
    return new q(n);
  }
  async offerDelete(e, s) {
    await this.offerDeleteRaw(e, s);
  }
  async offerGetRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerGet."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new P(n);
  }
  async offerGet(e, s) {
    return await (await this.offerGetRaw(
      e,
      s
    )).value();
  }
  async offerGetByLinkRaw(e, s) {
    if (e.link === null || e.link === void 0)
      throw new I(
        "link",
        "Required parameter requestParameters.link was null or undefined when calling offerGetByLink."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/link/{link}".replace(
          "{link}",
          encodeURIComponent(String(e.link))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new P(n);
  }
  async offerGetByLink(e, s) {
    return await (await this.offerGetByLinkRaw(
      e,
      s
    )).value();
  }
  async offerListRaw(e, s) {
    const i = {};
    e.name !== void 0 && (i.Name = e.name), e.groupId !== void 0 && (i.GroupId = e.groupId), e.userId !== void 0 && (i.UserId = e.userId), e.pageSize !== void 0 && (i.PageSize = e.pageSize), e.dir !== void 0 && (i.Dir = e.dir), e.pageToken !== void 0 && (i.PageToken = e.pageToken), e.includedProperties && (i.IncludedProperties = e.includedProperties);
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
    return new P(n);
  }
  async offerList(e = {}, s) {
    return await (await this.offerListRaw(
      e,
      s
    )).value();
  }
  async offerPatchRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerPatch."
      );
    if (e.offerPatch === null || e.offerPatch === void 0)
      throw new I(
        "offerPatch",
        "Required parameter requestParameters.offerPatch was null or undefined when calling offerPatch."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "PATCH",
        headers: r,
        query: i,
        body: e.offerPatch
      },
      s
    );
    return new q(n);
  }
  async offerPatch(e, s) {
    await this.offerPatchRaw(e, s);
  }
  async offerPostRaw(e, s) {
    if (e.offerPost === null || e.offerPost === void 0)
      throw new I(
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
        body: e.offerPost
      },
      s
    );
    return new P(n);
  }
  async offerPost(e, s) {
    return await (await this.offerPostRaw(
      e,
      s
    )).value();
  }
  async offerPutRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerPut."
      );
    if (e.offerPost === null || e.offerPost === void 0)
      throw new I(
        "offerPost",
        "Required parameter requestParameters.offerPost was null or undefined when calling offerPut."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "PUT",
        headers: r,
        query: i,
        body: e.offerPost
      },
      s
    );
    return new q(n);
  }
  async offerPut(e, s) {
    await this.offerPutRaw(e, s);
  }
}
class jt extends $ {
  async purchaseGetRaw(e, s) {
    if (e.id === null || e.id === void 0)
      throw new I(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling purchaseGet."
      );
    const i = {}, r = {};
    this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Purchase/{id}".replace(
          "{id}",
          encodeURIComponent(String(e.id))
        ),
        method: "GET",
        headers: r,
        query: i
      },
      s
    );
    return new P(n);
  }
  async purchaseGet(e, s) {
    return await (await this.purchaseGetRaw(
      e,
      s
    )).value();
  }
  async purchasePostRaw(e, s) {
    if (e.purchasePost === null || e.purchasePost === void 0)
      throw new I(
        "purchasePost",
        "Required parameter requestParameters.purchasePost was null or undefined when calling purchasePost."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Purchase",
        method: "POST",
        headers: r,
        query: i,
        body: e.purchasePost
      },
      s
    );
    return new P(n);
  }
  async purchasePost(e, s) {
    return await (await this.purchasePostRaw(
      e,
      s
    )).value();
  }
  async purchasePostCartRaw(e, s) {
    if (e.shoppingCartPost === null || e.shoppingCartPost === void 0)
      throw new I(
        "shoppingCartPost",
        "Required parameter requestParameters.shoppingCartPost was null or undefined when calling purchasePostCart."
      );
    const i = {}, r = {};
    r["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (r.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Purchase/cart",
        method: "POST",
        headers: r,
        query: i,
        body: e.shoppingCartPost
      },
      s
    );
    return new P(n);
  }
  async purchasePostCart(e, s) {
    return await (await this.purchasePostCartRaw(
      e,
      s
    )).value();
  }
}
const Lt = {
  PerimetrX: "PerimetrX",
  HCaptcha: "HCaptcha"
}, Dt = {
  Desc: "Desc",
  Asc: "Asc"
}, Wt = {
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
  Saksfifthavenue: "Saksfifthavenue",
  Venus: "Venus",
  OnlineShoes: "OnlineShoes",
  Lee: "Lee",
  CampMan: "CampMan",
  BlackDiamond: "BlackDiamond",
  Fabulousfurs: "Fabulousfurs",
  Fragrancenet: "Fragrancenet",
  Belk: "Belk",
  Sears: "Sears",
  Reebok: "Reebok",
  DrJays: "DrJays",
  Burberry: "Burberry",
  Timberland: "Timberland",
  LlBean: "LLBean",
  Kmart: "Kmart",
  LittleBoyChic: "LittleBoyChic",
  NaturesJewelry: "NaturesJewelry",
  Converse: "Converse",
  Zara: "Zara",
  ShopifyApp: "ShopifyApp",
  WooCommerceApp: "WooCommerceApp",
  BigCommerceApp: "BigCommerceApp",
  MagentoApp: "MagentoApp",
  SquareSpaceApp: "SquareSpaceApp",
  WixApp: "WixApp",
  PrestaShopApp: "PrestaShopApp",
  ShopwareApp: "ShopwareApp",
  Unknown: "Unknown"
}, Ft = {
  Default: "Default",
  Dropdown: "Dropdown",
  Radio: "Radio",
  CustomInput: "CustomInput"
}, zt = {
  Default: "Default",
  Name: "Name",
  Swatch: "Swatch",
  Color: "Color"
};
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function je(t) {
  var e = t.default;
  if (typeof e == "function") {
    var s = function() {
      return e.apply(this, arguments);
    };
    s.prototype = e.prototype;
  } else
    s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(t).forEach(function(i) {
    var r = Object.getOwnPropertyDescriptor(t, i);
    Object.defineProperty(s, i, r.get ? r : {
      enumerable: !0,
      get: function() {
        return t[i];
      }
    });
  }), s;
}
function Le(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var oe = { exports: {} };
const De = {}, We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: De
}, Symbol.toStringTag, { value: "Module" })), Fe = /* @__PURE__ */ je(We);
var ae;
function G() {
  return ae || (ae = 1, function(t, e) {
    (function(s, i) {
      t.exports = i();
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
        }(), d = {}, u = d.lib = {}, p = u.Base = function() {
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
        }(), g = u.WordArray = p.extend({
          init: function(a, h) {
            a = this.words = a || [], h != r ? this.sigBytes = h : this.sigBytes = a.length * 4;
          },
          toString: function(a) {
            return (a || w).stringify(this);
          },
          concat: function(a) {
            var h = this.words, _ = a.words, m = this.sigBytes, v = a.sigBytes;
            if (this.clamp(), m % 4)
              for (var b = 0; b < v; b++) {
                var C = _[b >>> 2] >>> 24 - b % 4 * 8 & 255;
                h[m + b >>> 2] |= C << 24 - (m + b) % 4 * 8;
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
              var b = h[v >>> 2] >>> 24 - v % 4 * 8 & 255;
              m.push((b >>> 4).toString(16)), m.push((b & 15).toString(16));
            }
            return m.join("");
          },
          parse: function(a) {
            for (var h = a.length, _ = [], m = 0; m < h; m += 2)
              _[m >>> 3] |= parseInt(a.substr(m, 2), 16) << 24 - m % 8 * 4;
            return new g.init(_, h / 2);
          }
        }, k = S.Latin1 = {
          stringify: function(a) {
            for (var h = a.words, _ = a.sigBytes, m = [], v = 0; v < _; v++) {
              var b = h[v >>> 2] >>> 24 - v % 4 * 8 & 255;
              m.push(String.fromCharCode(b));
            }
            return m.join("");
          },
          parse: function(a) {
            for (var h = a.length, _ = [], m = 0; m < h; m++)
              _[m >>> 2] |= (a.charCodeAt(m) & 255) << 24 - m % 4 * 8;
            return new g.init(_, h);
          }
        }, l = S.Utf8 = {
          stringify: function(a) {
            try {
              return decodeURIComponent(escape(k.stringify(a)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function(a) {
            return k.parse(unescape(encodeURIComponent(a)));
          }
        }, y = u.BufferedBlockAlgorithm = p.extend({
          reset: function() {
            this._data = new g.init(), this._nDataBytes = 0;
          },
          _append: function(a) {
            typeof a == "string" && (a = l.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
          },
          _process: function(a) {
            var h, _ = this._data, m = _.words, v = _.sigBytes, b = this.blockSize, C = b * 4, R = v / C;
            a ? R = i.ceil(R) : R = i.max((R | 0) - this._minBufferSize, 0);
            var B = R * b, A = i.min(B * 4, v);
            if (B) {
              for (var M = 0; M < B; M += b)
                this._doProcessBlock(m, M);
              h = m.splice(0, B), _.sigBytes -= A;
            }
            return new g.init(h, A);
          },
          clone: function() {
            var a = p.clone.call(this);
            return a._data = this._data.clone(), a;
          },
          _minBufferSize: 0
        });
        u.Hasher = y.extend({
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
              return new T.HMAC.init(a, _).finalize(h);
            };
          }
        });
        var T = d.algo = {};
        return d;
      }(Math);
      return s;
    });
  }(oe)), oe.exports;
}
var ze = G(), we = { exports: {} };
(function(t, e) {
  (function(s, i) {
    t.exports = i(G());
  })(H, function(s) {
    return function(i) {
      var r = s, n = r.lib, o = n.WordArray, c = n.Hasher, d = r.algo, u = [], p = [];
      (function() {
        function w(T) {
          for (var a = i.sqrt(T), h = 2; h <= a; h++)
            if (!(T % h))
              return !1;
          return !0;
        }
        function k(T) {
          return (T - (T | 0)) * 4294967296 | 0;
        }
        for (var l = 2, y = 0; y < 64; )
          w(l) && (y < 8 && (u[y] = k(i.pow(l, 1 / 2))), p[y] = k(i.pow(l, 1 / 3)), y++), l++;
      })();
      var g = [], S = d.SHA256 = c.extend({
        _doReset: function() {
          this._hash = new o.init(u.slice(0));
        },
        _doProcessBlock: function(w, k) {
          for (var l = this._hash.words, y = l[0], T = l[1], a = l[2], h = l[3], _ = l[4], m = l[5], v = l[6], b = l[7], C = 0; C < 64; C++) {
            if (C < 16)
              g[C] = w[k + C] | 0;
            else {
              var R = g[C - 15], B = (R << 25 | R >>> 7) ^ (R << 14 | R >>> 18) ^ R >>> 3, A = g[C - 2], M = (A << 15 | A >>> 17) ^ (A << 13 | A >>> 19) ^ A >>> 10;
              g[C] = B + g[C - 7] + M + g[C - 16];
            }
            var J = _ & m ^ ~_ & v, K = y & T ^ y & a ^ T & a, V = (y << 30 | y >>> 2) ^ (y << 19 | y >>> 13) ^ (y << 10 | y >>> 22), Ae = (_ << 26 | _ >>> 6) ^ (_ << 21 | _ >>> 11) ^ (_ << 7 | _ >>> 25), ne = b + Ae + J + p[C] + g[C], Ue = V + K;
            b = v, v = m, m = _, _ = h + ne | 0, h = a, a = T, T = y, y = ne + Ue | 0;
          }
          l[0] = l[0] + y | 0, l[1] = l[1] + T | 0, l[2] = l[2] + a | 0, l[3] = l[3] + h | 0, l[4] = l[4] + _ | 0, l[5] = l[5] + m | 0, l[6] = l[6] + v | 0, l[7] = l[7] + b | 0;
        },
        _doFinalize: function() {
          var w = this._data, k = w.words, l = this._nDataBytes * 8, y = w.sigBytes * 8;
          return k[y >>> 5] |= 128 << 24 - y % 32, k[(y + 64 >>> 9 << 4) + 14] = i.floor(l / 4294967296), k[(y + 64 >>> 9 << 4) + 15] = l, w.sigBytes = k.length * 4, this._process(), this._hash;
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
(function(t, e) {
  (function(s, i) {
    t.exports = i(G());
  })(H, function(s) {
    return function() {
      var i = s, r = i.lib, n = r.WordArray, o = i.enc;
      o.Base64 = {
        stringify: function(d) {
          var u = d.words, p = d.sigBytes, g = this._map;
          d.clamp();
          for (var S = [], w = 0; w < p; w += 3)
            for (var k = u[w >>> 2] >>> 24 - w % 4 * 8 & 255, l = u[w + 1 >>> 2] >>> 24 - (w + 1) % 4 * 8 & 255, y = u[w + 2 >>> 2] >>> 24 - (w + 2) % 4 * 8 & 255, T = k << 16 | l << 8 | y, a = 0; a < 4 && w + a * 0.75 < p; a++)
              S.push(g.charAt(T >>> 6 * (3 - a) & 63));
          var h = g.charAt(64);
          if (h)
            for (; S.length % 4; )
              S.push(h);
          return S.join("");
        },
        parse: function(d) {
          var u = d.length, p = this._map, g = this._reverseMap;
          if (!g) {
            g = this._reverseMap = [];
            for (var S = 0; S < p.length; S++)
              g[p.charCodeAt(S)] = S;
          }
          var w = p.charAt(64);
          if (w) {
            var k = d.indexOf(w);
            k !== -1 && (u = k);
          }
          return c(d, u, g);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
      function c(d, u, p) {
        for (var g = [], S = 0, w = 0; w < u; w++)
          if (w % 4) {
            var k = p[d.charCodeAt(w - 1)] << w % 4 * 2, l = p[d.charCodeAt(w)] >>> 6 - w % 4 * 2, y = k | l;
            g[S >>> 2] |= y << 24 - S % 4 * 8, S++;
          }
        return n.create(g, S);
      }
    }(), s.enc.Base64;
  });
})(me);
const ce = me.exports;
var ye = { exports: {} };
(function(t, e) {
  (function(s, i) {
    t.exports = i(G());
  })(H, function(s) {
    return s.enc.Utf8;
  });
})(ye);
const Ge = ye.exports;
function Y(t) {
  this.message = t;
}
Y.prototype = new Error(), Y.prototype.name = "InvalidCharacterError";
var de = typeof window < "u" && window.atob && window.atob.bind(window) || function(t) {
  var e = String(t).replace(/=+$/, "");
  if (e.length % 4 == 1)
    throw new Y("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var s, i, r = 0, n = 0, o = ""; i = e.charAt(n++); ~i && (s = r % 4 ? 64 * s + i : i, r++ % 4) ? o += String.fromCharCode(255 & s >> (-2 * r & 6)) : 0)
    i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);
  return o;
};
function Je(t) {
  var e = t.replace(/-/g, "+").replace(/_/g, "/");
  switch (e.length % 4) {
    case 0:
      break;
    case 2:
      e += "==";
      break;
    case 3:
      e += "=";
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
    }(e);
  } catch {
    return de(e);
  }
}
function F(t) {
  this.message = t;
}
function Ke(t, e) {
  if (typeof t != "string")
    throw new F("Invalid token specified");
  var s = (e = e || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse(Je(t.split(".")[s]));
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
}, U, x, z = /* @__PURE__ */ ((t) => (t[t.NONE = 0] = "NONE", t[t.ERROR = 1] = "ERROR", t[t.WARN = 2] = "WARN", t[t.INFO = 3] = "INFO", t[t.DEBUG = 4] = "DEBUG", t))(z || {});
((t) => {
  function e() {
    U = 3, x = Ve;
  }
  t.reset = e;
  function s(r) {
    if (!(0 <= r && r <= 4))
      throw new Error("Invalid log level");
    U = r;
  }
  t.setLevel = s;
  function i(r) {
    x = r;
  }
  t.setLogger = i;
})(z || (z = {}));
var f = class {
  constructor(t) {
    this._name = t;
  }
  debug(...t) {
    U >= 4 && x.debug(f._format(this._name, this._method), ...t);
  }
  info(...t) {
    U >= 3 && x.info(f._format(this._name, this._method), ...t);
  }
  warn(...t) {
    U >= 2 && x.warn(f._format(this._name, this._method), ...t);
  }
  error(...t) {
    U >= 1 && x.error(f._format(this._name, this._method), ...t);
  }
  throw(t) {
    throw this.error(t), t;
  }
  create(t) {
    const e = Object.create(this);
    return e._method = t, e.debug("begin"), e;
  }
  static createStatic(t, e) {
    const s = new f(`${t}.${e}`);
    return s.debug("begin"), s;
  }
  static _format(t, e) {
    const s = `[${t}]`;
    return e ? `${s} ${e}:` : s;
  }
  static debug(t, ...e) {
    U >= 4 && x.debug(f._format(t), ...e);
  }
  static info(t, ...e) {
    U >= 3 && x.info(f._format(t), ...e);
  }
  static warn(t, ...e) {
    U >= 2 && x.warn(f._format(t), ...e);
  }
  static error(t, ...e) {
    U >= 1 && x.error(f._format(t), ...e);
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
      (t) => (+t ^ O._randomWord() & 15 >> +t / 4).toString(16)
    ).replace(/-/g, "");
  }
  static generateCodeVerifier() {
    return O.generateUUIDv4() + O.generateUUIDv4() + O.generateUUIDv4();
  }
  static generateCodeChallenge(t) {
    try {
      const e = $e(t);
      return ce.stringify(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch (e) {
      throw f.error("CryptoUtils.generateCodeChallenge", e), e;
    }
  }
  static generateBasicAuth(t, e) {
    const s = Ge.parse([t, e].join(":"));
    return ce.stringify(s);
  }
}, N = class {
  constructor(t) {
    this._name = t, this._logger = new f(`Event('${this._name}')`), this._callbacks = [];
  }
  addHandler(t) {
    return this._callbacks.push(t), () => this.removeHandler(t);
  }
  removeHandler(t) {
    const e = this._callbacks.lastIndexOf(t);
    e >= 0 && this._callbacks.splice(e, 1);
  }
  raise(...t) {
    this._logger.debug("raise:", ...t);
    for (const e of this._callbacks)
      e(...t);
  }
}, X = class {
  static decode(t) {
    try {
      return Ke(t);
    } catch (e) {
      throw f.error("JwtUtils.decode", e), e;
    }
  }
}, he = class {
  static center({ ...t }) {
    var e;
    return t.width == null && (t.width = (e = [800, 720, 600, 480].find((s) => s <= window.outerWidth / 1.618)) != null ? e : 360), t.left != null || (t.left = Math.max(0, Math.round(window.screenX + (window.outerWidth - t.width) / 2))), t.height != null && (t.top != null || (t.top = Math.max(0, Math.round(window.screenY + (window.outerHeight - t.height) / 2)))), t;
  }
  static serialize(t) {
    return Object.entries(t).filter(([, e]) => e != null).map(([e, s]) => `${e}=${typeof s != "boolean" ? s : s ? "yes" : "no"}`).join(",");
  }
}, E = class extends N {
  constructor() {
    super(...arguments), this._logger = new f(`Timer('${this._name}')`), this._timerHandle = null, this._expiration = 0, this._callback = () => {
      const t = this._expiration - E.getEpochTime();
      this._logger.debug("timer completes in", t), this._expiration <= E.getEpochTime() && (this.cancel(), super.raise());
    };
  }
  static getEpochTime() {
    return Math.floor(Date.now() / 1e3);
  }
  init(t) {
    const e = this._logger.create("init");
    t = Math.max(Math.floor(t), 1);
    const s = E.getEpochTime() + t;
    if (this.expiration === s && this._timerHandle) {
      e.debug("skipping since already initialized for expiration at", this.expiration);
      return;
    }
    this.cancel(), e.debug("using duration", t), this._expiration = s;
    const i = Math.min(t, 5);
    this._timerHandle = setInterval(this._callback, i * 1e3);
  }
  get expiration() {
    return this._expiration;
  }
  cancel() {
    this._logger.create("cancel"), this._timerHandle && (clearInterval(this._timerHandle), this._timerHandle = null);
  }
}, Z = class {
  static readParams(t, e = "query") {
    if (!t)
      throw new TypeError("Invalid URL");
    const s = new URL(t, window.location.origin)[e === "fragment" ? "hash" : "search"];
    return new URLSearchParams(s.slice(1));
  }
}, j = class extends Error {
  constructor(t, e) {
    var s, i, r;
    if (super(t.error_description || t.error || ""), this.form = e, this.name = "ErrorResponse", !t.error)
      throw f.error("ErrorResponse", "No error passed"), new Error("No error passed");
    this.error = t.error, this.error_description = (s = t.error_description) != null ? s : null, this.error_uri = (i = t.error_uri) != null ? i : null, this.state = t.userState, this.session_state = (r = t.session_state) != null ? r : null;
  }
}, se = class extends Error {
  constructor(t) {
    super(t), this.name = "ErrorTimeout";
  }
}, Ye = class {
  constructor(t) {
    this._logger = new f("AccessTokenEvents"), this._expiringTimer = new E("Access token expiring"), this._expiredTimer = new E("Access token expired"), this._expiringNotificationTimeInSeconds = t.expiringNotificationTimeInSeconds;
  }
  load(t) {
    const e = this._logger.create("load");
    if (t.access_token && t.expires_in !== void 0) {
      const s = t.expires_in;
      if (e.debug("access token present, remaining duration:", s), s > 0) {
        let r = s - this._expiringNotificationTimeInSeconds;
        r <= 0 && (r = 1), e.debug("registering expiring timer, raising in", r, "seconds"), this._expiringTimer.init(r);
      } else
        e.debug("canceling existing expiring timer because we're past expiration."), this._expiringTimer.cancel();
      const i = s + 1;
      e.debug("registering expired timer, raising in", i, "seconds"), this._expiredTimer.init(i);
    } else
      this._expiringTimer.cancel(), this._expiredTimer.cancel();
  }
  unload() {
    this._logger.debug("unload: canceling existing access token timers"), this._expiringTimer.cancel(), this._expiredTimer.cancel();
  }
  addAccessTokenExpiring(t) {
    return this._expiringTimer.addHandler(t);
  }
  removeAccessTokenExpiring(t) {
    this._expiringTimer.removeHandler(t);
  }
  addAccessTokenExpired(t) {
    return this._expiredTimer.addHandler(t);
  }
  removeAccessTokenExpired(t) {
    this._expiredTimer.removeHandler(t);
  }
}, Xe = class {
  constructor(t, e, s, i, r) {
    this._callback = t, this._client_id = e, this._intervalInSeconds = i, this._stopOnError = r, this._logger = new f("CheckSessionIFrame"), this._timer = null, this._session_state = null, this._message = (o) => {
      o.origin === this._frame_origin && o.source === this._frame.contentWindow && (o.data === "error" ? (this._logger.error("error message from check session op iframe"), this._stopOnError && this.stop()) : o.data === "changed" ? (this._logger.debug("changed message from check session op iframe"), this.stop(), this._callback()) : this._logger.debug(o.data + " message from check session op iframe"));
    };
    const n = new URL(s);
    this._frame_origin = n.origin, this._frame = window.document.createElement("iframe"), this._frame.style.visibility = "hidden", this._frame.style.position = "fixed", this._frame.style.left = "-1000px", this._frame.style.top = "0", this._frame.width = "0", this._frame.height = "0", this._frame.src = n.href;
  }
  load() {
    return new Promise((t) => {
      this._frame.onload = () => {
        t();
      }, window.document.body.appendChild(this._frame), window.addEventListener("message", this._message, !1);
    });
  }
  start(t) {
    if (this._session_state === t)
      return;
    this._logger.create("start"), this.stop(), this._session_state = t;
    const e = () => {
      !this._frame.contentWindow || !this._session_state || this._frame.contentWindow.postMessage(this._client_id + " " + this._session_state, this._frame_origin);
    };
    e(), this._timer = setInterval(e, this._intervalInSeconds * 1e3);
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
  getItem(t) {
    return this._logger.create(`getItem('${t}')`), this._data[t];
  }
  setItem(t, e) {
    this._logger.create(`setItem('${t}')`), this._data[t] = e;
  }
  removeItem(t) {
    this._logger.create(`removeItem('${t}')`), delete this._data[t];
  }
  get length() {
    return Object.getOwnPropertyNames(this._data).length;
  }
  key(t) {
    return Object.getOwnPropertyNames(this._data)[t];
  }
}, ie = class {
  constructor(t = [], e = null) {
    this._jwtHandler = e, this._logger = new f("JsonService"), this._contentTypes = [], this._contentTypes.push(...t, "application/json"), e && this._contentTypes.push("application/jwt");
  }
  async fetchWithTimeout(t, e = {}) {
    const { timeoutInSeconds: s, ...i } = e;
    if (!s)
      return await fetch(t, i);
    const r = new AbortController(), n = setTimeout(() => r.abort(), s * 1e3);
    try {
      return await fetch(t, {
        ...e,
        signal: r.signal
      });
    } catch (o) {
      throw o instanceof DOMException && o.name === "AbortError" ? new se("Network timed out") : o;
    } finally {
      clearTimeout(n);
    }
  }
  async getJson(t, {
    token: e,
    credentials: s
  } = {}) {
    const i = this._logger.create("getJson"), r = {
      Accept: this._contentTypes.join(", ")
    };
    e && (i.debug("token passed, setting Authorization header"), r.Authorization = "Bearer " + e);
    let n;
    try {
      i.debug("url:", t), n = await this.fetchWithTimeout(t, { method: "GET", headers: r, credentials: s });
    } catch (d) {
      throw i.error("Network Error"), d;
    }
    i.debug("HTTP response received, status", n.status);
    const o = n.headers.get("Content-Type");
    if (o && !this._contentTypes.find((d) => o.startsWith(d)) && i.throw(new Error(`Invalid response Content-Type: ${o != null ? o : "undefined"}, from URL: ${t}`)), n.ok && this._jwtHandler && (o == null ? void 0 : o.startsWith("application/jwt")))
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
  async postForm(t, {
    body: e,
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
      n.debug("url:", t), c = await this.fetchWithTimeout(t, { method: "POST", headers: o, body: e, timeoutInSeconds: i, credentials: r });
    } catch (g) {
      throw n.error("Network error"), g;
    }
    n.debug("HTTP response received, status", c.status);
    const d = c.headers.get("Content-Type");
    if (d && !this._contentTypes.find((g) => d.startsWith(g)))
      throw new Error(`Invalid response Content-Type: ${d != null ? d : "undefined"}, from URL: ${t}`);
    const u = await c.text();
    let p = {};
    if (u)
      try {
        p = JSON.parse(u);
      } catch (g) {
        throw n.error("Error parsing JSON response", g), c.ok ? g : new Error(`${c.statusText} (${c.status})`);
      }
    if (!c.ok)
      throw n.error("Error from server:", p), p.error ? new j(p, e) : new Error(`${c.statusText} (${c.status}): ${JSON.stringify(p)}`);
    return p;
  }
}, Ze = class {
  constructor(t) {
    this._settings = t, this._logger = new f("MetadataService"), this._jsonService = new ie(["application/jwk-set+json"]), this._signingKeys = null, this._metadata = null, this._metadataUrl = this._settings.metadataUrl, this._settings.signingKeys && (this._logger.debug("using signingKeys from settings"), this._signingKeys = this._settings.signingKeys), this._settings.metadata && (this._logger.debug("using metadata from settings"), this._metadata = this._settings.metadata), this._settings.fetchRequestCredentials && (this._logger.debug("using fetchRequestCredentials from settings"), this._fetchRequestCredentials = this._settings.fetchRequestCredentials);
  }
  resetSigningKeys() {
    this._signingKeys = null;
  }
  async getMetadata() {
    const t = this._logger.create("getMetadata");
    if (this._metadata)
      return t.debug("using cached values"), this._metadata;
    if (!this._metadataUrl)
      throw t.throw(new Error("No authority or metadataUrl configured on settings")), null;
    t.debug("getting metadata from", this._metadataUrl);
    const e = await this._jsonService.getJson(this._metadataUrl, { credentials: this._fetchRequestCredentials });
    return t.debug("merging remote JSON with seed metadata"), this._metadata = Object.assign({}, this._settings.metadataSeed, e), this._metadata;
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
  getTokenEndpoint(t = !0) {
    return this._getMetadataProperty("token_endpoint", t);
  }
  getCheckSessionIframe() {
    return this._getMetadataProperty("check_session_iframe", !0);
  }
  getEndSessionEndpoint() {
    return this._getMetadataProperty("end_session_endpoint", !0);
  }
  getRevocationEndpoint(t = !0) {
    return this._getMetadataProperty("revocation_endpoint", t);
  }
  getKeysEndpoint(t = !0) {
    return this._getMetadataProperty("jwks_uri", t);
  }
  async _getMetadataProperty(t, e = !1) {
    const s = this._logger.create(`_getMetadataProperty('${t}')`), i = await this.getMetadata();
    if (s.debug("resolved"), i[t] === void 0) {
      if (e === !0) {
        s.warn("Metadata does not contain optional property");
        return;
      }
      s.throw(new Error("Metadata does not contain property " + t));
    }
    return i[t];
  }
  async getSigningKeys() {
    const t = this._logger.create("getSigningKeys");
    if (this._signingKeys)
      return t.debug("returning signingKeys from cache"), this._signingKeys;
    const e = await this.getKeysEndpoint(!1);
    t.debug("got jwks_uri", e);
    const s = await this._jsonService.getJson(e);
    if (t.debug("got key set", s), !Array.isArray(s.keys))
      throw t.throw(new Error("Missing keys on keyset")), null;
    return this._signingKeys = s.keys, this._signingKeys;
  }
}, ve = class {
  constructor({
    prefix: t = "oidc.",
    store: e = localStorage
  } = {}) {
    this._logger = new f("WebStorageStateStore"), this._store = e, this._prefix = t;
  }
  async set(t, e) {
    this._logger.create(`set('${t}')`), t = this._prefix + t, await this._store.setItem(t, e);
  }
  async get(t) {
    return this._logger.create(`get('${t}')`), t = this._prefix + t, await this._store.getItem(t);
  }
  async remove(t) {
    this._logger.create(`remove('${t}')`), t = this._prefix + t;
    const e = await this._store.getItem(t);
    return await this._store.removeItem(t), e;
  }
  async getAllKeys() {
    this._logger.create("getAllKeys");
    const t = await this._store.length, e = [];
    for (let s = 0; s < t; s++) {
      const i = await this._store.key(s);
      i && i.indexOf(this._prefix) === 0 && e.push(i.substr(this._prefix.length));
    }
    return e;
  }
}, et = "code", tt = "openid", st = "client_secret_post", it = "query", rt = 60 * 15, nt = 60 * 5, ke = class {
  constructor({
    authority: t,
    metadataUrl: e,
    metadata: s,
    signingKeys: i,
    metadataSeed: r,
    client_id: n,
    client_secret: o,
    response_type: c = et,
    scope: d = tt,
    redirect_uri: u,
    post_logout_redirect_uri: p,
    client_authentication: g = st,
    prompt: S,
    display: w,
    max_age: k,
    ui_locales: l,
    acr_values: y,
    resource: T,
    response_mode: a = it,
    filterProtocolClaims: h = !0,
    loadUserInfo: _ = !1,
    staleStateAgeInSeconds: m = rt,
    clockSkewInSeconds: v = nt,
    userInfoJwtIssuer: b = "OP",
    mergeClaims: C = !1,
    stateStore: R,
    refreshTokenCredentials: B,
    revokeTokenAdditionalContentTypes: A,
    fetchRequestCredentials: M,
    extraQueryParams: J = {},
    extraTokenParams: K = {}
  }) {
    if (this.authority = t, e ? this.metadataUrl = e : (this.metadataUrl = t, t && (this.metadataUrl.endsWith("/") || (this.metadataUrl += "/"), this.metadataUrl += ".well-known/openid-configuration")), this.metadata = s, this.metadataSeed = r, this.signingKeys = i, this.client_id = n, this.client_secret = o, this.response_type = c, this.scope = d, this.redirect_uri = u, this.post_logout_redirect_uri = p, this.client_authentication = g, this.prompt = S, this.display = w, this.max_age = k, this.ui_locales = l, this.acr_values = y, this.resource = T, this.response_mode = a, this.filterProtocolClaims = !!h, this.loadUserInfo = !!_, this.staleStateAgeInSeconds = m, this.clockSkewInSeconds = v, this.userInfoJwtIssuer = b, this.mergeClaims = !!C, this.revokeTokenAdditionalContentTypes = A, M && B && console.warn("Both fetchRequestCredentials and refreshTokenCredentials is set. Only fetchRequestCredentials will be used."), this.fetchRequestCredentials = M || B || "same-origin", R)
      this.stateStore = R;
    else {
      const V = typeof window < "u" ? window.localStorage : new Se();
      this.stateStore = new ve({ store: V });
    }
    this.extraQueryParams = J, this.extraTokenParams = K;
  }
}, ot = class {
  constructor(t, e) {
    this._settings = t, this._metadataService = e, this._logger = new f("UserInfoService"), this._getClaimsFromJwt = async (s) => {
      const i = this._logger.create("_getClaimsFromJwt");
      try {
        const r = X.decode(s);
        return i.debug("JWT decoding successful"), r;
      } catch (r) {
        throw i.error("Error parsing JWT response"), r;
      }
    }, this._jsonService = new ie(void 0, this._getClaimsFromJwt);
  }
  async getClaims(t) {
    const e = this._logger.create("getClaims");
    t || this._logger.throw(new Error("No token passed"));
    const s = await this._metadataService.getUserInfoEndpoint();
    e.debug("got userinfo url", s);
    const i = await this._jsonService.getJson(s, {
      token: t,
      credentials: this._settings.fetchRequestCredentials
    });
    return e.debug("got claims", i), i;
  }
}, be = class {
  constructor(t, e) {
    this._settings = t, this._metadataService = e, this._logger = new f("TokenClient"), this._jsonService = new ie(this._settings.revokeTokenAdditionalContentTypes);
  }
  async exchangeCode({
    grant_type: t = "authorization_code",
    redirect_uri: e = this._settings.redirect_uri,
    client_id: s = this._settings.client_id,
    client_secret: i = this._settings.client_secret,
    ...r
  }) {
    const n = this._logger.create("exchangeCode");
    s || n.throw(new Error("A client_id is required")), e || n.throw(new Error("A redirect_uri is required")), r.code || n.throw(new Error("A code is required")), r.code_verifier || n.throw(new Error("A code_verifier is required"));
    const o = new URLSearchParams({ grant_type: t, redirect_uri: e });
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
    const u = await this._jsonService.postForm(d, { body: o, basicAuth: c, initCredentials: this._settings.fetchRequestCredentials });
    return n.debug("got response"), u;
  }
  async exchangeCredentials({
    grant_type: t = "password",
    client_id: e = this._settings.client_id,
    client_secret: s = this._settings.client_secret,
    scope: i = this._settings.scope,
    username: r,
    password: n
  }) {
    const o = this._logger.create("exchangeCredentials");
    e || o.throw(new Error("A client_id is required"));
    const c = new URLSearchParams({ grant_type: t, username: r, password: n, scope: i });
    let d;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!s)
          throw o.throw(new Error("A client_secret is required")), null;
        d = O.generateBasicAuth(e, s);
        break;
      case "client_secret_post":
        c.append("client_id", e), s && c.append("client_secret", s);
        break;
    }
    const u = await this._metadataService.getTokenEndpoint(!1);
    o.debug("got token endpoint");
    const p = await this._jsonService.postForm(u, { body: c, basicAuth: d, initCredentials: this._settings.fetchRequestCredentials });
    return o.debug("got response"), p;
  }
  async exchangeRefreshToken({
    grant_type: t = "refresh_token",
    client_id: e = this._settings.client_id,
    client_secret: s = this._settings.client_secret,
    timeoutInSeconds: i,
    ...r
  }) {
    const n = this._logger.create("exchangeRefreshToken");
    e || n.throw(new Error("A client_id is required")), r.refresh_token || n.throw(new Error("A refresh_token is required"));
    const o = new URLSearchParams({ grant_type: t });
    for (const [p, g] of Object.entries(r))
      g != null && o.set(p, g);
    let c;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!s)
          throw n.throw(new Error("A client_secret is required")), null;
        c = O.generateBasicAuth(e, s);
        break;
      case "client_secret_post":
        o.append("client_id", e), s && o.append("client_secret", s);
        break;
    }
    const d = await this._metadataService.getTokenEndpoint(!1);
    n.debug("got token endpoint");
    const u = await this._jsonService.postForm(d, { body: o, basicAuth: c, timeoutInSeconds: i, initCredentials: this._settings.fetchRequestCredentials });
    return n.debug("got response"), u;
  }
  async revoke(t) {
    var e;
    const s = this._logger.create("revoke");
    t.token || s.throw(new Error("A token is required"));
    const i = await this._metadataService.getRevocationEndpoint(!1);
    s.debug(`got revocation endpoint, revoking ${(e = t.token_type_hint) != null ? e : "default token type"}`);
    const r = new URLSearchParams();
    for (const [n, o] of Object.entries(t))
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
  constructor(t, e) {
    this._settings = t, this._metadataService = e, this._logger = new f("ResponseValidator"), this._userInfoService = new ot(this._settings, this._metadataService), this._tokenClient = new be(this._settings, this._metadataService);
  }
  async validateSigninResponse(t, e) {
    const s = this._logger.create("validateSigninResponse");
    this._processSigninState(t, e), s.debug("state processed"), await this._processCode(t, e), s.debug("code processed"), t.isOpenId && this._validateIdTokenAttributes(t), s.debug("tokens validated"), await this._processClaims(t, e == null ? void 0 : e.skipUserInfo, t.isOpenId), s.debug("claims processed");
  }
  async validateCredentialsResponse(t, e) {
    const s = this._logger.create("validateCredentialsResponse");
    t.isOpenId && this._validateIdTokenAttributes(t), s.debug("tokens validated"), await this._processClaims(t, e, t.isOpenId), s.debug("claims processed");
  }
  async validateRefreshResponse(t, e) {
    const s = this._logger.create("validateRefreshResponse");
    t.userState = e.data, t.session_state != null || (t.session_state = e.session_state), t.scope != null || (t.scope = e.scope), t.isOpenId && !!t.id_token && (this._validateIdTokenAttributes(t, e.id_token), s.debug("ID Token validated")), t.id_token || (t.id_token = e.id_token, t.profile = e.profile);
    const i = t.isOpenId && !!t.id_token;
    await this._processClaims(t, !1, i), s.debug("claims processed");
  }
  validateSignoutResponse(t, e) {
    const s = this._logger.create("validateSignoutResponse");
    if (e.id !== t.state && s.throw(new Error("State does not match")), s.debug("state validated"), t.userState = e.data, t.error)
      throw s.warn("Response was error", t.error), new j(t);
  }
  _processSigninState(t, e) {
    const s = this._logger.create("_processSigninState");
    if (e.id !== t.state && s.throw(new Error("State does not match")), e.client_id || s.throw(new Error("No client_id on state")), e.authority || s.throw(new Error("No authority on state")), this._settings.authority !== e.authority && s.throw(new Error("authority mismatch on settings vs. signin state")), this._settings.client_id && this._settings.client_id !== e.client_id && s.throw(new Error("client_id mismatch on settings vs. signin state")), s.debug("state validated"), t.userState = e.data, t.scope != null || (t.scope = e.scope), t.error)
      throw s.warn("Response was error", t.error), new j(t);
    e.code_verifier && !t.code && s.throw(new Error("Expected code in response")), !e.code_verifier && t.code && s.throw(new Error("Unexpected code in response"));
  }
  async _processClaims(t, e = !1, s = !0) {
    const i = this._logger.create("_processClaims");
    if (t.profile = this._filterProtocolClaims(t.profile), e || !this._settings.loadUserInfo || !t.access_token) {
      i.debug("not loading user info");
      return;
    }
    i.debug("loading user info");
    const r = await this._userInfoService.getClaims(t.access_token);
    i.debug("user info claims received from user info endpoint"), s && r.sub !== t.profile.sub && i.throw(new Error("subject from UserInfo response does not match subject in ID Token")), t.profile = this._mergeClaims(t.profile, this._filterProtocolClaims(r)), i.debug("user info claims received, updated profile:", t.profile);
  }
  _mergeClaims(t, e) {
    const s = { ...t };
    for (const [i, r] of Object.entries(e))
      for (const n of Array.isArray(r) ? r : [r]) {
        const o = s[i];
        o ? Array.isArray(o) ? o.includes(n) || o.push(n) : s[i] !== n && (typeof n == "object" && this._settings.mergeClaims ? s[i] = this._mergeClaims(o, n) : s[i] = [o, n]) : s[i] = n;
      }
    return s;
  }
  _filterProtocolClaims(t) {
    const e = { ...t };
    if (this._settings.filterProtocolClaims)
      for (const s of at)
        delete e[s];
    return e;
  }
  async _processCode(t, e) {
    const s = this._logger.create("_processCode");
    if (t.code) {
      s.debug("Validating code");
      const i = await this._tokenClient.exchangeCode({
        client_id: e.client_id,
        client_secret: e.client_secret,
        code: t.code,
        redirect_uri: e.redirect_uri,
        code_verifier: e.code_verifier,
        ...e.extraTokenParams
      });
      Object.assign(t, i);
    } else
      s.debug("No code to process");
  }
  _validateIdTokenAttributes(t, e) {
    var s;
    const i = this._logger.create("_validateIdTokenAttributes");
    i.debug("decoding ID Token JWT");
    const r = X.decode((s = t.id_token) != null ? s : "");
    if (r.sub || i.throw(new Error("ID Token is missing a subject claim")), e) {
      const n = X.decode(e);
      n.sub !== r.sub && i.throw(new Error("sub in id_token does not match current sub")), n.auth_time && n.auth_time !== r.auth_time && i.throw(new Error("auth_time in id_token does not match original auth_time")), n.azp && n.azp !== r.azp && i.throw(new Error("azp in id_token does not match original azp")), !n.azp && r.azp && i.throw(new Error("azp not in id_token, but present in original id_token"));
    }
    t.profile = r;
  }
}, D = class {
  constructor(t) {
    this.id = t.id || O.generateUUIDv4(), this.data = t.data, t.created && t.created > 0 ? this.created = t.created : this.created = E.getEpochTime(), this.request_type = t.request_type;
  }
  toStorageString() {
    return new f("State").create("toStorageString"), JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type
    });
  }
  static fromStorageString(t) {
    return f.createStatic("State", "fromStorageString"), new D(JSON.parse(t));
  }
  static async clearStaleState(t, e) {
    const s = f.createStatic("State", "clearStaleState"), i = E.getEpochTime() - e, r = await t.getAllKeys();
    s.debug("got keys", r);
    for (let n = 0; n < r.length; n++) {
      const o = r[n], c = await t.get(o);
      let d = !1;
      if (c)
        try {
          const u = D.fromStorageString(c);
          s.debug("got item from key:", o, u.created), u.created <= i && (d = !0);
        } catch (u) {
          s.error("Error parsing state for key:", o, u), d = !0;
        }
      else
        s.debug("no item in storage for key:", o), d = !0;
      d && (s.debug("removed item for key:", o), t.remove(o));
    }
  }
}, re = class extends D {
  constructor(t) {
    super(t), t.code_verifier === !0 ? this.code_verifier = O.generateCodeVerifier() : t.code_verifier && (this.code_verifier = t.code_verifier), this.code_verifier && (this.code_challenge = O.generateCodeChallenge(this.code_verifier)), this.authority = t.authority, this.client_id = t.client_id, this.redirect_uri = t.redirect_uri, this.scope = t.scope, this.client_secret = t.client_secret, this.extraTokenParams = t.extraTokenParams, this.response_mode = t.response_mode, this.skipUserInfo = t.skipUserInfo;
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
  static fromStorageString(t) {
    f.createStatic("SigninState", "fromStorageString");
    const e = JSON.parse(t);
    return new re(e);
  }
}, dt = class {
  constructor({
    url: t,
    authority: e,
    client_id: s,
    redirect_uri: i,
    response_type: r,
    scope: n,
    state_data: o,
    response_mode: c,
    request_type: d,
    client_secret: u,
    nonce: p,
    skipUserInfo: g,
    extraQueryParams: S,
    extraTokenParams: w,
    ...k
  }) {
    if (this._logger = new f("SigninRequest"), !t)
      throw this._logger.error("ctor: No url passed"), new Error("url");
    if (!s)
      throw this._logger.error("ctor: No client_id passed"), new Error("client_id");
    if (!i)
      throw this._logger.error("ctor: No redirect_uri passed"), new Error("redirect_uri");
    if (!r)
      throw this._logger.error("ctor: No response_type passed"), new Error("response_type");
    if (!n)
      throw this._logger.error("ctor: No scope passed"), new Error("scope");
    if (!e)
      throw this._logger.error("ctor: No authority passed"), new Error("authority");
    this.state = new re({
      data: o,
      request_type: d,
      code_verifier: !0,
      client_id: s,
      authority: e,
      redirect_uri: i,
      response_mode: c,
      client_secret: u,
      scope: n,
      extraTokenParams: w,
      skipUserInfo: g
    });
    const l = new URL(t);
    l.searchParams.append("client_id", s), l.searchParams.append("redirect_uri", i), l.searchParams.append("response_type", r), l.searchParams.append("scope", n), p && l.searchParams.append("nonce", p), l.searchParams.append("state", this.state.id), this.state.code_challenge && (l.searchParams.append("code_challenge", this.state.code_challenge), l.searchParams.append("code_challenge_method", "S256"));
    for (const [y, T] of Object.entries({ response_mode: c, ...k, ...S }))
      T != null && l.searchParams.append(y, T.toString());
    this.url = l.href;
  }
}, ht = "openid", Q = class {
  constructor(t) {
    this.access_token = "", this.token_type = "", this.profile = {}, this.state = t.get("state"), this.session_state = t.get("session_state"), this.error = t.get("error"), this.error_description = t.get("error_description"), this.error_uri = t.get("error_uri"), this.code = t.get("code");
  }
  get expires_in() {
    if (this.expires_at !== void 0)
      return this.expires_at - E.getEpochTime();
  }
  set expires_in(t) {
    typeof t == "string" && (t = Number(t)), t !== void 0 && t >= 0 && (this.expires_at = Math.floor(t) + E.getEpochTime());
  }
  get isOpenId() {
    var t;
    return ((t = this.scope) == null ? void 0 : t.split(" ").includes(ht)) || !!this.id_token;
  }
}, ut = class {
  constructor({
    url: t,
    state_data: e,
    id_token_hint: s,
    post_logout_redirect_uri: i,
    extraQueryParams: r,
    request_type: n
  }) {
    if (this._logger = new f("SignoutRequest"), !t)
      throw this._logger.error("ctor: No url passed"), new Error("url");
    const o = new URL(t);
    s && o.searchParams.append("id_token_hint", s), i && (o.searchParams.append("post_logout_redirect_uri", i), e && (this.state = new D({ data: e, request_type: n }), o.searchParams.append("state", this.state.id)));
    for (const [c, d] of Object.entries({ ...r }))
      d != null && o.searchParams.append(c, d.toString());
    this.url = o.href;
  }
}, lt = class {
  constructor(t) {
    this.state = t.get("state"), this.error = t.get("error"), this.error_description = t.get("error_description"), this.error_uri = t.get("error_uri");
  }
}, gt = class {
  constructor(t) {
    this._logger = new f("OidcClient"), this.settings = new ke(t), this.metadataService = new Ze(this.settings), this._validator = new ct(this.settings, this.metadataService), this._tokenClient = new be(this.settings, this.metadataService);
  }
  async createSigninRequest({
    state: t,
    request: e,
    request_uri: s,
    request_type: i,
    id_token_hint: r,
    login_hint: n,
    skipUserInfo: o,
    nonce: c,
    response_type: d = this.settings.response_type,
    scope: u = this.settings.scope,
    redirect_uri: p = this.settings.redirect_uri,
    prompt: g = this.settings.prompt,
    display: S = this.settings.display,
    max_age: w = this.settings.max_age,
    ui_locales: k = this.settings.ui_locales,
    acr_values: l = this.settings.acr_values,
    resource: y = this.settings.resource,
    response_mode: T = this.settings.response_mode,
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
      scope: u,
      state_data: t,
      prompt: g,
      display: S,
      max_age: w,
      ui_locales: k,
      id_token_hint: r,
      login_hint: n,
      acr_values: l,
      resource: y,
      request: e,
      request_uri: s,
      extraQueryParams: a,
      extraTokenParams: h,
      request_type: i,
      response_mode: T,
      client_secret: this.settings.client_secret,
      skipUserInfo: o,
      nonce: c
    });
    await this.clearStaleState();
    const b = v.state;
    return await this.settings.stateStore.set(b.id, b.toStorageString()), v;
  }
  async readSigninResponseState(t, e = !1) {
    const s = this._logger.create("readSigninResponseState"), i = new Q(Z.readParams(t, this.settings.response_mode));
    if (!i.state)
      throw s.throw(new Error("No state in response")), null;
    const r = await this.settings.stateStore[e ? "remove" : "get"](i.state);
    if (!r)
      throw s.throw(new Error("No matching state found in storage")), null;
    return { state: re.fromStorageString(r), response: i };
  }
  async processSigninResponse(t) {
    const e = this._logger.create("processSigninResponse"), { state: s, response: i } = await this.readSigninResponseState(t, !0);
    return e.debug("received state from storage; validating response"), await this._validator.validateSigninResponse(i, s), i;
  }
  async processResourceOwnerPasswordCredentials({
    username: t,
    password: e,
    skipUserInfo: s = !1
  }) {
    const i = await this._tokenClient.exchangeCredentials({ username: t, password: e }), r = new Q(new URLSearchParams());
    return Object.assign(r, i), await this._validator.validateCredentialsResponse(r, s), r;
  }
  async useRefreshToken({
    state: t,
    timeoutInSeconds: e
  }) {
    const s = this._logger.create("useRefreshToken"), i = await this._tokenClient.exchangeRefreshToken({
      refresh_token: t.refresh_token,
      scope: t.scope,
      timeoutInSeconds: e
    }), r = new Q(new URLSearchParams());
    return Object.assign(r, i), s.debug("validating response", r), await this._validator.validateRefreshResponse(r, t), r;
  }
  async createSignoutRequest({
    state: t,
    id_token_hint: e,
    request_type: s,
    post_logout_redirect_uri: i = this.settings.post_logout_redirect_uri,
    extraQueryParams: r = this.settings.extraQueryParams
  } = {}) {
    const n = this._logger.create("createSignoutRequest"), o = await this.metadataService.getEndSessionEndpoint();
    if (!o)
      throw n.throw(new Error("No end session endpoint")), null;
    n.debug("Received end session endpoint", o);
    const c = new ut({
      url: o,
      id_token_hint: e,
      post_logout_redirect_uri: i,
      state_data: t,
      extraQueryParams: r,
      request_type: s
    });
    await this.clearStaleState();
    const d = c.state;
    return d && (n.debug("Signout request has state to persist"), await this.settings.stateStore.set(d.id, d.toStorageString())), c;
  }
  async readSignoutResponseState(t, e = !1) {
    const s = this._logger.create("readSignoutResponseState"), i = new lt(Z.readParams(t, this.settings.response_mode));
    if (!i.state) {
      if (s.debug("No state in response"), i.error)
        throw s.warn("Response was error:", i.error), new j(i);
      return { state: void 0, response: i };
    }
    const r = await this.settings.stateStore[e ? "remove" : "get"](i.state);
    if (!r)
      throw s.throw(new Error("No matching state found in storage")), null;
    return { state: D.fromStorageString(r), response: i };
  }
  async processSignoutResponse(t) {
    const e = this._logger.create("processSignoutResponse"), { state: s, response: i } = await this.readSignoutResponseState(t, !0);
    return s ? (e.debug("Received state from storage; validating response"), this._validator.validateSignoutResponse(i, s)) : e.debug("No state from storage; skipping response validation"), i;
  }
  clearStaleState() {
    return this._logger.create("clearStaleState"), D.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
  }
  async revokeToken(t, e) {
    return this._logger.create("revokeToken"), await this._tokenClient.revoke({
      token: t,
      token_type_hint: e
    });
  }
}, pt = class {
  constructor(t) {
    this._userManager = t, this._logger = new f("SessionMonitor"), this._start = async (e) => {
      const s = e.session_state;
      if (!s)
        return;
      const i = this._logger.create("_start");
      if (e.profile ? (this._sub = e.profile.sub, this._sid = e.profile.sid, i.debug("session_state", s, ", sub", this._sub)) : (this._sub = void 0, this._sid = void 0, i.debug("session_state", s, ", anonymous user")), this._checkSessionIFrame) {
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
      const e = this._logger.create("_stop");
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
            e.error("error from querySessionStatus", i instanceof Error ? i.message : i);
          }
        }, 1e3);
      }
    }, this._callback = async () => {
      const e = this._logger.create("_callback");
      try {
        const s = await this._userManager.querySessionStatus();
        let i = !0;
        s && this._checkSessionIFrame ? s.sub === this._sub ? (i = !1, this._checkSessionIFrame.start(s.session_state), s.sid === this._sid ? e.debug("same sub still logged in at OP, restarting check session iframe; session_state", s.session_state) : (e.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state", s.session_state), this._userManager.events._raiseUserSessionChanged())) : e.debug("different subject signed into OP", s.sub) : e.debug("subject no longer signed into OP"), i ? this._sub ? this._userManager.events._raiseUserSignedOut() : this._userManager.events._raiseUserSignedIn() : e.debug("no change in session detected, no event to raise");
      } catch (s) {
        this._sub && (e.debug("Error calling queryCurrentSigninSession; raising signed out event", s), this._userManager.events._raiseUserSignedOut());
      }
    }, t || this._logger.throw(new Error("No user manager passed")), this._userManager.events.addUserLoaded(this._start), this._userManager.events.addUserUnloaded(this._stop), this._init().catch((e) => {
      this._logger.error(e);
    });
  }
  async _init() {
    this._logger.create("_init");
    const t = await this._userManager.getUser();
    if (t)
      this._start(t);
    else if (this._userManager.settings.monitorAnonymousSession) {
      const e = await this._userManager.querySessionStatus();
      if (e) {
        const s = {
          session_state: e.session_state,
          profile: e.sub && e.sid ? {
            sub: e.sub,
            sid: e.sid
          } : null
        };
        this._start(s);
      }
    }
  }
}, W = class {
  constructor(t) {
    var e;
    this.id_token = t.id_token, this.session_state = (e = t.session_state) != null ? e : null, this.access_token = t.access_token, this.refresh_token = t.refresh_token, this.token_type = t.token_type, this.scope = t.scope, this.profile = t.profile, this.expires_at = t.expires_at, this.state = t.userState;
  }
  get expires_in() {
    if (this.expires_at !== void 0)
      return this.expires_at - E.getEpochTime();
  }
  set expires_in(t) {
    t !== void 0 && (this.expires_at = Math.floor(t) + E.getEpochTime());
  }
  get expired() {
    const t = this.expires_in;
    if (t !== void 0)
      return t <= 0;
  }
  get scopes() {
    var t, e;
    return (e = (t = this.scope) == null ? void 0 : t.split(" ")) != null ? e : [];
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
  static fromStorageString(t) {
    return f.createStatic("User", "fromStorageString"), new W(JSON.parse(t));
  }
}, ue = "oidc-client", Ie = class {
  constructor() {
    this._abort = new N("Window navigation aborted"), this._disposeHandlers = /* @__PURE__ */ new Set(), this._window = null;
  }
  async navigate(t) {
    const e = this._logger.create("navigate");
    if (!this._window)
      throw new Error("Attempted to navigate on a disposed window");
    e.debug("setting URL in window"), this._window.location.replace(t.url);
    const { url: s, keepOpen: i } = await new Promise((r, n) => {
      const o = (c) => {
        var d;
        const u = c.data, p = (d = t.scriptOrigin) != null ? d : window.location.origin;
        if (!(c.origin !== p || (u == null ? void 0 : u.source) !== ue)) {
          try {
            const g = Z.readParams(u.url, t.response_mode).get("state");
            if (g || e.warn("no state found in response url"), c.source !== this._window && g !== t.state)
              return;
          } catch {
            this._dispose(), n(new Error("Invalid response from window"));
          }
          r(u);
        }
      };
      window.addEventListener("message", o, !1), this._disposeHandlers.add(() => window.removeEventListener("message", o, !1)), this._disposeHandlers.add(this._abort.addHandler((c) => {
        this._dispose(), n(c);
      }));
    });
    return e.debug("got response from window"), this._dispose(), i || this.close(), { url: s };
  }
  _dispose() {
    this._logger.create("_dispose");
    for (const t of this._disposeHandlers)
      t();
    this._disposeHandlers.clear();
  }
  static _notifyParent(t, e, s = !1, i = window.location.origin) {
    t.postMessage({
      source: ue,
      url: e,
      keepOpen: s
    }, i);
  }
}, Te = {
  location: !1,
  toolbar: !1,
  height: 640
}, Ce = "_blank", _t = 60, ft = 2, Re = 10, wt = class extends ke {
  constructor(t) {
    const {
      popup_redirect_uri: e = t.redirect_uri,
      popup_post_logout_redirect_uri: s = t.post_logout_redirect_uri,
      popupWindowFeatures: i = Te,
      popupWindowTarget: r = Ce,
      redirectMethod: n = "assign",
      redirectTarget: o = "self",
      iframeNotifyParentOrigin: c = t.iframeNotifyParentOrigin,
      iframeScriptOrigin: d = t.iframeScriptOrigin,
      silent_redirect_uri: u = t.redirect_uri,
      silentRequestTimeoutInSeconds: p = Re,
      automaticSilentRenew: g = !0,
      validateSubOnSilentRenew: S = !0,
      includeIdTokenInSilentRenew: w = !1,
      monitorSession: k = !1,
      monitorAnonymousSession: l = !1,
      checkSessionIntervalInSeconds: y = ft,
      query_status_response_type: T = "code",
      stopCheckSessionOnError: a = !0,
      revokeTokenTypes: h = ["access_token", "refresh_token"],
      revokeTokensOnSignout: _ = !1,
      includeIdTokenInSilentSignout: m = !1,
      accessTokenExpiringNotificationTimeInSeconds: v = _t,
      userStore: b
    } = t;
    if (super(t), this.popup_redirect_uri = e, this.popup_post_logout_redirect_uri = s, this.popupWindowFeatures = i, this.popupWindowTarget = r, this.redirectMethod = n, this.redirectTarget = o, this.iframeNotifyParentOrigin = c, this.iframeScriptOrigin = d, this.silent_redirect_uri = u, this.silentRequestTimeoutInSeconds = p, this.automaticSilentRenew = g, this.validateSubOnSilentRenew = S, this.includeIdTokenInSilentRenew = w, this.monitorSession = k, this.monitorAnonymousSession = l, this.checkSessionIntervalInSeconds = y, this.stopCheckSessionOnError = a, this.query_status_response_type = T, this.revokeTokenTypes = h, this.revokeTokensOnSignout = _, this.includeIdTokenInSilentSignout = m, this.accessTokenExpiringNotificationTimeInSeconds = v, b)
      this.userStore = b;
    else {
      const C = typeof window < "u" ? window.sessionStorage : new Se();
      this.userStore = new ve({ store: C });
    }
  }
}, ee = class extends Ie {
  constructor({
    silentRequestTimeoutInSeconds: t = Re
  }) {
    super(), this._logger = new f("IFrameWindow"), this._timeoutInSeconds = t, this._frame = ee.createHiddenIframe(), this._window = this._frame.contentWindow;
  }
  static createHiddenIframe() {
    const t = window.document.createElement("iframe");
    return t.style.visibility = "hidden", t.style.position = "fixed", t.style.left = "-1000px", t.style.top = "0", t.width = "0", t.height = "0", t.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms"), window.document.body.appendChild(t), t;
  }
  async navigate(t) {
    this._logger.debug("navigate: Using timeout of:", this._timeoutInSeconds);
    const e = setTimeout(() => this._abort.raise(new se("IFrame timed out without a response")), this._timeoutInSeconds * 1e3);
    return this._disposeHandlers.add(() => clearTimeout(e)), await super.navigate(t);
  }
  close() {
    var t;
    this._frame && (this._frame.parentNode && (this._frame.addEventListener("load", (e) => {
      var s;
      const i = e.target;
      (s = i.parentNode) == null || s.removeChild(i), this._abort.raise(new Error("IFrame removed from DOM"));
    }, !0), (t = this._frame.contentWindow) == null || t.location.replace("about:blank")), this._frame = null), this._window = null;
  }
  static notifyParent(t, e) {
    return super._notifyParent(window.parent, t, !1, e);
  }
}, mt = class {
  constructor(t) {
    this._settings = t, this._logger = new f("IFrameNavigator");
  }
  async prepare({
    silentRequestTimeoutInSeconds: t = this._settings.silentRequestTimeoutInSeconds
  }) {
    return new ee({ silentRequestTimeoutInSeconds: t });
  }
  async callback(t) {
    this._logger.create("callback"), ee.notifyParent(t, this._settings.iframeNotifyParentOrigin);
  }
}, yt = 500, le = class extends Ie {
  constructor({
    popupWindowTarget: t = Ce,
    popupWindowFeatures: e = {}
  }) {
    super(), this._logger = new f("PopupWindow");
    const s = he.center({ ...Te, ...e });
    this._window = window.open(void 0, t, he.serialize(s));
  }
  async navigate(t) {
    var e;
    (e = this._window) == null || e.focus();
    const s = setInterval(() => {
      (!this._window || this._window.closed) && this._abort.raise(new Error("Popup closed by user"));
    }, yt);
    return this._disposeHandlers.add(() => clearInterval(s)), await super.navigate(t);
  }
  close() {
    this._window && (this._window.closed || (this._window.close(), this._abort.raise(new Error("Popup closed")))), this._window = null;
  }
  static notifyOpener(t, e) {
    if (!window.opener)
      throw new Error("No window.opener. Can't complete notification.");
    return super._notifyParent(window.opener, t, e);
  }
}, St = class {
  constructor(t) {
    this._settings = t, this._logger = new f("PopupNavigator");
  }
  async prepare({
    popupWindowFeatures: t = this._settings.popupWindowFeatures,
    popupWindowTarget: e = this._settings.popupWindowTarget
  }) {
    return new le({ popupWindowFeatures: t, popupWindowTarget: e });
  }
  async callback(t, e = !1) {
    this._logger.create("callback"), le.notifyOpener(t, e);
  }
}, vt = class {
  constructor(t) {
    this._settings = t, this._logger = new f("RedirectNavigator");
  }
  async prepare({
    redirectMethod: t = this._settings.redirectMethod,
    redirectTarget: e = this._settings.redirectTarget
  }) {
    var s;
    this._logger.create("prepare");
    let i = window.self;
    e === "top" && (i = (s = window.top) != null ? s : window.self);
    const r = i.location[t].bind(i.location);
    let n;
    return {
      navigate: async (o) => {
        this._logger.create("navigate");
        const c = new Promise((d, u) => {
          n = u;
        });
        return r(o.url), await c;
      },
      close: () => {
        this._logger.create("close"), n == null || n(new Error("Redirect aborted")), i.stop();
      }
    };
  }
}, kt = class extends Ye {
  constructor(t) {
    super({ expiringNotificationTimeInSeconds: t.accessTokenExpiringNotificationTimeInSeconds }), this._logger = new f("UserManagerEvents"), this._userLoaded = new N("User loaded"), this._userUnloaded = new N("User unloaded"), this._silentRenewError = new N("Silent renew error"), this._userSignedIn = new N("User signed in"), this._userSignedOut = new N("User signed out"), this._userSessionChanged = new N("User session changed");
  }
  load(t, e = !0) {
    super.load(t), e && this._userLoaded.raise(t);
  }
  unload() {
    super.unload(), this._userUnloaded.raise();
  }
  addUserLoaded(t) {
    return this._userLoaded.addHandler(t);
  }
  removeUserLoaded(t) {
    return this._userLoaded.removeHandler(t);
  }
  addUserUnloaded(t) {
    return this._userUnloaded.addHandler(t);
  }
  removeUserUnloaded(t) {
    return this._userUnloaded.removeHandler(t);
  }
  addSilentRenewError(t) {
    return this._silentRenewError.addHandler(t);
  }
  removeSilentRenewError(t) {
    return this._silentRenewError.removeHandler(t);
  }
  _raiseSilentRenewError(t) {
    this._silentRenewError.raise(t);
  }
  addUserSignedIn(t) {
    return this._userSignedIn.addHandler(t);
  }
  removeUserSignedIn(t) {
    this._userSignedIn.removeHandler(t);
  }
  _raiseUserSignedIn() {
    this._userSignedIn.raise();
  }
  addUserSignedOut(t) {
    return this._userSignedOut.addHandler(t);
  }
  removeUserSignedOut(t) {
    this._userSignedOut.removeHandler(t);
  }
  _raiseUserSignedOut() {
    this._userSignedOut.raise();
  }
  addUserSessionChanged(t) {
    return this._userSessionChanged.addHandler(t);
  }
  removeUserSessionChanged(t) {
    this._userSessionChanged.removeHandler(t);
  }
  _raiseUserSessionChanged() {
    this._userSessionChanged.raise();
  }
}, bt = class {
  constructor(t) {
    this._userManager = t, this._logger = new f("SilentRenewService"), this._isStarted = !1, this._retryTimer = new E("Retry Silent Renew"), this._tokenExpiring = async () => {
      const e = this._logger.create("_tokenExpiring");
      try {
        await this._userManager.signinSilent(), e.debug("silent token renewal successful");
      } catch (s) {
        if (s instanceof se) {
          e.warn("ErrorTimeout from signinSilent:", s, "retry in 5s"), this._retryTimer.init(5);
          return;
        }
        e.error("Error from signinSilent:", s), this._userManager.events._raiseSilentRenewError(s);
      }
    };
  }
  async start() {
    const t = this._logger.create("start");
    if (!this._isStarted) {
      this._isStarted = !0, this._userManager.events.addAccessTokenExpiring(this._tokenExpiring), this._retryTimer.addHandler(this._tokenExpiring);
      try {
        await this._userManager.getUser();
      } catch (e) {
        t.error("getUser error", e);
      }
    }
  }
  stop() {
    this._isStarted && (this._retryTimer.cancel(), this._retryTimer.removeHandler(this._tokenExpiring), this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring), this._isStarted = !1);
  }
}, It = class {
  constructor(t) {
    this.refresh_token = t.refresh_token, this.id_token = t.id_token, this.session_state = t.session_state, this.scope = t.scope, this.profile = t.profile, this.data = t.state;
  }
}, Tt = class {
  constructor(t) {
    this._logger = new f("UserManager"), this.settings = new wt(t), this._client = new gt(t), this._redirectNavigator = new vt(this.settings), this._popupNavigator = new St(this.settings), this._iframeNavigator = new mt(this.settings), this._events = new kt(this.settings), this._silentRenewService = new bt(this), this.settings.automaticSilentRenew && this.startSilentRenew(), this._sessionMonitor = null, this.settings.monitorSession && (this._sessionMonitor = new pt(this));
  }
  get events() {
    return this._events;
  }
  get metadataService() {
    return this._client.metadataService;
  }
  async getUser() {
    const t = this._logger.create("getUser"), e = await this._loadUser();
    return e ? (t.info("user loaded"), this._events.load(e, !1), e) : (t.info("user not found in storage"), null);
  }
  async removeUser() {
    const t = this._logger.create("removeUser");
    await this.storeUser(null), t.info("user removed from storage"), this._events.unload();
  }
  async signinRedirect(t = {}) {
    this._logger.create("signinRedirect");
    const {
      redirectMethod: e,
      ...s
    } = t, i = await this._redirectNavigator.prepare({ redirectMethod: e });
    await this._signinStart({
      request_type: "si:r",
      ...s
    }, i);
  }
  async signinRedirectCallback(t = window.location.href) {
    const e = this._logger.create("signinRedirectCallback"), s = await this._signinEnd(t);
    return s.profile && s.profile.sub ? e.info("success, signed in subject", s.profile.sub) : e.info("no subject"), s;
  }
  async signinResourceOwnerCredentials({
    username: t,
    password: e,
    skipUserInfo: s = !1
  }) {
    const i = this._logger.create("signinResourceOwnerCredential"), r = await this._client.processResourceOwnerPasswordCredentials({ username: t, password: e, skipUserInfo: s });
    i.debug("got signin response");
    const n = await this._buildUser(r);
    return n.profile && n.profile.sub ? i.info("success, signed in subject", n.profile.sub) : i.info("no subject"), n;
  }
  async signinPopup(t = {}) {
    const e = this._logger.create("signinPopup"), {
      popupWindowFeatures: s,
      popupWindowTarget: i,
      ...r
    } = t, n = this.settings.popup_redirect_uri;
    n || e.throw(new Error("No popup_redirect_uri configured"));
    const o = await this._popupNavigator.prepare({ popupWindowFeatures: s, popupWindowTarget: i }), c = await this._signin({
      request_type: "si:p",
      redirect_uri: n,
      display: "popup",
      ...r
    }, o);
    return c && (c.profile && c.profile.sub ? e.info("success, signed in subject", c.profile.sub) : e.info("no subject")), c;
  }
  async signinPopupCallback(t = window.location.href, e = !1) {
    const s = this._logger.create("signinPopupCallback");
    await this._popupNavigator.callback(t, e), s.info("success");
  }
  async signinSilent(t = {}) {
    var e;
    const s = this._logger.create("signinSilent"), {
      silentRequestTimeoutInSeconds: i,
      ...r
    } = t;
    let n = await this._loadUser();
    if (n != null && n.refresh_token) {
      s.debug("using refresh token");
      const u = new It(n);
      return await this._useRefreshToken(u);
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
    }, d, c), n && ((e = n.profile) != null && e.sub ? s.info("success, signed in subject", n.profile.sub) : s.info("no subject")), n;
  }
  async _useRefreshToken(t) {
    const e = await this._client.useRefreshToken({
      state: t,
      timeoutInSeconds: this.settings.silentRequestTimeoutInSeconds
    }), s = new W({ ...t, ...e });
    return await this.storeUser(s), this._events.load(s), s;
  }
  async signinSilentCallback(t = window.location.href) {
    const e = this._logger.create("signinSilentCallback");
    await this._iframeNavigator.callback(t), e.info("success");
  }
  async signinCallback(t = window.location.href) {
    const { state: e } = await this._client.readSigninResponseState(t);
    switch (e.request_type) {
      case "si:r":
        return await this.signinRedirectCallback(t);
      case "si:p":
        return await this.signinPopupCallback(t);
      case "si:s":
        return await this.signinSilentCallback(t);
      default:
        throw new Error("invalid response_type in state");
    }
  }
  async signoutCallback(t = window.location.href, e = !1) {
    const { state: s } = await this._client.readSignoutResponseState(t);
    if (s)
      switch (s.request_type) {
        case "so:r":
          await this.signoutRedirectCallback(t);
          break;
        case "so:p":
          await this.signoutPopupCallback(t, e);
          break;
        case "so:s":
          await this.signoutSilentCallback(t);
          break;
        default:
          throw new Error("invalid response_type in state");
      }
  }
  async querySessionStatus(t = {}) {
    const e = this._logger.create("querySessionStatus"), {
      silentRequestTimeoutInSeconds: s,
      ...i
    } = t, r = this.settings.silent_redirect_uri;
    r || e.throw(new Error("No silent_redirect_uri configured"));
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
      return e.debug("got signin response"), d.session_state && d.profile.sub ? (e.info("success for subject", d.profile.sub), {
        session_state: d.session_state,
        sub: d.profile.sub,
        sid: d.profile.sid
      }) : (e.info("success, user not authenticated"), null);
    } catch (d) {
      if (this.settings.monitorAnonymousSession && d instanceof j)
        switch (d.error) {
          case "login_required":
          case "consent_required":
          case "interaction_required":
          case "account_selection_required":
            return e.info("success for anonymous user"), {
              session_state: d.session_state
            };
        }
      throw d;
    }
  }
  async _signin(t, e, s) {
    const i = await this._signinStart(t, e);
    return await this._signinEnd(i.url, s);
  }
  async _signinStart(t, e) {
    const s = this._logger.create("_signinStart");
    try {
      const i = await this._client.createSigninRequest(t);
      return s.debug("got signin request"), await e.navigate({
        url: i.url,
        state: i.state.id,
        response_mode: i.state.response_mode,
        scriptOrigin: this.settings.iframeScriptOrigin
      });
    } catch (i) {
      throw s.debug("error after preparing navigator, closing navigator window"), e.close(), i;
    }
  }
  async _signinEnd(t, e) {
    const s = this._logger.create("_signinEnd"), i = await this._client.processSigninResponse(t);
    return s.debug("got signin response"), await this._buildUser(i, e);
  }
  async _buildUser(t, e) {
    const s = this._logger.create("_buildUser"), i = new W(t);
    if (e) {
      if (e !== i.profile.sub)
        throw s.debug("current user does not match user returned from signin. sub from signin:", i.profile.sub), new j({ ...t, error: "login_required" });
      s.debug("current user matches user returned from signin");
    }
    return await this.storeUser(i), s.debug("user stored"), this._events.load(i), i;
  }
  async signoutRedirect(t = {}) {
    const e = this._logger.create("signoutRedirect"), {
      redirectMethod: s,
      ...i
    } = t, r = await this._redirectNavigator.prepare({ redirectMethod: s });
    await this._signoutStart({
      request_type: "so:r",
      post_logout_redirect_uri: this.settings.post_logout_redirect_uri,
      ...i
    }, r), e.info("success");
  }
  async signoutRedirectCallback(t = window.location.href) {
    const e = this._logger.create("signoutRedirectCallback"), s = await this._signoutEnd(t);
    return e.info("success"), s;
  }
  async signoutPopup(t = {}) {
    const e = this._logger.create("signoutPopup"), {
      popupWindowFeatures: s,
      popupWindowTarget: i,
      ...r
    } = t, n = this.settings.popup_post_logout_redirect_uri, o = await this._popupNavigator.prepare({ popupWindowFeatures: s, popupWindowTarget: i });
    await this._signout({
      request_type: "so:p",
      post_logout_redirect_uri: n,
      state: n == null ? void 0 : {},
      ...r
    }, o), e.info("success");
  }
  async signoutPopupCallback(t = window.location.href, e = !1) {
    const s = this._logger.create("signoutPopupCallback");
    await this._popupNavigator.callback(t, e), s.info("success");
  }
  async _signout(t, e) {
    const s = await this._signoutStart(t, e);
    return await this._signoutEnd(s.url);
  }
  async _signoutStart(t = {}, e) {
    var s;
    const i = this._logger.create("_signoutStart");
    try {
      const r = await this._loadUser();
      i.debug("loaded current user from storage"), this.settings.revokeTokensOnSignout && await this._revokeInternal(r);
      const n = t.id_token_hint || r && r.id_token;
      n && (i.debug("setting id_token_hint in signout request"), t.id_token_hint = n), await this.removeUser(), i.debug("user removed, creating signout request");
      const o = await this._client.createSignoutRequest(t);
      return i.debug("got signout request"), await e.navigate({
        url: o.url,
        state: (s = o.state) == null ? void 0 : s.id
      });
    } catch (r) {
      throw i.debug("error after preparing navigator, closing navigator window"), e.close(), r;
    }
  }
  async _signoutEnd(t) {
    const e = this._logger.create("_signoutEnd"), s = await this._client.processSignoutResponse(t);
    return e.debug("got signout response"), s;
  }
  async signoutSilent(t = {}) {
    var e;
    const s = this._logger.create("signoutSilent"), {
      silentRequestTimeoutInSeconds: i,
      ...r
    } = t, n = this.settings.includeIdTokenInSilentSignout ? (e = await this._loadUser()) == null ? void 0 : e.id_token : void 0, o = this.settings.popup_post_logout_redirect_uri, c = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: i });
    await this._signout({
      request_type: "so:s",
      post_logout_redirect_uri: o,
      id_token_hint: n,
      ...r
    }, c), s.info("success");
  }
  async signoutSilentCallback(t = window.location.href) {
    const e = this._logger.create("signoutSilentCallback");
    await this._iframeNavigator.callback(t), e.info("success");
  }
  async revokeTokens(t) {
    const e = await this._loadUser();
    await this._revokeInternal(e, t);
  }
  async _revokeInternal(t, e = this.settings.revokeTokenTypes) {
    const s = this._logger.create("_revokeInternal");
    if (!t)
      return;
    const i = e.filter((r) => typeof t[r] == "string");
    if (!i.length) {
      s.debug("no need to revoke due to no token(s)");
      return;
    }
    for (const r of i)
      await this._client.revokeToken(
        t[r],
        r
      ), s.info(`${r} revoked successfully`), r !== "access_token" && (t[r] = null);
    await this.storeUser(t), s.debug("user stored"), this._events.load(t);
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
    const t = this._logger.create("_loadUser"), e = await this.settings.userStore.get(this._userStoreKey);
    return e ? (t.debug("user storageString loaded"), W.fromStorageString(e)) : (t.debug("no user storageString"), null);
  }
  async storeUser(t) {
    const e = this._logger.create("storeUser");
    if (t) {
      e.debug("storing user");
      const s = t.toStorageString();
      await this.settings.userStore.set(this._userStoreKey, s);
    } else
      this._logger.debug("removing user"), await this.settings.userStore.remove(this._userStoreKey);
  }
  async clearStaleState() {
    await this._client.clearStaleState();
  }
}, Ct = "2.2.0", $t = Ct;
const te = (t, e) => (t || (t = []), e || (e = []), Array.isArray(t) || (t = t.split(" ")), Array.isArray(e) || (e = e.split(" ")), t.concat(e).filter((s, i, r) => r.indexOf(s) === i).join(" ").trim()), Rt = "https://stage.identity.multicartshop.com", Pt = "https://identity.multicartshop.com", Et = "Multicart.TypeScript.Client";
class Pe {
  constructor(e = {}) {
    this.configuration = e;
  }
  set config(e) {
    this.configuration = e;
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
  constructor(e = Ee) {
    const s = {
      authority: e.basePath,
      loadUserInfo: !0,
      client_id: e.client_id,
      redirect_uri: e.redirect_uri,
      post_logout_redirect_uri: e.logout_redirect_uri,
      client_secret: e.client_secret,
      scope: te(e.scopes)
    };
    super(s), this.configuration = e;
  }
  async signinClientCredentials({
    scopes: e
  } = {}) {
    var s;
    const i = this._logger.create("signinClientCredentials"), r = await this.metadataService.getTokenEndpoint().catch((u) => i.error(u));
    if (!r)
      throw new Error("Token endpoint not be empty");
    const {
      client_id: n,
      client_secret: o,
      scope: c
    } = this.settings, d = te(c, e);
    if (!o)
      throw new Error("No client_secret configured");
    try {
      const u = await (await fetch(r, {
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
      })).json(), p = new W(u);
      return p.expires_at = Math.floor(Date.now() / 1e3) + ((s = u.expires_in) != null ? s : 0), await this.storeUser(p), i.debug("user stored"), this._events.load(p), p;
    } catch (u) {
      throw i.error("Login failed", u), new Error("Login failed");
    }
  }
}
const Gt = ({
  oauthConfig: t,
  clientConfig: e
} = {}) => {
  if (Ee.config = new Pe(
    Object.assign(
      {
        ...t
      },
      { scopes: te(t == null ? void 0 : t.scopes, ["multicart.api"]) }
    )
  ), !(e != null && e.accessToken)) {
    const s = new At(), i = async () => {
      const r = await s.getUser() || await s.signinSilent() || await s.signinPopup();
      return r ? `Bearer ${r == null ? void 0 : r.access_token}` : "";
    };
    e ? e.accessToken = i : e = { accessToken: i };
  }
  pe.config = new ge(e);
};
export {
  Ye as AccessTokenEvents,
  Mt as AdminCartItemApi,
  Be as BASE_PATH,
  $ as BaseAPI,
  Bt as BlobApiResponse,
  xt as COLLECTION_FORMATS,
  Lt as CaptchaServiceType,
  Nt as CartItemApi,
  Xe as CheckSessionIFrame,
  ge as Configuration,
  pe as DefaultConfig,
  Ee as DefaultMulticartOAuthConfig,
  Dt as EnPageDirection,
  Wt as EnPlatformType,
  j as ErrorResponse,
  se as ErrorTimeout,
  He as FetchError,
  Se as InMemoryWebStorage,
  P as JSONApiResponse,
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
  ke as OidcClientSettingsStore,
  jt as PurchaseApi,
  I as RequiredError,
  Ne as ResponseError,
  pt as SessionMonitor,
  Q as SigninResponse,
  re as SigninState,
  lt as SignoutResponse,
  D as State,
  qt as TextApiResponse,
  W as User,
  Tt as UserManager,
  wt as UserManagerSettingsStore,
  Ft as VariantCategoryDisplayType,
  zt as VariantDisplayType,
  $t as Version,
  q as VoidApiResponse,
  ve as WebStorageStateStore,
  Ot as canConsumeForm,
  Gt as initializeMulticartApiClient,
  te as mergeScopes,
  _e as querystring
};
//# sourceMappingURL=multicartshop-client.mjs.map
