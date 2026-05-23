import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../types';
import { Send, CheckCircle, Mail, MessageSquare, ShieldCheck, Heart, User, Trash, ArrowRight } from 'lucide-react';

export default function ContactDesk() {
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('navod_recruit_messages');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [autoReplierMsg, setAutoReplierMsg] = useState<string | null>(null);

  // Sync state with localstorage
  useEffect(() => {
    localStorage.setItem('navod_recruit_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !messageText) return;

    setIsSubmitting(true);
    setAutoReplierMsg(null);

    // Simulate sending packet over mock endpoints
    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        subject: subject || 'General Partnership Inquiry',
        message: messageText,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
      };

      setMessages(prev => [newMsg, ...prev]);
      setIsSubmitting(false);
      setShowSuccess(true);

      // Clean input scopes
      setName('');
      setEmail('');
      setSubject('');
      setMessageText('');

      // Auto-responder trigger after 1.5 seconds
      setTimeout(() => {
        const autoReply = `Hi ${newMsg.name}, thank you for reviewing my portfolio proposals! I have securely recorded your message about "${newMsg.subject}" in this browser sandbox state. I will review it shortly. Let's arrange a call! Check out my LinkedIn profile or let's talk real engineering. Cheers! - Navod.`;
        setAutoReplierMsg(autoReply);
      }, 1500);

      // Hide success banner after 4 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

    }, 1200);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent text-white">
      {/* Visual background ambient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a582f3]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section title */}
        <div className="mb-16 text-center sm:text-left">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a582f3] mb-2 block font-semibold">
            Get In Touch
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight">
            Contact <span className="text-[#a582f3] text-glow-blue">& Mail Desk</span>
          </h2>
          <div className="h-[2px] w-20 bg-[#a582f3] mt-4 mx-auto sm:mx-0 shadow-[0_0_8px_#a582f3]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact detailed instructions on Left */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-medium text-2xl text-white">
              Let's craft something outstanding together
            </h3>
            <p className="text-gray-300 font-sans leading-relaxed text-sm">
              Have an opening in your company, a freelance project, or simply want to chat about engineering? Submit an inquiry through my simulated secure contact desk and watch how my reactive auto-responder manages requests.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 glass-card p-4 rounded-xl shadow-md backdrop-blur-sm">
                <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-[#a582f3]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-mono">DIRECT INBOX EMAIL</div>
                  <a href="mailto:navod.caldera.v@gmail.com" className="text-white text-xs font-semibold hover:text-[#a582f3] transition-colors font-sans">
                    navod.caldera.v@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 glass-card p-4 rounded-xl shadow-md backdrop-blur-sm">
                <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-[#7b61ff]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-mono">SANDBOX MAIL STORAGE</div>
                  <div className="text-white text-xs font-semibold font-sans">
                    Client-Side Protected
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social profiles linking explicitly matching images */}
            <div className="pt-4 space-y-2 font-sans">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block font-sans">
                Corporate Profiles
              </span>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-[#a582f3] hover:bg-[#a582f3]/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <span className="font-sans font-extrabold text-xs">LN</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-[#a582f3] hover:bg-[#a582f3]/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="GitHub Profile"
                >
                  <span className="font-sans font-extrabold text-xs">GH</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-[#a582f3] hover:bg-[#a582f3]/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Dribbble Design"
                >
                  <span className="font-sans font-extrabold text-xs">DR</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact form framework on Right */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-2xl relative space-y-4 backdrop-blur-md shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-gray-400 font-sans block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-[#a582f3] outline-none text-xs rounded-xl py-3 px-4 transition-all text-white placeholder-gray-500 focus:ring-1 focus:ring-[#a582f3]/15"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-gray-400 font-sans block">
                    Your Business Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="company@mail.com"
                    className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-[#a582f3] outline-none text-xs rounded-xl py-3 px-4 transition-all text-white placeholder-gray-500 focus:ring-1 focus:ring-[#a582f3]/15"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-medium text-gray-400 font-sans block">
                  Subject / Project Scope
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. SOW Hiring Sprints (Optional)"
                  className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-[#a582f3] outline-none text-xs rounded-xl py-3 px-4 transition-all text-white placeholder-gray-500 focus:ring-1 focus:ring-[#a582f3]/15"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-text" className="text-xs font-medium text-gray-400 font-sans block">
                  Message *
                </label>
                <textarea
                  id="contact-text"
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Hey Navod, I saw your portfolio and would love to explore a joint-venture Sprints..."
                  className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-[#a582f3] outline-none text-xs rounded-xl py-3 px-4 transition-all text-white placeholder-gray-500 focus:ring-1 focus:ring-[#a582f3]/15"
                />
              </div>

              {/* Error/Feedback display notifications */}
              {showSuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Success! Your secure business packet has been logged. Navod's responder is drafting a feedback.</span>
                </div>
              )}

              {/* Playback submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 border rounded-xl text-xs font-bold uppercase tracking-wider font-sans flex items-center justify-center gap-1.5 transition-all duration-300 backdrop-blur-sm cursor-pointer ${
                  isSubmitting
                    ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/25 shadow-[0_4px_12px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
                }`}
              >
                {isSubmitting ? (
                  <span>DISPATCHING...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#a582f3]" />
                    <span>Send Message Packet</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulated Live AI Auto-Response bubble if message sent */}
            {autoReplierMsg && (
              <div className="bg-[#080710]/40 border border-[#a582f3]/40 rounded-2xl p-5 shadow-lg backdrop-blur-sm animate-slideUp font-sans text-xs">
                <div className="flex items-center gap-2 mb-2 text-[#a582f3] font-semibold">
                  <MessageSquare className="w-4 h-4 animate-pulse text-[#7b61ff]" />
                  <span>Interactive Agent Response from Navod</span>
                  <span className="text-[10px] font-mono text-gray-400 px-1.5 py-0.5 bg-black/40 rounded border border-white/10 ml-auto uppercase">Simulated AI Replica</span>
                </div>
                <p className="text-gray-300 leading-relaxed italic">{autoReplierMsg}</p>
                <div className="mt-2.5 flex items-center gap-1 text-[10px] text-gray-500">
                  <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse fill-current" />
                  <span>Delivered via client-side automated responders</span>
                </div>
              </div>
            )}

            {/* Recruiter Messaging Log: displays local items submitted */}
            {messages.length > 0 && (
              <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center bg-white/5 px-4 py-2 border border-white/10 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-gray-400 font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#a582f3]" />
                    <span>Recruiter Messaging Log ({messages.length})</span>
                  </span>
                  
                  <button
                    onClick={() => {
                      setMessages([]);
                      localStorage.removeItem('navod_recruit_messages');
                      setAutoReplierMsg(null);
                    }}
                    className="text-[10px] text-gray-500 hover:text-red-400 font-semibold cursor-pointer"
                  >
                    Clear Logs
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {messages.map((m) => (
                    <div key={m.id} className="p-4 bg-[#080710]/25 border border-white/10 rounded-xl flex justify-between items-start gap-4 backdrop-blur-sm shadow-sm select-none">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-sans font-bold text-xs text-white pb-0.5">{m.name}</span>
                          <span className="text-[10px] font-mono text-[#a582f3]">{m.email}</span>
                          <span className="text-[10px] text-gray-500 font-mono ml-auto">{m.date}</span>
                        </div>
                        <div className="text-xs font-semibold text-gray-300 font-display">Subject: {m.subject}</div>
                        <p className="text-xs text-gray-400 font-sans leading-relaxed">{m.message}</p>
                      </div>

                      <button
                        onClick={() => deleteMessage(m.id)}
                        className="text-gray-500 hover:text-red-450 p-1 rounded transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
