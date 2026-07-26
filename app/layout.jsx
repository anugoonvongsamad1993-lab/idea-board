export const metadata = {
  title: "TO-DO-LIST & Idea",
  description: "บันทึกไอเดีย 24 ชั่วโมง",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
