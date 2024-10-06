import { NextResponse } from 'next/server';
import { readCsvFile } from '../../../lib/readCsvFile';

export async function GET() {
  try {
    const data = readCsvFile('financial_data.csv');
    const processedData = processCsvData(data);
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error reading or processing CSV file:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}

function processCsvData(data: any[]) {
  // This is a placeholder for the actual data processing logic
  // You would implement your data processing here, similar to what you'd do in Python
  const totalIncome = data.reduce((sum, row) => sum + (row.type === 'Income' ? Number(row.amount) : 0), 0);
  const totalExpenses = data.reduce((sum, row) => sum + (row.type === 'Expense' ? Number(row.amount) : 0), 0);
  const netProfit = totalIncome - totalExpenses;

  const monthlyData = data.reduce((acc, row) => {
    const month = new Date(row.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { income: 0, expenses: 0 };
    }
    if (row.type === 'Income') {
      acc[month].income += Number(row.amount);
    } else {
      acc[month].expenses += Number(row.amount);
    }
    return acc;
  }, {});

  return {
    summary: {
      totalIncome,
      totalExpenses,
      netProfit,
    },
    chartData: Object.entries(monthlyData).map(([name, data]) => ({ name, ...data })),
    tableData: data.map(row => ({
      category: row.category,
      amount: Number(row.amount),
      type: row.type,
    })),
  };
}