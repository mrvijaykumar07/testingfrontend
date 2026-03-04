import React from "react";
import { Link } from "react-router-dom";
import playstoreImage from "../../assets/images/icons/social/google-play-icon.png";
import appStoreImage from "../../assets/images/icons/social/app-store-icon.png";

const Footer = () => {
  return (
    <footer className="bg-[#fffaf3] text-[#222222] p-10 mt-10">
      <div className="flex flex-wrap gap-10 justify-between">
        {/* App Section */}
        <div className="max-w-md">
          <h4 className="text-xl font-bold mb-5 text-[#ba7b33]">
            Now Searching Libraries On Your Hand
          </h4>
          <p className="pb-3">Get the mobile app</p>
          <div className="flex gap-3">
            <a href="playstoreLink" target="_blank" rel="noreferrer">
              <img src={playstoreImage} alt="Google Play" className="w-32" />
            </a>
            <a href="appstoreLink" target="_blank" rel="noreferrer">
              <img src={appStoreImage} alt="App Store" className="w-32" />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h5 className="font-semibold mb-4 text-[#ba7b33]">
            <Link to="/resources/company">Company</Link>
          </h5>
          <ul className="space-y-2">
            <li><Link to="/resources/company/careers" className="hover:text-[#a65d03]">Careers</Link></li>
            <li><Link to="/resources/learn-more/getting-help" className="hover:text-[#a65d03]">Support</Link></li>
            <li><Link to="/partners/become-a-partner" className="hover:text-[#a65d03]">Become a Partner</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="font-semibold mb-4 text-[#ba7b33]">
            <Link to="/resources">Resources</Link>
          </h5>
          <ul className="space-y-2">
            <li><Link to="/resources/stay-connected/news" className="hover:text-[#a65d03]">News</Link></li>
            <li><Link to="/resources/library" className="hover:text-[#a65d03]">Library</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="font-semibold mb-4 text-[#ba7b33]">Contact Us</h5>
          <p className="text-sm leading-relaxed">
            infoCity, Patia<br />
            PO Box 752070<br />
            Bhubaneswar, Odisha<br />
            India<br /><br />
            <span className="font-bold">t.</span> 0000-000-000<br />
            <span className="font-bold">p.</span> 7854-001-224<br />
            <span className="font-bold">e.</span>{" "}
            <a href="mailto:info@byteKnot.com" className="hover:text-[#a65d03]">
              info@byteKnot.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 border-t border-[#e0c097] pt-6 text-sm flex flex-wrap justify-between items-center">
        <p>&copy; 2025 Byteknot, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
