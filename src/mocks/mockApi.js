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

travelOffices.push(
  {
    id: 3,
    name: "Alexandria Coast Tours",
    email: "sales@alexcoast.demo",
    phone: "+20 3 555 3300",
    city: "Alexandria",
    address: "Stanley Bridge, Alexandria",
    profilePhoto: { imageUrl: image("office-alex") },
    account: { id: 3, balance: 14320 },
  },
  {
    id: 4,
    name: "Luxor Gate Holidays",
    email: "booking@luxorgate.demo",
    phone: "+20 95 555 4400",
    city: "Luxor",
    address: "Karnak Road, Luxor",
    profilePhoto: { imageUrl: image("office-luxor") },
    account: { id: 4, balance: 22110 },
  },
  {
    id: 5,
    name: "Sinai Star Travel",
    email: "hello@sinaistar.demo",
    phone: "+20 69 555 5500",
    city: "Dahab",
    address: "Lagoon Road, Dahab",
    profilePhoto: { imageUrl: image("office-sinai") },
    account: { id: 5, balance: 6890 },
  },
);

users.push(
  {
    id: 6,
    firstName: "Karim",
    lastName: "Maher",
    email: "agent@alexcoast.demo",
    mobilePhone: "+20 120 333 2211",
    role: { id: 4, name: "Travel Agent" },
    profilePhoto: { imageUrl: image("agent-karim") },
    account: travelOffices[2].account,
  },
  {
    id: 7,
    firstName: "Dina",
    lastName: "Nabil",
    email: "agent@luxorgate.demo",
    mobilePhone: "+20 155 777 6600",
    role: { id: 4, name: "Travel Agent" },
    profilePhoto: { imageUrl: image("agent-dina") },
    account: travelOffices[3].account,
  },
  {
    id: 8,
    firstName: "Hany",
    lastName: "Adel",
    email: "agent@sinaistar.demo",
    mobilePhone: "+20 109 222 4411",
    role: { id: 4, name: "Travel Agent" },
    profilePhoto: { imageUrl: image("agent-hany") },
    account: travelOffices[4].account,
  },
);

hotels.push(
  {
    id: 103,
    name: "Alexandria Corniche Suites",
    ar_name: "Alexandria Corniche Suites",
    address: "El-Gaish Road",
    ar_address: "El-Gaish Road",
    city: "Alexandria",
    ar_city: "Alexandria",
    state: "Alexandria",
    ar_state: "Alexandria",
    zipCode: "21599",
    stars: 4,
    mobileNumber: "+20 120 000 3030",
    phoneNumber: "+20 3 555 3030",
    website: "https://example.com/corniche-suites",
    email: "book@cornichesuites.demo",
    description: "Sea-facing suites close to Stanley, Bibliotheca Alexandrina, and cafes.",
    ar_description: "Sea-facing suites close to Stanley, Bibliotheca Alexandrina, and cafes.",
    location: "https://maps.google.com/?q=Alexandria+Corniche",
    images: [{ id: 13, imageUrl: image("hotel-alex") }],
    isOffer: true,
    price: 150,
    margin: 22,
    type: "hotels",
  },
  {
    id: 104,
    name: "Luxor Nile Palace",
    ar_name: "Luxor Nile Palace",
    address: "Nile Corniche",
    ar_address: "Nile Corniche",
    city: "Luxor",
    ar_city: "Luxor",
    state: "Luxor",
    ar_state: "Luxor",
    zipCode: "85951",
    stars: 5,
    mobileNumber: "+20 111 444 4040",
    phoneNumber: "+20 95 555 4040",
    website: "https://example.com/luxor-palace",
    email: "reservations@luxorpalace.demo",
    description: "Nile-view palace hotel with temple tours and sunset felucca trips.",
    ar_description: "Nile-view palace hotel with temple tours and sunset felucca trips.",
    location: "https://maps.google.com/?q=Luxor+Nile",
    images: [{ id: 14, imageUrl: image("hotel-luxor") }],
    isOffer: false,
    price: 240,
    margin: 40,
    type: "hotels",
  },
  {
    id: 105,
    name: "Dahab Lagoon Camp",
    ar_name: "Dahab Lagoon Camp",
    address: "Lagoon Area",
    ar_address: "Lagoon Area",
    city: "Dahab",
    ar_city: "Dahab",
    state: "South Sinai",
    ar_state: "South Sinai",
    zipCode: "46617",
    stars: 3,
    mobileNumber: "+20 100 555 5050",
    phoneNumber: "+20 69 555 5050",
    website: "https://example.com/dahab-lagoon",
    email: "stay@dahablagoon.demo",
    description: "Relaxed beach camp for diving, windsurfing, and budget group trips.",
    ar_description: "Relaxed beach camp for diving, windsurfing, and budget group trips.",
    location: "https://maps.google.com/?q=Dahab+Lagoon",
    images: [{ id: 15, imageUrl: image("hotel-dahab") }],
    isOffer: true,
    price: 85,
    margin: 12,
    type: "hotels",
  },
);

