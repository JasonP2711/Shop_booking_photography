const middlewareCORS = () => {
  try {
    // Website you wish to allow to connect
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://vercel.com/pham-thangs-projects/shop-booking-photography"
    );

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    return next();
  } catch {
    (err) => {
      return res.status(400).json({ type: err.name, error: err.message });
    };
  }
};
