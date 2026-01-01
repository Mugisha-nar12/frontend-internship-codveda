import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This page explains what information
          we collect and how we use it.
        </p>
        <section className="mb-6">
          <h2 className="font-semibold">Information We Collect</h2>
          <p className="text-gray-700">
            We may collect location information when you use the "Near Me"
            feature, and the details you provide when saving facilities. We do
            not sell personally identifiable information.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold">How We Use Information</h2>
          <p className="text-gray-700">
            Information is used to provide search and mapping features and
            improve service quality. Location data is only used to compute
            nearby facilities and is not stored on our servers in this demo.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold">Contact</h2>
          <p className="text-gray-700">
            For privacy questions contact{" "}
            <a href="mailto:privacy@healthfinder.rw" className="text-blue-600">
              privacy@healthfinder.rw
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