rooms.push(
  {
    id: 203,
    name: "Family Connected Rooms",
    ar_name: "Family Connected Rooms",
    price: 195,
    margin: 28,
    quantityAvailable: 6,
    savings: 18,
    type: "hotel-rooms",
    images: [{ id: 16, imageUrl: image("room-family") }],
    room: {
      type: "Family",
      roomArea: "72 sqm",
      hotelId: 103,
      numberOfBeds: 4,
      numberOfSleeps: 5,
      description: "Two connected rooms, sea balcony, breakfast included.",
    },
  },
  {
    id: 204,
    name: "Nile View King Suite",
    ar_name: "Nile View King Suite",
    price: 260,
    margin: 45,
    quantityAvailable: 4,
    savings: 12,
    type: "hotel-rooms",
    images: [{ id: 17, imageUrl: image("room-nile") }],
    room: {
      type: "Suite",
      roomArea: "64 sqm",
      hotelId: 104,
      numberOfBeds: 1,
      numberOfSleeps: 2,
      description: "Panoramic Nile view, lounge access, private guide desk.",
    },
  },
  {
    id: 205,
    name: "Diver Twin Room",
    ar_name: "Diver Twin Room",
    price: 70,
    margin: 10,
    quantityAvailable: 14,
    savings: 5,
    type: "hotel-rooms",
    images: [{ id: 18, imageUrl: image("room-diver") }],
    room: {
      type: "Twin",
      roomArea: "28 sqm",
      hotelId: 105,
      numberOfBeds: 2,
      numberOfSleeps: 2,
      description: "Simple room with gear storage and early breakfast.",
    },
  },
);

flights.push(
  {
    id: 303,
    name: "Cairo to Paris",
    ar_name: "Cairo to Paris",
    price: 520,
    margin: 45,
    quantityAvailable: 11,
    savings: 35,
    type: "flights",
    description: "Direct overnight flight with meal and baggage.",
    images: [{ id: 19, imageUrl: image("flight-paris") }],
    flight: {
      airline: "Air France",
      seatType: "Economy",
      departureAddress: "Cairo International Airport",
      departureCity: "Cairo",
      arrivalAddress: "Charles de Gaulle Airport",
      arrivalCity: "Paris",
      departureTime: "2026-07-02T22:15:00.000Z",
      arrivalTime: "2026-07-03T03:55:00.000Z",
    },
  },
  {
    id: 304,
    name: "Hurghada to Riyadh",
    ar_name: "Hurghada to Riyadh",
    price: 310,
    margin: 30,
    quantityAvailable: 19,
    savings: 10,
    type: "flights",
    description: "Seasonal direct flight for family and Umrah travelers.",
    images: [{ id: 20, imageUrl: image("flight-riyadh") }],
    flight: {
      airline: "Flynas",
      seatType: "Economy Light",
      departureAddress: "Hurghada International Airport",
      departureCity: "Hurghada",
      arrivalAddress: "King Khalid International Airport",
      arrivalCity: "Riyadh",
      departureTime: "2026-07-18T08:20:00.000Z",
      arrivalTime: "2026-07-18T11:10:00.000Z",
    },
  },
  {
    id: 305,
    name: "Cairo to London",
    ar_name: "Cairo to London",
    price: 610,
    margin: 55,
    quantityAvailable: 7,
    savings: 0,
    type: "flights",
    description: "Premium route with flexible date change.",
    images: [{ id: 21, imageUrl: image("flight-london") }],
    flight: {
      airline: "British Airways",
      seatType: "Premium Economy",
      departureAddress: "Cairo International Airport",
      departureCity: "Cairo",
      arrivalAddress: "Heathrow Airport",
      arrivalCity: "London",
      departureTime: "2026-08-05T06:00:00.000Z",
      arrivalTime: "2026-08-05T10:50:00.000Z",
    },
  },
);

