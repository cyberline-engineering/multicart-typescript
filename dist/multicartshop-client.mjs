var Ae = Object.defineProperty;
var xe = (e, t, r) => t in e ? Ae(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var W = (e, t, r) => (xe(e, typeof t != "symbol" ? t + "" : t, r), r);
const Ue = "https://stage.redoc.cledeploy.com".replace(
  /\/+$/,
  ""
);
class de {
  constructor(t = {}) {
    this.configuration = t;
  }
  set config(t) {
    this.configuration = t;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : Ue;
  }
  get fetchApi() {
    return this.configuration.fetchApi;
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || le;
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
const he = new de();
class Y {
  constructor(t = he) {
    W(this, "middleware");
    W(this, "fetchApi", async (t, r) => {
      let s = { url: t, init: r };
      for (const n of this.middleware)
        n.pre && (s = await n.pre({
          fetch: this.fetchApi,
          ...s
        }) || s);
      let i;
      try {
        i = await (this.configuration.fetchApi || fetch)(
          s.url,
          s.init
        );
      } catch (n) {
        for (const o of this.middleware)
          o.onError && (i = await o.onError({
            fetch: this.fetchApi,
            url: s.url,
            init: s.init,
            error: n,
            response: i ? i.clone() : void 0
          }) || i);
        if (i === void 0)
          throw n instanceof Error ? new Me(
            n,
            "The request failed and the interceptors did not return an alternative response"
          ) : n;
      }
      for (const n of this.middleware)
        n.post && (i = await n.post({
          fetch: this.fetchApi,
          url: s.url,
          init: s.init,
          response: i.clone()
        }) || i);
      return i;
    });
    this.configuration = t, this.middleware = t.middleware;
  }
  withMiddleware(...t) {
    const r = this.clone();
    return r.middleware = r.middleware.concat(...t), r;
  }
  withPreMiddleware(...t) {
    const r = t.map((s) => ({ pre: s }));
    return this.withMiddleware(...r);
  }
  withPostMiddleware(...t) {
    const r = t.map((s) => ({ post: s }));
    return this.withMiddleware(...r);
  }
  async request(t, r) {
    const { url: s, init: i } = await this.createFetchParams(
      t,
      r
    ), n = await this.fetchApi(s, i);
    if (n.status >= 200 && n.status < 300)
      return n;
    throw new qe(n, "Response returned an error code");
  }
  async createFetchParams(t, r) {
    let s = this.configuration.basePath + t.path;
    t.query !== void 0 && Object.keys(t.query).length !== 0 && (s += "?" + this.configuration.queryParamsStringify(t.query));
    const i = Object.assign(
      {},
      this.configuration.headers,
      t.headers
    );
    Object.keys(i).forEach(
      (l) => i[l] === void 0 ? delete i[l] : {}
    );
    const n = typeof r == "function" ? r : async () => r, o = {
      method: t.method,
      headers: i,
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
      body: Oe(c.body) || c.body instanceof URLSearchParams || Be(c.body) ? c.body : JSON.stringify(c.body)
    };
    return { url: s, init: d };
  }
  clone() {
    const t = this.constructor, r = new t(this.configuration);
    return r.middleware = this.middleware.slice(), r;
  }
}
function Be(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function Oe(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
class qe extends Error {
  constructor(r, s) {
    super(s);
    W(this, "name", "ResponseError");
    this.response = r;
  }
}
class Me extends Error {
  constructor(r, s) {
    super(s);
    W(this, "name", "FetchError");
    this.cause = r;
  }
}
class E extends Error {
  constructor(r, s) {
    super(s);
    W(this, "name", "RequiredError");
    this.field = r;
  }
}
const Ct = {
  csv: ",",
  ssv: " ",
  tsv: "	",
  pipes: "|"
};
function le(e, t = "") {
  return Object.keys(e).map((r) => ue(r, e[r], t)).filter((r) => r.length > 0).join("&");
}
function ue(e, t, r = "") {
  const s = r + (r.length ? `[${e}]` : e);
  if (t instanceof Array) {
    const i = t.map((n) => encodeURIComponent(String(n))).join(`&${encodeURIComponent(s)}=`);
    return `${encodeURIComponent(s)}=${i}`;
  }
  if (t instanceof Set) {
    const i = Array.from(t);
    return ue(e, i, r);
  }
  return t instanceof Date ? `${encodeURIComponent(s)}=${encodeURIComponent(
    t.toISOString()
  )}` : t instanceof Object ? le(t, s) : `${encodeURIComponent(s)}=${encodeURIComponent(
    String(t)
  )}`;
}
function At(e) {
  for (const t of e)
    if (t.contentType === "multipart/form-data")
      return !0;
  return !1;
}
class N {
  constructor(t, r = (s) => s) {
    this.raw = t, this.transformer = r;
  }
  async value() {
    return this.transformer(await this.raw.json());
  }
}
class H {
  constructor(t) {
    this.raw = t;
  }
  async value() {
  }
}
class xt {
  constructor(t) {
    this.raw = t;
  }
  async value() {
    return await this.raw.blob();
  }
}
class Ut {
  constructor(t) {
    this.raw = t;
  }
  async value() {
    return await this.raw.text();
  }
}
class Bt extends Y {
  async cartItemDelete2Raw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemDelete2."
      );
    const s = {}, i = {};
    this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "DELETE",
        headers: i,
        query: s
      },
      r
    );
    return new H(n);
  }
  async cartItemDelete2(t, r) {
    await this.cartItemDelete2Raw(t, r);
  }
  async cartItemGet2Raw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemGet2."
      );
    const s = {}, i = {};
    this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "GET",
        headers: i,
        query: s
      },
      r
    );
    return new N(n);
  }
  async cartItemGet2(t, r) {
    return await (await this.cartItemGet2Raw(
      t,
      r
    )).value();
  }
  async cartItemList2Raw(t, r) {
    const s = {};
    t.userId !== void 0 && (s.UserId = t.userId), t.platform !== void 0 && (s.Platform = t.platform), t.seller !== void 0 && (s.Seller = t.seller), t.usItemId !== void 0 && (s.UsItemId = t.usItemId), t.pageSize !== void 0 && (s.PageSize = t.pageSize), t.dir !== void 0 && (s.Dir = t.dir), t.pageToken !== void 0 && (s.PageToken = t.pageToken), t.includedProperties && (s.IncludedProperties = t.includedProperties);
    const i = {};
    this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem",
        method: "GET",
        headers: i,
        query: s
      },
      r
    );
    return new N(n);
  }
  async cartItemList2(t = {}, r) {
    return await (await this.cartItemList2Raw(
      t,
      r
    )).value();
  }
  async cartItemPatch2Raw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemPatch2."
      );
    if (t.cartItemPatch === null || t.cartItemPatch === void 0)
      throw new E(
        "cartItemPatch",
        "Required parameter requestParameters.cartItemPatch was null or undefined when calling cartItemPatch2."
      );
    const s = {}, i = {};
    i["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PATCH",
        headers: i,
        query: s,
        body: t.cartItemPatch
      },
      r
    );
    return new H(n);
  }
  async cartItemPatch2(t, r) {
    await this.cartItemPatch2Raw(t, r);
  }
  async cartItemPost2Raw(t, r) {
    if (t.cartItemBodyAdmin === null || t.cartItemBodyAdmin === void 0)
      throw new E(
        "cartItemBodyAdmin",
        "Required parameter requestParameters.cartItemBodyAdmin was null or undefined when calling cartItemPost2."
      );
    const s = {}, i = {};
    i["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem",
        method: "POST",
        headers: i,
        query: s,
        body: t.cartItemBodyAdmin
      },
      r
    );
    return new N(n);
  }
  async cartItemPost2(t, r) {
    return await (await this.cartItemPost2Raw(
      t,
      r
    )).value();
  }
  async cartItemPut2Raw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemPut2."
      );
    if (t.cartItemBody === null || t.cartItemBody === void 0)
      throw new E(
        "cartItemBody",
        "Required parameter requestParameters.cartItemBody was null or undefined when calling cartItemPut2."
      );
    const s = {}, i = {};
    i["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/admin/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PUT",
        headers: i,
        query: s,
        body: t.cartItemBody
      },
      r
    );
    return new H(n);
  }
  async cartItemPut2(t, r) {
    await this.cartItemPut2Raw(t, r);
  }
}
class Ot extends Y {
  async cartItemDeleteRaw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemDelete."
      );
    const s = {}, i = {};
    this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "DELETE",
        headers: i,
        query: s
      },
      r
    );
    return new H(n);
  }
  async cartItemDelete(t, r) {
    await this.cartItemDeleteRaw(t, r);
  }
  async cartItemGetRaw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemGet."
      );
    const s = {}, i = {};
    this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "GET",
        headers: i,
        query: s
      },
      r
    );
    return new N(n);
  }
  async cartItemGet(t, r) {
    return await (await this.cartItemGetRaw(
      t,
      r
    )).value();
  }
  async cartItemListRaw(t, r) {
    const s = {};
    t.platform !== void 0 && (s.Platform = t.platform), t.seller !== void 0 && (s.Seller = t.seller), t.usItemId !== void 0 && (s.UsItemId = t.usItemId), t.pageSize !== void 0 && (s.PageSize = t.pageSize), t.dir !== void 0 && (s.Dir = t.dir), t.pageToken !== void 0 && (s.PageToken = t.pageToken), t.includedProperties && (s.IncludedProperties = t.includedProperties);
    const i = {};
    this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem",
        method: "GET",
        headers: i,
        query: s
      },
      r
    );
    return new N(n);
  }
  async cartItemList(t = {}, r) {
    return await (await this.cartItemListRaw(
      t,
      r
    )).value();
  }
  async cartItemPatchRaw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemPatch."
      );
    if (t.cartItemPatch === null || t.cartItemPatch === void 0)
      throw new E(
        "cartItemPatch",
        "Required parameter requestParameters.cartItemPatch was null or undefined when calling cartItemPatch."
      );
    const s = {}, i = {};
    i["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PATCH",
        headers: i,
        query: s,
        body: t.cartItemPatch
      },
      r
    );
    return new H(n);
  }
  async cartItemPatch(t, r) {
    await this.cartItemPatchRaw(t, r);
  }
  async cartItemPostRaw(t, r) {
    if (t.cartItemBody === null || t.cartItemBody === void 0)
      throw new E(
        "cartItemBody",
        "Required parameter requestParameters.cartItemBody was null or undefined when calling cartItemPost."
      );
    const s = {}, i = {};
    i["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem",
        method: "POST",
        headers: i,
        query: s,
        body: t.cartItemBody
      },
      r
    );
    return new N(n);
  }
  async cartItemPost(t, r) {
    return await (await this.cartItemPostRaw(
      t,
      r
    )).value();
  }
  async cartItemPutRaw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling cartItemPut."
      );
    if (t.cartItemBody === null || t.cartItemBody === void 0)
      throw new E(
        "cartItemBody",
        "Required parameter requestParameters.cartItemBody was null or undefined when calling cartItemPut."
      );
    const s = {}, i = {};
    i["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/CartItem/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "PUT",
        headers: i,
        query: s,
        body: t.cartItemBody
      },
      r
    );
    return new H(n);
  }
  async cartItemPut(t, r) {
    await this.cartItemPutRaw(t, r);
  }
}
class qt extends Y {
  async offerGetRaw(t, r) {
    if (t.id === null || t.id === void 0)
      throw new E(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling offerGet."
      );
    const s = {}, i = {};
    this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer/{id}".replace(
          "{id}",
          encodeURIComponent(String(t.id))
        ),
        method: "GET",
        headers: i,
        query: s
      },
      r
    );
    return new N(n);
  }
  async offerGet(t, r) {
    return await (await this.offerGetRaw(
      t,
      r
    )).value();
  }
  async offerPostRaw(t, r) {
    if (t.offerPost === null || t.offerPost === void 0)
      throw new E(
        "offerPost",
        "Required parameter requestParameters.offerPost was null or undefined when calling offerPost."
      );
    const s = {}, i = {};
    i["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken && (i.Authorization = await this.configuration.accessToken("bearer", []));
    const n = await this.request(
      {
        path: "/api/Offer",
        method: "POST",
        headers: i,
        query: s,
        body: t.offerPost
      },
      r
    );
    return new H(n);
  }
  async offerPost(t, r) {
    await this.offerPostRaw(t, r);
  }
}
const Mt = {
  Desc: "Desc",
  Asc: "Asc"
}, Nt = {
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
  ShopifyApp: "ShopifyApp",
  WooCommerceApp: "WooCommerceApp",
  BigCommerceApp: "BigCommerceApp",
  MagentoApp: "MagentoApp",
  SquareSpaceApp: "SquareSpaceApp",
  WixApp: "WixApp",
  PrestaShopApp: "PrestaShopApp",
  ShopwareApp: "ShopwareApp"
}, Ht = {
  Default: "Default",
  Dropdown: "Dropdown",
  Radio: "Radio",
  CustomInput: "CustomInput"
}, jt = {
  Default: "Default",
  Name: "Name",
  Swatch: "Swatch",
  Color: "Color"
};
var M = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ne(e) {
  var t = e.default;
  if (typeof t == "function") {
    var r = function() {
      return t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(s) {
    var i = Object.getOwnPropertyDescriptor(e, s);
    Object.defineProperty(r, s, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[s];
      }
    });
  }), r;
}
function He(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var F = { exports: {} };
const je = {}, We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: je
}, Symbol.toStringTag, { value: "Module" })), Le = /* @__PURE__ */ Ne(We);
(function(e, t) {
  (function(r, s) {
    e.exports = s();
  })(M, function() {
    var r = r || function(s, i) {
      var n;
      if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof M < "u" && M.crypto && (n = M.crypto), !n && typeof He == "function")
        try {
          n = Le;
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
          a = this.words = a || [], h != i ? this.sigBytes = h : this.sigBytes = a.length * 4;
        },
        toString: function(a) {
          return (a || w).stringify(this);
        },
        concat: function(a) {
          var h = this.words, _ = a.words, m = this.sigBytes, v = a.sigBytes;
          if (this.clamp(), m % 4)
            for (var k = 0; k < v; k++) {
              var R = _[k >>> 2] >>> 24 - k % 4 * 8 & 255;
              h[m + k >>> 2] |= R << 24 - (m + k) % 4 * 8;
            }
          else
            for (var T = 0; T < v; T += 4)
              h[m + T >>> 2] = _[T >>> 2];
          return this.sigBytes += v, this;
        },
        clamp: function() {
          var a = this.words, h = this.sigBytes;
          a[h >>> 2] &= 4294967295 << 32 - h % 4 * 8, a.length = s.ceil(h / 4);
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
          var h, _ = this._data, m = _.words, v = _.sigBytes, k = this.blockSize, R = k * 4, T = v / R;
          a ? T = s.ceil(T) : T = s.max((T | 0) - this._minBufferSize, 0);
          var B = T * k, C = s.min(B * 4, v);
          if (B) {
            for (var q = 0; q < B; q += k)
              this._doProcessBlock(m, q);
            h = m.splice(0, B), _.sigBytes -= C;
          }
          return new g.init(h, C);
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
    return r;
  });
})(F);
const De = F.exports;
var ge = { exports: {} };
(function(e, t) {
  (function(r, s) {
    e.exports = s(F.exports);
  })(M, function(r) {
    return function(s) {
      var i = r, n = i.lib, o = n.WordArray, c = n.Hasher, d = i.algo, l = [], p = [];
      (function() {
        function w(I) {
          for (var a = s.sqrt(I), h = 2; h <= a; h++)
            if (!(I % h))
              return !1;
          return !0;
        }
        function b(I) {
          return (I - (I | 0)) * 4294967296 | 0;
        }
        for (var u = 2, y = 0; y < 64; )
          w(u) && (y < 8 && (l[y] = b(s.pow(u, 1 / 2))), p[y] = b(s.pow(u, 1 / 3)), y++), u++;
      })();
      var g = [], S = d.SHA256 = c.extend({
        _doReset: function() {
          this._hash = new o.init(l.slice(0));
        },
        _doProcessBlock: function(w, b) {
          for (var u = this._hash.words, y = u[0], I = u[1], a = u[2], h = u[3], _ = u[4], m = u[5], v = u[6], k = u[7], R = 0; R < 64; R++) {
            if (R < 16)
              g[R] = w[b + R] | 0;
            else {
              var T = g[R - 15], B = (T << 25 | T >>> 7) ^ (T << 14 | T >>> 18) ^ T >>> 3, C = g[R - 2], q = (C << 15 | C >>> 17) ^ (C << 13 | C >>> 19) ^ C >>> 10;
              g[R] = B + g[R - 7] + q + g[R - 16];
            }
            var G = _ & m ^ ~_ & v, Re = y & I ^ y & a ^ I & a, Ee = (y << 30 | y >>> 2) ^ (y << 19 | y >>> 13) ^ (y << 10 | y >>> 22), Pe = (_ << 26 | _ >>> 6) ^ (_ << 21 | _ >>> 11) ^ (_ << 7 | _ >>> 25), te = k + Pe + G + p[R] + g[R], Ce = Ee + Re;
            k = v, v = m, m = _, _ = h + te | 0, h = a, a = I, I = y, y = te + Ce | 0;
          }
          u[0] = u[0] + y | 0, u[1] = u[1] + I | 0, u[2] = u[2] + a | 0, u[3] = u[3] + h | 0, u[4] = u[4] + _ | 0, u[5] = u[5] + m | 0, u[6] = u[6] + v | 0, u[7] = u[7] + k | 0;
        },
        _doFinalize: function() {
          var w = this._data, b = w.words, u = this._nDataBytes * 8, y = w.sigBytes * 8;
          return b[y >>> 5] |= 128 << 24 - y % 32, b[(y + 64 >>> 9 << 4) + 14] = s.floor(u / 4294967296), b[(y + 64 >>> 9 << 4) + 15] = u, w.sigBytes = b.length * 4, this._process(), this._hash;
        },
        clone: function() {
          var w = c.clone.call(this);
          return w._hash = this._hash.clone(), w;
        }
      });
      i.SHA256 = c._createHelper(S), i.HmacSHA256 = c._createHmacHelper(S);
    }(Math), r.SHA256;
  });
})(ge);
const Fe = ge.exports;
var pe = { exports: {} };
(function(e, t) {
  (function(r, s) {
    e.exports = s(F.exports);
  })(M, function(r) {
    return function() {
      var s = r, i = s.lib, n = i.WordArray, o = s.enc;
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
    }(), r.enc.Base64;
  });
})(pe);
const re = pe.exports;
var _e = { exports: {} };
(function(e, t) {
  (function(r, s) {
    e.exports = s(F.exports);
  })(M, function(r) {
    return r.enc.Utf8;
  });
})(_e);
const ze = _e.exports;
function J(e) {
  this.message = e;
}
J.prototype = new Error(), J.prototype.name = "InvalidCharacterError";
var se = typeof window < "u" && window.atob && window.atob.bind(window) || function(e) {
  var t = String(e).replace(/=+$/, "");
  if (t.length % 4 == 1)
    throw new J("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var r, s, i = 0, n = 0, o = ""; s = t.charAt(n++); ~s && (r = i % 4 ? 64 * r + s : s, i++ % 4) ? o += String.fromCharCode(255 & r >> (-2 * i & 6)) : 0)
    s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(s);
  return o;
};
function $e(e) {
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
    return function(r) {
      return decodeURIComponent(se(r).replace(/(.)/g, function(s, i) {
        var n = i.charCodeAt(0).toString(16).toUpperCase();
        return n.length < 2 && (n = "0" + n), "%" + n;
      }));
    }(t);
  } catch {
    return se(t);
  }
}
function z(e) {
  this.message = e;
}
function Ge(e, t) {
  if (typeof e != "string")
    throw new z("Invalid token specified");
  var r = (t = t || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse($e(e.split(".")[r]));
  } catch (s) {
    throw new z("Invalid token specified: " + s.message);
  }
}
z.prototype = new Error(), z.prototype.name = "InvalidTokenError";
var Je = {
  debug: () => {
  },
  info: () => {
  },
  warn: () => {
  },
  error: () => {
  }
}, A, x, $ = /* @__PURE__ */ ((e) => (e[e.NONE = 0] = "NONE", e[e.ERROR = 1] = "ERROR", e[e.WARN = 2] = "WARN", e[e.INFO = 3] = "INFO", e[e.DEBUG = 4] = "DEBUG", e))($ || {});
((e) => {
  function t() {
    A = 3, x = Je;
  }
  e.reset = t;
  function r(i) {
    if (!(0 <= i && i <= 4))
      throw new Error("Invalid log level");
    A = i;
  }
  e.setLevel = r;
  function s(i) {
    x = i;
  }
  e.setLogger = s;
})($ || ($ = {}));
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
    const r = new f(`${e}.${t}`);
    return r.debug("begin"), r;
  }
  static _format(e, t) {
    const r = `[${e}]`;
    return t ? `${r} ${t}:` : r;
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
$.reset();
var Ke = "10000000-1000-4000-8000-100000000000", U = class {
  static _randomWord() {
    return De.lib.WordArray.random(1).words[0];
  }
  static generateUUIDv4() {
    return Ke.replace(
      /[018]/g,
      (e) => (+e ^ U._randomWord() & 15 >> +e / 4).toString(16)
    ).replace(/-/g, "");
  }
  static generateCodeVerifier() {
    return U.generateUUIDv4() + U.generateUUIDv4() + U.generateUUIDv4();
  }
  static generateCodeChallenge(e) {
    try {
      const t = Fe(e);
      return re.stringify(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch (t) {
      throw f.error("CryptoUtils.generateCodeChallenge", t), t;
    }
  }
  static generateBasicAuth(e, t) {
    const r = ze.parse([e, t].join(":"));
    return re.stringify(r);
  }
}, O = class {
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
}, K = class {
  static decode(e) {
    try {
      return Ge(e);
    } catch (t) {
      throw f.error("JwtUtils.decode", t), t;
    }
  }
}, ie = class {
  static center({ ...e }) {
    var t;
    return e.width == null && (e.width = (t = [800, 720, 600, 480].find((r) => r <= window.outerWidth / 1.618)) != null ? t : 360), e.left != null || (e.left = Math.max(0, Math.round(window.screenX + (window.outerWidth - e.width) / 2))), e.height != null && (e.top != null || (e.top = Math.max(0, Math.round(window.screenY + (window.outerHeight - e.height) / 2)))), e;
  }
  static serialize(e) {
    return Object.entries(e).filter(([, t]) => t != null).map(([t, r]) => `${t}=${typeof r != "boolean" ? r : r ? "yes" : "no"}`).join(",");
  }
}, P = class extends O {
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
    const r = P.getEpochTime() + e;
    if (this.expiration === r && this._timerHandle) {
      t.debug("skipping since already initialized for expiration at", this.expiration);
      return;
    }
    this.cancel(), t.debug("using duration", e), this._expiration = r;
    const s = Math.min(e, 5);
    this._timerHandle = setInterval(this._callback, s * 1e3);
  }
  get expiration() {
    return this._expiration;
  }
  cancel() {
    this._logger.create("cancel"), this._timerHandle && (clearInterval(this._timerHandle), this._timerHandle = null);
  }
}, V = class {
  static readParams(e, t = "query") {
    if (!e)
      throw new TypeError("Invalid URL");
    const r = new URL(e, window.location.origin)[t === "fragment" ? "hash" : "search"];
    return new URLSearchParams(r.slice(1));
  }
}, j = class extends Error {
  constructor(e, t) {
    var r, s, i;
    if (super(e.error_description || e.error || ""), this.form = t, this.name = "ErrorResponse", !e.error)
      throw f.error("ErrorResponse", "No error passed"), new Error("No error passed");
    this.error = e.error, this.error_description = (r = e.error_description) != null ? r : null, this.error_uri = (s = e.error_uri) != null ? s : null, this.state = e.userState, this.session_state = (i = e.session_state) != null ? i : null;
  }
}, X = class extends Error {
  constructor(e) {
    super(e), this.name = "ErrorTimeout";
  }
}, Ve = class {
  constructor(e) {
    this._logger = new f("AccessTokenEvents"), this._expiringTimer = new P("Access token expiring"), this._expiredTimer = new P("Access token expired"), this._expiringNotificationTimeInSeconds = e.expiringNotificationTimeInSeconds;
  }
  load(e) {
    const t = this._logger.create("load");
    if (e.access_token && e.expires_in !== void 0) {
      const r = e.expires_in;
      if (t.debug("access token present, remaining duration:", r), r > 0) {
        let i = r - this._expiringNotificationTimeInSeconds;
        i <= 0 && (i = 1), t.debug("registering expiring timer, raising in", i, "seconds"), this._expiringTimer.init(i);
      } else
        t.debug("canceling existing expiring timer because we're past expiration."), this._expiringTimer.cancel();
      const s = r + 1;
      t.debug("registering expired timer, raising in", s, "seconds"), this._expiredTimer.init(s);
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
}, Qe = class {
  constructor(e, t, r, s, i) {
    this._callback = e, this._client_id = t, this._intervalInSeconds = s, this._stopOnError = i, this._logger = new f("CheckSessionIFrame"), this._timer = null, this._session_state = null, this._message = (o) => {
      o.origin === this._frame_origin && o.source === this._frame.contentWindow && (o.data === "error" ? (this._logger.error("error message from check session op iframe"), this._stopOnError && this.stop()) : o.data === "changed" ? (this._logger.debug("changed message from check session op iframe"), this.stop(), this._callback()) : this._logger.debug(o.data + " message from check session op iframe"));
    };
    const n = new URL(r);
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
}, fe = class {
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
}, Z = class {
  constructor(e = [], t = null) {
    this._jwtHandler = t, this._logger = new f("JsonService"), this._contentTypes = [], this._contentTypes.push(...e, "application/json"), t && this._contentTypes.push("application/jwt");
  }
  async fetchWithTimeout(e, t = {}) {
    const { timeoutInSeconds: r, ...s } = t;
    if (!r)
      return await fetch(e, s);
    const i = new AbortController(), n = setTimeout(() => i.abort(), r * 1e3);
    try {
      return await fetch(e, {
        ...t,
        signal: i.signal
      });
    } catch (o) {
      throw o instanceof DOMException && o.name === "AbortError" ? new X("Network timed out") : o;
    } finally {
      clearTimeout(n);
    }
  }
  async getJson(e, {
    token: t
  } = {}) {
    const r = this._logger.create("getJson"), s = {
      Accept: this._contentTypes.join(", ")
    };
    t && (r.debug("token passed, setting Authorization header"), s.Authorization = "Bearer " + t);
    let i;
    try {
      r.debug("url:", e), i = await this.fetchWithTimeout(e, { method: "GET", headers: s });
    } catch (c) {
      throw r.error("Network Error"), c;
    }
    r.debug("HTTP response received, status", i.status);
    const n = i.headers.get("Content-Type");
    if (n && !this._contentTypes.find((c) => n.startsWith(c)) && r.throw(new Error(`Invalid response Content-Type: ${n != null ? n : "undefined"}, from URL: ${e}`)), i.ok && this._jwtHandler && (n == null ? void 0 : n.startsWith("application/jwt")))
      return await this._jwtHandler(await i.text());
    let o;
    try {
      o = await i.json();
    } catch (c) {
      throw r.error("Error parsing JSON response", c), i.ok ? c : new Error(`${i.statusText} (${i.status})`);
    }
    if (!i.ok)
      throw r.error("Error from server:", o), o.error ? new j(o) : new Error(`${i.statusText} (${i.status}): ${JSON.stringify(o)}`);
    return o;
  }
  async postForm(e, {
    body: t,
    basicAuth: r,
    timeoutInSeconds: s,
    initCredentials: i
  }) {
    const n = this._logger.create("postForm"), o = {
      Accept: this._contentTypes.join(", "),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    r !== void 0 && (o.Authorization = "Basic " + r);
    let c;
    try {
      n.debug("url:", e), c = await this.fetchWithTimeout(e, { method: "POST", headers: o, body: t, timeoutInSeconds: s, credentials: i });
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
}, Ye = class {
  constructor(e) {
    this._settings = e, this._logger = new f("MetadataService"), this._jsonService = new Z(["application/jwk-set+json"]), this._signingKeys = null, this._metadata = null, this._metadataUrl = this._settings.metadataUrl, this._settings.signingKeys && (this._logger.debug("using signingKeys from settings"), this._signingKeys = this._settings.signingKeys), this._settings.metadata && (this._logger.debug("using metadata from settings"), this._metadata = this._settings.metadata);
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
    const t = await this._jsonService.getJson(this._metadataUrl);
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
    const r = this._logger.create(`_getMetadataProperty('${e}')`), s = await this.getMetadata();
    if (r.debug("resolved"), s[e] === void 0) {
      if (t === !0) {
        r.warn("Metadata does not contain optional property");
        return;
      }
      r.throw(new Error("Metadata does not contain property " + e));
    }
    return s[e];
  }
  async getSigningKeys() {
    const e = this._logger.create("getSigningKeys");
    if (this._signingKeys)
      return e.debug("returning signingKeys from cache"), this._signingKeys;
    const t = await this.getKeysEndpoint(!1);
    e.debug("got jwks_uri", t);
    const r = await this._jsonService.getJson(t);
    if (e.debug("got key set", r), !Array.isArray(r.keys))
      throw e.throw(new Error("Missing keys on keyset")), null;
    return this._signingKeys = r.keys, this._signingKeys;
  }
}, we = class {
  constructor({ prefix: e = "oidc.", store: t = localStorage } = {}) {
    this._logger = new f("WebStorageStateStore"), this._store = t, this._prefix = e;
  }
  set(e, t) {
    return this._logger.create(`set('${e}')`), e = this._prefix + e, this._store.setItem(e, t), Promise.resolve();
  }
  get(e) {
    this._logger.create(`get('${e}')`), e = this._prefix + e;
    const t = this._store.getItem(e);
    return Promise.resolve(t);
  }
  remove(e) {
    this._logger.create(`remove('${e}')`), e = this._prefix + e;
    const t = this._store.getItem(e);
    return this._store.removeItem(e), Promise.resolve(t);
  }
  getAllKeys() {
    this._logger.create("getAllKeys");
    const e = [];
    for (let t = 0; t < this._store.length; t++) {
      const r = this._store.key(t);
      r && r.indexOf(this._prefix) === 0 && e.push(r.substr(this._prefix.length));
    }
    return Promise.resolve(e);
  }
}, Xe = "code", Ze = "openid", et = "client_secret_post", tt = "query", rt = 60 * 15, st = 60 * 5, me = class {
  constructor({
    authority: e,
    metadataUrl: t,
    metadata: r,
    signingKeys: s,
    metadataSeed: i,
    client_id: n,
    client_secret: o,
    response_type: c = Xe,
    scope: d = Ze,
    redirect_uri: l,
    post_logout_redirect_uri: p,
    client_authentication: g = et,
    prompt: S,
    display: w,
    max_age: b,
    ui_locales: u,
    acr_values: y,
    resource: I,
    response_mode: a = tt,
    filterProtocolClaims: h = !0,
    loadUserInfo: _ = !1,
    staleStateAgeInSeconds: m = rt,
    clockSkewInSeconds: v = st,
    userInfoJwtIssuer: k = "OP",
    mergeClaims: R = !1,
    stateStore: T,
    refreshTokenCredentials: B = "same-origin",
    extraQueryParams: C = {},
    extraTokenParams: q = {}
  }) {
    if (this.authority = e, t ? this.metadataUrl = t : (this.metadataUrl = e, e && (this.metadataUrl.endsWith("/") || (this.metadataUrl += "/"), this.metadataUrl += ".well-known/openid-configuration")), this.metadata = r, this.metadataSeed = i, this.signingKeys = s, this.client_id = n, this.client_secret = o, this.response_type = c, this.scope = d, this.redirect_uri = l, this.post_logout_redirect_uri = p, this.client_authentication = g, this.prompt = S, this.display = w, this.max_age = b, this.ui_locales = u, this.acr_values = y, this.resource = I, this.response_mode = a, this.filterProtocolClaims = !!h, this.loadUserInfo = !!_, this.staleStateAgeInSeconds = m, this.clockSkewInSeconds = v, this.userInfoJwtIssuer = k, this.mergeClaims = !!R, this.refreshTokenCredentials = B, T)
      this.stateStore = T;
    else {
      const G = typeof window < "u" ? window.localStorage : new fe();
      this.stateStore = new we({ store: G });
    }
    this.extraQueryParams = C, this.extraTokenParams = q;
  }
}, it = class {
  constructor(e) {
    this._metadataService = e, this._logger = new f("UserInfoService"), this._getClaimsFromJwt = async (t) => {
      const r = this._logger.create("_getClaimsFromJwt");
      try {
        const s = K.decode(t);
        return r.debug("JWT decoding successful"), s;
      } catch (s) {
        throw r.error("Error parsing JWT response"), s;
      }
    }, this._jsonService = new Z(void 0, this._getClaimsFromJwt);
  }
  async getClaims(e) {
    const t = this._logger.create("getClaims");
    e || this._logger.throw(new Error("No token passed"));
    const r = await this._metadataService.getUserInfoEndpoint();
    t.debug("got userinfo url", r);
    const s = await this._jsonService.getJson(r, { token: e });
    return t.debug("got claims", s), s;
  }
}, ye = class {
  constructor(e, t) {
    this._settings = e, this._metadataService = t, this._logger = new f("TokenClient"), this._jsonService = new Z();
  }
  async exchangeCode({
    grant_type: e = "authorization_code",
    redirect_uri: t = this._settings.redirect_uri,
    client_id: r = this._settings.client_id,
    client_secret: s = this._settings.client_secret,
    ...i
  }) {
    const n = this._logger.create("exchangeCode");
    r || n.throw(new Error("A client_id is required")), t || n.throw(new Error("A redirect_uri is required")), i.code || n.throw(new Error("A code is required")), i.code_verifier || n.throw(new Error("A code_verifier is required"));
    const o = new URLSearchParams({ grant_type: e, redirect_uri: t });
    for (const [p, g] of Object.entries(i))
      g != null && o.set(p, g);
    let c;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!s)
          throw n.throw(new Error("A client_secret is required")), null;
        c = U.generateBasicAuth(r, s);
        break;
      case "client_secret_post":
        o.append("client_id", r), s && o.append("client_secret", s);
        break;
    }
    const d = await this._metadataService.getTokenEndpoint(!1);
    n.debug("got token endpoint");
    const l = await this._jsonService.postForm(d, { body: o, basicAuth: c });
    return n.debug("got response"), l;
  }
  async exchangeRefreshToken({
    grant_type: e = "refresh_token",
    client_id: t = this._settings.client_id,
    client_secret: r = this._settings.client_secret,
    timeoutInSeconds: s,
    refreshTokenCredentials: i,
    ...n
  }) {
    const o = this._logger.create("exchangeRefreshToken");
    t || o.throw(new Error("A client_id is required")), n.refresh_token || o.throw(new Error("A refresh_token is required"));
    const c = new URLSearchParams({ grant_type: e });
    for (const [g, S] of Object.entries(n))
      S != null && c.set(g, S);
    let d;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!r)
          throw o.throw(new Error("A client_secret is required")), null;
        d = U.generateBasicAuth(t, r);
        break;
      case "client_secret_post":
        c.append("client_id", t), r && c.append("client_secret", r);
        break;
    }
    const l = await this._metadataService.getTokenEndpoint(!1);
    o.debug("got token endpoint");
    const p = await this._jsonService.postForm(l, { body: c, basicAuth: d, timeoutInSeconds: s, initCredentials: i });
    return o.debug("got response"), p;
  }
  async revoke(e) {
    var t;
    const r = this._logger.create("revoke");
    e.token || r.throw(new Error("A token is required"));
    const s = await this._metadataService.getRevocationEndpoint(!1);
    r.debug(`got revocation endpoint, revoking ${(t = e.token_type_hint) != null ? t : "default token type"}`);
    const i = new URLSearchParams();
    for (const [n, o] of Object.entries(e))
      o != null && i.set(n, o);
    i.set("client_id", this._settings.client_id), this._settings.client_secret && i.set("client_secret", this._settings.client_secret), await this._jsonService.postForm(s, { body: i }), r.debug("got response");
  }
}, nt = [
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
], ot = class {
  constructor(e, t) {
    this._settings = e, this._metadataService = t, this._logger = new f("ResponseValidator"), this._userInfoService = new it(this._metadataService), this._tokenClient = new ye(this._settings, this._metadataService);
  }
  async validateSigninResponse(e, t) {
    const r = this._logger.create("validateSigninResponse");
    this._processSigninState(e, t), r.debug("state processed"), await this._processCode(e, t), r.debug("code processed"), e.isOpenId && this._validateIdTokenAttributes(e), r.debug("tokens validated"), await this._processClaims(e, t == null ? void 0 : t.skipUserInfo, e.isOpenId), r.debug("claims processed");
  }
  async validateRefreshResponse(e, t) {
    const r = this._logger.create("validateRefreshResponse");
    e.userState = t.data, e.session_state != null || (e.session_state = t.session_state), e.scope != null || (e.scope = t.scope);
    const s = e.isOpenId && !!e.id_token;
    s && (this._validateIdTokenAttributes(e, t.id_token), r.debug("ID Token validated")), await this._processClaims(e, !1, s), r.debug("claims processed");
  }
  validateSignoutResponse(e, t) {
    const r = this._logger.create("validateSignoutResponse");
    if (t.id !== e.state && r.throw(new Error("State does not match")), r.debug("state validated"), e.userState = t.data, e.error)
      throw r.warn("Response was error", e.error), new j(e);
  }
  _processSigninState(e, t) {
    const r = this._logger.create("_processSigninState");
    if (t.id !== e.state && r.throw(new Error("State does not match")), t.client_id || r.throw(new Error("No client_id on state")), t.authority || r.throw(new Error("No authority on state")), this._settings.authority !== t.authority && r.throw(new Error("authority mismatch on settings vs. signin state")), this._settings.client_id && this._settings.client_id !== t.client_id && r.throw(new Error("client_id mismatch on settings vs. signin state")), r.debug("state validated"), e.userState = t.data, e.scope != null || (e.scope = t.scope), e.error)
      throw r.warn("Response was error", e.error), new j(e);
    t.code_verifier && !e.code && r.throw(new Error("Expected code in response")), !t.code_verifier && e.code && r.throw(new Error("Unexpected code in response"));
  }
  async _processClaims(e, t = !1, r = !0) {
    const s = this._logger.create("_processClaims");
    if (e.profile = this._filterProtocolClaims(e.profile), t || !this._settings.loadUserInfo || !e.access_token) {
      s.debug("not loading user info");
      return;
    }
    s.debug("loading user info");
    const i = await this._userInfoService.getClaims(e.access_token);
    s.debug("user info claims received from user info endpoint"), r && i.sub !== e.profile.sub && s.throw(new Error("subject from UserInfo response does not match subject in ID Token")), e.profile = this._mergeClaims(e.profile, this._filterProtocolClaims(i)), s.debug("user info claims received, updated profile:", e.profile);
  }
  _mergeClaims(e, t) {
    const r = { ...e };
    for (const [s, i] of Object.entries(t))
      for (const n of Array.isArray(i) ? i : [i]) {
        const o = r[s];
        o ? Array.isArray(o) ? o.includes(n) || o.push(n) : r[s] !== n && (typeof n == "object" && this._settings.mergeClaims ? r[s] = this._mergeClaims(o, n) : r[s] = [o, n]) : r[s] = n;
      }
    return r;
  }
  _filterProtocolClaims(e) {
    const t = { ...e };
    if (this._settings.filterProtocolClaims)
      for (const r of nt)
        delete t[r];
    return t;
  }
  async _processCode(e, t) {
    const r = this._logger.create("_processCode");
    if (e.code) {
      r.debug("Validating code");
      const s = await this._tokenClient.exchangeCode({
        client_id: t.client_id,
        client_secret: t.client_secret,
        code: e.code,
        redirect_uri: t.redirect_uri,
        code_verifier: t.code_verifier,
        ...t.extraTokenParams
      });
      Object.assign(e, s);
    } else
      r.debug("No code to process");
  }
  _validateIdTokenAttributes(e, t) {
    var r;
    const s = this._logger.create("_validateIdTokenAttributes");
    s.debug("decoding ID Token JWT");
    const i = K.decode((r = e.id_token) != null ? r : "");
    if (i.sub || s.throw(new Error("ID Token is missing a subject claim")), t) {
      const n = K.decode(t);
      n.sub !== i.sub && s.throw(new Error("sub in id_token does not match current sub")), n.auth_time && n.auth_time !== i.auth_time && s.throw(new Error("auth_time in id_token does not match original auth_time")), n.azp && n.azp !== i.azp && s.throw(new Error("azp in id_token does not match original azp")), !n.azp && i.azp && s.throw(new Error("azp not in id_token, but present in original id_token"));
    }
    e.profile = i;
  }
}, L = class {
  constructor(e) {
    this.id = e.id || U.generateUUIDv4(), this.data = e.data, e.created && e.created > 0 ? this.created = e.created : this.created = P.getEpochTime(), this.request_type = e.request_type;
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
    return f.createStatic("State", "fromStorageString"), new L(JSON.parse(e));
  }
  static async clearStaleState(e, t) {
    const r = f.createStatic("State", "clearStaleState"), s = P.getEpochTime() - t, i = await e.getAllKeys();
    r.debug("got keys", i);
    for (let n = 0; n < i.length; n++) {
      const o = i[n], c = await e.get(o);
      let d = !1;
      if (c)
        try {
          const l = L.fromStorageString(c);
          r.debug("got item from key:", o, l.created), l.created <= s && (d = !0);
        } catch (l) {
          r.error("Error parsing state for key:", o, l), d = !0;
        }
      else
        r.debug("no item in storage for key:", o), d = !0;
      d && (r.debug("removed item for key:", o), e.remove(o));
    }
  }
}, ee = class extends L {
  constructor(e) {
    super(e), e.code_verifier === !0 ? this.code_verifier = U.generateCodeVerifier() : e.code_verifier && (this.code_verifier = e.code_verifier), this.code_verifier && (this.code_challenge = U.generateCodeChallenge(this.code_verifier)), this.authority = e.authority, this.client_id = e.client_id, this.redirect_uri = e.redirect_uri, this.scope = e.scope, this.client_secret = e.client_secret, this.extraTokenParams = e.extraTokenParams, this.response_mode = e.response_mode, this.skipUserInfo = e.skipUserInfo;
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
    return new ee(t);
  }
}, at = class {
  constructor({
    url: e,
    authority: t,
    client_id: r,
    redirect_uri: s,
    response_type: i,
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
    if (!r)
      throw this._logger.error("ctor: No client_id passed"), new Error("client_id");
    if (!s)
      throw this._logger.error("ctor: No redirect_uri passed"), new Error("redirect_uri");
    if (!i)
      throw this._logger.error("ctor: No response_type passed"), new Error("response_type");
    if (!n)
      throw this._logger.error("ctor: No scope passed"), new Error("scope");
    if (!t)
      throw this._logger.error("ctor: No authority passed"), new Error("authority");
    this.state = new ee({
      data: o,
      request_type: d,
      code_verifier: !0,
      client_id: r,
      authority: t,
      redirect_uri: s,
      response_mode: c,
      client_secret: l,
      scope: n,
      extraTokenParams: w,
      skipUserInfo: g
    });
    const u = new URL(e);
    u.searchParams.append("client_id", r), u.searchParams.append("redirect_uri", s), u.searchParams.append("response_type", i), u.searchParams.append("scope", n), p && u.searchParams.append("nonce", p), u.searchParams.append("state", this.state.id), this.state.code_challenge && (u.searchParams.append("code_challenge", this.state.code_challenge), u.searchParams.append("code_challenge_method", "S256"));
    for (const [y, I] of Object.entries({ response_mode: c, ...b, ...S }))
      I != null && u.searchParams.append(y, I.toString());
    this.url = u.href;
  }
}, ct = "openid", ne = class {
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
    return ((e = this.scope) == null ? void 0 : e.split(" ").includes(ct)) || !!this.id_token;
  }
}, dt = class {
  constructor({
    url: e,
    state_data: t,
    id_token_hint: r,
    post_logout_redirect_uri: s,
    extraQueryParams: i,
    request_type: n
  }) {
    if (this._logger = new f("SignoutRequest"), !e)
      throw this._logger.error("ctor: No url passed"), new Error("url");
    const o = new URL(e);
    r && o.searchParams.append("id_token_hint", r), s && (o.searchParams.append("post_logout_redirect_uri", s), t && (this.state = new L({ data: t, request_type: n }), o.searchParams.append("state", this.state.id)));
    for (const [c, d] of Object.entries({ ...i }))
      d != null && o.searchParams.append(c, d.toString());
    this.url = o.href;
  }
}, ht = class {
  constructor(e) {
    this.state = e.get("state"), this.error = e.get("error"), this.error_description = e.get("error_description"), this.error_uri = e.get("error_uri");
  }
}, lt = class {
  constructor(e) {
    this._logger = new f("OidcClient"), this.settings = new me(e), this.metadataService = new Ye(this.settings), this._validator = new ot(this.settings, this.metadataService), this._tokenClient = new ye(this.settings, this.metadataService);
  }
  async createSigninRequest({
    state: e,
    request: t,
    request_uri: r,
    request_type: s,
    id_token_hint: i,
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
    const v = new at({
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
      id_token_hint: i,
      login_hint: n,
      acr_values: u,
      resource: y,
      request: t,
      request_uri: r,
      extraQueryParams: a,
      extraTokenParams: h,
      request_type: s,
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
    const r = this._logger.create("readSigninResponseState"), s = new ne(V.readParams(e, this.settings.response_mode));
    if (!s.state)
      throw r.throw(new Error("No state in response")), null;
    const i = await this.settings.stateStore[t ? "remove" : "get"](s.state);
    if (!i)
      throw r.throw(new Error("No matching state found in storage")), null;
    return { state: ee.fromStorageString(i), response: s };
  }
  async processSigninResponse(e) {
    const t = this._logger.create("processSigninResponse"), { state: r, response: s } = await this.readSigninResponseState(e, !0);
    return t.debug("received state from storage; validating response"), await this._validator.validateSigninResponse(s, r), s;
  }
  async useRefreshToken({
    state: e,
    timeoutInSeconds: t
  }) {
    const r = this._logger.create("useRefreshToken"), s = await this._tokenClient.exchangeRefreshToken({
      refresh_token: e.refresh_token,
      scope: e.scope,
      timeoutInSeconds: t,
      refreshTokenCredentials: this.settings.refreshTokenCredentials
    }), i = new ne(new URLSearchParams());
    return Object.assign(i, s), r.debug("validating response", i), await this._validator.validateRefreshResponse(i, e), i;
  }
  async createSignoutRequest({
    state: e,
    id_token_hint: t,
    request_type: r,
    post_logout_redirect_uri: s = this.settings.post_logout_redirect_uri,
    extraQueryParams: i = this.settings.extraQueryParams
  } = {}) {
    const n = this._logger.create("createSignoutRequest"), o = await this.metadataService.getEndSessionEndpoint();
    if (!o)
      throw n.throw(new Error("No end session endpoint")), null;
    n.debug("Received end session endpoint", o);
    const c = new dt({
      url: o,
      id_token_hint: t,
      post_logout_redirect_uri: s,
      state_data: e,
      extraQueryParams: i,
      request_type: r
    });
    await this.clearStaleState();
    const d = c.state;
    return d && (n.debug("Signout request has state to persist"), await this.settings.stateStore.set(d.id, d.toStorageString())), c;
  }
  async readSignoutResponseState(e, t = !1) {
    const r = this._logger.create("readSignoutResponseState"), s = new ht(V.readParams(e, this.settings.response_mode));
    if (!s.state) {
      if (r.debug("No state in response"), s.error)
        throw r.warn("Response was error:", s.error), new j(s);
      return { state: void 0, response: s };
    }
    const i = await this.settings.stateStore[t ? "remove" : "get"](s.state);
    if (!i)
      throw r.throw(new Error("No matching state found in storage")), null;
    return { state: L.fromStorageString(i), response: s };
  }
  async processSignoutResponse(e) {
    const t = this._logger.create("processSignoutResponse"), { state: r, response: s } = await this.readSignoutResponseState(e, !0);
    return r ? (t.debug("Received state from storage; validating response"), this._validator.validateSignoutResponse(s, r)) : t.debug("No state from storage; skipping response validation"), s;
  }
  clearStaleState() {
    return this._logger.create("clearStaleState"), L.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
  }
  async revokeToken(e, t) {
    return this._logger.create("revokeToken"), await this._tokenClient.revoke({
      token: e,
      token_type_hint: t
    });
  }
}, ut = class {
  constructor(e) {
    this._userManager = e, this._logger = new f("SessionMonitor"), this._start = async (t) => {
      const r = t.session_state;
      if (!r)
        return;
      const s = this._logger.create("_start");
      if (t.profile ? (this._sub = t.profile.sub, this._sid = t.profile.sid, s.debug("session_state", r, ", sub", this._sub)) : (this._sub = void 0, this._sid = void 0, s.debug("session_state", r, ", anonymous user")), this._checkSessionIFrame) {
        this._checkSessionIFrame.start(r);
        return;
      }
      try {
        const i = await this._userManager.metadataService.getCheckSessionIframe();
        if (i) {
          s.debug("initializing check session iframe");
          const n = this._userManager.settings.client_id, o = this._userManager.settings.checkSessionIntervalInSeconds, c = this._userManager.settings.stopCheckSessionOnError, d = new Qe(this._callback, n, i, o, c);
          await d.load(), this._checkSessionIFrame = d, d.start(r);
        } else
          s.warn("no check session iframe found in the metadata");
      } catch (i) {
        s.error("Error from getCheckSessionIframe:", i instanceof Error ? i.message : i);
      }
    }, this._stop = () => {
      const t = this._logger.create("_stop");
      if (this._sub = void 0, this._sid = void 0, this._checkSessionIFrame && this._checkSessionIFrame.stop(), this._userManager.settings.monitorAnonymousSession) {
        const r = setInterval(async () => {
          clearInterval(r);
          try {
            const s = await this._userManager.querySessionStatus();
            if (s) {
              const i = {
                session_state: s.session_state,
                profile: s.sub && s.sid ? {
                  sub: s.sub,
                  sid: s.sid
                } : null
              };
              this._start(i);
            }
          } catch (s) {
            t.error("error from querySessionStatus", s instanceof Error ? s.message : s);
          }
        }, 1e3);
      }
    }, this._callback = async () => {
      const t = this._logger.create("_callback");
      try {
        const r = await this._userManager.querySessionStatus();
        let s = !0;
        r && this._checkSessionIFrame ? r.sub === this._sub ? (s = !1, this._checkSessionIFrame.start(r.session_state), r.sid === this._sid ? t.debug("same sub still logged in at OP, restarting check session iframe; session_state", r.session_state) : (t.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state", r.session_state), this._userManager.events._raiseUserSessionChanged())) : t.debug("different subject signed into OP", r.sub) : t.debug("subject no longer signed into OP"), s ? this._sub ? this._userManager.events._raiseUserSignedOut() : this._userManager.events._raiseUserSignedIn() : t.debug("no change in session detected, no event to raise");
      } catch (r) {
        this._sub && (t.debug("Error calling queryCurrentSigninSession; raising signed out event", r), this._userManager.events._raiseUserSignedOut());
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
        const r = {
          session_state: t.session_state,
          profile: t.sub && t.sid ? {
            sub: t.sub,
            sid: t.sid
          } : null
        };
        this._start(r);
      }
    }
  }
}, D = class {
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
    return f.createStatic("User", "fromStorageString"), new D(JSON.parse(e));
  }
}, oe = "oidc-client", Se = class {
  constructor() {
    this._abort = new O("Window navigation aborted"), this._disposeHandlers = /* @__PURE__ */ new Set(), this._window = null;
  }
  async navigate(e) {
    const t = this._logger.create("navigate");
    if (!this._window)
      throw new Error("Attempted to navigate on a disposed window");
    t.debug("setting URL in window"), this._window.location.replace(e.url);
    const { url: r, keepOpen: s } = await new Promise((i, n) => {
      const o = (c) => {
        var d;
        const l = c.data, p = (d = e.scriptOrigin) != null ? d : window.location.origin;
        if (!(c.origin !== p || (l == null ? void 0 : l.source) !== oe)) {
          try {
            const g = V.readParams(l.url, e.response_mode).get("state");
            if (g || t.warn("no state found in response url"), c.source !== this._window && g !== e.state)
              return;
          } catch {
            this._dispose(), n(new Error("Invalid response from window"));
          }
          i(l);
        }
      };
      window.addEventListener("message", o, !1), this._disposeHandlers.add(() => window.removeEventListener("message", o, !1)), this._disposeHandlers.add(this._abort.addHandler((c) => {
        this._dispose(), n(c);
      }));
    });
    return t.debug("got response from window"), this._dispose(), s || this.close(), { url: r };
  }
  _dispose() {
    this._logger.create("_dispose");
    for (const e of this._disposeHandlers)
      e();
    this._disposeHandlers.clear();
  }
  static _notifyParent(e, t, r = !1, s = window.location.origin) {
    e.postMessage({
      source: oe,
      url: t,
      keepOpen: r
    }, s);
  }
}, ve = {
  location: !1,
  toolbar: !1,
  height: 640
}, be = "_blank", gt = 60, pt = 2, ke = 10, _t = class extends me {
  constructor(e) {
    const {
      popup_redirect_uri: t = e.redirect_uri,
      popup_post_logout_redirect_uri: r = e.post_logout_redirect_uri,
      popupWindowFeatures: s = ve,
      popupWindowTarget: i = be,
      redirectMethod: n = "assign",
      redirectTarget: o = "self",
      iframeNotifyParentOrigin: c = e.iframeNotifyParentOrigin,
      iframeScriptOrigin: d = e.iframeScriptOrigin,
      silent_redirect_uri: l = e.redirect_uri,
      silentRequestTimeoutInSeconds: p = ke,
      automaticSilentRenew: g = !0,
      validateSubOnSilentRenew: S = !0,
      includeIdTokenInSilentRenew: w = !1,
      monitorSession: b = !1,
      monitorAnonymousSession: u = !1,
      checkSessionIntervalInSeconds: y = pt,
      query_status_response_type: I = "code",
      stopCheckSessionOnError: a = !0,
      revokeTokenTypes: h = ["access_token", "refresh_token"],
      revokeTokensOnSignout: _ = !1,
      accessTokenExpiringNotificationTimeInSeconds: m = gt,
      userStore: v
    } = e;
    if (super(e), this.popup_redirect_uri = t, this.popup_post_logout_redirect_uri = r, this.popupWindowFeatures = s, this.popupWindowTarget = i, this.redirectMethod = n, this.redirectTarget = o, this.iframeNotifyParentOrigin = c, this.iframeScriptOrigin = d, this.silent_redirect_uri = l, this.silentRequestTimeoutInSeconds = p, this.automaticSilentRenew = g, this.validateSubOnSilentRenew = S, this.includeIdTokenInSilentRenew = w, this.monitorSession = b, this.monitorAnonymousSession = u, this.checkSessionIntervalInSeconds = y, this.stopCheckSessionOnError = a, this.query_status_response_type = I, this.revokeTokenTypes = h, this.revokeTokensOnSignout = _, this.accessTokenExpiringNotificationTimeInSeconds = m, v)
      this.userStore = v;
    else {
      const k = typeof window < "u" ? window.sessionStorage : new fe();
      this.userStore = new we({ store: k });
    }
  }
}, Q = class extends Se {
  constructor({
    silentRequestTimeoutInSeconds: e = ke
  }) {
    super(), this._logger = new f("IFrameWindow"), this._timeoutInSeconds = e, this._frame = Q.createHiddenIframe(), this._window = this._frame.contentWindow;
  }
  static createHiddenIframe() {
    const e = window.document.createElement("iframe");
    return e.style.visibility = "hidden", e.style.position = "fixed", e.style.left = "-1000px", e.style.top = "0", e.width = "0", e.height = "0", e.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms"), window.document.body.appendChild(e), e;
  }
  async navigate(e) {
    this._logger.debug("navigate: Using timeout of:", this._timeoutInSeconds);
    const t = setTimeout(() => this._abort.raise(new X("IFrame timed out without a response")), this._timeoutInSeconds * 1e3);
    return this._disposeHandlers.add(() => clearTimeout(t)), await super.navigate(e);
  }
  close() {
    var e;
    this._frame && (this._frame.parentNode && (this._frame.addEventListener("load", (t) => {
      var r;
      const s = t.target;
      (r = s.parentNode) == null || r.removeChild(s), this._abort.raise(new Error("IFrame removed from DOM"));
    }, !0), (e = this._frame.contentWindow) == null || e.location.replace("about:blank")), this._frame = null), this._window = null;
  }
  static notifyParent(e, t) {
    return super._notifyParent(window.parent, e, !1, t);
  }
}, ft = class {
  constructor(e) {
    this._settings = e, this._logger = new f("IFrameNavigator");
  }
  async prepare({
    silentRequestTimeoutInSeconds: e = this._settings.silentRequestTimeoutInSeconds
  }) {
    return new Q({ silentRequestTimeoutInSeconds: e });
  }
  async callback(e) {
    this._logger.create("callback"), Q.notifyParent(e, this._settings.iframeNotifyParentOrigin);
  }
}, wt = 500, ae = class extends Se {
  constructor({
    popupWindowTarget: e = be,
    popupWindowFeatures: t = {}
  }) {
    super(), this._logger = new f("PopupWindow");
    const r = ie.center({ ...ve, ...t });
    this._window = window.open(void 0, e, ie.serialize(r));
  }
  async navigate(e) {
    var t;
    (t = this._window) == null || t.focus();
    const r = setInterval(() => {
      (!this._window || this._window.closed) && this._abort.raise(new Error("Popup closed by user"));
    }, wt);
    return this._disposeHandlers.add(() => clearInterval(r)), await super.navigate(e);
  }
  close() {
    this._window && (this._window.closed || (this._window.close(), this._abort.raise(new Error("Popup closed")))), this._window = null;
  }
  static notifyOpener(e, t) {
    if (!window.opener)
      throw new Error("No window.opener. Can't complete notification.");
    return super._notifyParent(window.opener, e, t);
  }
}, mt = class {
  constructor(e) {
    this._settings = e, this._logger = new f("PopupNavigator");
  }
  async prepare({
    popupWindowFeatures: e = this._settings.popupWindowFeatures,
    popupWindowTarget: t = this._settings.popupWindowTarget
  }) {
    return new ae({ popupWindowFeatures: e, popupWindowTarget: t });
  }
  async callback(e, t = !1) {
    this._logger.create("callback"), ae.notifyOpener(e, t);
  }
}, yt = class {
  constructor(e) {
    this._settings = e, this._logger = new f("RedirectNavigator");
  }
  async prepare({
    redirectMethod: e = this._settings.redirectMethod,
    redirectTarget: t = this._settings.redirectTarget
  }) {
    var r;
    this._logger.create("prepare");
    let s = window.self;
    t === "top" && (s = (r = window.top) != null ? r : window.self);
    const i = s.location[e].bind(s.location);
    let n;
    return {
      navigate: async (o) => {
        this._logger.create("navigate");
        const c = new Promise((d, l) => {
          n = l;
        });
        return i(o.url), await c;
      },
      close: () => {
        this._logger.create("close"), n == null || n(new Error("Redirect aborted")), s.stop();
      }
    };
  }
}, St = class extends Ve {
  constructor(e) {
    super({ expiringNotificationTimeInSeconds: e.accessTokenExpiringNotificationTimeInSeconds }), this._logger = new f("UserManagerEvents"), this._userLoaded = new O("User loaded"), this._userUnloaded = new O("User unloaded"), this._silentRenewError = new O("Silent renew error"), this._userSignedIn = new O("User signed in"), this._userSignedOut = new O("User signed out"), this._userSessionChanged = new O("User session changed");
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
}, vt = class {
  constructor(e) {
    this._userManager = e, this._logger = new f("SilentRenewService"), this._isStarted = !1, this._retryTimer = new P("Retry Silent Renew"), this._tokenExpiring = async () => {
      const t = this._logger.create("_tokenExpiring");
      try {
        await this._userManager.signinSilent(), t.debug("silent token renewal successful");
      } catch (r) {
        if (r instanceof X) {
          t.warn("ErrorTimeout from signinSilent:", r, "retry in 5s"), this._retryTimer.init(5);
          return;
        }
        t.error("Error from signinSilent:", r), this._userManager.events._raiseSilentRenewError(r);
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
}, bt = class {
  constructor(e) {
    this.refresh_token = e.refresh_token, this.id_token = e.id_token, this.session_state = e.session_state, this.scope = e.scope, this.data = e.state;
  }
}, kt = class {
  constructor(e) {
    this._logger = new f("UserManager"), this.settings = new _t(e), this._client = new lt(e), this._redirectNavigator = new yt(this.settings), this._popupNavigator = new mt(this.settings), this._iframeNavigator = new ft(this.settings), this._events = new St(this.settings), this._silentRenewService = new vt(this), this.settings.automaticSilentRenew && this.startSilentRenew(), this._sessionMonitor = null, this.settings.monitorSession && (this._sessionMonitor = new ut(this));
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
      ...r
    } = e, s = await this._redirectNavigator.prepare({ redirectMethod: t });
    await this._signinStart({
      request_type: "si:r",
      ...r
    }, s);
  }
  async signinRedirectCallback(e = window.location.href) {
    const t = this._logger.create("signinRedirectCallback"), r = await this._signinEnd(e);
    return r.profile && r.profile.sub ? t.info("success, signed in subject", r.profile.sub) : t.info("no subject"), r;
  }
  async signinPopup(e = {}) {
    const t = this._logger.create("signinPopup"), {
      popupWindowFeatures: r,
      popupWindowTarget: s,
      ...i
    } = e, n = this.settings.popup_redirect_uri;
    n || t.throw(new Error("No popup_redirect_uri configured"));
    const o = await this._popupNavigator.prepare({ popupWindowFeatures: r, popupWindowTarget: s }), c = await this._signin({
      request_type: "si:p",
      redirect_uri: n,
      display: "popup",
      ...i
    }, o);
    return c && (c.profile && c.profile.sub ? t.info("success, signed in subject", c.profile.sub) : t.info("no subject")), c;
  }
  async signinPopupCallback(e = window.location.href, t = !1) {
    const r = this._logger.create("signinPopupCallback");
    await this._popupNavigator.callback(e, t), r.info("success");
  }
  async signinSilent(e = {}) {
    var t;
    const r = this._logger.create("signinSilent"), {
      silentRequestTimeoutInSeconds: s,
      ...i
    } = e;
    let n = await this._loadUser();
    if (n != null && n.refresh_token) {
      r.debug("using refresh token");
      const l = new bt(n);
      return await this._useRefreshToken(l);
    }
    const o = this.settings.silent_redirect_uri;
    o || r.throw(new Error("No silent_redirect_uri configured"));
    let c;
    n && this.settings.validateSubOnSilentRenew && (r.debug("subject prior to silent renew:", n.profile.sub), c = n.profile.sub);
    const d = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: s });
    return n = await this._signin({
      request_type: "si:s",
      redirect_uri: o,
      prompt: "none",
      id_token_hint: this.settings.includeIdTokenInSilentRenew ? n == null ? void 0 : n.id_token : void 0,
      ...i
    }, d, c), n && ((t = n.profile) != null && t.sub ? r.info("success, signed in subject", n.profile.sub) : r.info("no subject")), n;
  }
  async _useRefreshToken(e) {
    const t = await this._client.useRefreshToken({
      state: e,
      timeoutInSeconds: this.settings.silentRequestTimeoutInSeconds
    }), r = new D({ ...e, ...t });
    return await this.storeUser(r), this._events.load(r), r;
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
    const { state: r } = await this._client.readSignoutResponseState(e);
    if (r)
      switch (r.request_type) {
        case "so:r":
          await this.signoutRedirectCallback(e);
          break;
        case "so:p":
          await this.signoutPopupCallback(e, t);
          break;
        default:
          throw new Error("invalid response_type in state");
      }
  }
  async querySessionStatus(e = {}) {
    const t = this._logger.create("querySessionStatus"), {
      silentRequestTimeoutInSeconds: r,
      ...s
    } = e, i = this.settings.silent_redirect_uri;
    i || t.throw(new Error("No silent_redirect_uri configured"));
    const n = await this._loadUser(), o = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: r }), c = await this._signinStart({
      request_type: "si:s",
      redirect_uri: i,
      prompt: "none",
      id_token_hint: this.settings.includeIdTokenInSilentRenew ? n == null ? void 0 : n.id_token : void 0,
      response_type: this.settings.query_status_response_type,
      scope: "openid",
      skipUserInfo: !0,
      ...s
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
  async _signin(e, t, r) {
    const s = await this._signinStart(e, t);
    return await this._signinEnd(s.url, r);
  }
  async _signinStart(e, t) {
    const r = this._logger.create("_signinStart");
    try {
      const s = await this._client.createSigninRequest(e);
      return r.debug("got signin request"), await t.navigate({
        url: s.url,
        state: s.state.id,
        response_mode: s.state.response_mode,
        scriptOrigin: this.settings.iframeScriptOrigin
      });
    } catch (s) {
      throw r.debug("error after preparing navigator, closing navigator window"), t.close(), s;
    }
  }
  async _signinEnd(e, t) {
    const r = this._logger.create("_signinEnd"), s = await this._client.processSigninResponse(e);
    r.debug("got signin response");
    const i = new D(s);
    if (t) {
      if (t !== i.profile.sub)
        throw r.debug("current user does not match user returned from signin. sub from signin:", i.profile.sub), new j({ ...s, error: "login_required" });
      r.debug("current user matches user returned from signin");
    }
    return await this.storeUser(i), r.debug("user stored"), this._events.load(i), i;
  }
  async signoutRedirect(e = {}) {
    const t = this._logger.create("signoutRedirect"), {
      redirectMethod: r,
      ...s
    } = e, i = await this._redirectNavigator.prepare({ redirectMethod: r });
    await this._signoutStart({
      request_type: "so:r",
      post_logout_redirect_uri: this.settings.post_logout_redirect_uri,
      ...s
    }, i), t.info("success");
  }
  async signoutRedirectCallback(e = window.location.href) {
    const t = this._logger.create("signoutRedirectCallback"), r = await this._signoutEnd(e);
    return t.info("success"), r;
  }
  async signoutPopup(e = {}) {
    const t = this._logger.create("signoutPopup"), {
      popupWindowFeatures: r,
      popupWindowTarget: s,
      ...i
    } = e, n = this.settings.popup_post_logout_redirect_uri, o = await this._popupNavigator.prepare({ popupWindowFeatures: r, popupWindowTarget: s });
    await this._signout({
      request_type: "so:p",
      post_logout_redirect_uri: n,
      state: n == null ? void 0 : {},
      ...i
    }, o), t.info("success");
  }
  async signoutPopupCallback(e = window.location.href, t = !1) {
    const r = this._logger.create("signoutPopupCallback");
    await this._popupNavigator.callback(e, t), r.info("success");
  }
  async _signout(e, t) {
    const r = await this._signoutStart(e, t);
    return await this._signoutEnd(r.url);
  }
  async _signoutStart(e = {}, t) {
    var r;
    const s = this._logger.create("_signoutStart");
    try {
      const i = await this._loadUser();
      s.debug("loaded current user from storage"), this.settings.revokeTokensOnSignout && await this._revokeInternal(i);
      const n = e.id_token_hint || i && i.id_token;
      n && (s.debug("setting id_token_hint in signout request"), e.id_token_hint = n), await this.removeUser(), s.debug("user removed, creating signout request");
      const o = await this._client.createSignoutRequest(e);
      return s.debug("got signout request"), await t.navigate({
        url: o.url,
        state: (r = o.state) == null ? void 0 : r.id
      });
    } catch (i) {
      throw s.debug("error after preparing navigator, closing navigator window"), t.close(), i;
    }
  }
  async _signoutEnd(e) {
    const t = this._logger.create("_signoutEnd"), r = await this._client.processSignoutResponse(e);
    return t.debug("got signout response"), r;
  }
  async revokeTokens(e) {
    const t = await this._loadUser();
    await this._revokeInternal(t, e);
  }
  async _revokeInternal(e, t = this.settings.revokeTokenTypes) {
    const r = this._logger.create("_revokeInternal");
    if (!e)
      return;
    const s = t.filter((i) => typeof e[i] == "string");
    if (!s.length) {
      r.debug("no need to revoke due to no token(s)");
      return;
    }
    for (const i of s)
      await this._client.revokeToken(
        e[i],
        i
      ), r.info(`${i} revoked successfully`), i !== "access_token" && (e[i] = null);
    await this.storeUser(e), r.debug("user stored"), this._events.load(e);
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
    return t ? (e.debug("user storageString loaded"), D.fromStorageString(t)) : (e.debug("no user storageString"), null);
  }
  async storeUser(e) {
    const t = this._logger.create("storeUser");
    if (e) {
      t.debug("storing user");
      const r = e.toStorageString();
      await this.settings.userStore.set(this._userStoreKey, r);
    } else
      this._logger.debug("removing user"), await this.settings.userStore.remove(this._userStoreKey);
  }
  async clearStaleState() {
    await this._client.clearStaleState();
  }
};
const ce = (e, t) => (e || (e = []), t || (t = []), Array.isArray(e) || (e = e.split(" ")), Array.isArray(t) || (t = t.split(" ")), e.concat(t).filter((r, s, i) => i.indexOf(r) === s).join(" ").trim()), It = "https://stage.identity.multicartshop.com", Tt = "https://identity.multicartshop.com", Rt = "Multicart.TypeScript.Client";
class Ie {
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
    return this.configuration.basePath || this.sandbox ? It : Tt;
  }
  get client_id() {
    return this.configuration.client_id || Rt;
  }
  get redirect_uri() {
    return this.configuration.redirect_uri || this.basePath + "/login";
  }
  get client_secret() {
    return this.configuration.client_secret;
  }
  get scopes() {
    return this.configuration.scopes;
  }
}
const Te = new Ie();
class Et extends kt {
  constructor(t = Te) {
    const r = {
      authority: t.basePath,
      loadUserInfo: !0,
      client_id: t.client_id,
      redirect_uri: t.redirect_uri,
      client_secret: t.client_secret,
      scope: ce(t.scopes)
    };
    super(r), this.configuration = t;
  }
  async signinPasswordGrant({
    username: t,
    password: r
  }) {
    const s = {
      extraQueryParams: { username: t, password: r, grant_type: "password" }
    };
    return this.signinSilent(s);
  }
  async signinClientCredentials({
    scopes: t
  } = {}) {
    var r;
    const s = this._logger.create("signinClientCredentials"), i = await this.metadataService.getTokenEndpoint().catch((l) => s.error(l));
    if (!i)
      throw new Error("Token endpoint not be empty");
    const {
      client_id: n,
      client_secret: o,
      scope: c
    } = this.settings, d = ce(c, t);
    if (!o)
      throw new Error("No client_secret configured");
    try {
      const l = await (await fetch(i, {
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
      })).json(), p = new D(l);
      return p.expires_at = Math.floor(Date.now() / 1e3) + ((r = l.expires_in) != null ? r : 0), await this.storeUser(p), s.debug("user stored"), this._events.load(p), p;
    } catch (l) {
      throw s.error("Login failed", l), new Error("Login failed");
    }
  }
}
const Wt = ({
  oauthConfig: e,
  clientConfig: t
} = {}) => {
  if (Te.config = new Ie({
    scopes: [...(e == null ? void 0 : e.scopes) || [], "multicart.api"],
    ...e
  }), !(t != null && t.accessToken)) {
    const r = new Et(), s = async () => {
      const i = await r.signinSilent() || await r.signinPopup();
      return (i == null ? void 0 : i.access_token) || "";
    };
    t ? t.accessToken = s : t = { accessToken: s };
  }
  he.config = new de(t);
};
export {
  Bt as AdminCartItemApi,
  Ue as BASE_PATH,
  Y as BaseAPI,
  xt as BlobApiResponse,
  Ct as COLLECTION_FORMATS,
  Ot as CartItemApi,
  de as Configuration,
  he as DefaultConfig,
  Mt as EnPageDirection,
  Nt as EnPlatformType,
  Me as FetchError,
  N as JSONApiResponse,
  qt as OfferApi,
  E as RequiredError,
  qe as ResponseError,
  Ut as TextApiResponse,
  Ht as VariantCategoryDisplayType,
  jt as VariantDisplayType,
  H as VoidApiResponse,
  At as canConsumeForm,
  Wt as initializeMulticartApiClient,
  le as querystring
};
//# sourceMappingURL=multicartshop-client.mjs.map
