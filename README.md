# Hund · Katze · Käfer – Angular 20 yeniden yapım

www.hund-katze-kaefer.de sitesinin Angular 20 ile, 2026 web standartlarına göre sıfırdan yazılmış hali.
Tüm sayfalar build sırasında statik HTML olarak üretilir (SSG); sonuç, mevcut Apache hosting dahil
her statik sunucuya yüklenebilir. Node sunucusu gerekmez.

## Teknik özet

| Alan | Uygulama |
| --- | --- |
| Framework | Angular 20.3 (LTS), standalone bileşenler, signals, `input()`/`computed()`, yeni control flow (`@if`, `@for`, `@defer`) |
| Render | Prerender/SSG (`outputMode: "static"`), incremental hydration, event replay, **zoneless** change detection |
| Yönlendirme | Lazy-loaded sayfalar, view transitions, anchor scrolling, galeri filtresi URL'de (`/galerie?kategorie=hunde`) |
| SEO | Sayfa başına title/description/canonical/Open Graph (`core/seo.ts`), ana sayfada `LocalBusiness` JSON-LD, otomatik `sitemap.xml`, `robots.txt`, eski `.htm` adreslerinden 301 yönlendirme |
| Erişilebilirlik | WCAG 2.2 AA hedefi: axe denetiminde 0 hata (masaüstü + mobil, 10 sayfa), skip link, klavye ile kullanılabilir galeri/lightbox (`<dialog>`), odak yönetimli form hataları |
| Performans | Lighthouse (mobil, simüle): Performans 91–93, Erişilebilirlik 100, SEO 100, CLS 0. Fontlar self-hosted + preload + metrik uyumlu fallback |
| Gizlilik (DSGVO) | Cookie yok, tracking yok, Google Fonts CDN yok. İletişim formu veri göndermez: kullanıcının e-posta programında hazır bir e-posta açar |
| Kalite | TypeScript strict, angular-eslint (template a11y kuralları dahil), Prettier, 19 birim testi (Karma/Jasmine) |

## Komutlar

```bash
npm ci                 # bağımlılıkları kur
npm start              # geliştirme sunucusu → http://localhost:4200
npm run build          # production build + sitemap.xml → dist/hund-katze-kaefer/browser
npm run preview        # build çıktısını yerelde sun → http://localhost:4300
npm run test:ci        # birim testleri (headless Chrome)
npx ng lint            # ESLint
npm run format         # Prettier
```

Node 20.19+ veya 22.12+ gerekir.

## Canlıya alma (mevcut Apache hosting)

1. `npm run build`
2. `dist/hund-katze-kaefer/browser/` klasörünün **içeriğini** (gizli `.htaccess` dosyası dahil) sunucunun web köküne yükle.
3. Sunucudaki mevcut **`Galerie/`, `PDF/` ve `Zertifikate/`** klasörlerini olduğu gibi bırak – yeni site
   aynı yolları kullanır, fotoğraflar ve PDF'ler otomatik görünür. Eski `.htm` dosyaları silinebilir;
   `.htaccess` eski adresleri 301 ile yeni adreslere yönlendirir.
4. Google Search Console'a `https://www.hund-katze-kaefer.de/sitemap.xml` adresini bildir.

Bu üç klasörün canlı sitedeki kopyası (131 fotoğraf, 21 sertifika, 2 PDF) `public/` altında da durur;
yerelde ve GitHub Pages önizlemesinde fotoğraflar bu sayede görünür. Bir fotoğraf dosyası yoksa site
kırık resim yerine pati simgeli bir yer tutucu gösterir.

## GitHub Pages önizlemesi

`main` dalına her push'ta `.github/workflows/deploy.yml` siteyi build edip
https://oeztuerkhamza.github.io/hund-katze-kaefer/ adresine yayınlar. Bu build `github-pages`
konfigürasyonunu kullanır (`angular.json`): base href `/hund-katze-kaefer/` olur ve tüm sayfalar
`noindex` alır, böylece önizleme asıl alan adıyla Google'da yarışmaz. Yerelde denemek için:

```bash
npm run build -- --configuration production,github-pages
```

Netlify/Vercel gibi başka bir hosta geçilirse `.htaccess` yerine o platformun yönlendirme dosyası
(`_redirects` / `vercel.json`) gerekir; kurallar `.htaccess` içinde listelenmiştir.

## İçerik nerede?

| Dosya | İçerik |
| --- | --- |
| `src/app/core/site.ts` | İşletme bilgileri: telefon, e-posta, adres, fiyatlar, PDF yolları, menü |
| `src/app/content/services.ts` | Hizmetler, ek hizmetler, SSS |
| `src/app/content/gallery.ts` | Galeri (131 fotoğraf). Yeni hayvan = ilgili listeye bir satır |
| `src/app/content/certificates.ts` | Sertifikalar. Yeni kayıt eklenince yıl/sıralama otomatik |
| `src/app/app.routes.ts` | Sayfa başlıkları ve meta açıklamaları |
| `src/app/pages/legal/*` | Impressum ve Datenschutz |

Sayfa metinleri eski siteden birebir kopyalanmadı; aynı bilgiler daha kısa ve güncel bir dille yeniden
yazıldı. Karin Käfer'in son okuması önerilir.

## Canlıya almadan önce kontrol listesi

- [ ] **Impressum ve Datenschutz** hukuki olarak kontrol edilsin (DDG/MStV'ye güncellendi; eski TDG/MDStV atıfları kaldırıldı).
- [ ] `src/app/pages/legal/privacy.ts` → `hostingProvider` alanına hosting firmasının adını yaz.
- [ ] Varsa USt-IdNr. Impressum'a eklensin.
- [ ] "Über mich" zaman çizelgesindeki **2018** yılı (tierbetreuung başlangıcı) doğrulansın.
- [ ] Tüm HTTPS/www ayarları çalıştıktan sonra `.htaccess` içindeki HSTS satırı açılabilir.

## Angular sürümü hakkında not

Proje istenildiği gibi **Angular 20** ile kuruldu. Angular 20'nin LTS desteği **28 Kasım 2026**'da bitiyor;
güncel sürüm Angular 22. Kod yapısı (standalone, signals, zoneless, yeni control flow) yükseltmeye hazır:

```bash
npx ng update @angular/core@21 @angular/cli@21
npx ng update @angular/core@22 @angular/cli@22
```

## Proje yapısı

```
src/app/
  core/        site.ts (işletme verisi), seo.ts (TitleStrategy + JSON-LD)
  content/     services.ts, gallery.ts, certificates.ts (+ testler)
  layout/      header, footer
  shared/      icon, ladybug (logo), pet-photo, price-tag, page-intro, cta-band, email-link
  pages/       home, services, cat-coaching, about, gallery, certificates, contact, legal, not-found
public/        .htaccess, robots.txt, favicon, ikonlar, og-image.jpg, site.webmanifest
scripts/       postbuild.mjs (sitemap.xml üretir)
```
