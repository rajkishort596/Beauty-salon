import React from "react";

const StatCard = ({ label, value }) => (
  <div className="bg-white/60 backdrop-blur-lg text-primary p-4 rounded-lg shadow-sm text-center">
    <p className="text-sm">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatCard;
