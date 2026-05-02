# HwyNe — Personal Security Portfolio

**Muhammed Emin Karkın** kişisel güvenlik araştırmacısı portfolyo sitesi.

## Yapı

```
hwyne-site/
├── index.html          → Ana sayfa
├── writeups.html       → CTF writeupları (filtrelenebilir)
├── blog.html           → Blog yazıları
├── contact.html        → İletişim
└── src/
    ├── css/
    │   └── main.css    → Tüm stiller
    ├── js/
    │   └── main.js     → Cursor, nav, animasyonlar, filtreler
    └── assets/
        └── images/     → Bugcrowd ekranları, CTF scoreboardlar, sertifikalar
```

## Özellikler

- Minimal siyah/beyaz tasarım
- Custom cursor efekti
- Scroll-triggered fade animasyonları
- Writeup kategori filtresi (Crypto / Web / Forensics / Reverse / OSINT / Misc)
- Responsive (mobil uyumlu)
- Nav scroll efekti

## Deploy (GitHub Pages)

1. Bu klasörün içeriğini `HwyNe/Website` reposuna yükle
2. Settings → Pages → Source: `main` branch, `/ (root)`
3. Site yayında!

## Yeni Writeup Eklemek

`writeups.html` içindeki `#writeup-table` div'ine yeni satır ekle:

```html
<a href="yazinin-linki.html" class="writeup-row" data-cat="web">
  <span class="writeup-row__num">14</span>
  <span class="writeup-row__title">Challenge Adı</span>
  <span class="writeup-row__cat">Web</span>
  <span class="writeup-row__arrow">→</span>
</a>
```

Kategoriler: `crypto` · `web` · `forensics` · `reverse` · `osint` · `misc`

## Yeni Blog Yazısı Eklemek

`blog.html` içine yeni `.blog-card` ekle, içeriği doldur.

---

*Araştırmaya ve öğrenmeye devam. 🔍*
