import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, "data", "facilities.json");

function readFacilities() {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw);
}

app.get("/", (req, res) => {
    res.json({ ok: true, message: "Healthfinder API" });
});

// GET /facilities?search=&type=&city=
app.get("/facilities", (req, res) => {
    const { search = "", type, city, full } = req.query;
    let list = readFacilities();
    if (city) list = list.filter((f) => String(f.city).toLowerCase() === String(city).toLowerCase());
    if (type) list = list.filter((f) => String(classifyType(f)).toLowerCase() === String(type).toLowerCase());
    if (search) {
        const q = String(search).toLowerCase();
        list = list.filter((f) =>
            String(f.name).toLowerCase().includes(q) ||
            String(f.address).toLowerCase().includes(q) ||
            String(f.city || "").toLowerCase().includes(q) ||
            String(f.district || "").toLowerCase().includes(q) ||
            String(f.province || "").toLowerCase().includes(q)
        );
    }
    // If client requests full records (e.g., for mapping/nearby), return full objects
    if (String(full) === "true") {
        return res.json(list);
    }

    // Otherwise return a lightweight list for the card layout (id, name, address, type)
    const summary = list.map((f) => ({ id: f.id, name: f.name, address: f.address, type: classifyType(f) }));
    res.json(summary);
});

// GET /cities - list of unique cities
app.get("/cities", (req, res) => {
    const list = readFacilities();
    const cities = Array.from(new Set(list.map((f) => f.city).filter(Boolean))).sort();
    res.json(cities);
});

// GET /districts - unique districts
app.get("/districts", (req, res) => {
    const list = readFacilities();
    const districts = Array.from(new Set(list.map((f) => f.district).filter(Boolean))).sort();
    res.json(districts);
});

// GET /sectors - attempt to parse 'Sector' from address fields
app.get("/sectors", (req, res) => {
    const list = readFacilities();
    const sectors = new Set();
    list.forEach((f) => {
        const addr = String(f.address || "");
        const match = addr.match(/([A-Za-z0-9 '\-]+)\s+[Ss]ector/);
        if (match && match[1]) sectors.add(match[1].trim());
    });
    res.json(Array.from(sectors).sort());
});

// GET /types - list of unique facility types
// Normalize types into a consistent set for frontend
function classifyType(record) {
    const t = String(record.type || "").toLowerCase();
    const name = String(record.name || "").toLowerCase();
    if (t.includes("vaccin") || name.includes("vaccin")) return "Vaccination Center";
    if (t.includes("matern") || name.includes("maternity")) return "Maternity Center";
    if (t.includes("health center") || t.includes("health centre") || name.includes("health center") || name.includes("health centre")) return "Health Center";
    if (t.includes("polyclinic") || t.includes("polyclinique") || t.includes("clinic") || name.includes("polyclinique") || name.includes("clinic")) return "Polyclinic";
    if (t.includes("referral") || name.includes("referral") || name.includes("teaching")) return "Referral Hospital";
    if (t.includes("hospital") || name.includes("hospital")) {
        // Distinguish district vs other hospitals by name
        if (name.includes("district")) return "District Hospital";
        // military/university -> referral/public
        if (name.includes("military") || name.includes("university") || name.includes("teaching")) return "Referral Hospital";
        // guess private vs public by keywords
        if (name.includes("polyclinique") || name.includes("private") || name.includes("clinique") || name.includes("medicale")) return "Private Hospital";
        return "Public Hospital";
    }
    // fallback
    return record.type || "Other";
}

app.get("/types", (req, res) => {
    const list = readFacilities();
    const mapped = list.map(classifyType);
    const types = Array.from(new Set(mapped.filter(Boolean))).sort();
    res.json(types);
});

// Health check
app.get("/health", (req, res) => {
    res.json({ ok: true, message: "Healthfinder API healthy" });
});

app.get("/facilities/:id", (req, res) => {
    const id = req.params.id;
    const list = readFacilities();
    const found = list.find((f) => String(f.id) === String(id));
    if (!found) return res.status(404).json({ error: "Not found" });
    // return full facility but normalize the `type` field for consistent UI
    const out = { ...found, type: classifyType(found), originalType: found.type };
    res.json(out);
});

// GET /districts/:district/facilities - grouped facilities for a district
app.get("/districts/:district/facilities", (req, res) => {
    const { district } = req.params;
    const list = readFacilities().filter((f) => String(f.district).toLowerCase() === String(district).toLowerCase());

    const categories = [
        "District Hospital",
        "Referral Hospital",
        "Private Hospital",
        "Public Hospital",
        "Health Center",
        "Maternity Center",
        "Polyclinic",
        "Vaccination Center",
        "Other",
    ];

    const grouped = {};
    categories.forEach((c) => (grouped[c] = []));

    list.forEach((f) => {
        const c = classifyType(f) || "Other";
        if (!grouped[c]) grouped[c] = [];
        grouped[c].push(f);
    });

    res.json(grouped);
});

app.get("/districts/facilities", (req, res) => {
    const list = readFacilities();
    const groupedByDistrict = {};

    list.forEach(facility => {
        const district = facility.district || "Unknown";
        if (!groupedByDistrict[district]) {
            groupedByDistrict[district] = [];
        }
        groupedByDistrict[district].push({
            name: facility.name,
            type: classifyType(facility)
        });
    });

    res.json(groupedByDistrict);
});

// GET /facilities/all/grouped - all facilities grouped by type
app.get("/facilities/all/grouped", (req, res) => {
    const list = readFacilities();

    const categories = [
        "District Hospital",
        "Referral Hospital",
        "Private Hospital",
        "Public Hospital",
        "Health Center",
        "Maternity Center",
        "Polyclinic",
        "Vaccination Center",
        "Other",
    ];

    const grouped = {};
    categories.forEach((c) => (grouped[c] = []));

    list.forEach((f) => {
        const c = classifyType(f) || "Other";
        if (!grouped[c]) grouped[c] = [];
        grouped[c].push(f);
    });

    res.json(grouped);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Healthfinder API running on http://localhost:${port}`);
});