safaris.push(
  {
    id: 402,
    name: "Dahab Blue Hole Diving Day",
    ar_name: "Dahab Blue Hole Diving Day",
    price: 95,
    margin: 15,
    stars: 5,
    quantityAvailable: 10,
    description: "Guided Blue Hole dive, lunch, and equipment rental.",
    ar_description: "Guided Blue Hole dive, lunch, and equipment rental.",
    type: "safari",
    images: [{ id: 22, imageUrl: image("safari-bluehole") }],
    safari: {
      type: "Diving",
      address: "Blue Hole, Dahab",
      startLocation: "Dahab hotels",
      endLocation: "Blue Hole",
      duration: "8 hours",
    },
  },
  {
    id: 403,
    name: "Luxor West Bank Sunrise Tour",
    ar_name: "Luxor West Bank Sunrise Tour",
    price: 110,
    margin: 18,
    stars: 4,
    quantityAvailable: 16,
    description: "Valley of the Kings, Hatshepsut Temple, and local breakfast.",
    ar_description: "Valley of the Kings, Hatshepsut Temple, and local breakfast.",
    type: "safari",
    images: [{ id: 23, imageUrl: image("safari-luxor") }],
    safari: {
      type: "Cultural",
      address: "Luxor West Bank",
      startLocation: "Luxor hotels",
      endLocation: "Karnak Temple",
      duration: "7 hours",
    },
  },
);

transportations.push(
  {
    id: 502,
    name: "Cairo to Alexandria Van",
    ar_name: "Cairo to Alexandria Van",
    price: 120,
    margin: 20,
    quantityAvailable: 5,
    description: "Private van for up to seven passengers.",
    ar_description: "Private van for up to seven passengers.",
    type: "transportations",
    images: [{ id: 24, imageUrl: image("transfer-van") }],
    transportation: {
      type: "Van",
      departureAddress: "Downtown Cairo",
      arrivalAddress: "Alexandria Corniche",
      departureTime: "2026-06-19T07:30:00.000Z",
      arrivalTime: "2026-06-19T10:30:00.000Z",
      departingDate: "2026-06-19",
      returningDate: "2026-06-22",
    },
  },
  {
    id: 503,
    name: "Luxor Airport VIP Pickup",
    ar_name: "Luxor Airport VIP Pickup",
    price: 65,
    margin: 12,
    quantityAvailable: 8,
    description: "Meet-and-greet pickup with luggage assistance.",
    ar_description: "Meet-and-greet pickup with luggage assistance.",
    type: "transportations",
    images: [{ id: 25, imageUrl: image("transfer-vip") }],
    transportation: {
      type: "SUV",
      departureAddress: "Luxor International Airport",
      arrivalAddress: "Luxor Nile Palace",
      departureTime: "2026-07-05T14:00:00.000Z",
      arrivalTime: "2026-07-05T14:30:00.000Z",
      departingDate: "2026-07-05",
      returningDate: "2026-07-12",
    },
  },
);

