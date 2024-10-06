import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SummarySectionProps {
  data: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
  };
}

const SummarySection: React.FC<SummarySectionProps> = ({ data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.totalIncome.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.totalExpenses.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.netProfit.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummarySection;