import { Injectable } from '@angular/core';
import { Product } from '../types/Product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  constructor() {}

  createDb() {
    const products: Product[] = [
      {
        id: 1,
        name: 'Laptop Stand',
        description:
          "【Wide Compatibility】 The laptop stand holder for desk is compatible with all laptops from 10’’ up to 17’’, such as Mac MacBook Air Pro 12 13 15 inch 2018 2019 2020 Microsoft Surface Google Pixelbook Dell XPS HP Acer Chromebook and more 11inch - 17inch laptop notebooks. Valentines Day Gifts Presents. 【Portable Design】The laptop riser can be easily adjusted to comfortable height and angle based on your actual need. Besides, you also can fold it up to carry around for travel and business trips or store it in your laptop bag. 【Upgrade Large Base】Made of high-quality aluminum alloy, the larger heavier base greatly improves the stability of the notebook stand. It will never shaking, sliding and falling when you type on your laptop with this notebook holder. 【Ergonomic Design】 The MacBook air pro stand holder works as a raiser to elevate the laptop screen to your eye level. It let you fix posture and relieves neck, shoulder and spinal pain, it's very comfortable for working at home, office and outdoor, make typing more easier. 【Heat Dissipation】The multiple ventilation holes offers better ventilation and more airflow to cool your laptop and prevent from overheating and crashes. Anti-skid silicone and smooth edge can protects your laptop from sliding and scratches.",
        image:
          'https://images-na.ssl-images-amazon.com/images/I/71pNZrEkYWL._AC_SL1500_.jpg',
        price: 78,
      },
      {
        id: 2,
        name: 'Amazon Basics Full-Size Ergonomic Wireless PC Mouse with Fast Scrolling',
        description:
          'Full-size wireless mouse with fast-scrolling, clickable wheel and forward/back thumb buttons for fast, easy navigating through large documents and web pages \t Ergonomically designed for right-handed users; smooth, gently curved profile fits perfectly in the palm of the hand for enhanced comfort \t 2.4 GHz (non-bluetooth) wireless connection; uses a small USB receiver that can stay plugged into your computer without obstructing other ports \t Optical sensor (1600 DPI resolution) works on most surfaces; uses 2 AA batteries (included); battery LED light and on/off switch for extended battery life \t Compatible with Windows 7, 8, and 10; backed by an Amazon Basics 1-year limited warranty',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/611MVODMR0L._AC_SL1201_.jpg',
        price: 28,
      },
      {
        id: 3,
        name: 'Apple MacBook Pro 16" with Touch Bar, 9th-Gen 8-Core Intel i9 2.3GHz, 32GB RAM, 1TB SSD, AMD Radeon Pro 5500M 8GB, Silver, Late 2019 Z0Y300042',
        description:
          '16" MacBook Pro with Touch Bar - 96W USB-C Power Adapter - USB-C Charge Cable (2m) - Apple 1 Year Limited Warranty Stunning 16" Retina display with True Tone technology Touch Bar and Touch ID Ultrafast SSD Six-speaker system with force-cancelling woofers',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/51H3pg8P-HL._AC_SL1200_.jpg',
        price: 3278,
        currency: 'Euro',
      },
      {
        id: 4,
        name: 'New Apple iPhone 12 Pro Max (128GB, Graphite) [Locked] + Carrier Subscription',
        description:
          'OFFER INCLUDES: An Apple iPhone and a wireless plan with unlimited data/talk/text WIRELESS PLAN: Unlimited talk, text, and data with mobile hotspot, nationwide coverage, and international reach. No long-term contract required. PROGRAM DETAILS: When you add this offer to cart, it will reflect 3 items: the iPhone, SIM kit, and carrier subscription Ceramic Shield, tougher than any smartphone glass A14 Bionic chip, the fastest chip ever in a smartphone Pro camera system with 12MP Ultra Wide, Wide and Telephoto cameras; 5x optical zoom range; Night mode, Deep Fusion, Smart HDR 3, Apple ProRAW, 4K Dolby Vision HDR recording LiDAR Scanner for improved AR experiences, Night mode portraits 12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording Industry-leading IP68 water resistance Supports MagSafe accessories for easy attachment and faster wireless charging',
        image:
          'https://www.amazon.com/dp/B08L5R1CCC/ref_=vn_s_iwp_0?pd_rd_w=MObPn&pf_rd_p=84cbcc8f-0fe2-44fc-ae2a-87f8b101dbca&pf_rd_r=BBTYKBJTAHFGFB38ZCE5&pd_rd_r=a9d44e22-43a0-44b0-bb78-5a506aeffbe7&pd_rd_wg=ACcIc&qid=1620659637#',
        price: 789,
      },
      {
        id: 5,
        name: 'Dell UltraSharp U2720Q 27 Inch 4K UHD (3840 x 2160) LED Backlit LCD IPS USB-C Monitor (7GZ651)',
        description:
          'Create an efficient workspace with the Dell UltraSharp U2720Q 27 inch 4K UHD (3840 x 2160) LED Backlit LCD IPS USB-C Monitor (7GZ651) Sleek design - 27 inch diagonal 4K UHD IPS screen with vibrant 3840 x 2160 resolution and thin profile that supports virtually seamless multi-display setups Exceptional visuals - see consistent, vibrant colors across a wide viewing angle enabled by In-Plane Switching (IPS) technology Experience simple, convenient connectivity - work with your most frequently-used devices with DisplayPort, HDMI, USB ports, and Audio Line out Display Features: Tilt, Swivel, Pivot, Vesa Mount Compatible, Anti-glare, USB Hub, LED Backlights, In Plane Switching, Security Lock Slot, Energy Star Certified, 99% sRGB color gamut',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/810ocpczsiL._AC_SL1500_.jpg',
        price: 928,
      },
      {
        id: 6,
        name: 'Sony ZX Series Wired On-Ear Headphones, Black MDR-ZX110',
        description:
          'Lightweight 1.38 in neodymium dynamic drivers deliver a punchy, rhythmic response to even the most demanding tracks The swiveling earcup design allows easy storage when you’re not using them, and enhances portability when you’re traveling Cushioned earpads for total comfort and enfolding closed-back design seals in sound The wide frequency range—spanning 12 Hz to 22 kHz—delivers deep bass, rich midrange, and soaring highs Plug: L-shaped stereo mini plug 3.5mm',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/51eJUpMRnzL._AC_SL1000_.jpg',
        price: 638,
      },
      {
        id: 7,
        name: 'Hbada Gaming Chair Racing Style Ergonomic High Back Computer Chair with Height Adjustment, Headrest and Lumbar Support E-Sports Swivel Chair with Footrest, Red',
        description:
          "Better experience: Hbada gaming racing chair is dedicated to make the gaming chair with large seat area for pro gamers. Sitting on Hbada gaming chair and improve your gaming experience with comfy! Ergonomic office chair: Hbada swivel office chair is made of high durable PU leather with removable headrest and lumbar support. It has a high backrest which ensures proper alignment and support for your back and neck. Adjustable function: Reclining backrest from 90° to 155°. 7cm height adjust armrest adapt to various desk height and sitting positions. 8cm seat height adjust makes the chair perfect for prople from 5.2' - 6' height. Quick Installation: We provided detailed and easy-to-understand installation instructions and presented the necessary installation tools. All hardwares packed into a blister with label. Enable everyone to quickly assemble into a gaming chair. Better service: If you have any questions, please contact our customer service team.",
        image:
          'https://images-na.ssl-images-amazon.com/images/I/618e5ejB7AL._AC_SL1500_.jpg',
        price: 198,
      },
      {
        id: 8,
        name: 'FEZIBO Electric Height Adjustable Standing Desk with Drawer, 48 x 24 Inches Splice Board, Black Frame/Rustic Brown Top',
        description:
          'Electric Height Adjustable: There are 4 preset buttons to customize your desired heights from 28.36 inch to 46.06 inch Pull-out Drawer: Underdesk fabric drawer frees up desk space and provides a comfortable work environment Simple Assembly: The tabletop comes packaged in 2 sections for assembly Electric Lift System: The lift system with sturdy steel. Contained an industrial-grade steel frame that able to support up to 176 lbs Trustworthy: We will provide you with efficient solutions and you could get our 30-day risk-free',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/71hvuk4p4lS._AC_SL1500_.jpg',
        price: 278,
      },
      {
        id: 9,
        name: 'NEW Microsoft Surface Book 3 - 15" Touch-Screen - 10th Gen Intel Core i7 - 16GB Memory - 256GB SSD (Latest Model) - Platinum',
        description:
          'Most powerful Surface laptop yet, with quad-core powered, 10th Gen Intel Core processors. Now 30% faster than Surface Book 2 15”. Fastest graphics on Surface, powered by NVIDIA GTX GeForce GPU. Power when you need it. Up to 17.5 hours battery life[1] — plus improved standby that extends battery life when you’re away. Robust laptop, powerful tablet, and portable studio in one. The connections you need, including USB-A, USB-C, and full-size SD card slot.',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/717iwhq63EL._AC_SL1500_.jpg',
        price: 488,
      },
      {
        id: 10,
        name: 'TCL 50-inch Class 4-Series 4K UHD Smart Roku LED TV - 50S435, 2021 Model',
        description:
          'Dimensions (W x H x D): TV without stand: 44. 1 X 25. 7 X 3. 2 inches, TV with stand: 44. 1 X 28 X 8 inches Smart functionality delivers all your favorite content with over 500,000 movies and TV episodes, accessible through the simple and intuitive Roku TV Pairs 4K Ultra HD picture clarity with the contrast, color, and detail of high dynamic range (HDR) for the most lifelike picture Direct lit LED produces great picture quality. Stand Separation Distance 39.6 inches Inputs: 3 HDMI 2. 0 with HDCP 2. 2 (one with HDMI ARC), 1 USB (media player), RF, Composite, Headphone Jack, Optical Audio Out, Ethernet',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/714hn7q7WxL._AC_SL1500_.jpg',
        price: 378,
      },
    ];
    return { products };
  }

  // Overrides the genId method to ensure that a product always has an id.
  // If the products array is empty,
  // the method below returns the initial number (1).
  // if the products array is not empty, the method below returns the highest
  // hero id + 1.
  genId(products: Product[]): number {
    return products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;
  }
}
