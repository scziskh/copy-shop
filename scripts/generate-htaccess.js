const fs = require("fs");
const path = require("path");

const domain = "site\\.copy\\-shop\\.ua";
const fullUrl = "https://site.copy-shop.ua";

const categoryRedirects = [
  { old: "cutting", next: "marketing-and-office" },
  { old: "single-letter", next: "marketing-and-office" },
  { old: "large-format-printing", next: "large-format" },
  { old: "envelops", next: "invitations-and-envelopes" },
  { old: "stickers", next: "stickers-and-labels" },
  { old: "books", next: "multipage-printing" },
  { old: "constructions", next: "pos-materials" },
  { old: "suvenir", next: "clothes" },
];

let ht = `RewriteOptions inherit\nRewriteEngine on\n\n`;

// 1. Глобальный редирект на слеш в конце (кроме файлов)
ht += `# Force trailing slash\n`;
ht += `RewriteCond %{REQUEST_FILENAME} !-f\n`;
ht += `RewriteCond %{REQUEST_URI} !(.*)/$\n`;
ht += `RewriteRule ^(.*)$ $1/ [R=301,L]\n\n`;

// 2. Редиректы категорий (обрабатывают и со слешем, и без)
ht += `# Category redirects\n`;
categoryRedirects.forEach(({ old, next }) => {
  ["uk", "ru"].forEach((lang) => {
    ht += `RewriteCond %{HTTP_HOST} ^${domain}$ [OR]\n`;
    ht += `RewriteCond %{HTTP_HOST} ^www\\.${domain}$\n`;
    ht += `RewriteRule ^${lang}/categories/${old}/?$ "${fullUrl}/${lang}/categories/${next}/" [R=301,L]\n`;
  });
});

// 3. Редиректы продуктов
ht += `\n# Product redirects\n`;
ht += `RewriteCond %{HTTP_HOST} ^.*$\n`;
ht += `RewriteRule ^product\\/?(.*)$ "${fullUrl}/uk/product/$1" [R=301,L]\n`;
ht += `RewriteRule ^uk/product/?$ "${fullUrl}/uk/categories/" [R=301,L]\n`;
ht += `RewriteRule ^ru/product/?$ "${fullUrl}/ru/categories/" [R=301,L]\n`;

// 4. Системные настройки
ht += `\n# 404 and Static Routing\nErrorDocument 404 /404.html\n\n`;
ht += `RewriteCond %{REQUEST_FILENAME} !-f\n`;
ht += `RewriteCond %{REQUEST_FILENAME}.html -f\n`;
ht += `RewriteRule ^(.*)$ $1.html [L]\n`;

const outDir = path.join(__dirname, "../out");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, ".htaccess"), ht.trim() + "\n");

console.log("✅ .htaccess generated in /out");
