// storage.js - manage users and bookings in localStorage
const USERS = "sh_users";
const BOOKINGS = "sh_bookings";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS) || "[]");
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS, JSON.stringify(users));
}

export function findUserByEmail(email) {
  return getUsers().find((u) => u.email === email);
}

export function saveBooking(booking) {
  const arr = JSON.parse(localStorage.getItem(BOOKINGS) || "[]");
  arr.push(booking);
  localStorage.setItem(BOOKINGS, JSON.stringify(arr));
}

export function getBookingsByUser(email) {
  const arr = JSON.parse(localStorage.getItem(BOOKINGS) || "[]");
  return arr
    .filter((b) => b.bookedBy === email)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getAllBookings() {
  return JSON.parse(localStorage.getItem(BOOKINGS) || "[]");
}
