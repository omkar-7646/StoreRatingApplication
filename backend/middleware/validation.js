export const validateUserPayload = (req, res, next) => {
  const { name, email, password, address } = req.body; 
  if (!name || name.length < 20 || name.length > 60) {
    return res.status(400).json({ message: "Name must be between 20 and 60 characters." });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email." });
  }
  if (!password || password.length < 8 || password.length > 16 || !/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    return res.status(400).json({ message: "Password must be 8-16 chars, include uppercase and a special character." });
  }
  if (address && address.length > 400) return res.status(400).json({ message: "Address max 400 chars." });
  next();
};
