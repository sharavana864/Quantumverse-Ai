import React, { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Users,
  ExternalLink,
  MapPin,
  Clock,
  Plus,
  Search
} from "lucide-react";
import { EventItem } from "../types";
import { INITIAL_EVENTS } from "../data/eventsData";

interface EventsHubProps {
  theme?: "dark" | "light";
}

export const EventsHub: React.FC<EventsHubProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [filterType, setFilterType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showHostModal, setShowHostModal] = useState<boolean>(false);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventHost, setNewEventHost] = useState("");
  const [newEventType, setNewEventType] = useState<"Workshop" | "Hackathon" | "Seminar" | "Competition">("Workshop");
  const [newEventDate] = useState("2026-08-25");
  const [newEventDesc, setNewEventDesc] = useState("");

  const handleToggleRsvp = (id: string) => {
    setEvents(
      events.map((e) =>
        e.id === id
          ? {
              ...e,
              isRsvped: !e.isRsvped,
              rsvpCount: e.isRsvped ? e.rsvpCount - 1 : e.rsvpCount + 1,
            }
          : e
      )
    );
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const created: EventItem = {
      id: `evt-${Date.now()}`,
      title: newEventTitle,
      hostName: newEventHost || "Community Host",
      verifiedHost: true,
      type: newEventType,
      date: newEventDate,
      time: "10:00 AM EST",
      location: "Virtual Conference Room",
      description: newEventDesc || "Community hosted quantum learning session.",
      tags: ["Quantum", newEventType],
      rsvpCount: 1,
      isRsvped: true,
    };

    setEvents([created, ...events]);
    setShowHostModal(false);
    setNewEventTitle("");
    setNewEventDesc("");
  };

  const filteredEvents = events.filter((e) => {
    const matchesType = filterType === "All" || e.type === filterType;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className={`space-y-8 max-w-7xl mx-auto transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4 ${
        isDark ? "border-white/10" : "border-slate-200"
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className={`w-6 h-6 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
            <h2 className="text-xl font-black uppercase tracking-wider">Verified Quantum Events & Hackathons</h2>
          </div>
          <p className={`text-xs mt-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
            Connect with verified hosts from IBM, MIT, CERN, and Xanadu for global competitions and live workshops.
          </p>
        </div>

        <button
          onClick={() => setShowHostModal(true)}
          className={`px-4 py-2.5 rounded-2xl text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1.5 transition-all active:scale-95 ${
            isDark ? "bg-[#7F00FF] hover:bg-[#6b00db] glow-violet" : "bg-[#333333] hover:bg-[#222222]"
          }`}
        >
          <Plus className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#FFC312]"}`} />
          <span>Host an Event</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-3xl p-4 ${
        isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-sm"
      }`}>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workshops, hackathons..."
            className={`w-full border rounded-2xl pl-10 pr-3 py-2 text-xs outline-none ${
              isDark
                ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]"
                : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#00B894]"
            }`}
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto text-xs font-semibold">
          {["All", "Hackathon", "Workshop", "Seminar"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl uppercase tracking-wider transition-all ${
                filterType === type
                  ? isDark ? "bg-[#7F00FF] text-white glow-violet" : "bg-[#333333] text-white"
                  : isDark ? "bg-white/5 text-gray-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className={`border rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4 transition-all ${
              isDark
                ? "bg-[#1C1C1C] border-white/10 hover:border-[#7F00FF]"
                : "bg-white border-slate-200 hover:border-[#00B894] shadow-sm"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-lg border ${
                  isDark ? "bg-[#7F00FF]/20 text-[#A3FF00] border-[#7F00FF]/40" : "bg-[#00B894]/10 text-[#00B894] border-[#00B894]/30"
                }`}>
                  {evt.type}
                </span>

                <div className={`flex items-center space-x-1 text-xs font-mono ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  <Users className={`w-3.5 h-3.5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                  <span>{evt.rsvpCount} Attending</span>
                </div>
              </div>

              <h3 className="text-base font-bold uppercase tracking-wide">{evt.title}</h3>

              <div className={`flex items-center space-x-1.5 text-xs font-bold ${
                isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"
              }`}>
                <span>Host: {evt.hostName}</span>
                {evt.verifiedHost && <CheckCircle2 className={`w-3.5 h-3.5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />}
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>{evt.description}</p>

              <div className={`grid grid-cols-2 gap-2 text-[11px] font-mono border rounded-2xl p-3 ${
                isDark ? "bg-[#121212] border-white/5 text-gray-400" : "bg-slate-50 border-slate-200 text-slate-600"
              }`}>
                <div className="flex items-center space-x-1.5">
                  <Calendar className={`w-3.5 h-3.5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className={`w-3.5 h-3.5 ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`} />
                  <span>{evt.time}</span>
                </div>
                <div className="col-span-2 flex items-center space-x-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#FFC312] shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {evt.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono ${
                      isDark ? "bg-white/5 border-white/10 text-gray-300" : "bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`pt-3 border-t flex items-center justify-between ${isDark ? "border-white/10" : "border-slate-200"}`}>
              {evt.resourcesUrl && (
                <a
                  href={evt.resourcesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs hover:underline flex items-center space-x-1 font-bold ${
                    isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"
                  }`}
                >
                  <span>Resources</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => handleToggleRsvp(evt.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 ${
                  evt.isRsvped
                    ? isDark
                      ? "bg-[#A3FF00]/20 border border-[#A3FF00] text-[#A3FF00]"
                      : "bg-[#00B894]/20 border border-[#00B894] text-[#00B894]"
                    : isDark
                    ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime"
                    : "bg-[#00B894] text-white hover:bg-[#00a383]"
                }`}
              >
                {evt.isRsvped ? "RSVP Confirmed ✓" : "RSVP Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showHostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <form
            onSubmit={handleCreateEvent}
            className={`border rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl ${
              isDark ? "bg-[#1C1C1C] border-[#7F00FF]/40 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <h3 className="font-extrabold text-base uppercase tracking-wider">Host a Quantum Event</h3>
              <button
                type="button"
                onClick={() => setShowHostModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-gray-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Qiskit Pulse Control Workshop"
                  className={`w-full border rounded-2xl p-3 outline-none ${
                    isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Host Org</label>
                  <input
                    type="text"
                    value={newEventHost}
                    onChange={(e) => setNewEventHost(e.target.value)}
                    placeholder="e.g. Stanford Quantum Club"
                    className={`w-full border rounded-2xl p-3 outline-none ${
                      isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Event Type</label>
                  <select
                    value={newEventType}
                    onChange={(e: any) => setNewEventType(e.target.value)}
                    className={`w-full border rounded-2xl p-3 outline-none ${
                      isDark ? "bg-[#121212] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Competition">Competition</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">Description</label>
                <textarea
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  rows={3}
                  placeholder="Details regarding prerequisites, agenda, and Zoom links..."
                  className={`w-full border rounded-2xl p-3 outline-none ${
                    isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowHostModal(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg ${
                  isDark ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime" : "bg-[#00B894] text-white hover:bg-[#00a383]"
                }`}
              >
                Publish Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
