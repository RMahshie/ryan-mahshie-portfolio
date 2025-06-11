import { useRef, useState } from "react";
import { init, sendForm } from "@emailjs/browser";
import { RevealOnScroll } from "../RevealOnScroll";

// initialize EmailJS once with your Public Key
init(import.meta.env.VITE_PUBLIC_KEY);

export const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    sendForm(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      formRef.current
    )
      .then(() => {
        alert("Message Sent!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        alert("Oops! Something went wrong. Please try again.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <RevealOnScroll>
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="px-4 w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center">
            Get In Touch
          </h2>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
                type="hidden"
                name="to_name"
                value="Ryan" 
            />
            <input
              type="text"
              name="from_name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your Name..."
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-purple-500 focus:bg-purple-500/5"
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your.email@example.com"
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-purple-500 focus:bg-purple-500/5"
            />

            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Your Message..."
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-purple-500 focus:bg-purple-500/5"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-purple-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </RevealOnScroll>
  );
};
