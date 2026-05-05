export const metadata = {
  title: "Fishing Idea Board",
  description: "บันทึกไอเดียเหยื่อปลอม ตลาด 24 ชั่วโมง",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
