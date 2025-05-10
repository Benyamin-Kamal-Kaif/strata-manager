'use client';

import { useState } from 'react';

interface FormData {
  unitType: string;
  lotSize: string;
  bedrooms: string;
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
    lotSize: '',
    bedrooms: '1'
  });
  
  const [calculation, setCalculation] = useState<Calculation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateLevy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Client-side calculation logic (no serverless function)
      const lotSize = parseInt(formData.lotSize);
      const baseRate = 0.85; // per square meter
      const estimatedLevy = lotSize * baseRate;
      
      const breakdown = {
        administration: estimatedLevy * 0.6,
        capitalWorks: estimatedLevy * 0.3,
        insurance: estimatedLevy * 0.1
      };
      
      const result: Calculation = {
        unitType: formData.unitType,
        lotSize: lotSize,
        totalLevy: estimatedLevy,
        breakdown
      };
      
      // Simulate API delay
      setTimeout(() => {
        setCalculation(result);
        setLoading(false);
      }, 500);
    } catch {
      alert('Error calculating levy. Please try again.');
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
                <label htmlFor="unitType" className="block text-sm font-medium mb-1">
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
                <label htmlFor="lotSize" className="block text-sm font-medium mb-1">
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
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
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
                  <div className="flex justify-between">
                    <span>Administration Fund</span>
                    <span className="font-medium">
                      ${calculation.breakdown.administration.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capital Works Fund</span>
                    <span className="font-medium">
                      ${calculation.breakdown.capitalWorks.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance</span>
                    <span className="font-medium">
                      ${calculation.breakdown.insurance.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <p>Unit Type: {calculation.unitType}</p>
                  <p>Lot Size: {calculation.lotSize} sq meters</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">
                Enter your unit details to calculate your quarterly levy contribution.
              </p>
            )}
          </div>
        </div>
        
        {/* JavaScript Demonstration */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">JavaScript Features Used</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>useState Hook:</strong> Managing form state and calculation results</li>
            <li>• <strong>Client-side Logic:</strong> All calculations performed in the browser</li>
            <li>• <strong>Event Handling:</strong> Form submission and input changes</li>
            <li>• <strong>Conditional Rendering:</strong> Showing/hiding calculation results</li>
            <li>• <strong>Number Formatting:</strong> Displaying currency with proper decimals</li>
          </ul>
        </div>
      </div>
    </main>
  );
}