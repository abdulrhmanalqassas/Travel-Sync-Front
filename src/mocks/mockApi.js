const image = (seed) => `https://picsum.photos/seed/travelsync-${seed}/900/600`;

export const mockAuthTokens = {
  token: "demo-admin-token",
  refreshToken: "demo-refresh-token",
  tokenExpires: Date.now() + 7 * 24 * 60 * 60 * 1000,
};

export const mockCurrentUser = {
  id: 1,
  firstName: "Mariam",
  lastName: "Hassan",
  email: "admin@travelsync.demo",
  mobilePhone: "+20 100 555 0101",
  role: { id: 1, name: "Admin" },
  profilePhoto: { imageUrl: image("admin-avatar") },
  account: { id: 1, balance: 18450 },
};

const travelOffices = [
  {
    id: 1,
    name: "Nile Way Travel",
    email: "ops@nileway.demo",
    phone: "+20 2 555 1100",
    city: "Cairo",
    address: "Garden City, Cairo",
    profilePhoto: { imageUrl: image("office-nile") },
    account: { id: 1, balance: 18450 },
  },
  {
    id: 2,
    name: "Red Sea Explorers",
    email: "hello@redsea.demo",
    phone: "+20 65 555 2200",
    city: "Hurghada",
    address: "Marina Boulevard, Hurghada",
    profilePhoto: { imageUrl: image("office-redsea") },
    account: { id: 2, balance: 9275 },
  },
];

const users = [
  mockCurrentUser,
  {
    id: 4,
    firstName: "Omar",
    lastName: "Youssef",
    email: "agent@nileway.demo",
    mobilePhone: "+20 101 777 3333",
    role: { id: 4, name: "Travel Agent" },
    profilePhoto: { imageUrl: image("agent-omar") },
    account: travelOffices[0].account,
  },
  {
    id: 5,
    firstName: "Lina",
    lastName: "Farouk",
    email: "agent@redsea.demo",
    mobilePhone: "+20 112 444 8899",
    role: { id: 4, name: "Travel Agent" },
    profilePhoto: { imageUrl: image("agent-lina") },
    account: travelOffices[1].account,
  },
];

const hotels = [
  {
    id: 101,
    name: "Blue Lagoon Resort",
    ar_name: "منتجع بلو لاجون",
    address: "Marina Walk",
    ar_address: "ممشى المارينا",
    city: "Sharm El Sheikh",
    ar_city: "شرم الشيخ",
    state: "South Sinai",
    ar_state: "جنوب سيناء",
    zipCode: "46619",
    stars: 5,
    mobileNumber: "+20 111 000 1010",
    phoneNumber: "+20 69 360 1010",
    website: "https://example.com/blue-lagoon",
    email: "sales@bluelagoon.demo",
    description: "Beachfront resort with diving center, spa, and family suites.",
    ar_description: "منتجع على البحر مع مركز غوص وسبا وأجنحة عائلية.",
    location: "https://maps.google.com/?q=Sharm+El+Sheikh",
    images: [{ id: 1, imageUrl: image("hotel-blue") }],
    isOffer: true,
    price: 210,
    margin: 35,
    type: "hotels",
  },
  {
    id: 102,
    name: "Cairo Heritage Hotel",
    ar_name: "فندق القاهرة التراثي",
    address: "26 July Street",
    ar_address: "شارع 26 يوليو",
    city: "Cairo",
    ar_city: "القاهرة",
    state: "Cairo",
    ar_state: "القاهرة",
    zipCode: "11511",
    stars: 4,
    mobileNumber: "+20 122 000 2020",
    phoneNumber: "+20 2 2577 2020",
    website: "https://example.com/cairo-heritage",
    email: "bookings@cairoheritage.demo",
    description: "Central hotel near museums, Nile cruises, and business districts.",
    ar_description: "فندق مركزي قريب من المتاحف ورحلات النيل ومناطق الأعمال.",
    location: "https://maps.google.com/?q=Cairo",
    images: [{ id: 2, imageUrl: image("hotel-cairo") }],
    isOffer: false,
    price: 135,
    margin: 20,
    type: "hotels",
  },
];

