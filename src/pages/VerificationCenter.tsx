import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Check, AlertTriangle, XCircle, ArrowRight } from "lucide-react";

// Mock data for demo clients
const demoClients = [
  {
    id: 1,
    name: "NatWest Bank",
    logo: "/api/placeholder/200/100",
    url: "natwest",
    industry: "Banking & Financial Services",
  },
  {
    id: 2,
    name: "Yum! Brands",
    logo: "/api/placeholder/200/100",
    url: "yumbrands",
    industry: "Food & Beverage",
  },
];

// Updated departments data with AI Agent suffix and new NatWest agent
const departmentsData = {
  "Human Resources": [
    {
      id: 1,
      name: "Resume Screening AI Agent",
      description:
        "Evaluates job applications using advanced natural language processing to match candidate qualifications with job requirements.",
      metrics: {
        cost: { score: 92, status: "verified" },
        carbon: { score: 88, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
    },
    {
      id: 2,
      name: "Employee Sentiment Analysis AI Agent",
      description:
        "Analyzes employee feedback and engagement data to identify workplace satisfaction trends and improvement areas.",
      metrics: {
        cost: { score: 78, status: "in-review" },
        carbon: { score: 82, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
    },
  ],
  "Customer Service": [
    {
      id: 3,
      name: "Chatbot Assistant AI Agent",
      description:
        "Provides 24/7 automated customer support handling common inquiries and service requests.",
      metrics: {
        cost: { score: 88, status: "verified" },
        carbon: { score: 85, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
    },
    {
      id: 4,
      name: "Call Center AI Agent",
      description:
        "Assists call center operators with real-time information and customer interaction guidance.",
      metrics: {
        cost: { score: 65, status: "needs-attention" },
        carbon: { score: 70, status: "in-review" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
    },
    {
      id: 5,
      name: "NatWest Traveler Insurance Policy Specialist (TIPS) AI Agent",
      description:
        "Specializes in travel insurance policy management and claims processing with real-time risk assessment.",
      metrics: {
        cost: { score: 94, status: "verified" },
        carbon: { score: 91, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
    },
  ],
  Finance: [
    {
      id: 6,
      name: "Fraud Detection AI Agent",
      description:
        "Monitors transactions in real-time to identify and prevent fraudulent activities using pattern recognition.",
      metrics: {
        cost: { score: 95, status: "verified" },
        carbon: { score: 93, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
    },
    {
      id: 7,
      name: "Risk Assessment AI Agent",
      description:
        "Evaluates financial risks and creditworthiness using multiple data points and market indicators.",
      metrics: {
        cost: { score: 82, status: "in-review" },
        carbon: { score: 84, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
    },
  ],
};

type MetricsType = {
  cost: {
    score: number;
    status: string;
  };
  carbon: {
    score: number;
    status: string;
  };
  fairness: { score: number; status: string };
  bias: { score: number; status: string };
};

const VerificationCenter = () => {
  const [selectedClient, setSelectedClient] = useState<
    null | (typeof demoClients)[number]
  >(null);
  const [selectedAgent, setSelectedAgent] = useState<
    null | (typeof departmentsData)[keyof typeof departmentsData][number]
  >(null);

  // Status indicator component with metric type
  const StatusIndicator = ({
    metric,
    score,
    status,
  }: {
    metric: string;
    score: number;
    status: string;
  }) => {
    const getStatusInfo = () => {
      switch (status) {
        case "verified":
          return {
            icon: <Check className="text-green-500" />,
            text: "Verified",
            color: "bg-green-100",
          };
        case "in-review":
          return {
            icon: <AlertTriangle className="text-yellow-500" />,
            text: "In Review",
            color: "bg-yellow-100",
          };
        case "needs-attention":
          return {
            icon: <XCircle className="text-red-500" />,
            text: "Needs Attention",
            color: "bg-red-100",
          };
        case "pending":
          return {
            icon: <AlertTriangle className="text-gray-400" />,
            text: "Pending",
            color: "bg-gray-100",
          };
        default:
          return { icon: null, text: "Unknown", color: "bg-gray-100" };
      }
    };

    const statusInfo = getStatusInfo();

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.color}`}
      >
        {statusInfo.icon}
        <span className="text-sm font-medium capitalize">{metric}</span>
        <span className="text-sm font-medium ml-2">({score}%)</span>
      </div>
    );
  };

  // Agent metrics summary component
  const MetricsSummary = ({ metrics }: { metrics: MetricsType }) => (
    <div className="flex flex-wrap gap-2">
      {Object.entries(metrics).map(([metric, { score, status }]) => (
        <StatusIndicator
          key={metric}
          metric={metric}
          score={score}
          status={status}
        />
      ))}
    </div>
  );

  // Client page view
  const ClientPage = ({ client }: { client: (typeof demoClients)[number] }) => (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={client.logo}
            alt={client.name}
            className="w-32 h-16 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold">{client.name}</h1>
            <p className="text-gray-600">{client.industry}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(departmentsData).map(([department, agents]) => (
            <Card key={department}>
              <CardHeader>
                <CardTitle>{department}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{agent.name}</h3>
                        <ArrowRight className="text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {agent.description}
                      </p>
                      <MetricsSummary metrics={agent.metrics} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Detailed agent view with multiple metrics
  const AgentDetailPage = ({
    agent,
  }: {
    agent: (typeof departmentsData)[keyof typeof departmentsData][number];
  }) => (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{agent.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Verification Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(agent.metrics).map(
                    ([metric, { score, status }]) => (
                      <Card key={metric}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2 capitalize">
                            {metric} Score
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  status === "pending"
                                    ? "bg-gray-400"
                                    : "bg-blue-600"
                                }`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                            <span>{score}%</span>
                          </div>
                          <span className="text-sm text-gray-500 mt-1 block">
                            Status:{" "}
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Verification Details
                </h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Cost Assessment</h4>
                      <p>
                        The system has been evaluated for operational costs,
                        resource utilization, and efficiency metrics in
                        compliance with the FinOps Framework.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Carbon Footprint</h4>
                      <p>
                        Environmental impact assessment conducted according to
                        GSF SCI ISO/IEC 21031:2024 Standard for measuring energy
                        consumption and carbon emissions from model training and
                        inference.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Fairness & Bias</h4>
                      <p className="text-gray-500">
                        Comprehensive evaluation of model fairness and bias
                        metrics pending verification.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Navigation
  const handleBack = () => {
    if (selectedAgent) {
      setSelectedAgent(null);
    } else if (selectedClient) {
      setSelectedClient(null);
    }
  };

  return (
    <>
      {selectedClient && (
        <div className="bg-white border-b px-6 py-4">
          <div className="container mx-auto">
            <button
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto">
        {!selectedClient && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">
                Verified Organizations
              </h1>
              <p className="text-gray-600 mb-8">
                Browse through organizations that have undergone AI system
                verification through the Responsible AI Institute's
                comprehensive assessment framework.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {demoClients.map((client) => (
                  <Card
                    key={client.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedClient(client)}
                  >
                    <CardContent className="p-6">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-32 object-contain mb-4"
                      />
                      <h2 className="text-xl font-semibold text-center mb-2">
                        {client.name}
                      </h2>
                      <p className="text-gray-500 text-center">
                        {client.industry}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedClient && !selectedAgent && (
          <ClientPage client={selectedClient} />
        )}
        {selectedAgent && <AgentDetailPage agent={selectedAgent} />}
      </main>
    </>
  );
};

export default VerificationCenter;
