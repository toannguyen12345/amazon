import React from 'react';
import './Footer.css';

const titleCls = 'block text-[#ddd] text-[12px] leading-[14px] text-left';
const lineCls = 'block text-[#999] text-[12px] leading-[13.2px] text-left';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#131a22] text-gray-100 mt-auto overflow-hidden">
      <div className="max-w-none w-full px-[100px] py-[20px] mx-0">
        <div className="w-full flex flex-col justify-between">
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-7 gap-x-[34px] gap-y-[6px] max-w-[1100px] w-full mx-auto -translate-x-[80px] mt-[50px]">
              <div>
                <span className={titleCls}>Amazon Music</span>
                <span className={lineCls}>Stream millions</span>
                <span className={lineCls}>of songs</span>
              </div>
              <div>
                <span className={titleCls}>Amazon Ads</span>
                <span className={lineCls}>Reach customers</span>
                <span className={lineCls}>wherever they</span>
                <span className={lineCls}>spend their time</span>
              </div>
              <div>
                <span className={titleCls}>6pm</span>
                <span className={lineCls}>Score deals</span>
                <span className={lineCls}>on fashion brands</span>
              </div>
              <div>
                <span className={titleCls}>AbeBooks</span>
                <span className={lineCls}>Books, art</span>
                <span className={lineCls}>& collectibles</span>
              </div>
              <div>
                <span className={titleCls}>ACX</span>
                <span className={lineCls}>Audiobook</span>
                <span className={lineCls}>Publishing</span>
                <span className={lineCls}>Made Easy</span>
              </div>
              <div>
                <span className={titleCls}>Sell on Amazon</span>
                <span className={lineCls}>Start a Selling</span>
                <span className={lineCls}>Account</span>
              </div>
              <div>
                <span className={titleCls}>Veeqo</span>
                <span className={lineCls}>Shipping Software</span>
                <span className={lineCls}>Inventory</span>
                <span className={lineCls}>Management</span>
              </div>
              <div>
                <span className={titleCls}>Amazon Business</span>
                <span className={lineCls}>Everything For</span>
                <span className={lineCls}>Your Business</span>
              </div>
              <div>
                <span className={titleCls}>AmazonGlobal</span>
                <span className={lineCls}>Ship Orders</span>
                <span className={lineCls}>Internationally</span>
              </div>
              <div>
                <span className={titleCls}>Amazon Web</span>
                <span className={lineCls}>Scalable Cloud</span>
                <span className={lineCls}>Computing</span>
                <span className={lineCls}>Services</span>
              </div>
              <div>
                <span className={titleCls}>Audible</span>
                <span className={lineCls}>Listen to Books &</span>
                <span className={lineCls}>Original</span>
                <span className={lineCls}>Audio</span>
                <span className={lineCls}>Performances</span>
              </div>
              <div>
                <span className={titleCls}>Box Office Mojo</span>
                <span className={lineCls}>Find Movie</span>
                <span className={lineCls}>Box Office Data</span>
              </div>
              <div>
                <span className={titleCls}>Goodreads</span>
                <span className={lineCls}>Book reviews</span>
                <span className={lineCls}>&</span>
                <span className={lineCls}>recommendations</span>
              </div>
              <div>
                <span className={titleCls}>IMDb</span>
                <span className={lineCls}>Movies, TV</span>
                <span className={lineCls}>& Celebrities</span>
              </div>
              <div>
                <span className={titleCls}>IMDbPro</span>
                <span className={lineCls}>Get Info</span>
                <span className={lineCls}>Entertainment</span>
                <span className={lineCls}>Professionals Need</span>
              </div>
              <div>
                <span className={titleCls}>Kindle Direct</span>
                <span className={lineCls}>Indie Digital &</span>
                <span className={lineCls}>Print Publishing</span>
                <span className={lineCls}>Made Easy</span>
              </div>
              <div>
                <span className={titleCls}>Prime Video Direct</span>
                <span className={lineCls}>Video Distribution</span>
                <span className={lineCls}>Made Easy</span>
              </div>
              <div>
                <span className={titleCls}>Shopbop</span>
                <span className={lineCls}>Designer</span>
                <span className={lineCls}>Fashion Brands</span>
              </div>
              <div>
                <span className={titleCls}>Woot!</span>
                <span className={lineCls}>Deals and</span>
                <span className={lineCls}>Shenanigans</span>
              </div>
              <div>
                <span className={titleCls}>Zappos</span>
                <span className={lineCls}>Shoes &</span>
                <span className={lineCls}>Clothing</span>
              </div>
              <div>
                <span className={titleCls}>eero WiFi</span>
                <span className={lineCls}>Stream 4K Video</span>
                <span className={lineCls}>in Every Room</span>
              </div>
              <div>
                <span className={titleCls}>Blink</span>
                <span className={lineCls}>Smart Security</span>
                <span className={lineCls}>for Every Home</span>
              </div>
              <div>
                <span className={titleCls}>Neighbors App</span>
                <span className={lineCls}>Real-Time Crime</span>
                <span className={lineCls}>& Safety Alerts</span>
              </div>
              <div>
                <span className={titleCls}>Amazon</span>
                <span className={lineCls}>Top subscription</span>
                <span className={lineCls}>boxes – right to</span>
                <span className={lineCls}>your door</span>
              </div>
              <div>
                <span className={titleCls}>PillPack</span>
                <span className={lineCls}>Pharmacy</span>
                <span className={lineCls}>Simplified</span>
              </div>
              <div>
                <span className={titleCls}>Ring</span>
                <span className={lineCls}>Smart Home</span>
                <span className={lineCls}>Security Systems</span>
              </div>
            </div>
          </div>
          <div className="w-full text-[12px] leading-[13.2px] text-[#ddd] pl-[500px] pb-[30px] mt-[100px]">
            <div className="flex gap-4 footer-links">
              <a className="text-blue-400" href="#">
                Conditions of Use
              </a>
              <a className="text-blue-400" href="#">
                Privacy Notice
              </a>
              <a className="text-blue-400" href="#">
                Your Ads Privacy Choices
              </a>
            </div>
            <p className="mt-2">
              © 1996–2025, Amazon.com, Inc. or its affiliates
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
