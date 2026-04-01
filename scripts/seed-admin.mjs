import bcrypt from "bcryptjs";

async function seedAdmin() {
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const hash = await bcrypt.hash(password, 12);
  console.log("Admin password hash (add to ADMIN_PASSWORD_HASH env var):");
  console.log(hash);
}

seedAdmin();
