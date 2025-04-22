// src/app/page.tsx
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";

export default function Page() {
  return (
    <main className="p-8 space-y-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold">Finance Tracker</h1>

      <section>
        <h2 className="text-2xl mb-4">Add New Transaction</h2>
        <TransactionForm />
      </section>

      <section>
        <h2 className="text-2xl mb-4">Summary</h2>
        <SummaryCards />
      </section>

      <section>
        <h2 className="text-2xl mb-4">All Transactions</h2>
        <TransactionList />
      </section>

      <section>
        <h2 className="text-2xl mb-4">Monthly Expenses</h2>
        <MonthlyChart />
      </section>

      <section>
        <h2 className="text-2xl mb-4">Expenses by Category</h2>
        <CategoryPieChart />
      </section>
    </main>
  );
}