standardPackages.push(
  {
    id: 602,
    name: "Red Sea Adventure 6 Days",
    ar_name: "Red Sea Adventure 6 Days",
    price: 980,
    margin: 90,
    stars: 5,
    quantityAvailable: 7,
    description: "Hurghada resort, diving day, desert safari, and airport transfers.",
    ar_description: "Hurghada resort, diving day, desert safari, and airport transfers.",
    type: "standard-packages",
    images: [{ id: 26, imageUrl: image("package-redsea") }],
  },
  {
    id: 603,
    name: "Luxor Heritage Weekend",
    ar_name: "Luxor Heritage Weekend",
    price: 520,
    margin: 48,
    stars: 4,
    quantityAvailable: 12,
    description: "Two-night Nile stay with guided temple and west bank tours.",
    ar_description: "Two-night Nile stay with guided temple and west bank tours.",
    type: "standard-packages",
    images: [{ id: 27, imageUrl: image("package-luxor") }],
  },
);

customPackages.push(
  {
    id: 702,
    name: "Executive Cairo Business Trip",
    description: "Airport pickup, business hotel, meeting transport, and dinner cruise.",
    price: 1260,
    margin: 95,
    quantityAvailable: 1,
    images: [{ id: 28, imageUrl: image("custom-business") }],
  },
  {
    id: 703,
    name: "Honeymoon Nile & Red Sea",
    description: "Nile cruise, luxury beach resort, private transfers, and visa support.",
    price: 3140,
    margin: 240,
    quantityAvailable: 1,
    images: [{ id: 29, imageUrl: image("custom-honeymoon") }],
  },
);

readyVisas.push(
  {
    id: 803,
    name: "Schengen Tourist Visa",
    ar_name: "Schengen Tourist Visa",
    country: "FR",
    type: "ReadyVisa",
    price: 240,
    margin: 35,
    quantityAvailable: 18,
    description: "Document checklist and appointment support for France.",
    images: [{ id: 30, imageUrl: image("visa-schengen") }],
  },
  {
    id: 804,
    name: "UK Visitor Visa",
    ar_name: "UK Visitor Visa",
    country: "GB",
    type: "ReadyVisa",
    price: 310,
    margin: 45,
    quantityAvailable: 12,
    description: "Visitor visa preparation with travel history review.",
    images: [{ id: 31, imageUrl: image("visa-uk") }],
  },
  {
    id: 805,
    name: "Turkey e-Visa",
    ar_name: "Turkey e-Visa",
    country: "TR",
    type: "ReadyVisa",
    price: 85,
    margin: 15,
    quantityAvailable: 50,
    description: "Fast e-Visa processing for eligible passport holders.",
    images: [{ id: 32, imageUrl: image("visa-turkey") }],
  },
);

reservations.push(
  {
    id: 1004,
    quantity: 3,
    status: "confirmed",
    totalPrice: 585,
    checkInDate: "2026-06-19",
    checkOutDate: "2026-06-22",
    updatedAt: "2026-05-16T12:45:00.000Z",
    travelOffice: travelOffices[2],
    service: rooms[2],
    travelers: [{ ...traveler, id: 9004, firstName: "Malak", lastName: "Fouad" }],
  },
  {
    id: 1005,
    quantity: 2,
    status: "pending",
    totalPrice: 1220,
    checkInDate: "2026-08-05",
    checkOutDate: null,
    updatedAt: "2026-05-15T18:05:00.000Z",
    travelOffice: travelOffices[3],
    service: flights[4],
    travelers: [{ ...traveler, id: 9005, firstName: "Tamer", lastName: "Khaled" }],
  },
  {
    id: 1006,
    quantity: 1,
    status: "cancelled",
    totalPrice: 520,
    checkInDate: "2026-07-11",
    checkOutDate: "2026-07-13",
    updatedAt: "2026-05-14T09:00:00.000Z",
    travelOffice: travelOffices[4],
    service: standardPackages[2],
    travelers: [{ ...traveler, id: 9006, firstName: "Amira", lastName: "Mostafa" }],
  },
  {
    id: 1007,
    quantity: 4,
    status: "request_action",
    totalPrice: 3920,
    checkInDate: "2026-07-18",
    checkOutDate: "2026-07-24",
    updatedAt: "2026-05-13T15:30:00.000Z",
    travelOffice: travelOffices[1],
    service: standardPackages[1],
    travelers: [{ ...traveler, id: 9007, firstName: "Mona", lastName: "Rashad" }],
  },
  {
    id: 1008,
    quantity: 1,
    status: "confirmed",
    totalPrice: 3140,
    checkInDate: "2026-09-02",
    checkOutDate: "2026-09-12",
    updatedAt: "2026-05-12T11:20:00.000Z",
    travelOffice: travelOffices[0],
    customPackage: customPackages[2],
    travelers: [{ ...traveler, id: 9008, firstName: "Nadine", lastName: "Sherif" }],
  },
);

