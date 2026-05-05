# 🎣 Fishing Idea Board — วิธี Deploy ขึ้น Vercel

## ขั้นตอน Deploy (ง่ายมาก ✨)

### 📋 ทำตอนนี้เลย

#### **ขั้นที่ 1 — สมัครสมาชิก Vercel (ฟรี)**
1. เปิด https://vercel.com
2. กด **Sign Up** → เลือก **GitHub** (ง่ายที่สุด)
   - ถ้าไม่มี GitHub account ให้สมัคร GitHub ก่อน (ฟรี)
   - หรือใช้ Google / Email ได้

#### **ขั้นที่ 2 — Upload โปรแกรมไปที่ GitHub**
1. เปิด https://github.com
2. กด **+** (มุมบนขวา) → **New repository**
3. ตั้งชื่อ: `fishing-idea-board`
4. เลือก **Public** → กด **Create repository**

#### **ขั้นที่ 3 — Upload ไฟล์ขึ้น GitHub**
ให้ upload ไฟล์เหล่านี้ขึ้น GitHub repository ที่สร้างใหม่:
```
fishing-idea-board/
├── package.json
├── next.config.js
├── app/
│   ├── page.jsx
│   └── layout.jsx
```

**วิธี upload:** 
- เปิด GitHub → ไปที่ repository ที่สร้าง
- กด **Add file** → **Upload files**
- ลากไฟล์ขึ้นไปแล้วกด **Commit changes**

#### **ขั้นที่ 4 — Deploy กับ Vercel**
1. เปิด https://vercel.com
2. กด **Add New...** → **Project**
3. เลือก **Import Git Repository**
4. เลือก `fishing-idea-board` ที่ upload ไป GitHub
5. กด **Deploy** → รอ 1-2 นาที
6. ✅ **สำเร็จ!** ได้ URL เช่น `fishing-idea-board.vercel.app`

---

## 🎯 ใช้งาน

**เปิดจาก iPhone:**
```
https://fishing-idea-board.vercel.app
```

- เพิ่มไอเดียได้ตลาด 24 ชั่วโมง ✓
- ข้อมูลเก็บอยู่ใน browser ของคุณ ✓
- ไม่ต้องลบแชท ไม่ต้องกังวล ✓

---

## 🚀 ลิงค์ที่ต้องใช้

| ลิงค์ | ทำอะไร |
|---|---|
| https://vercel.com | Deploy ตรงนี้ |
| https://github.com | Upload ไฟล์ |
| https://fishing-idea-board.vercel.app | เข้าใช้โปรแกรม |

---

## ❓ มีปัญหา?

**Q: Deploy ไม่สำเร็จ**
- ตรวจสอบชื่อโฟลเดอร์ `app/` (ต้องเป็นตัวเล็ก)
- ตรวจสอบไฟล์ `package.json` ว่าคัดลอกครบมั้ย

**Q: ข้อมูลหายตอนปิด browser**
- ปกติดังนั้น localStorage บน Safari อาจลบตามค่าตั้ง
- ให้เก็บข้อมูลสำคัญโดยการ Export เป็น JSON

**Q: เปลี่ยน URL ได้มั้ย**
- ได้ ใน Vercel → Project Settings → Domains

---

สำเร็จแล้วไหมครับ? 🎣
