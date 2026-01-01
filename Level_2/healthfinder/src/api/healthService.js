import fallbackFacilities from "../data/facilities";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const getFacilities = async (city, type, search, full = false) => {
    try {
        const params = new URLSearchParams();
        if (city && city !== "All Cities") params.set("city", city);
        if (type && type !== "All Types") params.set("type", type);
        if (search) params.set("search", search);
        if (full) params.set("full", "true");
        const url = `${API_BASE}/facilities${params.toString() ? `?${params.toString()}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch facilities");
        const data = await res.json();
        return data;
    } catch (e) {
        console.error(e);
        return [];
    }
};

function classifyTypeLocal(record) {
    const t = String(record.type || "").toLowerCase();
    const name = String(record.name || "").toLowerCase();
    if (t.includes("vaccin") || name.includes("vaccin")) return "Vaccination Center";
    if (t.includes("matern") || name.includes("maternity")) return "Maternity Center";
    if (t.includes("health center") || t.includes("health centre") || name.includes("health center") || name.includes("health centre")) return "Health Center";
    if (t.includes("polyclinic") || t.includes("polyclinique") || t.includes("clinic") || name.includes("polyclinique") || name.includes("clinic")) return "Polyclinic";
    if (t.includes("referral") || name.includes("referral") || name.includes("teaching")) return "Referral Hospital";
    if (t.includes("hospital") || name.includes("hospital")) {
        if (name.includes("district")) return "District Hospital";
        if (name.includes("military") || name.includes("university") || name.includes("teaching")) return "Referral Hospital";
        if (name.includes("polyclinique") || name.includes("private") || name.includes("clinique") || name.includes("medicale")) return "Private Hospital";
        return "Public Hospital";
    }
    return record.type || "Other";
}

export const getCities = async () => {
    try {
        const res = await fetch(`${API_BASE}/cities`);
        if (!res.ok) throw new Error("Failed to fetch cities");
        const list = await res.json();
        const cities = ["All Cities", ...list];
        return cities;
    } catch (e) {
        console.error(e);
        // Fallback: derive cities from local facilities data
        const local = Array.from(new Set(fallbackFacilities.map((f) => f.city).filter(Boolean))).sort();
        return ["All Cities", ...local];
    }
};

export const getTypes = async () => {
    try {
        const res = await fetch(`${API_BASE}/types`);
        if (!res.ok) throw new Error("Failed to fetch types");
        const list = await res.json();
        const types = ["All Types", ...list];
        return types;
    } catch (e) {
        console.error(e);
        // Fallback: derive standardized types from local facilities data
        const local = Array.from(new Set(fallbackFacilities.map((f) => classifyTypeLocal(f)).filter(Boolean))).sort();
        return ["All Types", ...local];
    }
};

export const getFacilityById = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/facilities/${id}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const pingApi = async () => {
    try {
        const res = await fetch(`${API_BASE}/health`);
        if (!res.ok) return false;
        const data = await res.json();
        return !!data && data.ok === true;
    } catch (e) {
        console.error("API ping failed", e);
        return false;
    }
};

export const getDistricts = async () => {
    try {
        const res = await fetch(`${API_BASE}/districts`);
        if (!res.ok) throw new Error("Failed to fetch districts");
        const list = await res.json();
        return ["All Districts", ...list];
    } catch (e) {
        console.error(e);
        const local = Array.from(new Set(fallbackFacilities.map((f) => f.district).filter(Boolean))).sort();
        return ["All Districts", ...local];
    }
};

export const getSectors = async () => {
    try {
        const res = await fetch(`${API_BASE}/sectors`);
        if (!res.ok) throw new Error("Failed to fetch sectors");
        const list = await res.json();
        return list;
    } catch (e) {
        console.error(e);
        // derive sectors heuristically from local data addresses
        const sectors = new Set();
        fallbackFacilities.forEach((f) => {
            const addr = String(f.address || "");
            const match = addr.match(/([A-Za-z0-9 '\-]+)\s+[Ss]ector/);
            if (match && match[1]) sectors.add(match[1].trim());
        });
        return Array.from(sectors).sort();
    }
};

export const getFacilitiesByDistrict = async (district) => {
    try {
        const url = `${API_BASE}/districts/${encodeURIComponent(district)}/facilities`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch district facilities");
        const data = await res.json();
        return data;
    } catch (e) {
        console.error(e);
        // Fallback: group local data
        // Fallback: group local data using standardized categories
        const list = fallbackFacilities.filter((f) => String(f.district).toLowerCase() === String(district).toLowerCase());
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
            const c = classifyTypeLocal(f) || "Other";
            if (!grouped[c]) grouped[c] = [];
            grouped[c].push(f);
        });
        return grouped;
    }
};