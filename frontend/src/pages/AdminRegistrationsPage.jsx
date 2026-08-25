import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  Lock,
  FileSpreadsheet,
  FileText,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Users,
  Search,
  LogOut,
} from 'lucide-react';
import { registrationAPI } from '@/services/api';
import { FIELD_CONFIG } from '../constants/registrationFields';

const TOKEN_KEY = 'cardx_admin_token';

const AdminRegistrationsPage = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [tokenInput, setTokenInput] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterIsrael, setFilterIsrael] = useState('all');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const loadRegistrations = useCallback(async (adminToken) => {
    setLoading(true);
    setError(null);
    try {
      const [list, countData] = await Promise.all([
        registrationAPI.listRegistrations(adminToken),
        registrationAPI.getRegistrationCount(adminToken),
      ]);
      setRegistrations(list);
      setTotalCount(countData.count);
      setAuthenticated(true);
      sessionStorage.setItem(TOKEN_KEY, adminToken);
      setToken(adminToken);
    } catch (err) {
      const detail = err?.detail || err?.message || 'Authentication failed';
      setError(typeof detail === 'string' ? detail : 'Authentication failed');
      setAuthenticated(false);
      sessionStorage.removeItem(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadRegistrations(token);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredRegistrations = useMemo(() => {
    let results = registrations;
    if (filterIsrael !== 'all') {
      results = results.filter((r) => r.visited_before_israel === filterIsrael);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter((r) => {
        const haystack = [
          r.first_name,
          r.last_name,
          r.email,
          r.passport_no,
          r.telephone_number,
          r.tourist_birth_country,
          r.country_of_present_residence,
          r.id,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    return results;
  }, [registrations, searchQuery, filterIsrael]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    loadRegistrations(tokenInput.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setTokenInput('');
    setAuthenticated(false);
    setRegistrations([]);
  };

  const handleDownload = async (type, registrationId = null) => {
    const key = registrationId ? `${type}-${registrationId}` : `all-${type}`;
    setDownloading(key);
    try {
      let blob;
      let filename;
      if (registrationId) {
        blob = type === 'xlsx'
          ? await registrationAPI.downloadRegistrationXlsx(token, registrationId)
          : await registrationAPI.downloadRegistrationPdf(token, registrationId);
        filename = `registration-${registrationId.slice(0, 8)}.${type === 'xlsx' ? 'xlsx' : 'pdf'}`;
      } else {
        blob = type === 'xlsx'
          ? await registrationAPI.downloadAllXlsx(token)
          : await registrationAPI.downloadAllPdf(token);
        filename = `tour-registrations.${type === 'xlsx' ? 'xlsx' : 'pdf'}`;
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err?.detail || err?.message || 'Download failed');
    } finally {
      setDownloading(null);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '-';
    try {
      return new Date(iso).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="py-16 sm:py-24">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-center mb-6">
                <img src="/logo.png" alt="CardX Academia" className="h-12 object-contain" />
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Lock className="text-blue-500" size={26} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">Admin Portal</h1>
              <p className="text-gray-500 text-center text-sm mb-6">
                Tour registration dashboard
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="admin-token" className="text-gray-700">Admin Token</Label>
                  <Input
                    id="admin-token"
                    type="password"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Enter your admin secret"
                    className="mt-1.5"
                    autoComplete="current-password"
                  />
                </div>
                {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading || !tokenInput.trim()}
                  className="w-full bg-blue-500 hover:bg-blue-600 font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Admin header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Tour Registrations</h1>
                <p className="text-sm text-gray-500">
                  {totalCount} total · {filteredRegistrations.length} shown
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => loadRegistrations(token)} disabled={loading}>
                <RefreshCw size={15} className={`mr-1.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload('xlsx')}
                disabled={!!downloading || registrations.length === 0}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                {downloading === 'all-xlsx' ? <Loader2 size={15} className="mr-1.5 animate-spin" /> : <FileSpreadsheet size={15} className="mr-1.5" />}
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload('pdf')}
                disabled={!!downloading || registrations.length === 0}
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                {downloading === 'all-pdf' ? <Loader2 size={15} className="mr-1.5 animate-spin" /> : <FileText size={15} className="mr-1.5" />}
                PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500">
                <LogOut size={15} className="mr-1.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & filter bar */}
      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, passport, phone..."
              className="pl-9 bg-white"
            />
          </div>
          <Select value={filterIsrael} onValueChange={setFilterIsrael}>
            <SelectTrigger className="w-full sm:w-52 bg-white">
              <SelectValue placeholder="Israel visit filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All registrations</SelectItem>
              <SelectItem value="yes">Visited Israel: Yes</SelectItem>
              <SelectItem value="no">Visited Israel: No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* List */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {loading && registrations.length === 0 ? (
            <div className="flex justify-center py-24">
              <Loader2 size={32} className="animate-spin text-blue-500" />
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <Users size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">
                {registrations.length === 0 ? 'No registrations yet.' : 'No results match your search.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredRegistrations.map((reg) => {
                const isExpanded = expandedId === reg.id;
                const name = `${reg.first_name} ${reg.last_name}`;
                return (
                  <div key={reg.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : reg.id)}
                      className="w-full flex items-center gap-3 p-4 sm:p-5 hover:bg-gray-50/80 transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold text-sm">
                        {reg.first_name?.[0]}{reg.last_name?.[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 truncate">{name}</p>
                        <p className="text-sm text-gray-500 truncate">{reg.email}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-gray-400">
                          <span>{reg.passport_no}</span>
                          <span>{reg.telephone_number}</span>
                          <span>{formatDate(reg.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={(e) => { e.stopPropagation(); handleDownload('xlsx', reg.id); }}
                          disabled={!!downloading}
                          title="Download Excel"
                        >
                          {downloading === `xlsx-${reg.id}` ? <Loader2 size={15} className="animate-spin" /> : <FileSpreadsheet size={15} />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => { e.stopPropagation(); handleDownload('pdf', reg.id); }}
                          disabled={!!downloading}
                          title="Download PDF"
                        >
                          {downloading === `pdf-${reg.id}` ? <Loader2 size={15} className="animate-spin" /> : <FileText size={15} />}
                        </Button>
                        {isExpanded ? <ChevronUp size={18} className="text-gray-400 ml-1" /> : <ChevronDown size={18} className="text-gray-400 ml-1" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 border-t border-gray-50 pt-4 bg-gray-50/50">
                        <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                          {Object.keys(FIELD_CONFIG).map((key) => (
                            <div key={key}>
                              <dt className="text-gray-400 text-xs uppercase tracking-wide">{FIELD_CONFIG[key].label}</dt>
                              <dd className="text-gray-800 font-medium mt-0.5">{reg[key] || '—'}</dd>
                            </div>
                          ))}
                          <div>
                            <dt className="text-gray-400 text-xs uppercase tracking-wide">Registration ID</dt>
                            <dd className="text-gray-600 font-mono text-xs mt-0.5 break-all">{reg.id}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-400 text-xs uppercase tracking-wide">Emails Sent</dt>
                            <dd className="text-gray-800 mt-0.5">
                              {reg.customer_email_sent ? '✓ Customer' : '✗ Customer'}
                              {' · '}
                              {reg.admin_email_sent ? '✓ Admin' : '✗ Admin'}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AdminRegistrationsPage;
