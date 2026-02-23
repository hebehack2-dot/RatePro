import React from 'react';
import { BookOpen, TrendingUp, Calculator } from 'lucide-react';

export const ProFreelancerGuides: React.FC = () => {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800" id="pro-guides">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Pro Freelancer Guides
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Deep dive into advanced strategies to maximize your freelance income and minimize your tax burden.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Article 1 */}
        <article className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="p-8 flex-grow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                The Science of Value-Based Pricing: How to double your income.
              </h3>
            </div>
            
            <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                For most freelancers, the journey begins with hourly billing. It feels safe, logical, and easy to explain to clients. However, hourly billing inherently limits your earning potential. You only have so many hours in a week, and eventually, you hit a ceiling. This is where value-based pricing changes the game entirely, allowing you to decouple your time from your income and scale your business exponentially.
              </p>
              <p>
                <strong>What is Value-Based Pricing?</strong><br/>
                Unlike hourly or fixed-project pricing, value-based pricing focuses on the <em>outcome</em> and the <em>value</em> you deliver to the client's business. If your redesign of a checkout page increases a client's revenue by $100,000 a year, charging $500 for a few hours of work is a massive disservice to yourself. Instead, you price based on a percentage of that created value—perhaps $10,000. The client still gets a 10x ROI, and you get paid for your expertise, not just your time. This model aligns your incentives with the client's goals: you both want the biggest possible impact.
              </p>
              <p>
                <strong>The Psychology of High-Ticket Sales</strong><br/>
                When you charge based on value, you position yourself as an investment rather than an expense. Clients who pay premium rates are typically more invested in the project's success, provide better feedback, and treat you as a strategic partner rather than a disposable pair of hands. It filters out micromanagers and attracts businesses that understand the true cost of poor execution.
              </p>
              <p>
                <strong>How to Implement It:</strong><br/>
                1. <strong>Shift the Conversation:</strong> Stop asking "What do you need me to do?" and start asking "What business problem are we trying to solve?" Understand their pain points deeply.<br/>
                2. <strong>Quantify the Impact:</strong> Work with the client to estimate the financial impact of solving this problem. Will it save time? Increase sales? Reduce churn? Get concrete numbers.<br/>
                3. <strong>Anchor Your Price:</strong> Present your fee as a fraction of the value created. "To generate an estimated $50k in new sales, my fee is $5k."<br/>
                4. <strong>Offer Options:</strong> Provide tiered pricing (e.g., Basic, Standard, Premium) so the client is choosing <em>how</em> to work with you, rather than <em>whether</em> to work with you.
              </p>
              <p>
                Transitioning to value-based pricing requires confidence and strong negotiation skills. You are no longer selling your hands; you are selling your brain and the results it produces. Start small by applying this model to your next new client, and watch your effective hourly rate skyrocket. Remember, you are not charging for the hour it takes to do the work; you are charging for the years it took you to learn how to do it in an hour.
              </p>
            </div>
          </div>
        </article>

        {/* Article 2 */}
        <article className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="p-8 flex-grow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Calculator size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                Freelance Tax Planning for 2024: A complete checklist.
              </h3>
            </div>
            
            <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Taxes are the single biggest expense for most successful freelancers. Unlike traditional employees who have taxes automatically withheld, independent contractors are responsible for managing their own tax liabilities. Failing to plan can result in massive end-of-year bills, penalties, and unnecessary stress. Here is your essential, comprehensive tax planning checklist for 2024 to keep more of your hard-earned money.
              </p>
              <p>
                <strong>1. The 30% Rule:</strong><br/>
                The golden rule of freelancing is to set aside roughly 30% of every payment you receive into a separate, high-yield savings account dedicated solely to taxes. This covers both income tax and self-employment tax (Medicare and Social Security). Never treat your gross income as your net spendable cash. Automate this transfer if possible so you never even see the money in your operating account.
              </p>
              <p>
                <strong>2. Track Every Deduction Meticulously:</strong><br/>
                To lower your taxable income, you must meticulously track deductible business expenses. The IRS allows you to deduct expenses that are "ordinary and necessary" for your business. Common deductions include:<br/>
                - Software subscriptions (Adobe Creative Cloud, Notion, RatePro, Web Hosting)<br/>
                - Home office deduction (a percentage of rent/utilities based on the square footage of your dedicated workspace)<br/>
                - Internet and phone bills (the percentage used for business)<br/>
                - Business travel, conferences, and continuing education<br/>
                - Health insurance premiums (often fully deductible for self-employed individuals)<br/>
                - Professional services (legal fees, accounting fees, subcontractors)
              </p>
              <p>
                <strong>3. Pay Estimated Quarterly Taxes:</strong><br/>
                If you expect to owe more than $1,000 in taxes for the year, the IRS (and many state tax agencies) requires you to make estimated quarterly payments. Missing these deadlines (April 15, June 15, Sept 15, Jan 15) can result in underpayment penalties and interest. Set calendar reminders and pay these religiously.
              </p>
              <p>
                <strong>4. Consider an S-Corp Election:</strong><br/>
                Once your net freelance income exceeds roughly $60,000 - $80,000 annually, forming an LLC and electing S-Corp taxation status can save you thousands in self-employment taxes. As an S-Corp, you pay yourself a "reasonable salary" (which is subject to self-employment tax) and take the remaining profit as owner distributions (which are not subject to self-employment tax). This strategy requires running payroll and filing a separate corporate tax return, so consult a CPA to see if the tax savings outweigh the administrative costs for your specific situation.
              </p>
              <p>
                <strong>5. Maximize Retirement Contributions:</strong><br/>
                Freelancers have access to powerful retirement accounts like the Solo 401(k) or SEP IRA. These accounts allow you to contribute significantly more than a standard IRA, drastically reducing your current-year taxable income while building long-term wealth. For 2024, a Solo 401(k) allows contributions up to $69,000 depending on your income level.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
