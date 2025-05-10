export default function FinancialPage() {
    return (
      <main className="flex min-h-screen flex-col items-center p-8">
        <div className="max-w-6xl w-full">
          <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
          
          {/* Custom CSS Styling Example */}
          <style jsx>{`
            .custom-card {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border-radius: 12px;
              padding: 24px;
              margin-bottom: 24px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            
            .stat-box {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border-radius: 8px;
              padding: 16px;
            }
            
            .progress-bar {
              height: 8px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 4px;
              overflow: hidden;
              position: relative;
            }
            
            .progress-bar::after {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              height: 100%;
              background: white;
              border-radius: 4px;
              animation: progress 2s ease-out;
            }
            
            @keyframes progress {
              from { width: 0%; }
              to { width: var(--progress); }
            }
            
            .levy-card {
              --progress: 75%;
            }
            
            .savings-card {
              --progress: 60%;
            }
          `}</style>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="custom-card levy-card">
              <h2 className="text-xl font-bold mb-4">Quarterly Levy Collection</h2>
              <div className="stat-box mb-4">
                <p className="text-3xl font-bold">$84,200</p>
                <p className="text-sm opacity-90">Collected this quarter</p>
              </div>
              <div className="progress-bar">
                <div className="w-full h-full bg-white opacity-30 rounded"></div>
              </div>
              <p className="text-sm mt-2">75% of target ($112,000)</p>
            </div>
            
            <div className="custom-card savings-card">
              <h2 className="text-xl font-bold mb-4">Capital Works Fund</h2>
              <div className="stat-box mb-4">
                <p className="text-3xl font-bold">$120,500</p>
                <p className="text-sm opacity-90">Current balance</p>
              </div>
              <div className="progress-bar">
                <div className="w-full h-full bg-white opacity-30 rounded"></div>
              </div>
              <p className="text-sm mt-2">60% of annual target ($200,000)</p>
            </div>
          </div>
          
          {/* Demonstration of CSS Flexbox and Grid */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Expenditure Breakdown</h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                backgroundColor: '#f8fafc',
                borderLeft: '4px solid #3b82f6',
                padding: '16px'
              }}>
                <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Insurance</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$35,000</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Annual premium</p>
              </div>
              
              <div style={{
                backgroundColor: '#f8fafc',
                borderLeft: '4px solid #10b981',
                padding: '16px'
              }}>
                <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Maintenance</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$12,300</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>YTD Spending</p>
              </div>
              
              <div style={{
                backgroundColor: '#f8fafc',
                borderLeft: '4px solid #8b5cf6',
                padding: '16px'
              }}>
                <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Administration</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$8,700</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Operational costs</p>
              </div>
            </div>
            
            {/* Flexbox example */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <div>
                <h3 style={{ fontWeight: '600' }}>Total Annual Budget</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Based on current projections</p>
              </div>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#059669' }}>$450,000</p>
            </div>
          </div>
        </div>
      </main>
    );
  }