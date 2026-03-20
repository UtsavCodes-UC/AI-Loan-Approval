import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

function Analytics() {

  const approvalData = [
    { name: "Approved", value: 298 },
    { name: "Rejected", value: 652 }
  ];

  const COLORS = ["#00C49F", "#FF4D4F"];

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 flex-1">
        <Navbar />

        <div className="p-6">

          <h2 className="text-3xl font-bold text-[#0A2540] mb-4">
                Analytics Dashboard
          </h2>

          <p className="text-gray-800 mb-8 leading-relaxed text-lg">
            This dashboard presents the exploratory data analysis (EDA) performed on the loan dataset. 
            The goal of this analysis was to uncover patterns, relationships, and risk indicators that influence loan approval decisions. 
            These insights were directly used for feature engineering, such as deriving financial ratios (e.g., Loan-to-Income ratio, Savings ratio) 
            and identifying key variables like credit score and DTI ratio that significantly impact model predictions.
          </p>

          <div className="grid grid-cols-4 gap-4 mb-6">

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Approval Rate</p>
              <h3 className="text-xl font-bold text-green-600">31%</h3>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Avg Credit Score</p>
              <h3 className="text-xl font-bold">675</h3>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Avg Loan Amount</p>
              <h3 className="text-xl font-bold">₹20,500</h3>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Applications</p>
              <h3 className="text-xl font-bold">950</h3>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-3">
                Loan Approval Distribution
              </h3>

              <PieChart width={400} height={300}>
                <Pie
                  data={approvalData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {approvalData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <p className="mt-4 text-gray-600">
                The dataset is moderately imbalanced, with a significantly higher number of rejected applications compared to approved ones. 
                This insight was crucial in choosing evaluation metrics beyond accuracy (such as F1-score and ROC-AUC) and applying class balancing techniques 
                during model training to avoid biased predictions.
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-3">
                Loan Purpose Distribution
              </h3>

              <img src="/plots/purpose_vs_approval.png" alt="income" />
               <p className="mt-4 text-gray-600">
                Loan approval rates vary across different purposes. 
                For instance, home and business loans tend to have higher approval rates compared to personal or education loans. 
                This indicates that loan purpose is an important categorical feature and should be included in the model using proper encoding.
              </p>
            </div>

          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">

            <div className="bg-white p-4 rounded shadow">
              <h3 className="mb-2 font-semibold">
                Income Distribution
              </h3>
              <img src="/plots/income_distribution.png" alt="income" />
              <p className="mt-4 text-gray-600">
                Applicant income shows a wide spread with slight skewness, indicating the presence of both low-income and high-income applicants. 
                This variability motivated the creation of normalized features such as Loan-to-Income ratio, which provides a more meaningful measure 
                of repayment capability than absolute income values.
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="mb-2 font-semibold">
                Credit Score vs Approval
              </h3>
              <img src="/plots/credit_vs_approval.png" alt="credit" />
              <p className="mt-4 text-gray-600">
                Above Box plot shows clear separation between approved and rejected applicants based on credit score. 
                Higher credit scores strongly correlate with loan approval, making it one of the most influential features in the model. 
                This validated the importance of creditworthiness in risk assessment.
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="mb-2 font-semibold">
                Loan vs Income
              </h3>
              <img src="/plots/income_vs_loan.png" alt="loan" />
              <p className="mt-4 text-gray-600">
                There is no strong linear relationship between income and loan amount, but patterns suggest that higher loan amounts combined with lower income 
                often lead to rejection. This insight helped in engineering ratio-based features like Loan-to-Income and DTI ratio, which better capture financial risk.
              </p>
            </div>

            
            <div className="bg-white p-4 rounded shadow">
              <h3 className="mb-2 font-semibold">
                Feature Correlation Heatmap
              </h3>
              <img src="/plots/heatmap.png" alt="heatmap" />
              <p className="mt-4 text-gray-600">
                The heatmap shows low correlation among most numerical features, indicating minimal multicollinearity. 
                This is beneficial for model stability. It also highlights that relationships are mostly non-linear, 
                reinforcing the use of tree-based models like Random Forest and XGBoost which can capture complex interactions.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Analytics;