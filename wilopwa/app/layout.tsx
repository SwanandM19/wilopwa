import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import PwaInstall from "./pwa-install";
import SplashScreen from "./splash-screen";

export const metadata: Metadata = {
  title:
    "Wilo India Mather & Platt |Pump & Pumping System |Industry | Water Management | Building Services | Wilo",
  description:
    "Wilo India is one of the world’s leading manufacturers of pumps and pump systems for residential, commercial, water supply, waste water, industries, iem",
  robots: "index, follow",
  alternates: {
    canonical: "https://wilo.com/in/en/",
    languages: {
      "en-IN": "https://wilo.com/in/en/",
    },
  },
  openGraph: {
    title:
      "Wilo India Mather & Platt |Pump & Pumping System |Industry | Water Management | Building Services",
    description:
      "Wilo India is one of the world’s leading manufacturers of pumps and pump systems for residential, commercial, water supply, waste water, industries, iem",
  },
  twitter: {
    card: "summary",
    title:
      "Wilo India Mather & Platt |Pump & Pumping System |Industry | Water Management | Building Services",
    description:
      "Wilo India is one of the world’s leading manufacturers of pumps and pump systems for residential, commercial, water supply, waste water, industries, iem",
    site: "@wilo_se",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Wilo India",
  },
  other: {
    "msapplication-TileColor": "#ffffff",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Global Wilo site stylesheets. The page relies on these external stylesheets
            for its actual visual styling; without them the page renders unstyled. */}
        <link href="https://wilo.com/resources/v124/css/style.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://wilo.com/resources/v124/js/vue/blog/index.css" media="all" />
        <link rel="stylesheet" href="https://wilo.com/resources/v124/js/vue/emergency/index.css" media="all" />

        {/* Polyfills */}
        <Script
          src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=Intl.~locale.de,Intl.~locale.en"
          strategy="beforeInteractive"
        />

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-P92ZTQ9");`}
        </Script>
      </head>
      <body className="frontofpage min-h-full flex flex-col">
        <SplashScreen />
        {children}
        <PwaInstall />

        {/* Wilo location / country switcher API, used by the country-selector modal */}
        <Script id="wilo-location-api" strategy="afterInteractive">
          {`if (typeof wiloLocationApi == "undefined") {
    window.wiloLocationApi = {
        handleAlternateLocation: (countryKey) => {
            const key = countryKey.toString().toLowerCase();
            window.location.href = window.wiloRttConfig.urls[key];
        }
    };
}`}
        </Script>

        {/* Wilo global config / retargeting */}
        <Script src="https://wilo.com/in/en/technical__mw/Wilo-Global-Config-Script.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/en/technical/Retargeting-Config-Script.js" strategy="afterInteractive" />

        {/* Core site plugin + formcentric vendor bundle */}
        <Script src="https://wilo.com/resources/v124/js/plugin.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/json2_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_3_6_0_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/select2_4_0_13_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_autocomplete_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_format_1_3_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_ui_widget_1_13_2_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/load_image_all_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/canvas_to_blob_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_xdr_transport_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_iframe_transport_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_fileupload_10_31_0_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_fileupload_process_10_31_0_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_fileupload_image_10_31_0_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vendor/formcentric/jquery_formcentric_1_9_js_min.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/script.js" strategy="afterInteractive" />

        <Script id="search-resources-base-path" strategy="afterInteractive">
          {`var SEARCH_RESOURCES_BASE_PATH = "/resources/v124/js/vue/search/"`}
        </Script>
        <Script src="https://wilo.com/resources/v124/js/vue/blog/index.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vue/search/wilo-search.js" strategy="afterInteractive" />
        <Script src="https://wilo.com/resources/v124/js/vue/emergency/index.js" strategy="afterInteractive" />
        <Script type="module" src="https://wilo.com/resources/v124/js/vendor/model-viewer.min.js" strategy="afterInteractive" />

        {/* Analytics: alternate-hreflang link + Matomo tracking */}
        <Script id="alternate-hreflang" strategy="lazyOnload">
          {`var link_hl = document.createElement("link"); link_hl.rel = "alternate"; link_hl.href = "https://wilo.com/in/en/"; link_hl.hreflang = google_tag_manager["rm"]["7643767"](83) + "-" + google_tag_manager["rm"]["7643767"](84); document.getElementsByTagName("head")[0].appendChild(link_hl);`}
        </Script>
        <Script id="matomo-tracking" strategy="lazyOnload">
          {`var _paq = window._paq = window._paq || []; _paq.push(["trackPageView"]); _paq.push(["enableLinkTracking"]); (function () { var c = "https://matomo.wilo-websites.com/"; _paq.push(["setTrackerUrl", c + "matomo.php"]); _paq.push(["setSiteId", "27"]); var a = document, b = a.createElement("script"); a = a.getElementsByTagName("script")[0]; b.type = "text/javascript"; b.async = true; b.src = c + "matomo.js"; a.parentNode.insertBefore(b, a) })();`}
        </Script>
      </body>
    </html>
  );
}
