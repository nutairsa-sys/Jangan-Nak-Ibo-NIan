const groups = [
  ["Gerbang & autentikasi", ["Gerbang utama", "Login", "Pendaftaran akun", "Verifikasi akun", "Lupa kata sandi", "Reset kata sandi"]],
  ["Dunia utama", ["Home World / Dashboard Konsumen", "World Map", "Main Plaza", "Library", "Quick Shop", "MANTRA", "About NUTAIRSA", "Information Center"]],
  ["Pertokoan & divisi", ["IBO Master System", "Consultant", "Contractor", "Finance", "Project Management", "Administration", "Inventory", "Manufacturing", "Architecture & Design", "CAD Engineering", "Civil Engineering", "Mechanical & Electrical", "MODULVA", "Steel Fabrication", "Workshop", "Bridge & Infrastructure", "Rental", "Construction Material", "Outsiders' Market"]],
  ["Produk & transaksi", ["Product Detail", "Product Configuration", "Shopping Cart", "Checkout", "Payment", "Order Confirmation", "Product Generator"]],
  ["Ruang pribadi konsumen", ["Personal Chamber", "My Profile", "My Products", "My Licenses", "Transaction History", "Invoice", "Download Center", "Customer Support"]],
  ["Sponsor & kemitraan", ["Supported By", "Sponsored By", "Partner Registration", "Partner Profile", "Partner Submission", "Partner Dashboard"]],
  ["Founder & Royal Council", ["Founder Profile", "The Royal Council", "Rania Chamber", "Claudia Chamber", "Sonia Chamber", "Olive Chamber", "Tera Chamber", "Astrid Chamber"]],
  ["Master Owner", ["Overview", "Master Produk", "Master Resources", "Engineering", "Commercial", "Workshop", "Construction", "Rental", "Finance", "Marketing", "AI Management", "Administration"]],
  ["AEGIS Security System", ["AEGIS Command Center", "Threat Monitoring", "Access Management", "Audit Trail", "Backup & Recovery", "Emergency Lockdown"]]
];
let nextId = 1;
export const pageRegistry = groups.flatMap(([group, names]) => names.map(name => {
  const id = nextId++;
  return Object.freeze({ id, group, name, path: `/module/${String(id).padStart(2, "0")}`, access: id >= 63 ? "private" : id >= 41 && id <= 48 || id === 54 ? "authenticated" : "public", state: "planned" });
}));
export const supportingPages = Object.freeze(["Syarat & Ketentuan", "Kebijakan Privasi", "Kebijakan Penggunaan", "Kebijakan Transaksi", "Hak Kekayaan Intelektual", "Pengaduan Konsumen", "Sponsor & Partnership Management"]);
export const supportedByCategories = Object.freeze(["Technology & Software", "Material & Building", "Equipment & Machinery", "Finance & Business", "Construction & Industry", "Engineering & Standards"]);
export const sponsorTiers = Object.freeze(["Diamond Sponsor", "Platinum Sponsor", "Gold Sponsor", "Silver Sponsor", "Bronze Sponsor", "Official Partner"]);
