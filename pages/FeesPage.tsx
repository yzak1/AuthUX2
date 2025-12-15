import React from 'react';
import { Download, CreditCard, Clock, FileText } from 'lucide-react';
import Button from '../components/Button';

const FeesPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="border-b border-border-base pb-6">
         <h1 className="text-3xl font-fraunces text-brand-main">Fees & Finance</h1>
         <p className="text-secondary-text">Manage your tuition fees, statements, and payments.</p>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg border border-border-base shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-fraunces text-xl text-brand-main mb-2">Statement of Account</h3>
            <p className="text-secondary-text text-sm">Amount Due for Semester 2, 2024</p>
            <div className="mt-4 text-4xl font-bold text-brand-main">$4,250.00</div>
            <div className="mt-1 text-sm font-bold text-error-msg flex items-center gap-1">
              <Clock size={14} /> Due by 15 August 2024
            </div>
          </div>
          <div className="mt-6 flex gap-4">
             <Button className="flex items-center gap-2">
               <CreditCard size={18} /> Pay Now
             </Button>
             <Button variant="secondary" className="flex items-center gap-2">
               <FileText size={18} /> View Statement
             </Button>
          </div>
        </div>

        <div className="bg-secondary-surface rounded-lg border border-border-base p-6">
           <h3 className="font-bold text-lg text-primary-text mb-4">Payment Methods</h3>
           <ul className="space-y-3 text-sm text-secondary-text">
             <li className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-success-msg"></div> BPAY
             </li>
             <li className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-success-msg"></div> Credit / Debit Card
             </li>
             <li className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-success-msg"></div> Telegraphic Transfer
             </li>
           </ul>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg border border-border-base shadow-sm overflow-hidden">
         <div className="p-6 border-b border-border-base flex items-center justify-between">
            <h3 className="font-fraunces text-lg text-brand-main">Transaction History</h3>
            <button className="text-sm font-bold text-link hover:underline flex items-center gap-1">
               <Download size={14} /> Download Receipt
            </button>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-secondary-surface border-b border-border-base">
               <tr>
                 <th className="p-4 font-semibold text-secondary-text">Date</th>
                 <th className="p-4 font-semibold text-secondary-text">Description</th>
                 <th className="p-4 font-semibold text-secondary-text">Reference</th>
                 <th className="p-4 font-semibold text-secondary-text text-right">Amount</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-border-base">
               <tr className="hover:bg-input-hover transition-colors">
                 <td className="p-4">1 Jul 2024</td>
                 <td className="p-4 font-medium text-primary-text">Tuition Fees - COMP1001</td>
                 <td className="p-4 text-tertiary-text">INV-2024-001</td>
                 <td className="p-4 text-right font-mono">$1,125.00</td>
               </tr>
               <tr className="hover:bg-input-hover transition-colors">
                 <td className="p-4">1 Jul 2024</td>
                 <td className="p-4 font-medium text-primary-text">Tuition Fees - MAST1001</td>
                 <td className="p-4 text-tertiary-text">INV-2024-002</td>
                 <td className="p-4 text-right font-mono">$1,125.00</td>
               </tr>
               <tr className="hover:bg-input-hover transition-colors">
                 <td className="p-4">15 Jan 2024</td>
                 <td className="p-4 font-medium text-primary-text">Student Services Amenities Fee</td>
                 <td className="p-4 text-tertiary-text">INV-2024-003</td>
                 <td className="p-4 text-right font-mono">$326.00</td>
               </tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

export default FeesPage;