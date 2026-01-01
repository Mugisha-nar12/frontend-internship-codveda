const STORAGE_KEY = "savedFacilities";

export const getSavedFacilities = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
};

export const isSaved = (id) => {
    return getSavedFacilities().some((f) => String(f.id) === String(id));
};

export const saveFacility = (facility) => {
    const list = getSavedFacilities();
    if (!list.some((f) => String(f.id) === String(facility.id))) {
        list.push(facility);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    return list;
};

export const removeFacility = (id) => {
    let list = getSavedFacilities();
    list = list.filter((f) => String(f.id) !== String(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
};
