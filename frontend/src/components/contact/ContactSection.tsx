"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MailCheck, Phone, Send, ArrowLeft, Briefcase, GraduationCap, Users, Mail, Clock, MapPin, Loader2 } from "lucide-react";
import { createInquiry } from "@/lib/api";

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    persona: "",
    interest: "",
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean, message: string} | null>(null);

  const handleNext = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setStep(prev => prev + 1);
    setSubmitStatus(null);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
    setSubmitStatus(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);
    
    const res = await createInquiry(formData);
    
    setIsLoading(false);
    
    if (res.success) {
      setSubmitStatus({ success: true, message: 'Thank you! Your guided inquiry has been submitted.' });
      setFormData({ persona: "", interest: "", fullName: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setStep(1);
        setSubmitStatus(null);
      }, 3000);
    } else {
      setSubmitStatus({ success: false, message: res.message || 'Failed to submit inquiry.' });
    }
  };

  const stepVariants: import("framer-motion").Variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="contact-flow-section" className="relative w-full py-24 bg-[#FDFBF7] isolate px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden border border-zinc-100 min-h-[650px] flex flex-col lg:flex-row relative">
          
          {/* Left Column: Contact Info Panel */}
          <div className="lg:w-[45%] bg-gradient-to-br from-emerald-600 to-teal-800 p-10 lg:p-14 text-white relative overflow-hidden flex flex-col justify-between">
            {/* Decorative Glows */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400/30 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
            
            <div className="relative z-10 mb-12">
              <h3 className="text-3xl font-bold font-heading mb-4 text-white tracking-tight">Contact Information</h3>
              <p className="text-emerald-50/90 text-sm leading-relaxed font-medium max-w-sm">
                Fill up the form and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="relative z-10 space-y-10 flex-grow">
              
              {/* Call Us */}
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/30 bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm mb-1 font-medium">Call Us (Mon - Sat)</p>
                  <p className="font-bold text-lg tracking-wide text-white">+91 95109 90292</p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/30 bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm mb-1 font-medium">Email Us</p>
                  <p className="font-bold text-base sm:text-lg text-white">extrabitsclasses@gmail.com</p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/30 bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm mb-1 font-medium">Opening Hours</p>
                  <p className="font-bold text-lg text-white">10:00 AM to 7:00 PM</p>
                </div>
              </div>

              {/* Visit Institute */}
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/30 bg-white/10 group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm mb-1 font-medium">Visit Institute</p>
                  <p className="font-bold text-base leading-relaxed text-white">
                    F-21, Agresen Point,<br />
                    Beside Agresen Bhavan,<br />
                    City Light, Surat
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:w-[55%] relative flex flex-col p-8 md:p-14 flex-grow bg-white">
            
            {/* Progress Bar inside the form area */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-100">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Content Container */}
            <div className="flex-grow flex flex-col justify-center relative mt-6">
              
              {step > 1 && (
                <button 
                  onClick={handleBack}
                  className="absolute -top-6 -left-6 p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors z-10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              <AnimatePresence mode="wait">
                
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                  >
                    <h3 className="text-3xl font-black text-zinc-900 mb-3 text-center tracking-tight">Who are you?</h3>
                    <p className="text-zinc-500 text-center mb-10 text-lg">Select the option that best describes you.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: "Parent", icon: Users, desc: "Looking for my child" },
                        { id: "Student", icon: GraduationCap, desc: "Learning for myself" }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleNext("persona", item.id)}
                          className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-zinc-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-300 group shadow-sm hover:shadow-md"
                        >
                          <div className="w-14 h-14 rounded-full bg-zinc-50 group-hover:bg-emerald-100 flex items-center justify-center mb-4 transition-colors">
                            <item.icon className="w-6 h-6 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                          </div>
                          <h4 className="font-bold text-zinc-900 text-lg mb-1">{item.id}</h4>
                          <p className="text-sm text-zinc-500 text-center">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                  >
                    <h3 className="text-3xl font-black text-zinc-900 mb-3 text-center tracking-tight">What are you looking for?</h3>
                    <p className="text-zinc-500 text-center mb-10 text-lg">Choose the program that interests you the most.</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: "Academic", title: "Academic Coaching", desc: "Board exams & tuition" },
                        { id: "Other", title: "Other Courses", desc: "Tally, CCC, etc." }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleNext("interest", item.title)}
                          className="text-left p-5 rounded-2xl border-2 border-zinc-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-300 group flex flex-col justify-center shadow-sm hover:shadow-md"
                        >
                          <h4 className="font-bold text-zinc-900 text-lg mb-1 group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                          <p className="text-sm text-zinc-500">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full mx-auto"
                  >
                    <h3 className="text-3xl font-black text-zinc-900 mb-3 text-center tracking-tight">Tell us about yourself</h3>
                    <p className="text-zinc-500 text-center mb-8 text-lg">We'll reach out to discuss your {formData.interest} goals.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      {/* Full Name */}
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MailCheck className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700"
                          />
                        </div>

                        {/* Phone */}
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="relative group">
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Any specific requirements? (Optional)"
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700 resize-none"
                        ></textarea>
                      </div>

                      {/* Submit Status Message */}
                      {submitStatus && (
                        <div className={`p-4 rounded-xl text-sm font-semibold border text-center ${submitStatus.success ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                          {submitStatus.message}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-70"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Submit & Get Started
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