const rooms = [
  {
    id: 201,
    name: "Deluxe Sea View",
    ar_name: "ديلوكس بإطلالة بحرية",
    price: 160,
    margin: 25,
    quantityAvailable: 8,
    savings: 15,
    type: "hotel-rooms",
    images: [{ id: 3, imageUrl: image("room-sea") }],
    room: {
      type: "Double",
      roomArea: "42 sqm",
      hotelId: 101,
      numberOfBeds: 2,
      numberOfSleeps: 3,
      description: "Balcony, breakfast, pool access.",
    },
  },
  {
    id: 202,
    name: "Executive City Suite",
    ar_name: "جناح تنفيذي بإطلالة المدينة",
    price: 120,
    margin: 18,
    quantityAvailable: 5,
    savings: 8,
    type: "hotel-rooms",
    images: [{ id: 4, imageUrl: image("room-city") }],
    room: {
      type: "Suite",
      roomArea: "55 sqm",
      hotelId: 102,
      numberOfBeds: 1,
      numberOfSleeps: 2,
      description: "Work desk, lounge access, city view.",
    },
  },
];

const flights = [
  {
    id: 301,
    name: "Cairo to Dubai",
    ar_name: "القاهرة إلى دبي",
    price: 340,
    margin: 30,
    quantityAvailable: 22,
    savings: 0,
    type: "flights",
    description: "Direct evening flight with checked baggage.",
    images: [{ id: 5, imageUrl: image("flight-dubai") }],
    flight: {
      airline: "EgyptAir",
      seatType: "Economy Flex",
      departureAddress: "Cairo International Airport",
      departureCity: "Cairo",
      arrivalAddress: "Dubai International Airport",
      arrivalCity: "Dubai",
      departureTime: "2026-06-14T18:30:00.000Z",
      arrivalTime: "2026-06-15T00:10:00.000Z",
    },
  },
  {
    id: 302,
    name: "Cairo to Istanbul",
    ar_name: "القاهرة إلى إسطنبول",
    price: 285,
    margin: 25,
    quantityAvailable: 14,
    savings: 20,
    type: "flights",
    description: "Morning flight with short transfer options.",
    images: [{ id: 6, imageUrl: image("flight-istanbul") }],
    flight: {
      airline: "Turkish Airlines",
      seatType: "Business Promo",
      departureAddress: "Cairo International Airport",
      departureCity: "Cairo",
      arrivalAddress: "Istanbul Airport",
      arrivalCity: "Istanbul",
      departureTime: "2026-06-22T05:45:00.000Z",
      arrivalTime: "2026-06-22T08:20:00.000Z",
    },
  },
];

const safaris = [
  {
    id: 401,
    name: "Desert Safari & Bedouin Dinner",
    ar_name: "سفاري الصحراء وعشاء بدوي",
    price: 75,
    margin: 10,
    stars: 5,
    quantityAvailable: 18,
    description: "Quad bikes, sunset stop, dinner show.",
    ar_description: "دراجات رباعية وتوقف للغروب وحفل عشاء.",
    type: "safari",
    images: [{ id: 7, imageUrl: image("safari-desert") }],
    safari: {
      type: "Adventure",
      address: "Hurghada Desert Gate",
      startLocation: "Hotel pickup",
      endLocation: "Bedouin camp",
      duration: "6 hours",
    },
  },
];

const transportations = [
  {
    id: 501,
    name: "Private Airport Transfer",
    ar_name: "انتقال خاص من المطار",
    price: 45,
    margin: 8,
    quantityAvailable: 12,
    description: "Door-to-door sedan transfer.",
    ar_description: "انتقال بسيارة سيدان من الباب إلى الباب.",
    type: "transportations",
    images: [{ id: 8, imageUrl: image("transfer") }],
    transportation: {
      type: "Sedan",
      departureAddress: "Cairo International Airport",
      arrivalAddress: "Downtown Cairo",
      departureTime: "2026-06-10T10:00:00.000Z",
      arrivalTime: "2026-06-10T11:00:00.000Z",
      departingDate: "2026-06-10",
      returningDate: "2026-06-17",
    },
  },
];

const standardPackages = [
  {
    id: 601,
    name: "Cairo Classics 4 Days",
    ar_name: "كلاسيكيات القاهرة 4 أيام",
    price: 640,
    margin: 55,
    stars: 4,
    quantityAvailable: 9,
    description: "Pyramids, Egyptian Museum, Nile dinner cruise, hotel stay.",
    ar_description: "الأهرامات والمتحف المصري ورحلة عشاء نيلية وإقامة فندقية.",
    type: "standard-packages",
    images: [{ id: 9, imageUrl: image("package-cairo") }],
  },
];

const customPackages = [
  {
    id: 701,
    name: "Family Red Sea Escape",
    description: "Custom hotel, transfer, safari, and flight bundle for four.",
    price: 1850,
    margin: 120,
    quantityAvailable: 1,
    images: [{ id: 10, imageUrl: image("custom-redsea") }],
  },
];

