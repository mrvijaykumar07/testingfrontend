import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Navbar from "./Navbar";

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How to explore libraries or coaching centers?",
      answer:
        "Go to the Home or Explore page and browse through the listed libraries or coaching centers. You can filter results by location or name to find what suits you best.",
    },
    {
      question: "How to contact a library or coaching owner?",
      answer:
        "Open the property’s details page and use the 'Call' or 'WhatsApp' buttons to directly reach the owner for inquiries or seat availability.",
    },
    {
      question: "How to use the To-Do Manager?",
      answer:
        "In the Productivity Tools section, open To-Do Manager. Add tasks, set priorities, and mark them as complete once done. Your progress updates automatically.",
    },
    {
      question: "How to access Notes and Planner?",
      answer:
        "Navigate to the Tools section from the bottom or main menu. You’ll find digital Notes and a Planner to organize your study schedule effectively.",
    },
    {
      question: "How does the Stopwatch & Timer work?",
      answer:
        "Go to Productivity Tools → Stopwatch & Timer. You can start, pause, and reset sessions to manage study or break intervals efficiently.",
    },
    {
      question: "How to track my attendance?",
      answer:
        "Under Productivity Tools, open the Attendance Tracker. Add your subjects and mark presence daily to maintain a clear record of your progress.",
    },
    {
      question: "How to list my coaching center or library?",
      answer:
        "If you’re an admin or owner, open the Admin Dashboard and click 'Add Property'. Fill in the details like name, address, images, facilities, and rules to list your center.",
    },
    {
      question: "What is StudyNest?",
      answer:
        "StudyNest is a full-stack platform that connects students and education providers. It helps students explore study spaces and use productivity tools — all in one place.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Contact Support Section */}
      <div className="bg-gray-50 py-8 mt-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Help & Support
          </h1>
          <p className="text-gray-700">
            Need help? Find answers or reach out to the StudyNest team.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="p-5 border bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <FaHeadset className="text-3xl mx-auto text-blue-600 mb-3" />
              <p className="text-sm font-semibold text-gray-800">Live Chat</p>
              <p className="text-xs text-gray-500">Coming soon</p>
            </div>

            <div className="p-5 border bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <FaEnvelope className="text-3xl mx-auto text-gray-700 mb-3" />
              <a
                href="mailto:kumarbijaybehera07@gmail.com"
                className="text-sm font-semibold text-gray-800 hover:text-blue-600"
              >
                kumarbijaybehera07@gmail.com
              </a>
            </div>

            <div className="p-5 border bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <FaPhoneAlt className="text-3xl mx-auto text-gray-700 mb-3" />
              <a
                href="tel:+917854001224"
                className="text-sm font-semibold text-gray-800 hover:text-blue-600"
              >
                +91 7854001224
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-5 cursor-pointer hover:bg-gray-50 transition-all"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-medium">{faq.question}</p>
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>

              {openIndex === index && (
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md text-sm hover:bg-blue-50 transition">
            View All Help Topics
          </button>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
