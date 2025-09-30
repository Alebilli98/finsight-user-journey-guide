import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Droplets, Building, Upload } from "lucide-react";

import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import CashFlowStatement from "./CashFlowStatement";

interface FinancialStatementsProps {
  user?: any;
}

const FinancialStatements = ({ user }: FinancialStatementsProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  const hasRealData = financialData.annualRevenue > 0 || financialData.totalAssets > 0;

  // Mock data structure - replace with real data from user
  const revenue = financialData.annualRevenue || 0;
  const costOfGoodsSold = financialData.costOfGoodsSold || 0;
  const grossProfit = revenue - costOfGoodsSold;
  const operatingExpenses = financialData.operatingExpenses || 0;
  const depreciation = financialData.depreciation || 0;
  const amortization = financialData.amortization || 0;
  const ebit = grossProfit - operatingExpenses;
  const ebitda = ebit + depreciation + amortization;
  
  const incomeStatementData = {
    revenue,
    costOfGoodsSold,
    grossProfit,
    operatingExpenses,
    depreciation,
    amortization,
    ebit,
    ebitda,
    interestExpense: financialData.interestExpense || 0,
    taxes: financialData.taxes || 0,
    netIncome: financialData.netIncome || 0,
    monthlyData: hasRealData ? (financialData.monthlyData || []) : [],
    revenueBreakdown: financialData.revenueBreakdown || []
  };

  const balanceSheetData = {
    currentAssets: {
      cash: financialData.cash || 0,
      accountsReceivable: financialData.accountsReceivable || 0,
      inventory: financialData.inventory || 0,
      otherCurrent: financialData.otherCurrentAssets || 0,
      total: financialData.currentAssets || 0
    },
    nonCurrentAssets: {
      fixedAssets: financialData.fixedAssets || 0,
      intangibleAssets: financialData.intangibleAssets || 0,
      investments: financialData.investments || 0,
      otherNonCurrent: financialData.otherNonCurrentAssets || 0,
      total: financialData.nonCurrentAssets || 0
    },
    totalAssets: financialData.totalAssets || 0,
    currentLiabilities: {
      accountsPayable: financialData.accountsPayable || 0,
      shortTermDebt: financialData.shortTermDebt || 0,
      accruedExpenses: financialData.accruedExpenses || 0,
      otherCurrent: financialData.otherCurrentLiabilities || 0,
      total: financialData.currentLiabilities || 0
    },
    nonCurrentLiabilities: {
      longTermDebt: financialData.longTermDebt || 0,
      otherNonCurrent: financialData.otherNonCurrentLiabilities || 0,
      total: financialData.nonCurrentLiabilities || 0
    },
    totalLiabilities: financialData.totalLiabilities || 0,
    equity: {
      shareCapital: financialData.shareCapital || 0,
      retainedEarnings: financialData.retainedEarnings || 0,
      otherEquity: financialData.otherEquity || 0,
      total: (financialData.totalAssets || 0) - (financialData.totalLiabilities || 0)
    }
  };

  const cashFlowData = {
    operatingCashFlow: financialData.operatingCashFlow || 0,
    investingCashFlow: financialData.investingCashFlow || 0,
    financingCashFlow: financialData.financingCashFlow || 0,
    netCashFlow: financialData.netCashFlow || 0,
    endingCashBalance: financialData.endingCash || 0,
    burnRate: financialData.burnRate || 0,
    cashRunway: financialData.cashRunway || 0,
    monthlyData: hasRealData ? (financialData.monthlyCashFlow || []) : []
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
            Financial Statements
          </h1>
          <p className="text-gray-600 mt-2">Complete financial analysis and reporting</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border-0 px-4 py-2 rounded-full">
            <FileText className="h-4 w-4 mr-2" />
            Financial Analysis
          </Badge>
          {!hasRealData && (
            <Button 
              onClick={() => {
                const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                window.dispatchEvent(event);
              }}
              className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 rounded-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
          )}
        </div>
      </div>

      {/* Statement Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{incomeStatementData.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Annual Revenue</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500 bg-blue-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-900">EBITDA</CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">€{ebitda.toLocaleString()}</div>
            <p className="text-xs text-blue-700 mt-1">
              Margin: {revenue > 0 ? ((ebitda / revenue) * 100).toFixed(1) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500 bg-purple-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-900">EBIT</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">€{ebit.toLocaleString()}</div>
            <p className="text-xs text-purple-700 mt-1">
              Margin: {revenue > 0 ? ((ebit / revenue) * 100).toFixed(1) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${incomeStatementData.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              €{incomeStatementData.netIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Margin: {revenue > 0 ? ((incomeStatementData.netIncome / revenue) * 100).toFixed(1) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Balance Sheet</CardTitle>
              <Building className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Assets</span>
                <span className="font-medium">€{balanceSheetData.totalAssets.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Equity</span>
                <span className="font-medium text-blue-600">€{balanceSheetData.equity.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
              <Droplets className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Operating CF</span>
                <span className={`font-medium ${cashFlowData.operatingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  €{cashFlowData.operatingCashFlow.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ending Cash</span>
                <span className="font-medium text-purple-600">€{cashFlowData.endingCashBalance.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Statements Tabs */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <Tabs defaultValue="income" className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-12">
                <TabsTrigger value="income" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Income Statement
                </TabsTrigger>
                <TabsTrigger value="balance" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Building className="h-4 w-4 mr-2" />
                  Balance Sheet
                </TabsTrigger>
                <TabsTrigger value="cashflow" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Droplets className="h-4 w-4 mr-2" />
                  Cash Flow
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="income" className="p-6">
              <IncomeStatement data={incomeStatementData} />
            </TabsContent>

            <TabsContent value="balance" className="p-6">
              <BalanceSheet data={balanceSheetData} />
            </TabsContent>

            <TabsContent value="cashflow" className="p-6">
              <CashFlowStatement data={cashFlowData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStatements;
