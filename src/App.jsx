import { useState, useEffect } from 'react'
import { 
  PlayIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ServerIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxj-en-qUYi-iSSeasmFMGt7TyXMT2G0vHmMB_Sg9rwlYgmYpit3jwhJO0ifRyleECS_g/exec'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [lastRequestTime, setLastRequestTime] = useState(null)
  const [requestCount, setRequestCount] = useState(0)
  const [requestMethod, setRequestMethod] = useState('GET')
  const [formData, setFormData] = useState([
    { key: '', value: '' }
  ])

  const addFormField = () => {
    setFormData([...formData, { key: '', value: '' }])
  }

  const removeFormField = (index) => {
    if (formData.length > 1) {
      setFormData(formData.filter((_, i) => i !== index))
    }
  }

  const updateFormField = (index, field, value) => {
    const newFormData = [...formData]
    newFormData[index][field] = value
    setFormData(newFormData)
  }

  const getFormDataObject = () => {
    const data = {}
    formData.forEach(field => {
      if (field.key.trim()) {
        data[field.key.trim()] = field.value.trim()
      }
    })
    return data
  }

  const sendRequest = async () => {
    setIsLoading(true)
    setError(null)
    setResponse(null)
    
    try {
      const startTime = Date.now()
      const requestOptions = {
        method: requestMethod,
      }

      // Add body for POST requests
      if (requestMethod === 'POST') {
        const postData = getFormDataObject()
        requestOptions.body = JSON.stringify(postData)
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, requestOptions)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const endTime = Date.now()
      
      setResponse({
        ...data,
        responseTime: endTime - startTime,
        sentData: requestMethod === 'POST' ? getFormDataObject() : null
      })
      setLastRequestTime(new Date().toLocaleString('th-TH'))
      setRequestCount(prev => prev + 1)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const clearData = () => {
    setResponse(null)
    setError(null)
    setLastRequestTime(null)
  }

  useEffect(() => {
    // Auto-fetch on component mount (GET request)
    sendRequest()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative glass-effect border-b border-white/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <ServerIcon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Google Script Client
                </h1>
                <p className="text-sm text-slate-600 text-balance flex items-center space-x-2">
                  <SparklesIcon className="w-4 h-4 text-indigo-500" />
                  <span>Advanced GET & POST Request Client</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Requests</div>
                <div className="text-2xl font-bold text-blue-600">{requestCount}</div>
              </div>
              {lastRequestTime && (
                <div className="text-center">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Last Request</div>
                  <div className="text-sm font-medium text-slate-700">{lastRequestTime}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Control Panel */}
        <div className="card mb-12 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center space-x-3">
                <RocketLaunchIcon className="w-7 h-7 text-blue-600" />
                <span>Control Panel</span>
              </h2>
              <p className="text-slate-600 text-lg">Send GET or POST request to Google Apps Script with advanced monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={sendRequest}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-3 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <ArrowPathIcon className="w-6 h-6 animate-spin" />
                ) : (
                  <PaperAirplaneIcon className="w-6 h-6" />
                )}
                <span>{isLoading ? 'Sending...' : 'Send Request'}</span>
              </button>
              <button
                onClick={clearData}
                className="btn-secondary flex items-center space-x-3 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <DocumentTextIcon className="w-6 h-6" />
                <span>Clear Data</span>
              </button>
            </div>
          </div>
          
          {/* Method Selection */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200/50 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Request Method:</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setRequestMethod('GET')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  requestMethod === 'GET'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
                }`}
              >
                GET Request
              </button>
              <button
                onClick={() => setRequestMethod('POST')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  requestMethod === 'POST'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
                }`}
              >
                POST Request
              </button>
            </div>
          </div>
          
          {/* URL Display */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200/50 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <ServerIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Target URL:</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <code className="text-sm text-slate-800 break-all font-mono bg-slate-50 px-3 py-2 rounded-lg">
                {GOOGLE_SCRIPT_URL}
              </code>
            </div>
          </div>

          {/* POST Form Data */}
          {requestMethod === 'POST' && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50/50 rounded-2xl p-6 border border-purple-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <PaperAirplaneIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">POST Data:</span>
                  </div>
                </div>
                <button
                  onClick={addFormField}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">Add Field</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.map((field, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Key"
                      value={field.key}
                      onChange={(e) => updateFormField(index, 'key', e.target.value)}
                      className="flex-1 input-field"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) => updateFormField(index, 'value', e.target.value)}
                      className="flex-1 input-field"
                    />
                    {formData.length > 1 && (
                      <button
                        onClick={() => removeFormField(index)}
                        className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Preview JSON */}
              {formData.some(field => field.key.trim() || field.value.trim()) && (
                <div className="mt-4 bg-white/80 rounded-xl p-4 border border-purple-200">
                  <div className="text-sm font-semibold text-slate-700 mb-2">Preview JSON:</div>
                  <pre className="text-sm text-slate-800 bg-slate-50 p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(getFormDataObject(), null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="card mb-12 animate-fade-in border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="relative mb-6">
                  <ArrowPathIcon className="w-16 h-16 text-blue-500 animate-spin mx-auto" />
                  <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Sending {requestMethod} Request...</h3>
                <p className="text-slate-600 text-lg max-w-md mx-auto">Please wait while we send data to Google Apps Script. This may take a few moments.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="card mb-12 border-red-200 bg-gradient-to-r from-red-50/50 to-pink-50/50 animate-fade-in">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ExclamationTriangleIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-800 mb-3">Request Failed</h3>
                <p className="text-red-700 text-lg mb-6 bg-white/50 p-4 rounded-xl border border-red-200">{error}</p>
                <button
                  onClick={sendRequest}
                  className="btn-primary bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:ring-red-500 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <ArrowPathIcon className="w-5 h-5 mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="space-y-8 animate-fade-in">
            {/* Response Summary */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                  <ChartBarIcon className="w-7 h-7 text-green-600" />
                  <span>Response Summary</span>
                </h2>
                <div className="flex items-center space-x-3 text-lg font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-2xl">
                  <CheckCircleIcon className="w-6 h-6" />
                  <span>Success</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <ClockIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700 uppercase tracking-wider">Response Time</div>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{response.responseTime}ms</p>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200/50 transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl flex items-center justify-center">
                      <DocumentTextIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700 uppercase tracking-wider">Method</div>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-700">{response.method}</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <ServerIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700 uppercase tracking-wider">Status</div>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{response.data?.status}</p>
                </div>
              </div>
            </div>

            {/* Sent Data (for POST requests) */}
            {response.sentData && Object.keys(response.sentData).length > 0 && (
              <div className="card">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                  <PaperAirplaneIcon className="w-7 h-7 text-purple-600" />
                  <span>Sent Data</span>
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50/30 rounded-xl border border-purple-200 p-4">
                  <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono bg-white/50 p-4 rounded-lg border border-purple-200">
                    {JSON.stringify(response.sentData, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Response Details */}
            <div className="card">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                <DocumentTextIcon className="w-7 h-7 text-indigo-600" />
                <span>Response Details</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Message</h4>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-4 border border-slate-200">
                    <p className="text-slate-900 text-lg">{response.message}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Timestamp</h4>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-4 border border-slate-200">
                    <p className="text-slate-900 text-lg font-mono">{new Date(response.timestamp).toLocaleString('th-TH')}</p>
                  </div>
                </div>
                
                {response.params && Object.keys(response.params).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Query Parameters</h4>
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200 p-4">
                      <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono bg-white/50 p-4 rounded-lg border border-slate-200">
                        {JSON.stringify(response.params, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Data Items */}
            {response.data?.items && response.data.items.length > 0 && (
              <div className="card">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                  <ChartBarIcon className="w-7 h-7 text-purple-600" />
                  <span>Data Items</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {response.data.items.map((item, index) => (
                    <div 
                      key={item.id || index}
                      className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-6 border border-purple-200/50 hover:shadow-xl transition-all duration-300 animate-slide-up transform hover:scale-105 hover:border-purple-300/70"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-purple-600 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full border border-purple-200">
                          ID: {item.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">#{index + 1}</span>
                      </div>
                      
                      <h4 className="font-bold text-slate-900 text-lg mb-3">{item.name}</h4>
                      <p className="text-slate-600 text-base leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Raw JSON */}
            <div className="card">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                <DocumentTextIcon className="w-7 h-7 text-slate-600" />
                <span>Raw Response JSON</span>
              </h3>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 overflow-x-auto border border-slate-700 shadow-2xl">
                <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !response && !error && (
          <div className="card text-center py-20 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <DocumentTextIcon className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No Data Yet</h3>
            <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">Click "Send Request" to fetch data from Google Apps Script and see the beautiful response visualization.</p>
            <button onClick={sendRequest} className="btn-primary px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-200">
              <PaperAirplaneIcon className="w-6 h-6 mr-3" />
              Send First Request
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative glass-effect border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600 text-balance text-lg">
              <span className="font-semibold text-slate-800">Google Script Client</span> • Built with React + Vite + Tailwind CSS v4 • {new Date().getFullYear()}
            </p>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-500">Powered by Modern Web Technologies</span>
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
