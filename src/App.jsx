import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateEMI = () => {
    // Validation
    if (!loanAmount || !interestRate || !loanTenure) {
      alert("Please fill all the fields!");
      return;
    }
    if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
      alert("Please enter positive values!");
      return;
    }

    // EMI Formula
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseInt(loanTenure);

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const total = emiValue * N;

    setEmi(emiValue.toFixed(2));
    setTotalPayment(total.toFixed(2));
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-lg bg-light" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4 text-primary">💰 EMI Calculator</h2>

      <div className="mb-3">
        <label className="form-label">Loan Amount (₹)</label>
        <input
          type="number"
          className="form-control"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Annual Interest Rate (%)</label>
        <input
          type="number"
          className="form-control"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter annual interest rate"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Loan Tenure (months)</label>
        <input
          type="number"
          className="form-control"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          placeholder="Enter loan tenure in months"
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary w-100" onClick={calculateEMI}>
          Calculate EMI
        </button>
      </div>

      {emi && (
        <div className="mt-4 bg-white p-3 rounded shadow-sm">
          <h5 className="text-success">Results:</h5>
          <p><strong>Loan Amount:</strong> ₹{loanAmount}</p>
          <p><strong>EMI:</strong> ₹{emi}</p>
          <p><strong>Total Payment:</strong> ₹{totalPayment}</p>
        </div>
      )}
    </div>
  );
}

export default App;
