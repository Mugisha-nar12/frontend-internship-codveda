import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faPaperPlane,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const FAQ_ITEM = [
  {
    q: "How do I search for facilities?",
    a: "Use the search box on the home page. You can search by name, select a type, or choose a city/district to filter results.",
  },
  {
    q: "What is 'Near Me'?",
    a: "'Near Me' uses your device location (with permission) to find nearby facilities and show them on the map.",
  },
  {
    q: "Can I save facilities for later?",
    a: "Yes — click the star icon on any result to save it. Saved facilities are stored in your browser and accessible via the Saved page.",
  },
  {
    q: "Where does the data come from?",
    a: "Data is compiled for demo purposes from public sources. For official guidance, please consult the Ministry of Health site linked throughout the app.",
  },
];

const OFFICE_LOCATION = [-1.9474, 30.0588]; // Kigali, Rwanda

const Contact = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    topic: "General",
  });
  const [status, setStatus] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "Please complete all fields." });
      return;
    }
    // Save to localStorage as a simple fallback (no backend endpoint)
    const existing = JSON.parse(localStorage.getItem("hf_feedback") || "[]");
    const item = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString(),
    };
    const updated = [item, ...existing];
    localStorage.setItem("hf_feedback", JSON.stringify(updated));
    setForm({ name: "", email: "", message: "", topic: "General" });
    setStatus({
      type: "success",
      text: "Thanks — your message has been received.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4 text-black">
              Contact & Support
            </h1>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="text-blue-950"
                />
                <span className="text-gray-900">
                  Frequently Asked Questions
                </span>
              </h2>
              <div className="bg-white rounded-lg shadow-sm divide-y">
                {FAQ_ITEM.map((f, i) => (
                  <div key={i} className="p-4">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full text-left flex justify-between items-center"
                    >
                      <div className="text-gray-800 font-medium">{f.q}</div>
                      <div className="text-blue-600">
                        {openIndex === i ? "−" : "+"}
                      </div>
                    </button>
                    {openIndex === i && (
                      <div className="mt-2 text-gray-600">{f.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-900">
                Send us a message
              </h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="border px-4 py-2 rounded-md w-full text-gray-800"
                    />
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="border px-4 py-2 rounded-md w-full text-gray-800"
                    />
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="border mt-4 px-4 py-2 rounded-md w-full min-h-[140px] text-gray-800"
                  />
                  <div className="mt-4 flex items-center space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                      <span>Send Message</span>
                    </button>
                    {status && (
                      <div
                        className={`${
                          status.type === "success"
                            ? "text-green-600"
                            : "text-red-600"
                        } text-sm`}
                      >
                        {status.text}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </section>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Contact Info
              </h3>
              <div className="text-gray-600 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} className="text-green-900" />{" "}
                  <span>Emergency: 912</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} className="text-green-900" />{" "}
                  <span>Health Info: 114</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-blue-800"
                  />{" "}
                  <span>KN 4 Ave, Kigali, Rwanda</span>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  For official guidance visit the{" "}
                  <a
                    href="https://www.moh.gov.rw/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    Ministry of Health
                  </a>
                  .
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-800">
                Support Hours
              </h3>
              <div className="text-gray-600 text-sm">
                Monday — Friday: 08:00 — 17:00
                <div className="mt-2">Weekends: Limited support</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <h3 className="text-lg font-semibold p-6 pb-2 text-gray-900">
                Office Location
              </h3>
              <div className="h-64">
                <MapContainer
                  center={OFFICE_LOCATION}
                  zoom={14}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={OFFICE_LOCATION}>
                    <Popup>
                      Health Finder Office
                      <br />
                      KN 4 Ave, Kigali
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
