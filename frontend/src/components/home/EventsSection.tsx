"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export default function EventsSection() {
  const events = [
    {
      date: "15",
      month: "Aug",
      title: "Introduction to HTML & CSS Workshop",
      time: "10:00 AM - 1:00 PM",
      location: "Main Campus Lab A",
      tag: "Workshop"
    },
    {
      date: "22",
      month: "Aug",
      title: "Junior Coding Hackathon 2026",
      time: "9:00 AM - 5:00 PM",
      location: "Virtual & Campus",
      tag: "Competition"
    },
    {
      date: "05",
      month: "Sep",
      title: "Free Python Demo Class",
      time: "4:00 PM - 5:30 PM",
      location: "Online via Zoom",
      tag: "Demo Session"
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-4"
            >
              Upcoming Events
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-muted max-w-xl"
            >
              Join our workshops, hackathons, and demo sessions to accelerate your learning journey.
            </motion.p>
          </div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-primary-green font-bold hover:gap-3 transition-all"
          >
            View All Events <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="flex gap-6">
                {/* Date Block */}
                <div className="flex flex-col items-center justify-center w-20 h-24 bg-light-bg rounded-2xl border border-primary-green/20 group-hover:bg-primary-green group-hover:border-primary-green transition-colors">
                  <span className="text-3xl font-bold text-primary-green group-hover:text-white transition-colors">{event.date}</span>
                  <span className="text-sm font-semibold text-text-dark group-hover:text-white/90 transition-colors uppercase">{event.month}</span>
                </div>
                
                {/* Event Details */}
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold text-text-muted rounded-full mb-3">
                    {event.tag}
                  </span>
                  <h3 className="text-lg font-bold text-text-dark mb-4 leading-tight group-hover:text-primary-green transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-green" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-green" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
