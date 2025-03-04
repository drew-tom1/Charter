import app from "./app";

const PORT = process.env.PORT || 5173;

app.listen(PORT, () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${PORT}...`
  )
);
