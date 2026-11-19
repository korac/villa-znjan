import type { Locale } from "@/i18n/routing";

/**
 * Privacy policy for /privacy, in all three languages. Written to match how
 * the site actually works - update it whenever that changes (new service,
 * new cookie, different retention). Update PRIVACY_UPDATED with it.
 *
 * Inline markup in text: **bold**. Email addresses and "azop.hr" become
 * links when rendered (see src/app/[locale]/(site)/privacy/page.tsx).
 *
 * Owner-confirmed facts (2026-11-19): controller VISTA DOMUS d.o.o.; enquiry
 * retention 12 months; Resend in the EU (Ireland); inbox on GoDaddy email;
 * PostHog EU with client IP discarded; hosting on Vercel.
 */

export const PRIVACY_UPDATED = "2026-11-19";

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "lines"; lines: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export interface PrivacySection {
  heading: string;
  blocks: PrivacyBlock[];
}

export interface PrivacyCopy {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
}

const CONTROLLER_LINES = [
  "**VISTA DOMUS d.o.o.**",
  "Makarska 9A, 21000 Split, Croatia",
  "OIB: 85005800644",
  "Email: info@villaznjan.com",
];

export const privacy: Record<Locale, PrivacyCopy> = {
  en: {
    title: "Privacy policy",
    updated: "Last updated",
    intro:
      "This policy explains what personal data we collect when you use villaznjan.com, why, and what rights you have.",
    sections: [
      {
        heading: "Who we are",
        blocks: [
          { type: "p", text: "The website villaznjan.com is run by:" },
          { type: "lines", lines: CONTROLLER_LINES },
          {
            type: "p",
            text: "We are the controller of your personal data. For any question about this policy or your data, write to info@villaznjan.com.",
          },
        ],
      },
      {
        heading: "When you send us an enquiry",
        blocks: [
          {
            type: "p",
            text: "**What we collect:** your name, email address, phone number (optional), your message, and the language of the page you used.",
          },
          {
            type: "p",
            text: "**Why:** to answer your enquiry and, if you wish, to arrange your stay. You also receive an automatic confirmation that your message arrived.",
          },
          {
            type: "p",
            text: "**Legal basis:** steps taken at your request before a possible booking (Article 6(1)(b) GDPR).",
          },
          {
            type: "p",
            text: "**How long:** we keep enquiries for 12 months and then delete them. If your enquiry leads to a booking, we keep the booking details for as long as Croatian accounting and tourism law requires.",
          },
        ],
      },
      {
        heading: "Spam protection",
        blocks: [
          {
            type: "p",
            text: "To keep the contact form free of spam and abuse:",
          },
          {
            type: "ul",
            items: [
              "**Cloudflare Turnstile** checks that the form is sent by a person, not a bot. For this, Cloudflare processes technical data such as your IP address and browser characteristics.",
              "**Rate limiting:** to stop the form being misused, we keep your IP address and the email address you enter in our server's memory for up to 24 hours. They are not written to any database and are discarded after that.",
            ],
          },
          {
            type: "p",
            text: "**Legal basis:** our legitimate interest in protecting the website and our inbox (Article 6(1)(f) GDPR).",
          },
        ],
      },
      {
        heading: "Visit statistics",
        blocks: [
          {
            type: "p",
            text: "We use **PostHog** (EU servers) to understand how the website is used, for example which pages are visited and how often the contact form is sent. We do not track you across other websites, and we do not record your screen. PostHog does not store your IP address.",
          },
          {
            type: "ul",
            items: [
              "**Without your consent:** statistics are collected **without cookies** and without storing anything on your device. A visitor is recognised only within a single day, through an anonymised code that PostHog generates and does not link to you. Legal basis: our legitimate interest in improving the website (Article 6(1)(f) GDPR).",
              '**With your consent** (if you click "Accept"): PostHog sets a cookie, so we can recognise returning visitors. Legal basis: your consent (Article 6(1)(a) GDPR), which you can withdraw at any time.',
            ],
          },
        ],
      },
      {
        heading: "Map",
        blocks: [
          {
            type: "p",
            text: 'On the homepage we show a **Google Maps** map so you can find us easily. The map is provided by Google Ireland Limited and sets cookies. **It only loads after you click "Accept"**; until then you see a placeholder instead. Data may be transferred to Google LLC in the USA, which is certified under the EU-US Data Privacy Framework.',
          },
          {
            type: "p",
            text: "**Legal basis:** your consent (Article 6(1)(a) GDPR).",
          },
        ],
      },
      {
        heading: "Cookies",
        blocks: [
          {
            type: "table",
            head: ["Name", "Purpose", "Set when", "Duration"],
            rows: [
              [
                "vz-cookie-consent (stored in your browser)",
                "Remembers your cookie choice",
                "Always",
                "Until you clear your browser data",
              ],
              [
                "PostHog cookie (ph_…_posthog)",
                "Recognises returning visitors",
                'Only after "Accept"',
                "1 year",
              ],
              [
                "Google Maps cookies",
                "Show the map",
                'Only after "Accept"',
                "Set by Google",
              ],
            ],
          },
          {
            type: "p",
            text: 'You can change your choice at any time via **"Cookie settings"** at the bottom of every page.',
          },
        ],
      },
      {
        heading: "Who processes data for us",
        blocks: [
          {
            type: "p",
            text: "We share data only with service providers who help us run the website, under contracts that oblige them to protect it:",
          },
          {
            type: "ul",
            items: [
              "**Vercel Inc.** - website hosting. Vercel's servers log technical data such as IP addresses for security and operation.",
              "**Resend** - sends the emails from the contact form, from EU servers (Ireland).",
              "**GoDaddy** - hosts our inbox info@villaznjan.com.",
              "**Cloudflare, Inc.** - spam protection (Turnstile).",
              "**PostHog Inc.** - visit statistics, on EU servers.",
              "**Google Ireland Limited** - the map, only with your consent.",
            ],
          },
          {
            type: "p",
            text: "Some of these providers are based in the USA. Where data leaves the EU, the transfer is covered by the EU-US Data Privacy Framework or the European Commission's Standard Contractual Clauses.",
          },
          {
            type: "p",
            text: "We do not sell your data, and we do not use it for automated decisions or profiling.",
          },
        ],
      },
      {
        heading: "Your rights",
        blocks: [
          { type: "p", text: "You have the right to:" },
          {
            type: "ul",
            items: [
              "access the personal data we hold about you",
              "have it corrected or deleted",
              "restrict or object to its processing",
              "receive it in a portable format",
              "withdraw your consent at any time, without affecting earlier processing",
            ],
          },
          {
            type: "p",
            text: "To use any of these rights, write to info@villaznjan.com.",
          },
          {
            type: "p",
            text: "You can also lodge a complaint with the Croatian data protection authority:",
          },
          {
            type: "lines",
            lines: [
              "**Agencija za zaštitu osobnih podataka (AZOP)**",
              "Selska cesta 136, 10000 Zagreb",
              "azop.hr",
            ],
          },
        ],
      },
      {
        heading: "Changes",
        blocks: [
          {
            type: "p",
            text: "We may update this policy when the website or the law changes. The date at the top shows the latest version.",
          },
        ],
      },
    ],
  },

  hr: {
    title: "Pravila privatnosti",
    updated: "Zadnje ažuriranje",
    intro:
      "Ova pravila objašnjavaju koje osobne podatke prikupljamo kada koristite villaznjan.com, zašto ih prikupljamo i koja su vaša prava.",
    sections: [
      {
        heading: "Tko smo mi",
        blocks: [
          { type: "p", text: "Internetsku stranicu villaznjan.com vodi:" },
          {
            type: "lines",
            lines: [
              "**VISTA DOMUS d.o.o.**",
              "Makarska 9A, 21000 Split, Hrvatska",
              "OIB: 85005800644",
              "E-pošta: info@villaznjan.com",
            ],
          },
          {
            type: "p",
            text: "Mi smo voditelj obrade vaših osobnih podataka. Za sva pitanja o ovim pravilima ili vašim podacima pišite na info@villaznjan.com.",
          },
        ],
      },
      {
        heading: "Kada nam pošaljete upit",
        blocks: [
          {
            type: "p",
            text: "**Što prikupljamo:** vaše ime, adresu e-pošte, broj telefona (nije obavezan), vašu poruku i jezik stranice koju ste koristili.",
          },
          {
            type: "p",
            text: "**Zašto:** kako bismo odgovorili na vaš upit i, ako to želite, dogovorili vaš boravak. Također ćete primiti automatsku potvrdu da je vaša poruka stigla.",
          },
          {
            type: "p",
            text: "**Pravna osnova:** radnje poduzete na vaš zahtjev prije moguće rezervacije (članak 6. stavak 1. točka (b) Opće uredbe o zaštiti podataka).",
          },
          {
            type: "p",
            text: "**Koliko dugo:** upite čuvamo 12 mjeseci, nakon čega ih brišemo. Ako vaš upit rezultira rezervacijom, podatke o rezervaciji čuvamo onoliko dugo koliko to zahtijevaju hrvatski propisi o računovodstvu i turizmu.",
          },
        ],
      },
      {
        heading: "Zaštita od neželjenih poruka",
        blocks: [
          {
            type: "p",
            text: "Kako bi obrazac za kontakt ostao zaštićen od neželjenih poruka i zlouporabe:",
          },
          {
            type: "ul",
            items: [
              "**Cloudflare Turnstile** provjerava šalje li obrazac osoba, a ne automatizirani program (bot). U tu svrhu Cloudflare obrađuje tehničke podatke poput vaše IP adrese i značajki preglednika.",
              "**Ograničenje broja slanja:** kako bismo spriječili zlouporabu obrasca, vašu IP adresu i adresu e-pošte koju unesete držimo u memoriji našeg poslužitelja najviše 24 sata. Ne zapisuju se ni u kakvu bazu podataka i nakon toga se brišu.",
            ],
          },
          {
            type: "p",
            text: "**Pravna osnova:** naš legitimni interes za zaštitu internetske stranice i našeg sandučića e-pošte (članak 6. stavak 1. točka (f) Opće uredbe o zaštiti podataka).",
          },
        ],
      },
      {
        heading: "Statistika posjeta",
        blocks: [
          {
            type: "p",
            text: "Koristimo **PostHog** (poslužitelji u EU) kako bismo razumjeli kako se stranica koristi, na primjer koje se stranice posjećuju i koliko se često šalje obrazac za kontakt. Ne pratimo vas na drugim internetskim stranicama i ne snimamo vaš zaslon. PostHog ne pohranjuje vašu IP adresu.",
          },
          {
            type: "ul",
            items: [
              "**Bez vašeg pristanka:** statistika se prikuplja **bez kolačića** i bez pohranjivanja bilo čega na vašem uređaju. Posjetitelja je moguće prepoznati samo unutar istog dana, putem anonimiziranog koda koji generira PostHog i koji se ne povezuje s vama. Pravna osnova: naš legitimni interes za poboljšanje stranice (članak 6. stavak 1. točka (f) Opće uredbe o zaštiti podataka).",
              "**S vašim pristankom** (ako kliknete „Prihvati”): PostHog postavlja kolačić kako bismo mogli prepoznati posjetitelje koji se vraćaju. Pravna osnova: vaš pristanak (članak 6. stavak 1. točka (a) Opće uredbe o zaštiti podataka), koji možete povući u bilo kojem trenutku.",
            ],
          },
        ],
      },
      {
        heading: "Karta",
        blocks: [
          {
            type: "p",
            text: "Na početnoj stranici prikazujemo kartu **Google Maps** kako biste nas lako pronašli. Kartu pruža Google Ireland Limited i ona postavlja kolačiće. **Karta se učitava tek nakon što kliknete „Prihvati”**; do tada umjesto nje vidite rezervirano mjesto. Podaci se mogu prenositi tvrtki Google LLC u SAD-u, koja je certificirana u okviru Okvira za privatnost podataka EU-a i SAD-a.",
          },
          {
            type: "p",
            text: "**Pravna osnova:** vaš pristanak (članak 6. stavak 1. točka (a) Opće uredbe o zaštiti podataka).",
          },
        ],
      },
      {
        heading: "Kolačići",
        blocks: [
          {
            type: "table",
            head: ["Naziv", "Svrha", "Postavlja se", "Trajanje"],
            rows: [
              [
                "vz-cookie-consent (pohranjeno u vašem pregledniku)",
                "Pamti vaš odabir kolačića",
                "Uvijek",
                "Dok ne izbrišete podatke preglednika",
              ],
              [
                "PostHog kolačić (ph_…_posthog)",
                "Prepoznaje posjetitelje koji se vraćaju",
                "Samo nakon „Prihvati”",
                "1 godina",
              ],
              [
                "Kolačići Google Maps",
                "Prikaz karte",
                "Samo nakon „Prihvati”",
                "Određuje Google",
              ],
            ],
          },
          {
            type: "p",
            text: "Svoj odabir možete promijeniti u bilo kojem trenutku putem poveznice **„Postavke kolačića”** na dnu svake stranice.",
          },
        ],
      },
      {
        heading: "Tko za nas obrađuje podatke",
        blocks: [
          {
            type: "p",
            text: "Podatke dijelimo samo s pružateljima usluga koji nam pomažu voditi stranicu, na temelju ugovora koji ih obvezuju na zaštitu podataka:",
          },
          {
            type: "ul",
            items: [
              "**Vercel Inc.** - smještaj (hosting) internetske stranice. Vercelovi poslužitelji bilježe tehničke podatke poput IP adresa radi sigurnosti i rada stranice.",
              "**Resend** - šalje e-poruke iz obrasca za kontakt, s poslužitelja u EU (Irska).",
              "**GoDaddy** - smješta naš sandučić e-pošte info@villaznjan.com.",
              "**Cloudflare, Inc.** - zaštita od neželjenih poruka (Turnstile).",
              "**PostHog Inc.** - statistika posjeta, na poslužiteljima u EU.",
              "**Google Ireland Limited** - karta, samo uz vaš pristanak.",
            ],
          },
          {
            type: "p",
            text: "Neki od tih pružatelja usluga imaju sjedište u SAD-u. Kada se podaci prenose izvan EU, prijenos je pokriven Okvirom za privatnost podataka EU-a i SAD-a ili standardnim ugovornim klauzulama Europske komisije.",
          },
          {
            type: "p",
            text: "Vaše podatke ne prodajemo i ne koristimo ih za automatizirano donošenje odluka ni za izradu profila.",
          },
        ],
      },
      {
        heading: "Vaša prava",
        blocks: [
          { type: "p", text: "Imate pravo:" },
          {
            type: "ul",
            items: [
              "pristupiti osobnim podacima koje o vama čuvamo",
              "zatražiti njihov ispravak ili brisanje",
              "ograničiti njihovu obradu ili joj prigovoriti",
              "dobiti ih u prenosivom obliku",
              "povući svoj pristanak u bilo kojem trenutku, bez utjecaja na raniju obradu",
            ],
          },
          {
            type: "p",
            text: "Za ostvarivanje bilo kojeg od tih prava pišite na info@villaznjan.com.",
          },
          {
            type: "p",
            text: "Pritužbu možete podnijeti i hrvatskom nadzornom tijelu za zaštitu podataka:",
          },
          {
            type: "lines",
            lines: [
              "**Agencija za zaštitu osobnih podataka (AZOP)**",
              "Selska cesta 136, 10000 Zagreb",
              "azop.hr",
            ],
          },
        ],
      },
      {
        heading: "Izmjene",
        blocks: [
          {
            type: "p",
            text: "Ova pravila možemo ažurirati kada se promijeni stranica ili propisi. Datum na vrhu označava najnoviju verziju.",
          },
        ],
      },
    ],
  },

  de: {
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert",
    intro:
      "Diese Datenschutzerklärung erläutert, welche personenbezogenen Daten wir bei der Nutzung von villaznjan.com erheben, warum wir das tun und welche Rechte Sie haben.",
    sections: [
      {
        heading: "Wer wir sind",
        blocks: [
          { type: "p", text: "Die Website villaznjan.com wird betrieben von:" },
          {
            type: "lines",
            lines: [
              "**VISTA DOMUS d.o.o.**",
              "Makarska 9A, 21000 Split, Kroatien",
              "OIB: 85005800644",
              "E-Mail: info@villaznjan.com",
            ],
          },
          {
            type: "p",
            text: "Wir sind Verantwortlicher für Ihre personenbezogenen Daten. Bei Fragen zu dieser Erklärung oder zu Ihren Daten schreiben Sie uns an info@villaznjan.com.",
          },
        ],
      },
      {
        heading: "Wenn Sie uns eine Anfrage senden",
        blocks: [
          {
            type: "p",
            text: "**Was wir erheben:** Ihren Namen, Ihre E-Mail-Adresse, Ihre Telefonnummer (optional), Ihre Nachricht und die Sprache der Seite, die Sie verwendet haben.",
          },
          {
            type: "p",
            text: "**Warum:** um Ihre Anfrage zu beantworten und, wenn Sie möchten, Ihren Aufenthalt zu vereinbaren. Sie erhalten außerdem eine automatische Bestätigung, dass Ihre Nachricht angekommen ist.",
          },
          {
            type: "p",
            text: "**Rechtsgrundlage:** Maßnahmen auf Ihre Anfrage vor einer möglichen Buchung (Art. 6 Abs. 1 lit. b DSGVO).",
          },
          {
            type: "p",
            text: "**Wie lange:** Wir bewahren Anfragen 12 Monate auf und löschen sie danach. Führt Ihre Anfrage zu einer Buchung, bewahren wir die Buchungsdaten so lange auf, wie es das kroatische Buchhaltungs- und Tourismusrecht vorschreibt.",
          },
        ],
      },
      {
        heading: "Schutz vor Spam",
        blocks: [
          {
            type: "p",
            text: "Um das Kontaktformular vor Spam und Missbrauch zu schützen:",
          },
          {
            type: "ul",
            items: [
              "**Cloudflare Turnstile** prüft, ob das Formular von einem Menschen und nicht von einem Bot gesendet wird. Dazu verarbeitet Cloudflare technische Daten wie Ihre IP-Adresse und Merkmale Ihres Browsers.",
              "**Begrenzung der Anfragen:** Um Missbrauch des Formulars zu verhindern, speichern wir Ihre IP-Adresse und die von Ihnen eingegebene E-Mail-Adresse bis zu 24 Stunden im Arbeitsspeicher unseres Servers. Sie werden in keine Datenbank geschrieben und danach verworfen.",
            ],
          },
          {
            type: "p",
            text: "**Rechtsgrundlage:** unser berechtigtes Interesse am Schutz der Website und unseres Postfachs (Art. 6 Abs. 1 lit. f DSGVO).",
          },
        ],
      },
      {
        heading: "Besuchsstatistiken",
        blocks: [
          {
            type: "p",
            text: "Wir nutzen **PostHog** (Server in der EU), um zu verstehen, wie die Website genutzt wird, zum Beispiel welche Seiten besucht werden und wie oft das Kontaktformular gesendet wird. Wir verfolgen Sie nicht auf anderen Websites und zeichnen Ihren Bildschirm nicht auf. PostHog speichert Ihre IP-Adresse nicht.",
          },
          {
            type: "ul",
            items: [
              "**Ohne Ihre Einwilligung:** Die Statistiken werden **ohne Cookies** und ohne Speicherung auf Ihrem Gerät erhoben. Ein Besucher wird nur innerhalb eines Tages wiedererkannt, über einen anonymisierten Code, den PostHog erzeugt und nicht mit Ihnen verknüpft. Rechtsgrundlage: unser berechtigtes Interesse an der Verbesserung der Website (Art. 6 Abs. 1 lit. f DSGVO).",
              "**Mit Ihrer Einwilligung** (wenn Sie auf „Akzeptieren“ klicken): PostHog setzt ein Cookie, damit wir wiederkehrende Besucher erkennen können. Rechtsgrundlage: Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit widerrufen können.",
            ],
          },
        ],
      },
      {
        heading: "Karte",
        blocks: [
          {
            type: "p",
            text: "Auf der Startseite zeigen wir eine Karte von **Google Maps**, damit Sie uns leicht finden. Die Karte wird von der Google Ireland Limited bereitgestellt und setzt Cookies. **Sie wird erst geladen, nachdem Sie auf „Akzeptieren“ geklickt haben**; bis dahin sehen Sie stattdessen einen Platzhalter. Daten können an die Google LLC in den USA übermittelt werden, die nach dem EU-US Data Privacy Framework zertifiziert ist.",
          },
          {
            type: "p",
            text: "**Rechtsgrundlage:** Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).",
          },
        ],
      },
      {
        heading: "Cookies",
        blocks: [
          {
            type: "table",
            head: ["Name", "Zweck", "Gesetzt", "Dauer"],
            rows: [
              [
                "vz-cookie-consent (in Ihrem Browser gespeichert)",
                "Speichert Ihre Cookie-Auswahl",
                "Immer",
                "Bis Sie Ihre Browserdaten löschen",
              ],
              [
                "PostHog-Cookie (ph_…_posthog)",
                "Erkennt wiederkehrende Besucher",
                "Nur nach „Akzeptieren“",
                "1 Jahr",
              ],
              [
                "Google-Maps-Cookies",
                "Anzeige der Karte",
                "Nur nach „Akzeptieren“",
                "Von Google festgelegt",
              ],
            ],
          },
          {
            type: "p",
            text: "Sie können Ihre Auswahl jederzeit über **„Cookie-Einstellungen“** am Ende jeder Seite ändern.",
          },
        ],
      },
      {
        heading: "Wer Daten für uns verarbeitet",
        blocks: [
          {
            type: "p",
            text: "Wir geben Daten nur an Dienstleister weiter, die uns beim Betrieb der Website helfen, auf Grundlage von Verträgen, die sie zum Schutz der Daten verpflichten:",
          },
          {
            type: "ul",
            items: [
              "**Vercel Inc.** - Hosting der Website. Die Server von Vercel protokollieren technische Daten wie IP-Adressen für Sicherheit und Betrieb.",
              "**Resend** - versendet die E-Mails aus dem Kontaktformular, von Servern in der EU (Irland).",
              "**GoDaddy** - stellt unser Postfach info@villaznjan.com bereit.",
              "**Cloudflare, Inc.** - Schutz vor Spam (Turnstile).",
              "**PostHog Inc.** - Besuchsstatistiken, auf Servern in der EU.",
              "**Google Ireland Limited** - die Karte, nur mit Ihrer Einwilligung.",
            ],
          },
          {
            type: "p",
            text: "Einige dieser Dienstleister haben ihren Sitz in den USA. Werden Daten außerhalb der EU übermittelt, ist die Übermittlung durch das EU-US Data Privacy Framework oder die Standardvertragsklauseln der Europäischen Kommission abgesichert.",
          },
          {
            type: "p",
            text: "Wir verkaufen Ihre Daten nicht und nutzen sie weder für automatisierte Entscheidungen noch für Profiling.",
          },
        ],
      },
      {
        heading: "Ihre Rechte",
        blocks: [
          { type: "p", text: "Sie haben das Recht:" },
          {
            type: "ul",
            items: [
              "Auskunft über die personenbezogenen Daten zu erhalten, die wir über Sie speichern",
              "sie berichtigen oder löschen zu lassen",
              "ihre Verarbeitung einschränken zu lassen oder ihr zu widersprechen",
              "sie in einem übertragbaren Format zu erhalten",
              "Ihre Einwilligung jederzeit zu widerrufen, ohne dass die frühere Verarbeitung davon berührt wird",
            ],
          },
          {
            type: "p",
            text: "Um eines dieser Rechte auszuüben, schreiben Sie uns an info@villaznjan.com.",
          },
          {
            type: "p",
            text: "Sie können sich außerdem bei der kroatischen Datenschutzbehörde beschweren:",
          },
          {
            type: "lines",
            lines: [
              "**Agencija za zaštitu osobnih podataka (AZOP)**",
              "Selska cesta 136, 10000 Zagreb",
              "azop.hr",
            ],
          },
        ],
      },
      {
        heading: "Änderungen",
        blocks: [
          {
            type: "p",
            text: "Wir können diese Erklärung anpassen, wenn sich die Website oder die Rechtslage ändert. Das Datum oben zeigt die aktuelle Fassung.",
          },
        ],
      },
    ],
  },
};
