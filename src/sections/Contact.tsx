import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Github, Linkedin, LoaderCircle, Mail, MapPin, Phone, SendHorizonal } from 'lucide-react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';
import { profile } from '@/content/portfolio';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const initialForm = {
  name: '',
  email: '',
  subject: 'Portfolio Inquiry',
  message: '',
  company: '',
};

const Contact = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(profile.phone);
      setPhoneCopied(true);
      window.setTimeout(() => setPhoneCopied(false), 1500);
    } catch {
      setPhoneCopied(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');
    setSuccessMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to send message');
      }

      form.reset();
      setSuccessMessage(payload.message || 'Your message was submitted successfully.');
      setStatus('success');
      window.setTimeout(() => {
        setStatus('idle');
        setSuccessMessage('');
      }, 5000);
    } catch (submitError) {
      setStatus('error');
      setError(submitError instanceof Error ? submitError.message : 'Failed to send message');
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <EditorialSectionHeader
          number="06"
          eyebrow="Contact"
          title="Contact"
          description="Messages route through the backend so inquiries can reach your inbox properly."
          className="mb-8 lg:mb-12"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="rounded-[26px] bg-olive-700 p-6 text-olive-50 sm:rounded-[30px] sm:p-8"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-olive-200">Direct details</p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={20} className="mt-1 shrink-0" />
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-olive-200">Email</p>
                  <a href={profile.links.email} className="mt-1 block text-lg font-medium">
                    {profile.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="mt-1 shrink-0" />
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-olive-200">Location</p>
                  <p className="mt-1 text-lg font-medium">{profile.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[24px] bg-white/10 p-5 text-sm leading-relaxed text-olive-100">
              I usually reply within 24 hours. Share your project idea, timeline, and goals, and I can help with
              backend development, data workflows, and production-ready implementation.
            </div>

            <div className="mt-8 flex gap-3">
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
                <Github size={18} />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
                <Linkedin size={18} />
              </a>
              <a href={profile.links.email} className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
                <Mail size={18} />
              </a>
              <span className="relative inline-flex">
                <button
                  type="button"
                  onClick={copyPhoneNumber}
                  aria-label="Copy phone number"
                  title="Copy phone number"
                  className="peer cursor-pointer rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                >
                  <Phone size={18} />
                </button>
                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/35 bg-white/90 px-3 py-1 font-syne text-[10px] font-bold uppercase tracking-[0.14em] text-olive-700 opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-opacity duration-200 peer-hover:opacity-100 peer-focus-visible:opacity-100">
                  {phoneCopied ? 'Copied' : profile.phone}
                </span>
              </span>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.08, duration: 0.55 }}
            className="rounded-[26px] border border-olive-200 bg-white p-6 shadow-[0_30px_80px_-55px_rgba(108,82,45,0.7)] sm:rounded-[30px] sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" name="company" defaultValue={initialForm.company} className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="subject" defaultValue={initialForm.subject} />
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-olive-500">Name</span>
                  <input
                    required
                    type="text"
                    name="name"
                    defaultValue={initialForm.name}
                    maxLength={100}
                    className="w-full rounded-2xl border border-olive-200 bg-olive-50 px-4 py-3.5 text-olive-700 outline-none transition focus:border-olive-400"
                    placeholder="Your name"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-olive-500">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    defaultValue={initialForm.email}
                    maxLength={255}
                    className="w-full rounded-2xl border border-olive-200 bg-olive-50 px-4 py-3.5 text-olive-700 outline-none transition focus:border-olive-400"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-olive-500">Message</span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  defaultValue={initialForm.message}
                  maxLength={2000}
                  className="w-full resize-none rounded-2xl border border-olive-200 bg-olive-50 px-4 py-3.5 text-olive-700 outline-none transition focus:border-olive-400"
                  placeholder="Share the project, timeline, and what kind of help you need."
                />
              </label>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-olive-700 px-6 py-4 text-sm font-semibold text-olive-50 transition hover:bg-olive-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    <SendHorizonal size={18} /> Send message
                  </>
                )}
              </button>
            </form>

            {status === 'success' && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{successMessage || 'Your message was submitted successfully.'}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error || 'Something went wrong while sending your message.'}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
