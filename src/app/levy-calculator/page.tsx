'use client';

import { useState } from 'react';

interface FormData {
  unitType: string;
  lotSize: string;
}

interface Calculation {
  totalLevy: number;
  breakdown: {
    administration: number;
    capitalWorks: number;
    insurance: number;
  };
  unitType: string;
  lotSize: number;
}

export default function LevyCalculatorPage() {
  const [formData, setFormData] = useState<FormData>({
    unitType: 'apartment',
    lotSize: ''
  });
  
  const [calculation, setCalculation] = useState<Calculation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateLevy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/levy-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unitType: formData.unitType,
          lotSize: parseInt(formData.lotSize)
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCalculation(data);
      } else {
        setError(data.error || 'An error occurred while calculating the levy');
      }
    } catch (error) {
      setError('Error calculating levy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Levy Calculator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Calculate Your Quarterly Levy</h2>
            
            <form onSubmit={calculateLevy}>
              <div className="mb-4">
                <label htmlFor="unitType" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Type
                </label>
                <select
                  id="unitType"
                  value={formData.unitType}
                  onChange={(e) => setFormData({...formData, unitType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Lot Size (sq meters)
                </label>
                <input
                  type="number"
                  id="lotSize"
                  value={formData.lotSize}
                  onChange={(e) => setFormData({...formData, lotSize: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  min="1"
                  step="0.1"
                />
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? 'Calculating...' : 'Calculate Levy'}
              </button>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Calculation Results</h2>
            
            {calculation ? (
              <div>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-green-800">Total Quarterly Levy</h3>
                  <p className="text-2xl font-bold text-green-900">
                    ${calculation.totalLevy.toFixed(2)}
                  </p>
                </div>
                
                <h4 className="font-medium mb-2">Breakdown:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1 border-b">
                    <span>Administration Fund</span>
                    <span className="font-medium">
                      ${calculation.breakdown.administration.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b">
                    <span>Capital Works Fund</span>
                    <span className="font-medium">
                      ${calculation.breakdown.capitalWorks.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b">
                    <span>Insurance</span>
                    <span className="font-medium">
                      ${calculation.breakdown.insurance.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <p>Unit Type: {calculation.unitType}</p>
                  <p>Lot Size: {calculation.lotSize} sq meters</p>
                  <p className="text-xs mt-2">
                    * Rates vary by unit type: Apartment ($0.85/m²), Townhouse ($1.10/m²), Commercial ($1.50/m²)
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">
                <p className="mb-4">
                  Enter your unit details to calculate your quarterly levy contribution.
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-medium text-blue-900 mb-2">Rate Information:</h4>
                  <ul className="text-sm text-blue-800">
                    <li>• Apartment: $0.85 per sq meter</li>
                    <li>• Townhouse: $1.10 per sq meter</li>
                    <li>• Commercial: $1.50 per sq meter</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* JavaScript Demonstration */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Frontend Features:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>React Hooks:</strong> useState for form and results state management</li>
                <li>• <strong>Form Handling:</strong> Controlled components with validation</li>
                <li>• <strong>Async/Await:</strong> Fetch API for serverless function calls</li>
                <li>• <strong>Error Handling:</strong> User-friendly error messages</li>
                <li>• <strong>Loading States:</strong> Disabled buttons during calculations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Serverless Function:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>HTTP Methods:</strong> POST for calculations, GET for rates</li>
                <li>• <strong>Input Validation:</strong> Checks for required fields and valid values</li>
                <li>• <strong>Business Logic:</strong> Different rates for unit types</li>
                <li>• <strong>Response Format:</strong> JSON with structured calculation breakdown</li>
                <li>• <strong>Error Responses:</strong> Proper HTTP status codes (400, 500)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <h4 className="font-medium text-blue-900 mb-1">API Endpoint:</h4>
            <code className="text-sm text-blue-800">/api/levy-calculator</code>
          </div>
        </div>
      </div>
    </main>
  );
}