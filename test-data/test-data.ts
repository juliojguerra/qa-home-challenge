// test-data/test-data.ts

/**
 * Centralized test data for all booking.com test cases
 */
export const TestData = {
  locations: {
    EUROPE: {
      POLAND: {
        KRAKOW: "Krakow, Poland",
        WARSAW: "Warsaw, Poland",
        GDANSK: "Gdansk, Poland",
      },
      SPAIN: {
        VALENCIA: "Busot, Valencia",
        BARCELONA: "Barcelona, Spain",
        MADRID: "Madrid, Spain",
      },
      NETHERLANDS: {
        AMSTERDAM: "Amsterdam, Netherlands",
        ROTTERDAM: "Rotterdam, Netherlands",
      },
      UK: {
        LONDON: "London, United Kingdom",
        MANCHESTER: "Manchester, United Kingdom",
      },
      FRANCE: {
        PARIS: "Paris, France",
        NICE: "Nice, France",
      },
    },
    AMERICAS: {
      USA: {
        NEW_YORK: "New York NY",
        LOS_ANGELES: "Los Angeles, California",
        MIAMI: "Miami, Florida",
      },
      PERU: {
        AREQUIPA: "Arequipa, Peru",
        AYACUCHO: "Ayacucho, Peru",
        LIMA: "Lima, Peru",
      },
      COLOMBIA: {
        MEDELLIN: "Medellin, Colombia",
        BOGOTA: "Bogota, Colombia",
      },
      CANADA: {
        TORONTO: "Toronto, Canada",
        VANCOUVER: "Vancouver, Canada",
      },
    },
    ASIA: {
      JAPAN: {
        TOKYO: "Tokyo, Japan",
        OSAKA: "Osaka, Japan",
      },
      THAILAND: {
        BANGKOK: "Bangkok, Thailand",
        PHUKET: "Phuket, Thailand",
      },
      SINGAPORE: "Singapore",
      UAE: {
        DUBAI: "Dubai, UAE",
      },
    },
  },

  dates: {
    // Offsets in days from current date
    STAYS: {
      SHORT_STAY: {
        checkIn: 1,
        checkOut: 3,
      },
      MEDIUM_STAY: {
        checkIn: 1,
        checkOut: 5,
      },
      LONG_STAY: {
        checkIn: 1,
        checkOut: 10,
      },
      FUTURE_STAY: {
        checkIn: 30,
        checkOut: 35,
      },
    },

    FLIGHTS: {
      SHORT_TRIP: {
        departOffset: 7,
        returnOffset: 10,
      },
      MEDIUM_TRIP: {
        departOffset: 14,
        returnOffset: 21,
      },
      LONG_TRIP: {
        departOffset: 30,
        returnOffset: 45,
      },
      INVALID_TRIP: {
        departOffset: 7,
        returnOffset: null, // Missing return date
      },
    },
  },

  filters: {
    GUEST_RATING: {
      VERY_GOOD: "8+",
      GOOD: "7+",
      FABULOUS: "9+",
      EXCEPTIONAL: "9.5+",
    },
    PROPERTY_TYPE: {
      HOTELS: "Hotels",
      APARTMENTS: "Apartments",
      HOSTELS: "Hostels",
      RESORTS: "Resorts",
    },
    PRICE_RANGE: {
      BUDGET: {
        min: 0,
        max: 100,
      },
      MID_RANGE: {
        min: 100,
        max: 200,
      },
      LUXURY: {
        min: 200,
        max: 500,
      },
    },
    AMENITIES: {
      POOL: "Pool",
      WIFI: "Free WiFi",
      BREAKFAST: "Breakfast included",
      PARKING: "Free parking",
    },
  },

  sorting: {
    PRICE_LOWEST: "price",
    BEST_REVIEWED: "review",
    STARS_HIGH_TO_LOW: "class descending",
    STARS_LOW_TO_HIGH: "class ascending",
    TOP_REVIEWED: "bayesian_review_score",
  },

  passengers: {
    SOLO: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    COUPLE: {
      adults: 2,
      children: 0,
      infants: 0,
    },
    FAMILY: {
      adults: 2,
      children: 2,
      infants: 0,
    },
    LARGE_GROUP: {
      adults: 5,
      children: 0,
      infants: 0,
    },
  },

  rooms: {
    SINGLE: 1,
    DOUBLE: 2,
    MULTIPLE: 3,
  },

  cabinClasses: {
    ECONOMY: "Economy",
    PREMIUM_ECONOMY: "Premium Economy",
    BUSINESS: "Business",
    FIRST: "First Class",
  },

  airports: {
    // Airport codes for reference
    EUROPE: {
      KRAKOW: "KRK",
      WARSAW: "WAW",
      AMSTERDAM: "AMS",
      BARCELONA: "BCN",
      LONDON: "LHR",
      PARIS: "CDG",
    },
    AMERICAS: {
      NEW_YORK: "JFK",
      LOS_ANGELES: "LAX",
      MEDELLIN: "MDE",
      TORONTO: "YYZ",
    },
    ASIA: {
      TOKYO: "NRT",
      BANGKOK: "BKK",
      SINGAPORE: "SIN",
      DUBAI: "DXB",
    },
  },
};
