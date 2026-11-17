# Fiknoria Treasure Website

**Tagline:** A World of Little Discoveries

## Folder structure

```
fiknoria-treasure/
├── index.html          (Home)
├── about.html          (About)
├── products.html       (Digital Products)
├── gallery.html        (Gallery)
├── faq.html            (FAQ)
├── contact.html        (Contact form + map)
├── README.md
├── css/
│   └── style.css       (common styles, har page mein linked)
├── js/
│   └── main.js         (menu, filters, lightbox, FAQ, form)
├── images/
│   └── logo.svg        (+ aapki images yahan rakhein)
└── google-apps-script/
    └── Code.gs         (Google Sheet ke liye)
```

## VS Code mein chalane ke steps

1. VS Code kholen > **File > Open Folder** > `fiknoria-treasure` folder select karein.
2. **Extensions** (Ctrl+Shift+X) mein **Live Server** (Ritwick Dey) install karein.
3. `index.html` par right-click > **Open with Live Server**.
4. Browser mein `http://127.0.0.1:5500` khulega. Code save karte hi page khud refresh hoga.

## Images kahan lagani hain

Har placeholder par likha hai ke kaun si image chahiye. Image ko `images/` folder mein **isi naam se** save karein, wo khud placeholder ki jagah aa jayegi (HTML edit karne ki zaroorat nahi).

| File name | Kahan use hoti hai |
|---|---|
| hero.jpg | Home page ka bara image (portrait best) |
| why-us.jpg | Home > Why choose us |
| about.jpg | About > Our story |
| team-1.jpg, team-2.jpg, team-3.jpg | About > Team (square) |
| product-1.jpg ... product-6.jpg | Products page covers |
| gallery-1.jpg ... gallery-9.jpg | Gallery page |

Logo: `images/logo.svg` ko apne logo se replace kar sakte hain (same naam rakhein, ya sab HTML mein path badlein).

## Google Sheet mein contact form data save karne ke steps

1. Naya Google Sheet banayein (naam: *Fiknoria Contact Messages*).
2. **Extensions > Apps Script** kholen.
3. Purana code delete karke `google-apps-script/Code.gs` ka poora code paste karein. **Save** karein.
4. **Deploy > New deployment** par click karein.
5. Gear icon > type **Web app** select karein.
   - Execute as: **Me**
   - Who has access: **Anyone**
6. **Deploy** dabayein. Google permission maange to **Authorize access** > apna account > Advanced > Go to project (unsafe) > Allow.
7. **Web app URL** copy karein (`https://script.google.com/macros/s/.../exec`).
8. `js/main.js` mein sab se upar `PASTE_YOUR_WEB_APP_URL_HERE` ki jagah yeh URL paste karein.
9. Contact page se test message bhejein. Sheet mein **Messages** tab ban jayega aur data aa jayega.

**Note:** Agar baad mein `Code.gs` mein koi change karein to **Deploy > Manage deployments > Edit > New version** karna zaroori hai, warna purana code chalta rahega.

## Kya kya edit karna hai

- Testimonials (index.html): abhi placeholder hain, asli reviews likhein.
- About stats (`data-count`): apne asli numbers likhein.
- Team names (about.html).
- Products: price likhein ("Instant Download" ki jagah) aur sahi titles/descriptions.
- Social links (footer, har page mein): `facebook.com`, `linkedin.com`, `instagram.com` ki jagah apne profile links.
- Colors: `css/style.css` ke sab se upar `:root` mein.

## Website online karne ke liye

Netlify, Vercel ya GitHub Pages par poora folder upload kar dein (free).
