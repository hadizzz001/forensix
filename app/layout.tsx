'use client'

import { Footer, Navbar2 } from '../components'
import './globals.css'
import './custom.css'
import './bootstrap.min.css'
import './bs-select.css'
import './slick.css' 
import GifLoader from '../components/GifLoader'
import WhatsAppIcon from '../components/WhatsAppIcon';   

 


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {




 

 

  return (
    <html lang="en"  >
<head>
  {/* Standard Meta Tags */}
  <meta charSet="utf-8" />
  <meta httpEquiv="Content-Language" content="en" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <meta name="robots" content="max-image-preview:large" />
  <meta name="theme-color" content="#ffffff" />
  <meta name="msapplication-TileColor" content="#ffffff" />

  {/* SEO */}
  <title>Forensix</title>
  <meta
    name="description"
    content="Forensix discover how artificial intelligence is transforming the detection and prevention of financial crimes"
  />

  {/* Open Graph */}
  <meta property="og:title" content="Forensix" />
  <meta
    property="og:description"
    content="Forensix discover how artificial intelligence is transforming the detection and prevention of financial crimes"
  />
  <meta property="og:url" content="https://rafidaham.com" />
  <meta property="og:site_name" content="Forensix" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762694406/897bba68-1092-4b61-bca9-a5bf4dea9633_xgbvgi.jpg" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Forensix" />
  <meta
    name="twitter:description"
    content="Forensix discover how artificial intelligence is transforming the detection and prevention of financial crimes"
  />
  <meta name="twitter:image" content="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762694406/897bba68-1092-4b61-bca9-a5bf4dea9633_xgbvgi.jpg" />

  {/* Icons */}
  <link rel="apple-touch-icon" sizes="180x180" href="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762694406/897bba68-1092-4b61-bca9-a5bf4dea9633_xgbvgi.jpg" />
  <link rel="icon" sizes="32x32" href="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762694406/897bba68-1092-4b61-bca9-a5bf4dea9633_xgbvgi.jpg" />
  <link rel="icon" sizes="16x16" href="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762694406/897bba68-1092-4b61-bca9-a5bf4dea9633_xgbvgi.jpg" />
  <link rel="icon" href="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762694406/897bba68-1092-4b61-bca9-a5bf4dea9633_xgbvgi.jpg" type="image/x-icon" />
  <link rel="shortcut icon" href="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762694406/897bba68-1092-4b61-bca9-a5bf4dea9633_xgbvgi.jpg" type="image/x-icon" />

  {/* Fonts & Styles */}
  <link rel="preload" as="style" href="css/webfonts-3e3c2400.css" />
  <link rel="stylesheet" href="css/webfonts-3e3c2400.css" media="print" />
  <link rel="stylesheet" href="css/style-4109db2b.css" />
  <link href="https://fonts.cdnfonts.com/css/futura-std-4" rel="stylesheet" />

<link href="https://fonts.cdnfonts.com/css/neue-helvetica-bq" rel="stylesheet"/>
<link href="https://fonts.cdnfonts.com/css/helvetica-neue-55?styles=16016" rel="stylesheet" />


<link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet"/>
                      
                    
 
  {/* Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Forensix",
        url: "https://rafidaham.com",
        logo: "https://res.cloudinary.com/dn23oe6gg/image/upload/v1762694406/897bba68-1092-4b61-bca9-a5bf4dea9633_xgbvgi.jpg",
      }),
    }}
  />



</head>


      <body>
        <GifLoader />  
            <Navbar2 />
            <WhatsAppIcon /> 
            {children}
            <Footer />  
      </body>
    </html>
  )
}
