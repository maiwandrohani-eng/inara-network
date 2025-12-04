"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";

export default function BecomeMemberPage() {
  const [type, setType] = useState<string>("");
  const [orgData, setOrgData] = useState({
    name: "",
    mission: "",
    operationAreas: "",
    expertise: "",
    experience: "",
    locations: "",
    projects: "",
    contact: "",
    documents: null as File[] | null,
    logo: null as File | null,
  });
  const [indData, setIndData] = useState({
    fullName: "",
    profession: "",
    credentials: "",
    expertise: "",
    education: "",
    experience: "",
    statement: "",
    contact: "",
    cv: null as File | null,
    profile: "",
    picture: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOrgFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "documents" && e.target.files) {
      setOrgData({ ...orgData, documents: Array.from(e.target.files) });
    }
    if (e.target.name === "logo" && e.target.files && e.target.files[0]) {
      setOrgData({ ...orgData, logo: e.target.files[0] });
    }
  };
  const handleIndFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "cv" && e.target.files && e.target.files[0]) {
      setIndData({ ...indData, cv: e.target.files[0] });
    }
    if (e.target.name === "picture" && e.target.files && e.target.files[0]) {
      setIndData({ ...indData, picture: e.target.files[0] });
    }
  };
  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(orgData).forEach(([key, value]) => {
      if (key === "documents" && Array.isArray(value)) {
        value.forEach((file: File) => formData.append("documents", file));
      } else if (key === "logo" && value) {
        formData.append("logo", value as File);
      } else {
        formData.append(key, value as string);
      }
    });
    fetch("/api/applications", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) setSubmitted(true);
      });
  };
  const handleIndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(indData).forEach(([key, value]) => {
      if ((key === "cv" || key === "picture") && value) {
        formData.append(key, value as File);
      } else {
        formData.append(key, value as string);
      }
    });
    fetch("/api/applications", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) setSubmitted(true);
      });
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Become a Member</h1>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How Membership Works</h2>
        <div className="bg-primary-50 border border-primary-200 rounded p-4 mb-2">
          <ol className="list-decimal pl-6 text-primary-700">
            <li>Select your type: Organization or Individual</li>
            <li>Complete the registration form with all required details</li>
            <li>Upload supporting documents (CV, profile picture, org docs, etc.)</li>
            <li>Submit your application</li>
            <li>Track your application progress</li>
            <li>Receive approval and join the network</li>
          </ol>
        </div>
        <div className="flex justify-center mb-4">
          <Image src="/images/process-map.png" alt="Membership Process Map" width={420} height={80} />
        </div>
        <p className="text-gray-700">You will be guided through each step. After submission, you can track your application status and receive updates.</p>
      </div>
      <div className="mb-8 flex gap-4 justify-center">
        <button
          className={`px-6 py-3 rounded-lg font-semibold border transition ${type === "organization" ? "bg-primary-600 text-white" : "bg-white text-primary-700 border-primary-600"}`}
          onClick={() => setType("organization")}
        >
          Organization
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold border transition ${type === "individual" ? "bg-primary-600 text-white" : "bg-white text-primary-700 border-primary-600"}`}
          onClick={() => setType("individual")}
        >
          Individual
        </button>
      </div>
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded p-6 text-center text-green-700 font-semibold">
          Thank you for your application! You can track your progress in your dashboard.
        </div>
      ) : type === "organization" ? (
        <form className="space-y-4" onSubmit={handleOrgSubmit}>
          <div>
            <label className="block font-semibold mb-1">Organization Name</label>
            <input type="text" className="input w-full" required value={orgData.name} onChange={e => setOrgData({ ...orgData, name: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Mission</label>
            <textarea className="input w-full" required value={orgData.mission} onChange={e => setOrgData({ ...orgData, mission: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Areas of Operation</label>
            <input type="text" className="input w-full" required value={orgData.operationAreas} onChange={e => setOrgData({ ...orgData, operationAreas: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Expertise (in supporting children)</label>
            <input type="text" className="input w-full" required value={orgData.expertise} onChange={e => setOrgData({ ...orgData, expertise: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Experience</label>
            <textarea className="input w-full" required value={orgData.experience} onChange={e => setOrgData({ ...orgData, experience: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Locations</label>
            <input type="text" className="input w-full" required value={orgData.locations} onChange={e => setOrgData({ ...orgData, locations: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Projects</label>
            <textarea className="input w-full" required value={orgData.projects} onChange={e => setOrgData({ ...orgData, projects: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Contact Email</label>
            <input type="email" className="input w-full" required value={orgData.contact} onChange={e => setOrgData({ ...orgData, contact: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Organization Logo</label>
            <input type="file" name="logo" className="input w-full" accept="image/*" required onChange={handleOrgFileChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Upload Organization Documents (mission, registration, etc.)</label>
            <input type="file" name="documents" className="input w-full" multiple required onChange={handleOrgFileChange} />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">Submit Application</button>
        </form>
      ) : type === "individual" ? (
        <form className="space-y-4" onSubmit={handleIndSubmit}>
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input type="text" className="input w-full" required value={indData.fullName} onChange={e => setIndData({ ...indData, fullName: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Profession</label>
            <input type="text" className="input w-full" required value={indData.profession} onChange={e => setIndData({ ...indData, profession: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Professional Credentials</label>
            <input type="text" className="input w-full" required value={indData.credentials} onChange={e => setIndData({ ...indData, credentials: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Areas of Expertise</label>
            <input type="text" className="input w-full" required value={indData.expertise} onChange={e => setIndData({ ...indData, expertise: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Education</label>
            <input type="text" className="input w-full" required value={indData.education} onChange={e => setIndData({ ...indData, education: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Experience</label>
            <textarea className="input w-full" required value={indData.experience} onChange={e => setIndData({ ...indData, experience: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Statement of Interest</label>
            <textarea className="input w-full" required value={indData.statement} onChange={e => setIndData({ ...indData, statement: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Contact Email</label>
            <input type="email" className="input w-full" required value={indData.contact} onChange={e => setIndData({ ...indData, contact: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Profile Picture</label>
            <input type="file" name="picture" className="input w-full" accept="image/*" required onChange={handleIndFileChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Upload CV</label>
            <input type="file" name="cv" className="input w-full" required accept=".pdf,.doc,.docx" onChange={handleIndFileChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Complete Profile</label>
            <textarea className="input w-full" required value={indData.profile} onChange={e => setIndData({ ...indData, profile: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">Submit Application</button>
        </form>
      ) : null}
    </main>
  );
}
