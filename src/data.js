// data.js - seed sample routes if not present
export function ensureSeed() {
  const key = "sh_routes";
  if (!localStorage.getItem(key)) {
    const routes = [
      {
        id: 1,
        name: "Main Campus Loop",
        stops: ["Hostel A", "Faculty", "Admin Block", "Library"],
        schedule: ["07:00", "08:00", "12:00", "15:00"],
      },
      {
        id: 2,
        name: "North Loop",
        stops: ["Gate", "Library", "Clinic"],
        schedule: ["07:30", "09:00", "16:00"],
      },
    ];
    localStorage.setItem(key, JSON.stringify(routes));
  }
}

export function getRoutes() {
  return JSON.parse(localStorage.getItem("sh_routes") || "[]");
}

export function saveRoutes(routes) {
  localStorage.setItem("sh_routes", JSON.stringify(routes));
}
