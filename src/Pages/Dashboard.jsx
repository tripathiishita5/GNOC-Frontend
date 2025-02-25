import React, { useState } from 'react';
import { Mail, Phone, Ticket } from 'lucide-react';

const teamMembers = [
    {
        name: "Ranjan Kumar Soni",
        role: "GNOC Manager",
        email: "ranjan.soni@securemeters.com",
        tickets: 12,
    },
    {
        name: "Zuber Ahmed",
        role: "GNOC member",
        email: "zuber.ahmed@securemeters.com",
        tickets: 8,
    },
    {
        name: "Yogesh Kalal",
        role: "GNOC member",
        email: "yogesh.kalal@securemeters.com",
        tickets: 15,
    },
    {
        name: "Himanshu Tripathi",
        role: "GNOC member",
        email: "himanshu.tripathi@securemeters.com",
        tickets: 20,
    },
    {
        name: "Tarun Suthar",
        role: "GNOC member",
        email: "tarun.suthar@securemeters.com",
        tickets: 18,
    },
    {
        name: "Ishita Tripathi",
        role: "GNOC member",
        email: "ishita.tripathi@securemeters.com",
        tickets: 5,
    }
];

function Dashboard() {
    const [selectedMember, setSelectedMember] = useState(null);

    const handleClick = (index) => {
        setSelectedMember(selectedMember === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Team Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className="group relative bg-[#820C59] backdrop-blur-sm rounded-xl p-6 transition-all duration-300 cursor-pointer hover:transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/10"
                    >
                        {/* Basic Info - Always Visible */}
                        <div className="text-white">
                            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                            <p className="text-pink-100/80">{member.role}</p>
                        </div>

                        {/* Extended Info - Visible on Click */}
                        {selectedMember === index && (
                            <div className="absolute inset-0 bg-[#722156] rounded-xl p-6 opacity-100 transition-opacity duration-300 border border-white/20">
                                <div className="h-full flex flex-col justify-between text-white">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                        <p className="text-pink-200 mb-1">{member.role}</p>
                                    </div>

                                    <div className="space-y-3 bg-[#630944] p-4 rounded-lg backdrop-blur-sm">
                                        <div className="flex items-center gap-3">
                                            <Mail className="text-pink-200" size={18} />
                                            <span className="text-sm text-pink-100">{member.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Ticket className="text-pink-200" size={18} />
                                            <span className="text-sm text-pink-100">{member.tickets} Active Tickets</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
