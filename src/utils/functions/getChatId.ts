export default function getChatId(phone: string) {
  if (phone[0] === "8") {
    phone = "8" + phone.slice(1);
  }
  return `${phone}@c.us`;
}