visaReservations.push(
  {
    id: 2003,
    quantity: 1,
    status: "pending",
    totalPrice: 240,
    checkInDate: "2026-07-02",
    updatedAt: "2026-05-17T10:25:00.000Z",
    country: "FR",
    visaType: "Tourist",
    travelOffice: travelOffices[2],
    service: readyVisas[2],
    travelers: [{ ...traveler, id: 9009, firstName: "Farida", lastName: "Gamal" }],
  },
  {
    id: 2004,
    quantity: 2,
    status: "request_action",
    totalPrice: 620,
    checkInDate: "2026-08-05",
    updatedAt: "2026-05-16T14:50:00.000Z",
    country: "GB",
    visaType: "Visitor",
    travelOffice: travelOffices[3],
    service: readyVisas[3],
    travelers: [{ ...traveler, id: 9010, firstName: "Adel", lastName: "Saber" }],
  },
  {
    id: 2005,
    quantity: 3,
    status: "confirmed",
    totalPrice: 255,
    checkInDate: "2026-06-22",
    updatedAt: "2026-05-15T09:40:00.000Z",
    country: "TR",
    visaType: "e-Visa",
    travelOffice: travelOffices[4],
    service: readyVisas[4],
    travelers: [{ ...traveler, id: 9011, firstName: "Heba", lastName: "Amin" }],
  },
);

accounts.push(
  { id: 3, balance: 14320, travelOffice: travelOffices[2] },
  { id: 4, balance: 22110, travelOffice: travelOffices[3] },
  { id: 5, balance: 6890, travelOffice: travelOffices[4] },
);

transactions.push(
  {
    id: 3,
    type: "deposit",
    amount: 6200,
    createdAt: "2026-05-14T10:00:00.000Z",
    account: accounts[2],
  },
  {
    id: 4,
    type: "withdraw",
    amount: 980,
    createdAt: "2026-05-15T12:15:00.000Z",
    account: accounts[3],
  },
  {
    id: 5,
    type: "deposit",
    amount: 3140,
    createdAt: "2026-05-17T16:30:00.000Z",
    account: accounts[4],
  },
  {
    id: 6,
    type: "withdraw",
    amount: 255,
    createdAt: "2026-05-18T09:45:00.000Z",
    account: accounts[4],
  },
);

notifications.push(
  {
    id: 3,
    message: "Flight reservation is waiting for confirmation.",
    isRead: false,
    created_at: "2026-05-17T18:10:00.000Z",
    reservation: reservations[4],
  },
  {
    id: 4,
    message: "Package reservation requires price adjustment.",
    isRead: false,
    created_at: "2026-05-16T15:35:00.000Z",
    reservation: reservations[6],
  },
  {
    id: 5,
    message: "UK visa request needs missing bank statement.",
    isRead: true,
    created_at: "2026-05-16T14:55:00.000Z",
    reservation: visaReservations[3],
  },
);

requirementByCountry.FR = [
  { id: 5, country: "FR", title: "Passport copy", description: "Valid for at least six months." },
  { id: 6, country: "FR", title: "Bank statement", description: "Last six months, stamped." },
  { id: 7, country: "FR", title: "Travel insurance", description: "Coverage for all Schengen dates." },
];
requirementByCountry.GB = [
  { id: 8, country: "GB", title: "Passport copy", description: "Valid passport with travel history." },
  { id: 9, country: "GB", title: "Employment letter", description: "Signed HR letter with salary details." },
  { id: 10, country: "GB", title: "Bank statement", description: "Last six months." },
];
requirementByCountry.TR = [
  { id: 11, country: "TR", title: "Passport copy", description: "Valid for at least six months." },
  { id: 12, country: "TR", title: "Hotel booking", description: "Confirmed stay details." },
];

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
