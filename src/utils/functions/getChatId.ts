export default function getChatId(phone: string) {
  if (phone[0] === "8") {
    phone = "7" + phone.slice(1);
  }
  return `${phone}@c.us`;
}
