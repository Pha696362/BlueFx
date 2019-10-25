export const StatusObj = {
  DISABLED: { key: 0, text: "Disabled" },
  ACTIVE: { key: 1, text: "Active" },
};

export const BOOK_OPTIONS = [
  { key: 2, text: "Top Rating", route: "RATING" },
  { key: 3, text: "New Arrival", route: "NEW_ARRIVAL" },
  { key: 4, text: "Best Novel", route: "BEST_NOVEL" },
  { key: 5, text: "Top Free", route: "FREE" },
]

export const BOOK_STATUS = [
  { key: 1, text: "Completed" },
  { key: 2, text: "Progress" },
]

export const PAYMENT_TYPES = [
  // { key: 1, text: "Buy" },
  { key: 1, text: "Subscript" },
  { key: 2, text: "Free" },
]

export const FILTER_OPTIONS = [
  { key: "phone", text: "Phone Number" },
  { key: "fullName", text: "Full Name" },
  { key: "firstName", text: "First Name" },
  { key: "lastName", text: "Last Name" },
];

export const PAY_STATUS = {
  paid: { key: 1, text: 'Paid' },
  unpaid: { key: 2, text: 'Unpaid' },
}

export const status = [
  { key: 1, name: 'Normal'},
  { key: 2, name: 'Pending'},
  { key: 3, name: 'Subscribed' },
]

export const statusObj = {
  normal: { key: 1, name: 'Normal'},
  pending: { key: 2, name: 'Pending'},
  subscribed: { key: 3, name: 'subscribed' },
}