const readyVisas = [
  {
    id: 801,
    name: "UAE Tourist Visa",
    ar_name: "تأشيرة سياحة الإمارات",
    country: "AE",
    type: "ReadyVisa",
    price: 130,
    margin: 20,
    quantityAvailable: 40,
    description: "30-day single-entry tourist visa.",
    images: [{ id: 11, imageUrl: image("visa-uae") }],
  },
  {
    id: 802,
    name: "Saudi Umrah Visa",
    ar_name: "تأشيرة عمرة السعودية",
    country: "SA",
    type: "ReadyVisa",
    price: 190,
    margin: 25,
    quantityAvailable: 24,
    description: "Umrah visa support with document checklist.",
    images: [{ id: 12, imageUrl: image("visa-saudi") }],
  },
];

const traveler = {
  id: 9001,
  firstName: "Youssef",
  lastName: "Ali",
  email: "youssef@example.com",
  mobilePhone: "+20 100 987 6543",
  files: [{ id: 1, url: image("passport") }],
};

const reservations = [
  {
    id: 1001,
    quantity: 2,
    status: "pending",
    totalPrice: 490,
    checkInDate: "2026-06-14",
    checkOutDate: "2026-06-18",
    updatedAt: "2026-05-19T09:30:00.000Z",
    travelOffice: travelOffices[0],
    service: hotels[0],
    travelers: [traveler],
  },
  {
    id: 1002,
    quantity: 1,
    status: "confirmed",
    totalPrice: 370,
    checkInDate: "2026-06-22",
    checkOutDate: null,
    updatedAt: "2026-05-18T13:10:00.000Z",
    travelOffice: travelOffices[1],
    service: flights[1],
    travelers: [{ ...traveler, id: 9002, firstName: "Nour", lastName: "Samir" }],
  },
  {
    id: 1003,
    quantity: 1,
    status: "request_action",
    totalPrice: 1970,
    checkInDate: "2026-07-05",
    checkOutDate: "2026-07-11",
    updatedAt: "2026-05-17T16:20:00.000Z",
    travelOffice: travelOffices[0],
    customPackage: customPackages[0],
    travelers: [traveler],
  },
];

const visaReservations = [
  {
    id: 2001,
    quantity: 2,
    status: "pending",
    totalPrice: 260,
    checkInDate: "2026-06-01",
    updatedAt: "2026-05-19T11:15:00.000Z",
    country: "AE",
    visaType: "Tourist",
    travelOffice: travelOffices[0],
    service: readyVisas[0],
    travelers: [traveler],
  },
  {
    id: 2002,
    quantity: 1,
    status: "confirmed",
    totalPrice: 190,
    checkInDate: "2026-06-12",
    updatedAt: "2026-05-18T08:00:00.000Z",
    country: "SA",
    visaType: "Umrah",
    travelOffice: travelOffices[1],
    service: readyVisas[1],
    travelers: [{ ...traveler, id: 9003, firstName: "Salma", lastName: "Tarek" }],
  },
];

const accounts = [
  { id: 1, balance: 18450, travelOffice: travelOffices[0] },
  { id: 2, balance: 9275, travelOffice: travelOffices[1] },
];

const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: 2500,
    createdAt: "2026-05-16T12:30:00.000Z",
    account: accounts[0],
  },
  {
    id: 2,
    type: "withdraw",
    amount: 490,
    createdAt: "2026-05-18T14:20:00.000Z",
    account: accounts[0],
  },
];

const notifications = [
  {
    id: 1,
    message: "New hotel reservation needs review.",
    isRead: false,
    created_at: "2026-05-19T10:20:00.000Z",
    reservation: reservations[0],
  },
  {
    id: 2,
    message: "Visa application documents were uploaded.",
    isRead: true,
    created_at: "2026-05-18T13:00:00.000Z",
    reservation: visaReservations[0],
  },
];

const requirementByCountry = {
  AE: [
    { id: 1, country: "AE", title: "Passport copy", description: "Valid for at least six months." },
    { id: 2, country: "AE", title: "Personal photo", description: "White background, recent." },
  ],
  SA: [
    { id: 3, country: "SA", title: "Passport copy", description: "Valid for at least six months." },
    { id: 4, country: "SA", title: "Travel dates", description: "Expected arrival and departure dates." },
  ],
};

const ok = (data, status = 200) => ({ data, status, statusText: "OK", headers: {}, config: {} });
const paged = (data) => ({ data: { data }, count: data.length });

