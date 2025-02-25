import React, { useState } from 'react';

const Projects = () => {
    // Sample list of projects
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'Beanbag Heat-New Infra',
            startDate: '1/2/2025',
            status: 'Completed',
            jiraTicket: 'TSI-522',
            environment: 'Production',
            completionDate: '2/6/2025',
            remarks: ''
        },
        {
            id: 2,
            name: 'S2 WSE DR',
            startDate: '1/23/2025',
            status: 'In Progress',
            jiraTicket: 'TSI-392',
            environment: 'Production',
            remarks: ''
        },
        // Add more projects as needed
    ]);

    // Handle remarks change
    const handleRemarksChange = (e, id) => {
        const updatedProjects = projects.map(project => {
            if (project.id === id) {
                return { ...project, remarks: e.target.value };
            }
            return project;
        });
        setProjects(updatedProjects);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Project List</h1>
            {projects.map((project) => (
                <div key={project.id} className="bg-white shadow-lg rounded-lg mb-6 p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">{project.name}</h2>
                    <div className="space-y-2 mt-4 text-gray-700">
                        <p><strong>Start Date:</strong> {project.startDate}</p>
                        <p><strong>Status:</strong> {project.status}</p>
                        <p><strong>Jira Ticket:</strong> {project.jiraTicket}</p>
                        <p><strong>Environment:</strong> {project.environment}</p>
                    </div>

                    <div className="mt-4">
                        <label htmlFor={`remarks-${project.id}`} className="block text-gray-700 font-medium mb-2">Remarks:</label>
                        <textarea
                            id={`remarks-${project.id}`}
                            value={project.remarks}
                            onChange={(e) => handleRemarksChange(e, project.id)}
                            placeholder="Enter your remarks..."
                            rows="2"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Projects;