const parsePath = (config) => {
  const rawUrl = (config.url || "").trim();
  const base = config.baseURL || window.location.origin;
  return new URL(rawUrl, base).pathname.replace(/\/$/, "");
};

const collectionByService = {
  hotels,
  rooms,
  flights,
  safari: safaris,
  transportations,
  "standard-packages": standardPackages,
  "custom-packages": customPackages,
};

const byId = (items, id) => items.find((item) => String(item.id) === String(id)) || items[0];

function route(config) {
  const method = (config.method || "get").toLowerCase();
  const path = parsePath(config);

  if (method === "post" && path === "/api/v1/auth/email/login") {
    return ok({ token: mockAuthTokens.token, user: mockCurrentUser });
  }

  if (method === "get" && path === "/api/v1/notification") return ok(notifications);
  if (method === "patch" && path.startsWith("/api/v1/notification/read/")) return ok({ success: true });

  if (path === "/api/v1/travel-offices") return ok(travelOffices, method === "post" ? 201 : 200);
  if (path.startsWith("/api/v1/travel-offices/")) return ok({}, method === "delete" ? 204 : 200);
  if (path === "/api/v1/travel-offices/account") return ok(accounts[0]);

  if (path === "/api/v1/users") return ok({ data: users });
  if (path.startsWith("/api/v1/users")) return ok({ data: users.filter((user) => user.role.id === 4) });

  if (path === "/api/accounts") return ok(accounts);
  if (path.match(/^\/api\/accounts\/\d+$/)) return ok(byId(accounts, path.split("/")[3]));
  if (path.endsWith("/transactions")) return ok(transactions);
  if (path.includes("/transactions") && method === "post") return ok({ id: 99, ...JSON.parse(config.data || "{}") }, 201);

  if (path === "/api/attatchments/upload" || path === "/api/v1/images/upload") {
    return ok([{ id: 777, url: image("upload"), imageUrl: image("upload") }], 201);
  }

  if (path === "/api/reservations/custom-package") return ok({ id: 1998 }, 201);
  if (path === "/api/reservations") return ok(method === "post" ? { id: 1999 } : paged(reservations), method === "post" ? 201 : 200);
  if (path.match(/^\/api\/reservations\/\d+$/)) return ok(byId(reservations, path.split("/")[3]));
  if (path.startsWith("/api/reservations/")) return ok({ success: true });

  if (path === "/api/visa-reservations") return ok(method === "post" ? { id: 2999 } : paged(visaReservations), method === "post" ? 201 : 200);
  if (path.match(/^\/api\/visa-reservations\/\d+$/)) return ok(byId(visaReservations, path.split("/")[3]));
  if (path.startsWith("/api/visa-reservations/")) return ok({ success: true });

  if (path.startsWith("/api/v1/visa-requirement/country/")) {
    const country = path.split("/").pop();
    return ok(requirementByCountry[country] || requirementByCountry.AE);
  }
  if (path.startsWith("/api/v1/visa-requirement")) return ok(requirementByCountry.AE, method === "post" ? 201 : 200);

  if (path.startsWith("/api/v1/ready-visa/country/")) return ok(readyVisas);
  if (path.startsWith("/api/v1/ready-visa")) return ok(readyVisas, method === "post" ? 201 : 200);

  for (const [service, collection] of Object.entries(collectionByService)) {
    if (path === `/api/v1/${service}` || path === `/api/${service}`) {
      return ok(collection, method === "post" ? 201 : 200);
    }
    if (path.startsWith(`/api/v1/${service}/`)) {
      return ok(byId(collection, path.split("/").pop()), method === "delete" ? 204 : 200);
    }
  }

  console.warn(`[mock-api] No route for ${method.toUpperCase()} ${path}`);
  return ok({});
}

export function mockAxiosAdapter(config) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const response = route(config);
      resolve({ ...response, config });
    }, 250);
  });
}

export async function mockFetchResponse(input, init = {}) {
  const url = typeof input === "string" ? input : input?.url || "";
  const path = new URL(url, window.location.origin).pathname;
  const method = init.method || "GET";

  let data = {};
  let status = 200;

  if (path.endsWith("/v1/auth/email/login")) data = { token: mockAuthTokens.token, user: mockCurrentUser };
  else if (path.endsWith("/v1/auth/me")) data = mockCurrentUser;
  else if (path.endsWith("/v1/auth/refresh")) data = mockAuthTokens;
  else if (path.endsWith("/v1/auth/logout")) data = { success: true };
  else console.warn(`[mock-api] No fetch route for ${method} ${path}`);

  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
